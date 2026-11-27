// main.js
"use strict";

const { app, BrowserWindow, WebContentsView, ipcMain, shell, session, clipboard, dialog, globalShortcut, Tray, Menu } = require("electron");
const path     = require("path");
const { spawn, execSync, spawnSync } = require("child_process");
const net = require("net");
const fs       = require("fs");
const os       = require("os");
const { randomUUID } = require("crypto");
const { Client: SshClient } = require("ssh2");
const vault = require("./vault-crypto.js");
const { autoUpdater } = require("electron-updater");

// serialport – für Konsolenkabel (USB-to-Serial).
// Benötigt: npm install serialport && npx @electron/rebuild
// Node.js v20 LTS empfohlen für zuverlässige Kompilierung der nativen Bindings.
let SerialPortClass = null;
try {
  SerialPortClass = require("serialport").SerialPort;
} catch {
  console.warn("[RDM] serialport nicht verfügbar. Serielle Verbindungen deaktiviert.");
  console.warn("[RDM] Lösung: Node.js v20 LTS + npm install serialport + npx @electron/rebuild");
}

let win;
// Entwicklungsmodus = per "npm start" aus dem Projektordner gestartet
// (nicht die installierte App). Steuert DEV-Kennzeichnung und Test-Hilfen.
const IS_DEV = !app.isPackaged;
let isCleaningUp   = false;

/* ----------------------------------------
   Credential Store (Windows DPAPI via PowerShell)
   Verschlüsselt Passwörter benutzer-spezifisch –
   kein natives npm-Paket nötig.
---------------------------------------- */
async function readCredentials() {
  try { return JSON.parse(await fs.promises.readFile(credPath, "utf-8")); }
  catch { return {}; }
}
async function writeCredentials(data) {
  await fs.promises.writeFile(credPath, JSON.stringify(data, null, 2), "utf-8");
}

function dpapiEncrypt(plaintext) {
  // Plaintext als Base64 übergeben → kein Shell-Escaping nötig
  const inputB64 = Buffer.from(plaintext, "utf8").toString("base64");
  const ps = `Add-Type -AssemblyName System.Security; ` +
    `$b=[Convert]::FromBase64String('${inputB64}'); ` +
    `$e=[System.Security.Cryptography.ProtectedData]::Protect($b,$null,'CurrentUser'); ` +
    `[Convert]::ToBase64String($e)`;
  return execSync(`powershell -NoProfile -NonInteractive -WindowStyle Hidden -Command "${ps}"`,
    { encoding: "utf-8", windowsHide: true, timeout: 5000 }).trim();
}

function dpapiDecrypt(ciphertext) {
  // Bytes als Base64 zurückgeben – vermeidet PowerShell-Konsolencodierungs-Probleme
  // (UTF8.GetString korrumpiert Sonderzeichen wenn die Konsole nicht UTF-8 ist)
  const ps = `Add-Type -AssemblyName System.Security; ` +
    `$e=[Convert]::FromBase64String('${ciphertext}'); ` +
    `$b=[System.Security.Cryptography.ProtectedData]::Unprotect($e,$null,'CurrentUser'); ` +
    `[Convert]::ToBase64String($b)`;
  const b64 = execSync(`powershell -NoProfile -NonInteractive -WindowStyle Hidden -Command "${ps}"`,
    { encoding: "utf-8", windowsHide: true, timeout: 5000 }).trim().replace(/\s/g, "");
  return Buffer.from(b64, "base64").toString("utf8");
}

ipcMain.handle("cred:save", async (_e, { id, password }) => {
  try {
    const enc  = dpapiEncrypt(password);
    const data = await readCredentials();
    data[id]   = enc;
    await writeCredentials(data);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

ipcMain.handle("cred:load", async (_e, { id }) => {
  try {
    const data = await readCredentials();
    if (!data[id]) return { ok: false };
    const password = dpapiDecrypt(data[id]);
    return { ok: true, password };
  } catch { return { ok: false }; }
});

ipcMain.handle("cred:delete", async (_e, { id }) => {
  try {
    const data = await readCredentials();
    delete data[id];
    await writeCredentials(data);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

ipcMain.handle("cred:clear", async () => {
  // Löscht nur SSH-Verbindungspasswörter – persönliche Zugangsdaten und Modi bleiben erhalten
  try {
    const data = await readCredentials();
    const preserved = {};
    if (data.__personal__) preserved.__personal__ = data.__personal__;
    if (data.__modes__)    preserved.__modes__    = data.__modes__;
    await writeCredentials(preserved);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

// Persönliche Zugangsdaten (Username + Passwort zusammen verschlüsselt)
ipcMain.handle("cred:savePersonal", async (_e, { username, password }) => {
  try {
    const enc  = dpapiEncrypt(JSON.stringify({ username, password }));
    const data = await readCredentials();
    data["__personal__"] = enc;
    await writeCredentials(data);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

ipcMain.handle("cred:loadPersonal", async () => {
  try {
    const data = await readCredentials();
    if (!data["__personal__"]) return { ok: false };

    let dec = dpapiDecrypt(data["__personal__"]);
    if (typeof dec !== "string") throw new Error(t("errCredsDecrypt"));
    dec = dec.trim();
    if (dec.charCodeAt(0) === 0xFEFF) dec = dec.slice(1);

    let parsed;
    try {
      parsed = JSON.parse(dec);
    } catch (parseErr) {
      console.error("[RDM] Persönliche Credentials sind kein gültiges JSON.");
      console.error("[RDM] Erster Zeichencode:", dec.charCodeAt(0), "| Länge:", dec.length);
      console.error("[RDM] Parse-Fehler:", parseErr.message);
      delete data["__personal__"];
      await writeCredentials(data);
      return { ok: false, error: t("errCredsCorrupt") };
    }

    return { ok: true, username: parsed.username || "", password: parsed.password || "" };
  } catch (err) {
    console.error("[RDM] cred:loadPersonal fehlgeschlagen:", err.message);
    return { ok: false, error: err.message };
  }
});

ipcMain.handle("cred:deletePersonal", async () => {
  try {
    const data = await readCredentials();
    delete data["__personal__"];
    await writeCredentials(data);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

ipcMain.handle("cred:getMode", async (_e, { id }) => {
  try {
    const data = await readCredentials();
    return { ok: true, mode: (data.__modes__ || {})[id] || "none" };
  } catch { return { ok: true, mode: "none" }; }
});

ipcMain.handle("cred:setMode", async (_e, { id, mode }) => {
  try {
    const data = await readCredentials();
    if (!data.__modes__) data.__modes__ = {};
    if (mode === "none") delete data.__modes__[id];
    else data.__modes__[id] = mode;
    await writeCredentials(data);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

/* =========================================================
   Geteilter Passwort-Tresor (Vault)
   ---------------------------------------------------------
   - Der Tresor-Header (Salt + Verifier) liegt in vault.json.
     Er enthält KEIN Passwort, kann also gefahrlos geteilt werden
     (liegt neben connections.json, ggf. auf dem SMB-Share).
   - Der entsperrte Schlüssel lebt NUR hier im RAM (vaultKey),
     niemals auf der Platte.
   - Geteilte Verbindungspasswörter werden mit diesem Schlüssel
     ver-/entschlüsselt und liegen dann in connections.json.
========================================================= */
let vaultKey = null; // Buffer wenn entsperrt, sonst null

function vaultFilePath() {
  // Liegt neben der connections.json der aktiven Datenquelle
  const cfg = { mode: "local", smbPath: "" };
  try {
    const s = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
    if (s.dataSource === "smb" && typeof s.smbPath === "string" && s.smbPath.trim()) {
      return path.join(path.dirname(s.smbPath.trim()), "vault.json");
    }
  } catch {}
  return path.join(userDataDir, "vault.json");
}

async function readVaultHeader() {
  try { return JSON.parse(await fs.promises.readFile(vaultFilePath(), "utf-8")); }
  catch { return null; }
}
async function writeVaultHeader(header) {
  await fs.promises.writeFile(vaultFilePath(), JSON.stringify(header, null, 2), "utf-8");
}

// Status: gibt es einen Tresor? Ist er gerade entsperrt?
ipcMain.handle("vault:status", async () => {
  const header = await readVaultHeader();
  let remembered = false;
  try {
    const cred = await readCredentials();
    remembered = !!cred.__vaultpw__;
  } catch {}
  return { exists: !!header, unlocked: vaultKey !== null, remembered };
});

// Ersteinrichtung: Freischalt-Passwort festlegen
ipcMain.handle("vault:setup", async (_e, { password }) => {
  try {
    if (!password) return { ok: false, error: t("errNoPassword") };
    const existing = await readVaultHeader();
    if (existing) return { ok: false, error: t("errVaultExists") };
    const header = vault.createVaultHeader(password);
    await writeVaultHeader(header);
    vaultKey = vault.unlockVault(password, header); // direkt entsperrt lassen
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

// Entsperren beim Start
ipcMain.handle("vault:unlock", async (_e, { password }) => {
  try {
    const header = await readVaultHeader();
    if (!header) return { ok: false, error: t("errNoVault") };
    const key = vault.unlockVault(password, header);
    if (!key) return { ok: false, error: t("errWrongPassword") };
    vaultKey = key;
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

// Sperren (Schlüssel aus dem RAM entfernen)
ipcMain.handle("vault:lock", async () => {
  vaultKey = null;
  return { ok: true };
});

// Geteiltes Geheimnis verschlüsseln (nur wenn entsperrt)
ipcMain.handle("vault:encrypt", async (_e, { plaintext }) => {
  if (!vaultKey) return { ok: false, error: t("errVaultLocked") };
  try { return { ok: true, ciphertext: vault.encryptWithKey(vaultKey, plaintext || "") }; }
  catch (err) { return { ok: false, error: err.message }; }
});

// Geteiltes Geheimnis entschlüsseln (nur wenn entsperrt)
ipcMain.handle("vault:decrypt", async (_e, { ciphertext }) => {
  if (!vaultKey) return { ok: false, error: t("errVaultLocked") };
  try { return { ok: true, plaintext: vault.decryptWithKey(vaultKey, ciphertext) }; }
  catch (err) { return { ok: false, error: err.message }; }
});

// Notausgang: Tresor + alle geteilten Passwörter löschen
ipcMain.handle("vault:reset", async () => {
  try {
    // Header löschen
    try { await fs.promises.unlink(vaultFilePath()); } catch {}
    vaultKey = null;
    // Auch gemerktes Passwort auf diesem Rechner entfernen
    try {
      const data = await readCredentials();
      delete data.__vaultpw__;
      await writeCredentials(data);
    } catch {}
    // Geteilte Passwörter aus connections.json entfernen
    const data = await readStore();
    let removed = 0;
    (function walk(folders) {
      for (const f of folders || []) {
        for (const c of f.items || []) {
          if (c.sharedPassword) { delete c.sharedPassword; removed++; }
        }
        walk(f.folders);
      }
    })(data.folders);
    if (removed > 0) await writeStore(data, data.rev);
    return { ok: true, removed };
  } catch (err) { return { ok: false, error: err.message }; }
});

// Freischalt-Passwort per DPAPI auf DIESEM Rechner merken (rechnergebunden)
ipcMain.handle("vault:remember", async (_e, { password }) => {
  try {
    const enc  = dpapiEncrypt(password);
    const data = await readCredentials();
    data.__vaultpw__ = enc; // liegt in der lokalen credentials.json, nie synchronisiert
    await writeCredentials(data);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

// Gemerktes Passwort vergessen
ipcMain.handle("vault:forget", async () => {
  try {
    const data = await readCredentials();
    delete data.__vaultpw__;
    await writeCredentials(data);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

// ── Auto-Update über SMB-Freigabe (eigener Mechanismus) ────────────────
// Liest version.json von der Freigabe, vergleicht mit eigener Version,
// meldet dem Banner ein verfügbares Update. Nutzt normale Datei-Zugriffe
// (kein http), daher SMB-tauglich – anders als electron-updater.

// UNC-Pfad zur Update-Freigabe (normaler Windows-Pfad, KEIN file://).
const SMB_UPDATE_DIR = "\\\\De0924LTH\\RCM_AUP$";
const SMB_VERSION_FILE = "version.json";
const SMB_INSTALLER_NAME = "RCM-Setup.exe";

// Vergleicht zwei Versionsstrings "1.0.2" vs "1.0.10" korrekt (nummerisch).
// Gibt true, wenn "remote" NEUER ist als "local".
function isNewerVersion(remote, local) {
  const r = String(remote).split(".").map(n => parseInt(n, 10) || 0);
  const l = String(local).split(".").map(n => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(r.length, l.length); i++) {
    const a = r[i] || 0, b = l[i] || 0;
    if (a > b) return true;
    if (a < b) return false;
  }
  return false; // gleich
}

// Debug-Logging für Auto-Update. Auf true setzen, um in update-debug.log
// zu schreiben (nur zur Fehlersuche). Im Normalbetrieb: false.
const UPDATE_DEBUG_LOG = false;

function smbUpdLog(msg) {
  if (!UPDATE_DEBUG_LOG) return; // Logging aus – nichts schreiben
  try {
    fs.appendFileSync(path.join(userDataDir, "update-debug.log"),
      `[${new Date().toISOString()}] [SMB] ${msg}\n`);
  } catch {}
}

async function checkSmbUpdate() {
  if (!app.isPackaged) { smbUpdLog("Dev-Modus – übersprungen"); return; }

  const send = (channel, payload) => {
    const wnd = win && !win.isDestroyed() ? win : BrowserWindow.getAllWindows()[0];
    if (wnd) wnd.webContents.send(channel, payload);
  };

  try {
    send("update:checking");
    const versionPath = path.join(SMB_UPDATE_DIR, SMB_VERSION_FILE);
    smbUpdLog("Lese: " + versionPath);

    // version.json von der Freigabe lesen
    const raw = await fs.promises.readFile(versionPath, "utf-8");
    const info = JSON.parse(raw);
    const remoteVersion = info.version;
    const localVersion = app.getVersion();
    smbUpdLog(`remote=${remoteVersion}  local=${localVersion}`);

    if (remoteVersion && isNewerVersion(remoteVersion, localVersion)) {
      smbUpdLog("Neuere Version verfügbar!");
      send("update:available", { version: remoteVersion });
    } else {
      smbUpdLog("Kein Update (aktuell)");
      send("update:none");
    }
  } catch (e) {
    smbUpdLog("FEHLER: " + String(e?.message || e));
    send("update:error", { message: String(e?.message || e) });
  }
}

// Handler: Installer von der Freigabe STILL starten (/S = silent).
// Der Installer läuft ohne Fenster durch und startet die App danach
// automatisch neu (dank "runAfterFinish" in der nsis-Konfiguration).
ipcMain.handle("smbupdate:install", async () => {
  try {
    const installerPath = path.join(SMB_UPDATE_DIR, SMB_INSTALLER_NAME);
    smbUpdLog("Starte Installer STILL + Neustart: " + installerPath);
    // /S         = still (ohne Fenster)
    // --force-run = nach der Installation die App automatisch wieder starten
    // detached + unref: der Installer läuft eigenständig weiter,
    // auch wenn sich diese App gleich beendet.
    const child = spawn(installerPath, ["/S", "--force-run"], { detached: true, stdio: "ignore" });
    child.unref();
    // Etwas mehr Zeit lassen, damit der Installer sicher gestartet ist,
    // bevor sich die App beendet (sonst kann er die Dateien nicht ersetzen).
    setTimeout(() => app.quit(), 2000);
    return { ok: true };
  } catch (e) {
    smbUpdLog("Install-FEHLER: " + String(e?.message || e));
    return { ok: false, error: String(e?.message || e) };
  }
});

// ── Auto-Update (electron-updater) ─────────────────────────────────────
// Halb-Automatik: beim Start nach Updates suchen, dem Nutzer melden,
// er entscheidet über Download und Installation.
function setupAutoUpdater() {
  // Im Entwicklungsmodus (electron .) gibt es keine installierte Version
  // zum Aktualisieren – dann überspringen wir alles.
  if (!app.isPackaged) {
    console.log("[Update] Dev-Modus – Update-Suche übersprungen.");
    return;
  }

  // Wir wollen NICHT automatisch herunterladen (Halb-Automatik):
  // Erst fragen, dann auf Knopfdruck laden.
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  const send = (channel, payload) => {
    const wnd = win && !win.isDestroyed() ? win : BrowserWindow.getAllWindows()[0];
    if (wnd) wnd.webContents.send(channel, payload);
  };

  // Ereignis: Suche beginnt
  autoUpdater.on("checking-for-update", () => { updLog("checking-for-update"); send("update:checking"); });
  // Ereignis: eine neuere Version ist verfügbar
  autoUpdater.on("update-available", (info) => { updLog("update-available: " + info.version); send("update:available", { version: info.version }); });
  // Ereignis: keine neuere Version
  autoUpdater.on("update-not-available", (info) => { updLog("update-not-available (installiert ist aktuell). Info: " + JSON.stringify(info)); send("update:none"); });
  // Ereignis: Download-Fortschritt (für die Anzeige)
  autoUpdater.on("download-progress", (p) => send("update:progress", { percent: Math.round(p.percent) }));
  // Ereignis: Download fertig – bereit zum Installieren
  autoUpdater.on("update-downloaded", (info) => { updLog("update-downloaded: " + info.version); send("update:downloaded", { version: info.version }); });
  // Ereignis: Fehler (z. B. Freigabe nicht erreichbar)
  autoUpdater.on("error", (err) => { updLog("ERROR: " + String(err?.message || err)); send("update:error", { message: String(err?.message || err) }); });

  // DIAGNOSE: einfacher Datei-Logger (nur wenn UPDATE_DEBUG_LOG = true)
  const updLog = (msg) => {
    if (!UPDATE_DEBUG_LOG) return; // Logging aus
    try {
      const logPath = path.join(userDataDir, "update-debug.log");
      const line = `[${new Date().toISOString()}] ${msg}\n`;
      fs.appendFileSync(logPath, line);
    } catch {}
  };
  autoUpdater.logger = { info: updLog, warn: updLog, error: updLog, debug: updLog };
  updLog("=== Update-Suche gestartet ===");
  updLog("feedURL: " + JSON.stringify(autoUpdater.getFeedURL?.() || "unbekannt"));

  // Suche starten
  autoUpdater.checkForUpdates().catch((e) => {
    updLog("checkForUpdates FEHLER: " + String(e?.message || e));
    send("update:error", { message: String(e?.message || e) });
  });
}

// Handler: Download starten (nach Nutzer-Klick "Installieren")
ipcMain.handle("update:download", async () => {
  try { await autoUpdater.downloadUpdate(); return { ok: true }; }
  catch (e) { return { ok: false, error: String(e?.message || e) }; }
});

// Handler: App neu starten und Update installieren
ipcMain.handle("update:install", async () => {
  autoUpdater.quitAndInstall();
  return { ok: true };
});

// Handler: manuelle Suche (für später, z. B. ein "Nach Updates suchen"-Knopf)
ipcMain.handle("update:check", async () => {
  if (!app.isPackaged) return { ok: false, error: "dev" };
  try { await autoUpdater.checkForUpdates(); return { ok: true }; }
  catch (e) { return { ok: false, error: String(e?.message || e) }; }
});

// Standard-Tastenkombination für die Schnellsuche (an einer Stelle definiert).
const DEFAULT_QS_SHORTCUT = "CommandOrControl+Shift+Space";

// Registriert das globale Schnellsuche-Kürzel neu.
// Liest die Kombination aus den Einstellungen (oder Default).
// Gibt true zurück bei Erfolg, false wenn die Kombination nicht
// registriert werden konnte (z. B. schon von anderem Programm belegt).
function registerQuickSearchShortcut() {
  let accelerator = DEFAULT_QS_SHORTCUT;
  try {
    const s = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
    if (s && typeof s.quickSearchShortcut === "string" && s.quickSearchShortcut.trim()) {
      accelerator = s.quickSearchShortcut.trim();
    }
  } catch {}
  try {
    globalShortcut.unregisterAll(); // altes Kürzel abmelden (wichtig beim Ändern)
    const ok = globalShortcut.register(accelerator, () => {
      const wnd = win && !win.isDestroyed() ? win : BrowserWindow.getAllWindows()[0];
      if (!wnd) return;
      if (wnd.isMinimized()) wnd.restore();
      wnd.show();
      wnd.focus();
      wnd.webContents.send("quicksearch:open");
    });
    if (!ok) console.warn("[RDM] Globales Kürzel konnte nicht registriert werden (evtl. belegt):", accelerator);
    return ok;
  } catch (e) {
    console.warn("[RDM] globalShortcut-Fehler:", e.message);
    return false;
  }
}

// Schnellsuche-Kürzel neu registrieren (nach Änderung in den Einstellungen).
// Gibt { ok } zurück – ok=false, wenn die Kombination belegt/ungültig ist.
ipcMain.handle("shortcut:reregister", async () => {
  const ok = registerQuickSearchShortcut();
  return { ok };
});

// Beim Start: versuchen, mit dem gemerkten Passwort automatisch zu entsperren
ipcMain.handle("vault:tryAutoUnlock", async () => {
  try {
    const header = await readVaultHeader();
    if (!header) return { ok: false, reason: "no-vault" };
    const data = await readCredentials();
    if (!data.__vaultpw__) return { ok: false, reason: "not-remembered" };
    const pw  = dpapiDecrypt(data.__vaultpw__);
    const key = vault.unlockVault(pw, header);
    if (!key) return { ok: false, reason: "stale" }; // Passwort geändert? gemerktes ungültig
    vaultKey = key;
    return { ok: true };
  } catch (err) { return { ok: false, reason: "error", error: err.message }; }
});



// Safety net: serialport wirft bei Port-Close "BindingsError: Operation aborted"
// als unhandled Promise rejection (Race Condition zwischen close() und read()).
// Das würde den Electron-Prozess crashen – hier abfangen.
process.on("unhandledRejection", (reason) => {
  const msg = reason?.message || String(reason || "");
  if (/operation aborted|ReadIOCompletion|bindings.*error/i.test(msg)) return;
  console.error("[RDM] Unhandled rejection:", msg);
});
const webViews      = new Map();
const sshSessions   = new Map();
const rdpProcesses  = new Map();
const serialSessions = new Map(); // sessionId → SerialPort instance

/* ----------------------------------------
   Zertifikats-Handling: 10.0.0.0/8
---------------------------------------- */
function isIPv4In10Net(hostname) {
  if (!hostname) return false;
  const m = hostname.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  return m ? Number(m[1]) === 10 : false;
}

app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
  try {
    const u = new URL(url);
    if (u.protocol === "https:" && isIPv4In10Net(u.hostname)) {
      event.preventDefault(); return callback(true);
    }
    return callback(false);
  } catch { return callback(false); }
});

function sendWindowState() {
  if (!win || win.isDestroyed()) return;
  win.webContents.send("window-state", {
    isMaximized: win.isMaximized(), isMinimized: win.isMinimized(),
    isFullScreen: win.isFullScreen(), focused: win.isFocused(),
  });
}

/* ----------------------------------------
   JSON Store
---------------------------------------- */
const userDataDir  = app.getPath("userData");
const storePath    = path.join(userDataDir, "connections.json");        // lokaler Standardpfad
const cachePath     = path.join(userDataDir, "connections.cache.json"); // letzter bekannter Stand bei SMB-Ausfall
const settingsPath = path.join(userDataDir, "settings.json");
const credPath     = path.join(userDataDir, "credentials.json");
const MAX_DEPTH    = 4;

// Pfad beim Start loggen – hilft beim Debuggen wenn Daten "weg" sind
console.log("[RDM] userData:", userDataDir);
console.log("[RDM] connections.json:", storePath);

function ensureStore() {
  if (!fs.existsSync(storePath))
    fs.writeFileSync(storePath, JSON.stringify({ rev: 0, folders: [] }, null, 2), "utf-8");
}

function normalizeTree(folders) {
  (folders || []).forEach(f => {
    if (!Array.isArray(f.folders)) f.folders = [];
    if (!Array.isArray(f.items))   f.items   = [];
    normalizeTree(f.folders);
  });
}

// ── Datenquelle: Lokal oder Netzlaufwerk (SMB) ─────────────────────────────
// settings.json bleibt IMMER lokal – nur sie entscheidet, wo connections.json liegt.
async function getDataSourceConfig() {
  try {
    const s = JSON.parse(await fs.promises.readFile(settingsPath, "utf-8"));
    return {
      mode:      s.dataSource === "smb" ? "smb" : "local",
      smbPath:   typeof s.smbPath === "string" ? s.smbPath.trim() : "",
      writeMode: s.smbWriteMode === "readwrite" ? "readwrite" : "readonly", // sicherer Default
    };
  } catch {
    return { mode: "local", smbPath: "", writeMode: "readonly" };
  }
}

function effectivePath(cfg) {
  return (cfg.mode === "smb" && cfg.smbPath) ? cfg.smbPath : storePath;
}

async function readStore() {
  ensureStore();
  const cfg      = await getDataSourceConfig();
  const filePath = effectivePath(cfg);
  try {
    const data = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));
    if (!Array.isArray(data.folders)) data.folders = [];
    if (typeof data.rev !== "number") data.rev = 0;
    normalizeTree(data.folders);
    // Erfolgreich gelesen → als letzten bekannten Stand zwischenspeichern (nur relevant für SMB)
    if (cfg.mode === "smb") {
      fs.promises.writeFile(cachePath, JSON.stringify(data, null, 2), "utf-8").catch(() => {});
    }
    return data;
  } catch (err) {
    // Netzlaufwerk nicht erreichbar (VPN aus, Laptop offline, Pfad falsch) →
    // letzten bekannten Stand aus dem lokalen Cache zeigen statt leerer Liste.
    if (cfg.mode === "smb") {
      try {
        const cached = JSON.parse(await fs.promises.readFile(cachePath, "utf-8"));
        if (!Array.isArray(cached.folders)) cached.folders = [];
        normalizeTree(cached.folders);
        return { ...cached, __offline: true };
      } catch {}
    }
    return { rev: 0, folders: [] };
  }
}

async function writeStore(data, expectedRev) {
  const cfg = await getDataSourceConfig();
  if (cfg.mode === "smb" && cfg.writeMode !== "readwrite") {
    throw new Error(t("errReadOnly"));
  }
  const filePath = effectivePath(cfg);

  // Optimistic Concurrency: vor dem Schreiben prüfen ob zwischenzeitlich
  // jemand anderes gespeichert hat (Revisionsnummer verglichen, kein Zeitstempel).
  if (typeof expectedRev === "number") {
    let onDiskRev = 0;
    try {
      const onDisk = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));
      onDiskRev = onDisk.rev || 0;
    } catch {}
    if (onDiskRev !== expectedRev) {
      throw new Error(t("errConflict"));
    }
  }

  data.rev = (expectedRev ?? data.rev ?? 0) + 1;

  // Atomarer Schreibvorgang: erst temporäre Datei, dann umbenennen.
  // Verhindert eine halb geschriebene/kaputte Datei bei Netzwerkabbruch.
  const tmpPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  await fs.promises.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.promises.rename(tmpPath, filePath);

  if (cfg.mode === "smb") {
    fs.promises.writeFile(cachePath, JSON.stringify(data, null, 2), "utf-8").catch(() => {});
  }
}

function findFolderById(folders, id, depth = 1, parent = null) {
  if (!Array.isArray(folders)) return null;
  for (const f of folders) {
    if (f.id === id) return { folder: f, parent, depth };
    const found = findFolderById(f.folders || [], id, depth + 1, f);
    if (found) return found;
  }
  return null;
}

function removeFolderFromParent(rootFolders, folderId) {
  function rec(list) {
    const idx = list.findIndex(x => x.id === folderId);
    if (idx >= 0) { list.splice(idx, 1); return true; }
    for (const f of list) { if (rec(f.folders || [])) return true; }
    return false;
  }
  return rec(rootFolders);
}

function folderContainsId(folder, candidateId) {
  if (!folder || !Array.isArray(folder.folders)) return false;
  for (const f of folder.folders) {
    if (f.id === candidateId || folderContainsId(f, candidateId)) return true;
  }
  return false;
}

function computeSubtreeDepth(folder) {
  if (!folder || !Array.isArray(folder.folders) || !folder.folders.length) return 1;
  let max = 0;
  for (const f of folder.folders) max = Math.max(max, computeSubtreeDepth(f));
  return 1 + max;
}

function extractFolder(rootFolders, folderId) {
  function rec(list) {
    const idx = list.findIndex(x => x.id === folderId);
    if (idx >= 0) { const [r] = list.splice(idx, 1); return r; }
    for (const f of list) { const r = rec(f.folders || []); if (r) return r; }
    return null;
  }
  return rec(rootFolders);
}

/* ----------------------------------------
   BrowserWindow
---------------------------------------- */
function createWindow() {
  // Beim Windows-Autostart (--hidden) direkt unsichtbar ins Tray starten
  const startHidden = process.argv.includes("--hidden") && trayEnabled();
  win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
    show: !startHidden,
    frame: false, autoHideMenuBar: true, backgroundColor: "#1e1e1e",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, nodeIntegration: false, sandbox: true
    },
  });
  win.loadFile("index.html");
  win.on("maximize",   sendWindowState);
  win.on("unmaximize", sendWindowState);
  win.on("minimize",   sendWindowState);
  win.on("restore",    sendWindowState);
  win.on("focus",      sendWindowState);
  win.on("blur",       sendWindowState);
  // Alt+F4 / Schließen: im Tray-Modus nur verstecken, nicht beenden
  win.on("close", (e) => {
    if (!isQuitting && trayEnabled()) { e.preventDefault(); hideToTray(); }
  });
}

// Muss mit build.appId in package.json übereinstimmen, sonst zeigt Windows
// in Benachrichtigungen die rohe Kennung statt "Remote Connection Manager".
app.setAppUserModelId("com.firma.rcm");

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    showMainWindow(); // holt das Fenster auch aus dem Tray zurück
  });

  app.whenReady().then(() => {
    session.defaultSession.setCertificateVerifyProc((req, cb) => {
      cb(isIPv4In10Net(req.hostname) ? 0 : -3);
    });
    createWindow();

    // Tray-Icon + Autostart gemäß Einstellungen
    applyTraySettings();

    // Globales Kürzel für die Schnellsuche (Command-Palette).
    // Kombination kommt aus den Einstellungen; Standard: Strg+Umschalt+Leertaste.
    registerQuickSearchShortcut();

    // Auto-Update über electron-updater: STILLGELEGT, weil es nur http/https
    // unterstützt, nicht file:// (SMB). Bleibt für späteren Webserver erhalten.
    // Zum Reaktivieren (wenn Webserver da ist): nächste Zeile einkommentieren
    // und den SMB-Mechanismus darunter deaktivieren.
    // setupAutoUpdater();

    // Auto-Update über SMB-Freigabe (aktiver Weg):
    // WICHTIG: erst starten, wenn das Fenster fertig geladen hat, sonst
    // verpufft die "update:available"-Nachricht, bevor das Banner lauscht.
    if (win && win.webContents) {
      win.webContents.once("did-finish-load", () => {
        // kleiner Puffer, damit das Banner (initUpdateBanner) sicher registriert ist
        setTimeout(() => checkSmbUpdate(), 800);
      });
    }
  });
  // Jedes echte Beenden (Tray-Menü, Auto-Update, Windows-Abmeldung) markieren,
  // damit der close-Handler das Fenster nicht nur ins Tray schickt.
  app.on("before-quit", () => { isQuitting = true; });
  app.on("will-quit", () => { try { globalShortcut.unregisterAll(); } catch {} });
  app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
  app.on("activate", () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
}

/* ----------------------------------------
   IPC: Window Controls
---------------------------------------- */
ipcMain.on("window-minimize", () => { if (win) win.minimize(); });
ipcMain.on("window-maximize", () => {
  if (!win) return;
  if (win.isMaximized()) win.unmaximize(); else win.maximize();
  sendWindowState();
});
ipcMain.on("window-close", () => {
  if (!win || isCleaningUp) return;
  // Tray-Modus: Fenster nur verstecken, RCM läuft weiter (Kürzel bleibt aktiv)
  if (trayEnabled()) { hideToTray(); return; }
  shutdownAndQuit();
});

/* ----------------------------------------
   IPC: Clipboard
---------------------------------------- */
ipcMain.handle("clipboard:read",  ()        => clipboard.readText());
ipcMain.handle("clipboard:write", (_, text) => clipboard.writeText(text));

/* ----------------------------------------
   IPC: Settings (settings.json)
---------------------------------------- */
ipcMain.handle("settings:load", async () => {
  try { return JSON.parse(await fs.promises.readFile(settingsPath, "utf-8")); }
  catch { return {}; }
});
ipcMain.handle("settings:save", async (_e, settings) => {
  await fs.promises.writeFile(settingsPath, JSON.stringify(settings, null, 2), "utf-8");
  return { ok: true };
});

/* ----------------------------------------
   Tray / Hintergrundbetrieb
   - X versteckt das Fenster ins Tray (abschaltbar: settings.trayMode=false)
   - Schnellsuche-Kürzel funktioniert weiter, solange RCM im Tray läuft
   - optional Autostart mit Windows (settings.autostart, startet versteckt)
---------------------------------------- */
let tray = null;
let isQuitting = false;   // true = wirklich beenden (nicht nur ins Tray)

function readSettingsSync() {
  try { return JSON.parse(fs.readFileSync(settingsPath, "utf-8")) || {}; } catch { return {}; }
}
function trayEnabled() { return readSettingsSync().trayMode !== false; } // Standard: an

// ── Übersetzungen im Main-Prozess ───────────────────────────────────────
// Gleiche Sprachdateien wie im Renderer (locales/*.json), gleiche t()-Logik.
// Eine Sprachänderung wirkt ohnehin erst nach dem Neustart, daher reicht der Cache.
function currentLang() {
  const lang = readSettingsSync().language;
  if (lang) return lang;
  return app.getLocale().startsWith("de") ? "de" : "en";
}

const _localeCache = {};
function loadLocale(lang) {
  if (_localeCache[lang]) return _localeCache[lang];
  const tryLoad = (file) => {
    try { return JSON.parse(fs.readFileSync(file, "utf-8")); } catch { return null; }
  };
  const data =
    tryLoad(path.join(__dirname, "locales", `${lang}.json`)) ||
    tryLoad(path.join(path.dirname(process.execPath), "locales", `${lang}.json`));
  if (data) _localeCache[lang] = data;
  return data || {};
}

function t(key, ...args) {
  let s = loadLocale(currentLang())[key] ?? loadLocale("de")[key] ?? key;
  args.forEach((a, i) => { s = s.replace(`{${i}}`, () => String(a)); });
  return s;
}

function showMainWindow({ quickSearch = false } = {}) {
  if (!win || win.isDestroyed()) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
  if (quickSearch) win.webContents.send("quicksearch:open");
}

function hideToTray() {
  if (!win || win.isDestroyed()) return;
  win.hide();
  // Beim allerersten Mal kurz erklären, dass RCM weiterläuft
  // Im Entwicklungsmodus jedes Mal zeigen (zum Testen), sonst nur einmal.
  const s = readSettingsSync();
  if ((IS_DEV || !s.trayHintShown) && tray) {
    try {
      tray.displayBalloon({ title: "Remote Connection Manager", content: t("trayHint"), iconType: "info" });
      if (!IS_DEV) {
        s.trayHintShown = true;
        fs.writeFileSync(settingsPath, JSON.stringify(s, null, 2), "utf-8");
      }
    } catch {}
  }
}

function buildTrayMenu() {
  return Menu.buildFromTemplate([
    ...(IS_DEV ? [{ label: t("trayDevMode"), enabled: false }, { type: "separator" }] : []),
    { label: t("trayOpen"),        click: () => showMainWindow() },
    { label: t("trayQuickSearch"), click: () => showMainWindow({ quickSearch: true }) },
    { type: "separator" },
    { label: t("trayQuit"),        click: () => shutdownAndQuit() },
  ]);
}

function applyTraySettings() {
  const s = readSettingsSync();
  // Tray-Icon erstellen oder entfernen
  if (s.trayMode !== false) {
    if (!tray) {
      try {
        tray = new Tray(path.join(__dirname, "assets", "icon.ico"));
        tray.setToolTip("Remote Connection Manager" + (IS_DEV ? " [DEV]" : ""));
        tray.on("click", () => showMainWindow());
        tray.on("double-click", () => showMainWindow());
      } catch (e) { console.warn("[Tray] konnte nicht erstellt werden:", e.message); tray = null; }
    }
    if (tray) tray.setContextMenu(buildTrayMenu()); // auch nach Sprachwechsel aktuell
  } else if (tray) {
    tray.destroy();
    tray = null;
  }
  // Autostart mit Windows – nur in der gebauten App (sonst würde sich
  // bei "npm start" die Entwickler-Version in den Autostart eintragen)
  if (app.isPackaged) {
    try { app.setLoginItemSettings({ openAtLogin: !!s.autostart, args: ["--hidden"] }); } catch {}
  }
  return { ok: true };
}

// Wirklich beenden: Sitzungen sauber schließen, dann App beenden
function shutdownAndQuit() {
  if (isCleaningUp) return;
  isCleaningUp = true;
  isQuitting = true;
  if (win && !win.isDestroyed()) {
    win.hide();
    for (const [, view] of webViews) {
      try { win.contentView.removeChildView(view); view.webContents.destroy(); } catch {}
    }
  }
  webViews.clear();
  for (const [, { client, jumpClient }] of sshSessions) { try { client.end(); } catch {} try { jumpClient?.end(); } catch {} }
  sshSessions.clear();
  for (const [, sess] of serialSessions) {
    try {
      sess.closing = true;
      sess.port.removeAllListeners();
      sess.port.on("error", () => {});
      sess.port.destroy();
    } catch {}
  }
  serialSessions.clear();
  rdpProcesses.clear();
  if (tray) { try { tray.destroy(); } catch {} tray = null; }
  if (win && !win.isDestroyed()) win.destroy();
  app.quit();
}

// Einstellungen aus der Oberfläche übernehmen (Tray an/aus, Autostart)
ipcMain.handle("tray:apply", async () => applyTraySettings());

/* ----------------------------------------
   IPC: Dialog
---------------------------------------- */
ipcMain.handle("dialog:openFile", async (_e, { filters } = {}) => {
  const wnd = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  const result = await dialog.showOpenDialog(wnd, {
    properties: ["openFile"],
    filters: filters || [{ name: t("dlgAllFiles"), extensions: ["*"] }],
  });
  if (result.canceled || !result.filePaths.length) return null;
  const content = await fs.promises.readFile(result.filePaths[0], "utf-8");
  return { filePath: result.filePaths[0], content };
});

ipcMain.handle("dialog:saveFile", async (_e, { defaultName, content } = {}) => {
  const wnd = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  const result = await dialog.showSaveDialog(wnd, {
    defaultPath: defaultName || "backup.json",
    filters: [{ name: "JSON", extensions: ["json"] }],
  });
  if (result.canceled) return null;
  await fs.promises.writeFile(result.filePath, content, "utf-8");
  return { filePath: result.filePath };
});

/* ----------------------------------------
   IPC: Datenquelle (Pfadauswahl für SMB)
---------------------------------------- */
// Vorhandene connections.json auswählen – Öffnen-Dialog (nie Überschreiben-Warnung)
ipcMain.handle("datasource:pickExisting", async () => {
  const wnd = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  const result = await dialog.showOpenDialog(wnd, {
    title: t("dlgPickExisting"),
    filters: [{ name: "JSON", extensions: ["json"] }],
    properties: ["openFile", "dontAddToRecent"],
  });
  if (result.canceled || !result.filePaths?.[0]) return null;
  return { filePath: result.filePaths[0] };
});

// Ordner für eine NEUE connections.json wählen – Ordner-Dialog (keine Überschreiben-Warnung).
// Legt die Datei NICHT an; das übernimmt datasource:createFile nach Rückfrage.
ipcMain.handle("datasource:pickNewFolder", async () => {
  const wnd = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  const result = await dialog.showOpenDialog(wnd, {
    title: t("dlgPickNewFolder"),
    properties: ["openDirectory", "createDirectory", "dontAddToRecent"],
  });
  if (result.canceled || !result.filePaths?.[0]) return null;
  return { filePath: path.join(result.filePaths[0], "connections.json") };
});

// Prüfen ob unter dem Pfad eine gültige connections.json liegt
ipcMain.handle("datasource:checkPath", async (_e, { filePath } = {}) => {
  if (!filePath) return { exists: false, valid: false };
  try {
    const raw = await fs.promises.readFile(filePath, "utf-8");
    JSON.parse(raw); // muss parsebar sein
    return { exists: true, valid: true };
  } catch (err) {
    // Datei existiert nicht ODER ist kein gültiges JSON
    const exists = fs.existsSync(filePath);
    return { exists, valid: false };
  }
});

// Leere Store-Struktur an einem Pfad anlegen
ipcMain.handle("datasource:createFile", async (_e, { filePath } = {}) => {
  if (!filePath) throw new Error(t("errNoPath"));
  const dir = path.dirname(filePath);
  await fs.promises.mkdir(dir, { recursive: true });
  await fs.promises.writeFile(filePath, JSON.stringify({ rev: 0, folders: [] }, null, 2), "utf-8");
  return { ok: true };
});

/* ----------------------------------------
   IPC: Store
---------------------------------------- */
// Gibt die aktuelle App-Version zurück (für den Über-Bereich).
// Teilt der Oberfläche mit, ob der Entwicklungsmodus aktiv ist (für DEV-Abzeichen)
ipcMain.handle("app:isDev", async () => IS_DEV);

ipcMain.handle("app:getVersion", async () => {
  return app.getVersion();
});

ipcMain.handle("store:openFolder", async () => {
  // Öffnet den Ordner der AKTIVEN Datenquelle (SMB-Share oder lokal),
  // nicht mehr fest den lokalen Pfad.
  const cfg = await getDataSourceConfig();
  const activePath = effectivePath(cfg);
  await shell.openPath(path.dirname(activePath));
  return { ok: true };
});
ipcMain.handle("store:load", async () => readStore());

ipcMain.handle("store:createFolder", async (_e, { name, parentId }) => {
  if (!name?.trim()) throw new Error(t("errFolderNameMissing"));
  const data      = await readStore();
  const newFolder = { id: "f-" + randomUUID(), name: name.trim(), open: true, items: [], folders: [] };
  if (parentId) {
    const info = findFolderById(data.folders, parentId);
    if (!info) throw new Error(t("errTargetFolderNotFound"));
    if (info.depth >= MAX_DEPTH) throw new Error(t("errMaxDepthReached", MAX_DEPTH));
    info.folder.folders.push(newFolder);
  } else {
    data.folders.push(newFolder);
  }
  await writeStore(data, data.rev);
  return { ok: true, folderId: newFolder.id, data };
});

ipcMain.handle("store:renameFolder", async (_e, { folderId, name }) => {
  if (!folderId || !name?.trim()) throw new Error(t("errParamMissing"));
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (!info) throw new Error(t("errFolderNotFound"));
  info.folder.name = name.trim();
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:deleteFolder", async (_e, { folderId }) => {
  const data = await readStore();
  if (!removeFolderFromParent(data.folders, folderId)) throw new Error(t("errFolderNotFound"));
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:setFolderOpen", async (_e, { folderId, open }) => {
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (info) { info.folder.open = !!open; await writeStore(data, data.rev); }
  return { ok: true, data };
});

ipcMain.handle("store:createConnection", async (_e, { folderId, type, name, host, port, url, profile, username, comPort, baudRate, dataBits, parity, stopBits, authType, keyPath, jumpHost, jumpPort, jumpUsername, jumpKeyPath }) => {
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (!info) throw new Error(t("errTargetFolderNotFound"));
  const id = "c-" + randomUUID();
  let conn;
  if (type === "web") {
    if (!url?.trim()) throw new Error(t("errUrlRequired"));
    conn = { id, type: "web", name: (name || url).trim(), url: url.trim() };
  } else if (type === "ssh") {
    if (!host?.trim())     throw new Error(t("errHostRequired"));
    if (!username?.trim()) throw new Error(t("errUsernameRequired"));
    conn = { id, type: "ssh", name: (name || host).trim(), host: host.trim(), port: port ? Number(port) : 22, username: username.trim() };
    if (authType === "key" && typeof keyPath === "string" && keyPath.trim()) {
      conn.authType = "key";
      conn.keyPath  = keyPath.trim();
    }
    // Jumphost (optional) – immer per Key
    if (typeof jumpHost === "string" && jumpHost.trim()) {
      conn.jump = {
        host: jumpHost.trim(),
        port: jumpPort ? Number(jumpPort) : 22,
        username: (jumpUsername || "").trim(),
        keyPath: (jumpKeyPath || "").trim(),
      };
    }
  } else if (type === "serial") {
    if (!comPort) throw new Error(t("errComPortRequired"));
    conn = { id, type: "serial", name: (name || comPort).trim(), comPort,
             baudRate: Number(baudRate) || 9600, dataBits: Number(dataBits) || 8,
             parity: parity || "none", stopBits: Number(stopBits) || 1 };
  } else {
    if (!host?.trim()) throw new Error(t("errHostRequired"));
    conn = { id, type: "rdp", name: (name || host).trim(), host: host.trim(), port: port ? Number(port) : undefined };
    if (profile && typeof profile === "object") conn.profile = profile;
  }
  info.folder.items.push(conn);
  await writeStore(data, data.rev);
  return { ok: true, connId: id, data };
});

ipcMain.handle("store:updateConnection", async (_e, { folderId, connectionId, name, host, port, profile, url, username, comPort, baudRate, dataBits, parity, stopBits, notes, authType, keyPath, jumpHost, jumpPort, jumpUsername, jumpKeyPath, sharedPassword }) => {
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (!info) throw new Error(t("errFolderNotFound"));
  const conn = (info.folder.items || []).find(c => c.id === connectionId);
  if (!conn) throw new Error(t("errConnNotFound"));
  if (typeof name === "string") conn.name = name.trim() || conn.name;
  if (conn.type === "web") {
    if (typeof url === "string" && url.trim()) conn.url = url.trim();
  } else if (conn.type === "ssh") {
    if (typeof host     === "string" && host.trim())     conn.host     = host.trim();
    if (typeof username === "string" && username.trim()) conn.username = username.trim();
    if (port != null && port !== "") {
      const p = Number(port); if (!Number.isFinite(p) || p <= 0 || p > 65535) throw new Error(t("errPortInvalid"));
      conn.port = p;
    }
    if (authType === "key" || authType === "password") conn.authType = authType;
    if (typeof keyPath === "string") conn.keyPath = keyPath.trim();
    // Jumphost aktualisieren: gesetzt → speichern, leer → entfernen
    if (jumpHost !== undefined) {
      if (typeof jumpHost === "string" && jumpHost.trim()) {
        conn.jump = {
          host: jumpHost.trim(),
          port: jumpPort ? Number(jumpPort) : 22,
          username: (jumpUsername || "").trim(),
          keyPath: (jumpKeyPath || "").trim(),
        };
      } else {
        delete conn.jump;
      }
    }
  } else if (conn.type === "serial") {
    if (comPort)  conn.comPort  = comPort;
    if (baudRate) conn.baudRate = Number(baudRate);
    if (dataBits) conn.dataBits = Number(dataBits);
    if (parity)   conn.parity   = parity;
    if (stopBits) conn.stopBits = Number(stopBits);
  } else {
    if (typeof host === "string") conn.host = host.trim() || conn.host;
    if (port != null && port !== "") {
      const p = Number(port); if (!Number.isFinite(p) || p <= 0 || p > 65535) throw new Error(t("errPortInvalid"));
      conn.port = p;
    } else if (port === "") { delete conn.port; }
    if (profile && typeof profile === "object") conn.profile = Object.assign({}, conn.profile || {}, profile);
  }
  if (typeof notes === "string") conn.notes = notes.trim();
  // Geteiltes (Vault-verschlüsseltes) Passwort: leerer String → entfernen
  if (typeof sharedPassword === "string") {
    if (sharedPassword) conn.sharedPassword = sharedPassword;
    else delete conn.sharedPassword;
  }
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:deleteConnection", async (_e, { folderId, connectionId }) => {
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (!info) throw new Error(t("errFolderNotFound"));
  const i = (info.folder.items || []).findIndex(c => c.id === connectionId);
  if (i === -1) throw new Error(t("errConnNotFound"));
  info.folder.items.splice(i, 1);
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:moveConnection", async (_e, { sourceFolderId, connectionId, targetFolderId, targetIndex }) => {
  const data = await readStore();
  const src  = findFolderById(data.folders, sourceFolderId);
  const dst  = findFolderById(data.folders, targetFolderId);
  if (!src || !dst) throw new Error(t("errFolderNotFound"));
  const idx = (src.folder.items || []).findIndex(c => c.id === connectionId);
  if (idx === -1) throw new Error(t("errConnNotFound"));
  const [conn] = src.folder.items.splice(idx, 1);
  if (!dst.folder.items) dst.folder.items = [];
  // Wenn eine Zielposition angegeben ist: dort einfügen, sonst ans Ende.
  if (typeof targetIndex === "number" && targetIndex >= 0 && targetIndex <= dst.folder.items.length) {
    dst.folder.items.splice(targetIndex, 0, conn);
  } else {
    dst.folder.items.push(conn);
  }
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:moveFolder", async (_e, { folderId, targetFolderId, targetIndex }) => {
  const data    = await readStore();
  const srcInfo = findFolderById(data.folders, folderId);
  if (!srcInfo) throw new Error(t("errSourceFolderNotFound"));
  let dstInfo = null;
  if (targetFolderId) {
    dstInfo = findFolderById(data.folders, targetFolderId);
    if (!dstInfo) throw new Error(t("errTargetFolderNotFound"));
    if (folderId === targetFolderId || folderContainsId(srcInfo.folder, targetFolderId))
      throw new Error(t("errInvalidTargetCycle"));
    if (dstInfo.depth + computeSubtreeDepth(srcInfo.folder) > MAX_DEPTH)
      throw new Error(t("errMaxDepthExceeded", MAX_DEPTH));
  }
  const moved = extractFolder(data.folders, folderId);
  if (!moved) throw new Error(t("errFolderRemoveFailed"));
  // Ziel-Liste: entweder oberste Ebene oder die Kinder des Zielordners
  const targetList = targetFolderId ? dstInfo.folder.folders : data.folders;
  if (!Array.isArray(targetList)) throw new Error(t("errTargetListInvalid"));
  if (typeof targetIndex === "number" && targetIndex >= 0 && targetIndex <= targetList.length) {
    targetList.splice(targetIndex, 0, moved);
  } else {
    targetList.push(moved);
  }
  await writeStore(data, data.rev);
  return { ok: true, data };
});

/* ----------------------------------------
   RDP: .rdp-Datei bauen
   authentication level:i:0 → kein Zertifikats-Dialog
   Datei wird 5 Sek. nach Start gelöscht (mstsc hat sie dann gelesen).
   Der "Unbekannter Herausgeber"-Dialog tritt nur auf wenn der Nutzer
   die Datei manuell öffnet – als Argument an mstsc.exe erscheint er nicht.
---------------------------------------- */
function sanitizeRdpValue(v) { return String(v ?? "").replace(/[\r\n]/g, ""); }

function buildRdpProfile(opts) {
  const {
    host, port, username,
    fullscreen   = true,
    multimon     = false,
    width,       height,
    colorDepth   = 32,
    admin        = false,
    clipboard:cb = true,
    printers     = false,
    drives       = "",
    gateway,
  } = opts;

  const lines = [];
  const addr  = port ? `${sanitizeRdpValue(host)}:${port}` : sanitizeRdpValue(host);

  lines.push(`full address:s:${addr}`);
  lines.push(`prompt for credentials on client:i:1`);
  lines.push(`authentication level:i:0`);        // ✅ Zertifikats-Dialog unterdrücken
  lines.push(`enablecredsspsupport:i:1`);

  if (username) lines.push(`username:s:${sanitizeRdpValue(username)}`);

  lines.push(`screen mode id:i:${fullscreen ? 2 : 1}`);
  if (!fullscreen && width && height) {
    lines.push(`desktopwidth:i:${width}`);
    lines.push(`desktopheight:i:${height}`);
  }
  if (multimon) lines.push(`use multimon:i:1`);

  lines.push(`session bpp:i:${colorDepth}`);
  lines.push(`redirectclipboard:i:${cb ? 1 : 0}`);
  lines.push(`redirectprinters:i:${printers ? 1 : 0}`);
  lines.push(`drivestoredirect:s:${sanitizeRdpValue(drives ?? "")}`);

  lines.push(`disable wallpaper:i:1`);
  lines.push(`disable full window drag:i:1`);
  lines.push(`disable menu anims:i:1`);
  lines.push(`connection type:i:2`);
  lines.push(`administrative session:i:${admin ? 1 : 0}`);

  if (gateway?.host) {
    lines.push(`gatewayhostname:s:${sanitizeRdpValue(gateway.host)}`);
    lines.push(`gatewayusagemethod:i:${Number.isFinite(gateway.usage) ? gateway.usage : 2}`);
    lines.push(`gatewayprofileusagemethod:i:1`);
  }

  return lines.join("\r\n") + "\r\n";
}

/* ----------------------------------------
   IPC: RDP
---------------------------------------- */
ipcMain.handle("rdp:launch", (_e, { tabId, host, port, fullscreen, multimon, width, height, admin, username, password, clipboard, printers, drives, colorDepth, gateway }) => {
  if (process.platform !== "win32") return { ok: false, error: t("errWindowsOnly") };
  if (!host) return { ok: false, error: t("errHostRequired") };
  try {
    // Registry: Zertifikatswarnung unterdrücken (AuthenticationLevelOverride)
    try {
      execSync(
        'reg add "HKCU\\Software\\Microsoft\\Terminal Server Client" /v AuthenticationLevelOverride /t REG_DWORD /d 0 /f',
        { stdio: "ignore", timeout: 3000, windowsHide: true }
      );
    } catch {}

    // Passwort temporär in Windows Credential Manager hinterlegen
    // → mstsc meldet sich automatisch an (kein Passwort-Dialog)
    // → Eintrag wird nach dem Verbinden wieder gelöscht
    const credTarget = `TERMSRV/${host}${port && Number(port) !== 3389 ? ":" + port : ""}`;
    if (username && password) {
      // spawnSync: kein Shell-Aufruf → Sonderzeichen im Passwort sicher
      try {
        spawnSync("cmdkey", [
          `/generic:${credTarget}`,
          `/user:${username}`,
          `/pass:${password}`,
        ], { windowsHide: true, timeout: 5000 });
      } catch {}
    }

    const needsRdpFile = !!(gateway?.host) || !!(drives?.trim()) || !!printers;

    const onClose = () => {
      rdpProcesses.delete(tabId);
      if (username && password) {
        try { spawnSync("cmdkey", [`/delete:${credTarget}`], { windowsHide: true, timeout: 3000 }); } catch {}
      }
      if (win && !win.isDestroyed()) win.webContents.send("rdp:closed", { tabId });
    };

    if (!needsRdpFile) {
      const addr = port && Number(port) !== 3389 ? `${host}:${port}` : host;
      const args = [`/v:${addr}`];
      if (multimon)                  args.push("/multimon");
      else if (fullscreen !== false) args.push("/f");
      else if (width && height)      args.push(`/w:${width}`, `/h:${height}`);
      if (admin) args.push("/admin");
      const child = spawn("mstsc.exe", args, { detached: true, stdio: "ignore" });
      rdpProcesses.set(tabId, { pid: child.pid, process: child });
      child.on("close", onClose);
      return { ok: true, pid: child.pid };
    }

    const rdpText  = buildRdpProfile({
      host, port, username, fullscreen, multimon, width, height,
      admin, clipboard: clipboard !== false, printers, drives, colorDepth, gateway
    });
    const filePath = path.join(os.tmpdir(), `rcm-${Date.now()}.rdp`);
    fs.writeFileSync(filePath, rdpText, "utf-8");
    const child = spawn("mstsc.exe", [filePath], { detached: true, stdio: "ignore" });
    rdpProcesses.set(tabId, { pid: child.pid, process: child });
    setTimeout(() => { try { fs.unlinkSync(filePath); } catch {} }, 5_000);
    child.on("close", onClose);
    return { ok: true, pid: child.pid };
  } catch (err) { return { ok: false, error: err.message }; }
});

ipcMain.handle("rdp:focus", (_e, { tabId }) => {
  const session = rdpProcesses.get(tabId);
  if (!session) return { ok: false };
  const pid  = session.pid;
  const defs =
    '[DllImport("user32.dll")] public static extern bool AttachThreadInput(uint a, uint b, bool f); ' +
    '[DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(System.IntPtr h, out uint p); ' +
    '[DllImport("kernel32.dll")] public static extern uint GetCurrentThreadId(); ' +
    '[DllImport("user32.dll")] public static extern bool SetForegroundWindow(System.IntPtr h); ' +
    '[DllImport("user32.dll")] public static extern bool ShowWindow(System.IntPtr h, int n); ' +
    '[DllImport("user32.dll")] public static extern System.IntPtr GetForegroundWindow();';
  const ps = [
    `Add-Type -MemberDefinition '${defs}' -Name WF -Namespace RDM -ErrorAction SilentlyContinue`,
    `$p = Get-Process -Id ${pid} -ErrorAction SilentlyContinue`,
    `if (-not $p -or $p.MainWindowHandle -eq [IntPtr]::Zero) {`,
    `  $p = Get-Process mstsc -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne [IntPtr]::Zero } | Sort-Object StartTime -Descending | Select-Object -First 1`,
    `}`,
    `if ($p -and $p.MainWindowHandle -ne [IntPtr]::Zero) {`,
    `  $hwnd = $p.MainWindowHandle`,
    `  [RDM.WF]::ShowWindow($hwnd, 9)`,
    `  $fg = [RDM.WF]::GetForegroundWindow()`,
    `  $dummy = [uint]0`,
    `  $fgTid = [RDM.WF]::GetWindowThreadProcessId($fg, [ref]$dummy)`,
    `  $myTid = [RDM.WF]::GetCurrentThreadId()`,
    `  if ($fgTid -ne $myTid) { [RDM.WF]::AttachThreadInput($myTid, $fgTid, $true) }`,
    `  [RDM.WF]::SetForegroundWindow($hwnd)`,
    `  if ($fgTid -ne $myTid) { [RDM.WF]::AttachThreadInput($myTid, $fgTid, $false) }`,
    `}`,
  ].join("\r\n");
  const scriptPath = path.join(os.tmpdir(), `rcm-focus-${Date.now()}.ps1`);
  try {
    fs.writeFileSync(scriptPath, ps, "utf-8");
    spawn("powershell", ["-NoProfile", "-NonInteractive", "-WindowStyle", "Hidden", "-ExecutionPolicy", "Bypass", "-File", scriptPath], { stdio: "ignore" }).unref();
    setTimeout(() => { try { fs.unlinkSync(scriptPath); } catch {} }, 10_000);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

ipcMain.handle("rdp:close", (_e, { tabId }) => {
  const session = rdpProcesses.get(tabId);
  if (session) { try { session.process.kill(); } catch {} rdpProcesses.delete(tabId); }
  return { ok: true };
});

/* ----------------------------------------
   IPC: Serial (Konsolenkabel)
---------------------------------------- */
ipcMain.handle("serial:listPorts", async () => {
  if (!SerialPortClass) return {
    ok: false,
    error: t("errSerialUnavailable"),
    ports: []
  };
  try {
    const list = await SerialPortClass.list();
    const ports = list.map(p => ({
      path:         p.path,
      friendlyName: p.friendlyName || p.manufacturer || "",
      manufacturer: p.manufacturer || "",
    }));
    return { ok: true, ports };
  } catch (err) { return { ok: false, error: err.message, ports: [] }; }
});

ipcMain.handle("serial:connect", (_e, { sessionId, path, baudRate, dataBits, parity, stopBits }) => {
  return new Promise((resolve) => {
    if (!SerialPortClass) { resolve({ ok: false, error: t("errSerialNotInstalled") }); return; }

    // Alten Session sauber schließen
    const oldSess = serialSessions.get(sessionId);
    if (oldSess) { oldSess.closing = true; try { oldSess.port.close(); } catch {} serialSessions.delete(sessionId); }

    const port = new SerialPortClass({
      path, baudRate: baudRate || 9600, dataBits: dataBits || 8,
      parity: parity || "none", stopBits: stopBits || 1, autoOpen: false,
    });

    // Session-Objekt mit closing-Flag – verhindert dass intentionales close
    // als unerwartete Trennung an den Renderer gemeldet wird
    const session = { port, closing: false };

    port.open((err) => {
      if (err) { resolve({ ok: false, error: err.message }); return; }
      serialSessions.set(sessionId, session);

      port.on("data", (data) => {
        if (win && !win.isDestroyed())
          win.webContents.send("serial:data", { sessionId, data: Buffer.from(data).toString("base64") });
      });

      port.on("close", () => {
        serialSessions.delete(sessionId);
        // Nur melden wenn NICHT absichtlich geschlossen (kein doppeltes closed-Event)
        if (!session.closing && win && !win.isDestroyed())
          win.webContents.send("serial:closed", { sessionId });
      });

      // ✅ FIX: BindingsError "Operation aborted" tritt auf wenn der Port während
      // eines laufenden Read-Vorgangs geschlossen wird (Windows-Verhalten).
      // Wenn closing=true ist das erwartet – einfach ignorieren.
      port.on("error", (e) => {
        const isAbort = /operation aborted|aborted/i.test(e.message || "");
        if (session.closing && isAbort) return; // erwartet, kein Fehler
        serialSessions.delete(sessionId);
        try { port.close(); } catch {}
        if (win && !win.isDestroyed())
          win.webContents.send("serial:closed", { sessionId });
      });

      resolve({ ok: true });
    });
  });
});

ipcMain.handle("serial:send", (_e, { sessionId, data }) => {
  const session = serialSessions.get(sessionId);
  if (!session) return { ok: false };
  session.port.write(Buffer.from(data), (err) => {
    if (err && !session.closing) console.error("serial write:", err.message);
  });
  return { ok: true };
});

ipcMain.handle("serial:close", (_e, { sessionId }) => {
  const session = serialSessions.get(sessionId);
  if (session) {
    session.closing = true;
    serialSessions.delete(sessionId);
    const port = session.port;

    // 1. Alle Listener entfernen damit keine Callbacks mehr feuern
    port.removeAllListeners();

    // 2. Stiller Error-Absorber (Pflicht vor destroy/close)
    port.on("error", () => {});

    // 3. destroy() statt close():
    //    Setzt intern stream.destroyed = true → _read() bricht sauber ab
    //    und wirft seinen BindingsError nicht mehr als unhandled rejection.
    //    close() danach räumt den nativen File-Descriptor auf.
    try { port.destroy(); } catch {}
    setTimeout(() => { try { port.close(); } catch {} }, 50);
  }
  return { ok: true };
});

/* ----------------------------------------
   IPC: SSH
---------------------------------------- */
// Private Schlüsseldatei auswählen – gibt nur den Pfad zurück, liest die Datei nicht
ipcMain.handle("ssh:pickKeyPath", async () => {
  const wnd = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  const result = await dialog.showOpenDialog(wnd, {
    title: t("dlgPickKey"),
    properties: ["openFile", "dontAddToRecent"],
    filters: [{ name: t("dlgAllFiles"), extensions: ["*"] }], // Keys haben oft keine Endung (id_rsa, id_ed25519)
  });
  if (result.canceled || !result.filePaths?.[0]) return null;
  return { filePath: result.filePaths[0] };
});

ipcMain.handle("ssh:connect", (_e, { sessionId, host, port, username, password, authType, keyPath, passphrase, jump }) => {
  return new Promise((resolve) => {
    const old = sshSessions.get(sessionId);
    if (old) {
      try { old.client.end(); } catch {}
      try { old.jumpClient?.end(); } catch {}
      sshSessions.delete(sessionId);
    }

    let settled   = false;
    let jumpClient = null; // nur gesetzt, wenn über Jumphost verbunden wird

    const fail = (err, stage) => {
      if (settled) return; settled = true;
      try { jumpClient?.end(); } catch {}
      // Fehlerort benennen, damit der Nutzer weiß wo es klemmte
      const prefix = stage === "jump" ? t("sshPrefixJump") : stage === "target" ? t("sshPrefixTarget") : "";
      resolve({ ok: false, error: prefix + (err?.message || String(err)) });
    };

    // Schlüsseldatei lesen (für Jumphost und/oder Ziel im Key-Modus)
    function readKey(path) {
      return fs.readFileSync(path); // wirft bei Fehler → vom Aufrufer gefangen
    }

    // Baut die eigentliche Zielverbindung auf. `sock` ist gesetzt, wenn über
    // einen Jumphost getunnelt wird, sonst verbindet target direkt.
    function connectTarget(sock) {
      const client = new SshClient();
      client.on("ready", () => {
        client.shell({ term: "xterm-256color" }, (err, stream) => {
          if (err) { fail(err, "target"); return; }
          if (settled) { try { client.end(); } catch {} try { jumpClient?.end(); } catch {} return; }
          settled = true;
          sshSessions.set(sessionId, { client, stream, jumpClient });
          const send = (data) => {
            if (win && !win.isDestroyed())
              win.webContents.send("ssh:data", { sessionId, data: Buffer.from(data).toString("base64") });
          };
          stream.on("data", send); stream.stderr.on("data", send);
          stream.on("close", () => {
            sshSessions.delete(sessionId);
            try { jumpClient?.end(); } catch {}
            if (win && !win.isDestroyed()) win.webContents.send("ssh:closed", { sessionId });
          });
          resolve({ ok: true });
        });
      });
      client.on("error", (e) => fail(e, "target"));

      const opts = { host, port: port || 22, username, readyTimeout: 15_000 };
      if (sock) opts.sock = sock; // durch den Jumphost-Tunnel statt direkt
      if (authType === "key") {
        let keyData;
        try { keyData = readKey(keyPath); }
        catch (e) { fail({ message: t("errKeyRead", e.message) }, "target"); return; }
        opts.privateKey = keyData;
        if (passphrase) opts.passphrase = passphrase;
      } else {
        opts.password = password;
        opts.tryKeyboard = true;
        client.on("keyboard-interactive", (_n, _i, _l, _p, finish) => { if (!settled) finish([password]); });
      }
      try { client.connect(opts); } catch (err) { fail(err, "target"); }
    }

    // ── Mit Jumphost: erst zum Jumphost (per Key), dann forwardOut zum Ziel ──
    if (jump && jump.host) {
      jumpClient = new SshClient();
      jumpClient.on("ready", () => {
        // Tunnel vom Jumphost zum eigentlichen Ziel öffnen
        jumpClient.forwardOut("127.0.0.1", 0, host, port || 22, (err, stream) => {
          if (err) { fail(err, "jump"); return; }
          connectTarget(stream); // Zielverbindung läuft durch diesen Tunnel
        });
      });
      jumpClient.on("error", (e) => fail(e, "jump"));

      const jOpts = {
        host: jump.host,
        port: jump.port || 22,
        username: jump.username,
        readyTimeout: 15_000,
      };
      // Jumphost immer per Key
      let jKey;
      try { jKey = readKey(jump.keyPath); }
      catch (e) { fail({ message: t("errJumpKeyRead", e.message) }, "jump"); return; }
      jOpts.privateKey = jKey;
      if (jump.passphrase) jOpts.passphrase = jump.passphrase;

      try { jumpClient.connect(jOpts); } catch (err) { fail(err, "jump"); }
    } else {
      // ── Ohne Jumphost: direkt zum Ziel (wie bisher) ──
      connectTarget(null);
    }
  });
});

ipcMain.handle("ssh:send",   (_e, { sessionId, data }) => { sshSessions.get(sessionId)?.stream.write(data); return { ok: true }; });
ipcMain.handle("ssh:resize", (_e, { sessionId, cols, rows }) => { sshSessions.get(sessionId)?.stream.setWindow(rows, cols, 0, 0); return { ok: true }; });
ipcMain.handle("ssh:close",  (_e, { sessionId }) => {
  const s = sshSessions.get(sessionId);
  if (s) {
    try { s.stream.end(); s.client.end(); } catch {}
    try { s.jumpClient?.end(); } catch {}
    sshSessions.delete(sessionId);
  }
  return { ok: true };
});

/* ----------------------------------------
   IPC: WEB (WebContentsView)
---------------------------------------- */
function getWnd() { return BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0]; }

ipcMain.handle("web:open", async (_e, { tabId, url, bounds }) => {
  if (!url) throw new Error(t("errUrlRequired"));
  const wnd = getWnd(); if (!wnd) throw new Error(t("errNoWindow"));
  const old = webViews.get(tabId);
  if (old) { try { wnd.contentView.removeChildView(old); old.webContents.destroy(); } catch {} webViews.delete(tabId); }
  const view = new WebContentsView({ webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true } });
  view.webContents.setUserAgent(view.webContents.userAgent.replace(/\s?Electron\/[\d.]+/, ""));
  view.webContents.setWindowOpenHandler(() => ({
    action: "allow",
    overrideBrowserWindowOptions: { width: 1280, height: 800, frame: true, autoHideMenuBar: true, webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: false } }
  }));
  // F5 = neu laden, Strg+F5 / Umschalt+F5 = ohne Cache. Der Tastendruck landet
  // im Web-View selbst (nicht im RCM-Fenster), deshalb hier abfangen.
  view.webContents.on("before-input-event", (e, input) => {
    if (input.type === "keyDown" && input.key === "F5") {
      e.preventDefault();
      if (input.control || input.shift) view.webContents.reloadIgnoringCache();
      else view.webContents.reload();
    }
  });
  view.webContents.on("did-create-window", (childWin) => {
    childWin.webContents.setUserAgent(childWin.webContents.userAgent.replace(/\s?Electron\/[\d.]+/, ""));
  });
  wnd.contentView.addChildView(view);
  view.setBounds(bounds);
  // WICHTIG: View SOFORT registrieren – noch vor dem Laden. Sonst kann es
  // während eines hängenden Ladevorgangs (Timeout) nicht versteckt werden
  // und überdeckt Dialoge.
  webViews.set(tabId, view);
  // Diagnose + robustes Fehlerhandling beim Laden
  view.webContents.on("did-fail-load", (_e, errorCode, errorDesc, validatedURL) => {
    console.warn(`[web:open] Ladefehler ${errorCode} (${errorDesc}) bei ${validatedURL}`);
  });
  try {
    await view.webContents.loadURL(url);
  } catch (err) {
    // Laden fehlgeschlagen (z. B. Zertifikat, nicht erreichbar):
    // View NICHT als weiße Fläche liegen lassen, sondern entfernen.
    console.warn(`[web:open] loadURL fehlgeschlagen: ${err?.message || err}`);
    try { wnd.contentView.removeChildView(view); view.webContents.destroy(); } catch {}
    webViews.delete(tabId);
    return { ok: false, error: String(err?.message || err) };
  }
  return { ok: true };
});

ipcMain.handle("web:show", async (_e, { tabId, bounds }) => {
  const view = webViews.get(tabId); const wnd = getWnd();
  if (!view || !wnd) return { ok: false };
  try { wnd.contentView.removeChildView(view); } catch {}
  try { wnd.contentView.addChildView(view); if (bounds) view.setBounds(bounds); } catch {}
  return { ok: true };
});

ipcMain.handle("web:hide", async (_e, { tabId }) => {
  const view = webViews.get(tabId); const wnd = getWnd();
  if (!view || !wnd) return { ok: false };
  try { wnd.contentView.removeChildView(view); } catch {}
  return { ok: true };
});

// Versteckt ALLE Web-Views (z. B. wenn ein Dialog erscheint, damit er
// nicht von einem darüberliegenden Web-View verdeckt wird).
ipcMain.handle("web:hideAll", async () => {
  const wnd = getWnd();
  if (!wnd) return { ok: false };
  for (const view of webViews.values()) {
    try { wnd.contentView.removeChildView(view); } catch {}
  }
  return { ok: true };
});

// Nimmt ein Standbild des aktiven Web-Views auf (als Bild-URL), damit es
// hinter Dialogen/Schnellsuche sichtbar bleiben kann, während der echte
// View ausgeblendet ist.
ipcMain.handle("web:snapshot", async (_e, { tabId }) => {
  const view = webViews.get(tabId);
  if (!view) return { ok: false };
  try {
    const img = await view.webContents.capturePage();
    return { ok: true, dataUrl: img.toDataURL() };
  } catch (e) {
    return { ok: false, error: String(e?.message || e) };
  }
});


ipcMain.handle("web:resize", async (_e, { tabId, bounds }) => {
  const view = webViews.get(tabId); if (!view) return { ok: false };
  view.setBounds(bounds); return { ok: true };
});

ipcMain.handle("web:close", async (_e, { tabId }) => {
  const view = webViews.get(tabId); const wnd = getWnd();
  if (view && wnd) {
    try { wnd.contentView.removeChildView(view); view.webContents.destroy(); } catch {}
    webViews.delete(tabId);
  }
  return { ok: true };
});

ipcMain.handle("web:reload", async (_e, { tabId, hard }) => {
  const view = webViews.get(tabId); if (!view) return { ok: false };
  if (hard) view.webContents.reloadIgnoringCache(); else view.webContents.reload();
  return { ok: true };
});

// ── Lokalisierung ────────────────────────────────────────────────────────
ipcMain.handle("locale:get", async () => {
  const lang = currentLang();
  let translations = loadLocale(lang);
  if (!Object.keys(translations).length) translations = loadLocale("de");
  return { lang, translations };
});

// ── TCP-Erreichbarkeitscheck ──────────────────────────────────────────────
ipcMain.handle("conn:ping", (_e, { host, port }) => {
  return new Promise(resolve => {
    const start  = Date.now();
    const socket = new net.Socket();
    const done   = (reachable) => {
      socket.destroy();
      resolve({ reachable, latency: reachable ? Date.now() - start : null });
    };
    socket.setTimeout(2000);
    socket.once("connect", () => done(true));
    socket.once("timeout", () => done(false));
    socket.once("error",   () => done(false));
    socket.connect(Number(port) || 3389, host);
  });
});