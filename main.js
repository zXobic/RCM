// main.js
"use strict";

const { app, BrowserWindow, WebContentsView, ipcMain, shell, session, clipboard, dialog } = require("electron");
const path     = require("path");
const { spawn, execSync, spawnSync } = require("child_process");
const net = require("net");
const fs       = require("fs");
const os       = require("os");
const { randomUUID } = require("crypto");
const { Client: SshClient } = require("ssh2");

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
    if (typeof dec !== "string") throw new Error("Entschlüsselter Wert ist kein String.");
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
      return { ok: false, error: "Gespeicherte Zugangsdaten waren beschädigt und wurden zurückgesetzt. Bitte neu eingeben." };
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

// Migration: Falls die Datei noch im alten "Electron"-Default-Pfad liegt,
// automatisch in den korrekten Pfad kopieren.
(function migrateIfNeeded() {
  try {
    if (fs.existsSync(storePath)) return; // schon am richtigen Ort
    const candidates = [
      path.join(path.dirname(userDataDir), "Electron", "connections.json"),
      path.join(path.dirname(userDataDir), "electron", "connections.json"),
      path.join(path.dirname(userDataDir), "rdm",      "connections.json"),
    ];
    for (const src of candidates) {
      if (fs.existsSync(src)) {
        fs.mkdirSync(userDataDir, { recursive: true });
        fs.copyFileSync(src, storePath);
        console.log("[RDM] connections.json migriert von:", src);
        break;
      }
    }
  } catch (e) { console.warn("[RDM] Migration fehlgeschlagen:", e.message); }
})();

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
    throw new Error("Diese Datenquelle ist auf Nur-Lesen eingestellt.");
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
      throw new Error("Die Daten wurden inzwischen von anderer Stelle geändert. Bitte Ansicht aktualisieren und erneut versuchen.");
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
  win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
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
}

app.setAppUserModelId("com.tobias.remote-connection-manager");

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
  });
  app.whenReady().then(() => {
    session.defaultSession.setCertificateVerifyProc((req, cb) => {
      cb(isIPv4In10Net(req.hostname) ? 0 : -3);
    });
    createWindow();
  });
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
  isCleaningUp = true;
  win.hide();
  for (const [, view] of webViews) {
    try { win.contentView.removeChildView(view); view.webContents.destroy(); } catch {}
  }
  webViews.clear();
  for (const [, { client }] of sshSessions) { try { client.end(); } catch {} }
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
  if (!win.isDestroyed()) win.destroy();
  app.quit();
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
   IPC: Dialog
---------------------------------------- */
ipcMain.handle("dialog:openFile", async (_e, { filters } = {}) => {
  const wnd = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  const result = await dialog.showOpenDialog(wnd, {
    properties: ["openFile"],
    filters: filters || [{ name: "Alle Dateien", extensions: ["*"] }],
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
   IPC: Store
---------------------------------------- */
ipcMain.handle("store:openFolder", async () => {
  await shell.openPath(path.dirname(storePath));
  return { ok: true };
});
ipcMain.handle("store:load", async () => readStore());

ipcMain.handle("store:createFolder", async (_e, { name, parentId }) => {
  if (!name?.trim()) throw new Error("Ordnername fehlt.");
  const data      = await readStore();
  const newFolder = { id: "f-" + randomUUID(), name: name.trim(), open: true, items: [], folders: [] };
  if (parentId) {
    const info = findFolderById(data.folders, parentId);
    if (!info) throw new Error("Zielordner nicht gefunden.");
    if (info.depth >= MAX_DEPTH) throw new Error(`Max. Tiefe (${MAX_DEPTH}) erreicht.`);
    info.folder.folders.push(newFolder);
  } else {
    data.folders.push(newFolder);
  }
  await writeStore(data, data.rev);
  return { ok: true, folderId: newFolder.id, data };
});

ipcMain.handle("store:renameFolder", async (_e, { folderId, name }) => {
  if (!folderId || !name?.trim()) throw new Error("Parameter fehlt.");
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (!info) throw new Error("Ordner nicht gefunden.");
  info.folder.name = name.trim();
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:deleteFolder", async (_e, { folderId }) => {
  const data = await readStore();
  if (!removeFolderFromParent(data.folders, folderId)) throw new Error("Ordner nicht gefunden.");
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:setFolderOpen", async (_e, { folderId, open }) => {
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (info) { info.folder.open = !!open; await writeStore(data, data.rev); }
  return { ok: true, data };
});

ipcMain.handle("store:createConnection", async (_e, { folderId, type, name, host, port, url, profile, username, comPort, baudRate, dataBits, parity, stopBits }) => {
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (!info) throw new Error("Zielordner nicht gefunden.");
  const id = "c-" + randomUUID();
  let conn;
  if (type === "web") {
    if (!url?.trim()) throw new Error("URL ist erforderlich.");
    conn = { id, type: "web", name: (name || url).trim(), url: url.trim() };
  } else if (type === "ssh") {
    if (!host?.trim())     throw new Error("Host ist erforderlich.");
    if (!username?.trim()) throw new Error("Benutzername ist erforderlich.");
    conn = { id, type: "ssh", name: (name || host).trim(), host: host.trim(), port: port ? Number(port) : 22, username: username.trim() };
  } else if (type === "serial") {
    if (!comPort) throw new Error("COM-Port ist erforderlich.");
    conn = { id, type: "serial", name: (name || comPort).trim(), comPort,
             baudRate: Number(baudRate) || 9600, dataBits: Number(dataBits) || 8,
             parity: parity || "none", stopBits: Number(stopBits) || 1 };
  } else {
    if (!host?.trim()) throw new Error("Host ist erforderlich.");
    conn = { id, type: "rdp", name: (name || host).trim(), host: host.trim(), port: port ? Number(port) : undefined };
    if (profile && typeof profile === "object") conn.profile = profile;
  }
  info.folder.items.push(conn);
  await writeStore(data, data.rev);
  return { ok: true, connId: id, data };
});

ipcMain.handle("store:updateConnection", async (_e, { folderId, connectionId, name, host, port, profile, url, username, comPort, baudRate, dataBits, parity, stopBits, notes }) => {
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (!info) throw new Error("Ordner nicht gefunden.");
  const conn = (info.folder.items || []).find(c => c.id === connectionId);
  if (!conn) throw new Error("Verbindung nicht gefunden.");
  if (typeof name === "string") conn.name = name.trim() || conn.name;
  if (conn.type === "web") {
    if (typeof url === "string" && url.trim()) conn.url = url.trim();
  } else if (conn.type === "ssh") {
    if (typeof host     === "string" && host.trim())     conn.host     = host.trim();
    if (typeof username === "string" && username.trim()) conn.username = username.trim();
    if (port != null && port !== "") {
      const p = Number(port); if (!Number.isFinite(p) || p <= 0 || p > 65535) throw new Error("Port ungültig.");
      conn.port = p;
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
      const p = Number(port); if (!Number.isFinite(p) || p <= 0 || p > 65535) throw new Error("Port ungültig.");
      conn.port = p;
    } else if (port === "") { delete conn.port; }
    if (profile && typeof profile === "object") conn.profile = Object.assign({}, conn.profile || {}, profile);
  }
  if (typeof notes === "string") conn.notes = notes.trim();
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:deleteConnection", async (_e, { folderId, connectionId }) => {
  const data = await readStore();
  const info = findFolderById(data.folders, folderId);
  if (!info) throw new Error("Ordner nicht gefunden.");
  const i = (info.folder.items || []).findIndex(c => c.id === connectionId);
  if (i === -1) throw new Error("Verbindung nicht gefunden.");
  info.folder.items.splice(i, 1);
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:moveConnection", async (_e, { sourceFolderId, connectionId, targetFolderId }) => {
  const data = await readStore();
  const src  = findFolderById(data.folders, sourceFolderId);
  const dst  = findFolderById(data.folders, targetFolderId);
  if (!src || !dst) throw new Error("Ordner nicht gefunden.");
  const idx = (src.folder.items || []).findIndex(c => c.id === connectionId);
  if (idx === -1) throw new Error("Verbindung nicht gefunden.");
  const [conn] = src.folder.items.splice(idx, 1);
  dst.folder.items.push(conn);
  await writeStore(data, data.rev);
  return { ok: true, data };
});

ipcMain.handle("store:moveFolder", async (_e, { folderId, targetFolderId }) => {
  const data    = await readStore();
  const srcInfo = findFolderById(data.folders, folderId);
  if (!srcInfo) throw new Error("Quellordner nicht gefunden.");
  let dstInfo = null;
  if (targetFolderId) {
    dstInfo = findFolderById(data.folders, targetFolderId);
    if (!dstInfo) throw new Error("Zielordner nicht gefunden.");
    if (folderId === targetFolderId || folderContainsId(srcInfo.folder, targetFolderId))
      throw new Error("Ungültiges Ziel (Zyklus).");
    if (dstInfo.depth + computeSubtreeDepth(srcInfo.folder) > MAX_DEPTH)
      throw new Error(`Max. Tiefe (${MAX_DEPTH}) würde überschritten.`);
  }
  const moved = extractFolder(data.folders, folderId);
  if (!moved) throw new Error("Ordner konnte nicht entfernt werden.");
  if (!targetFolderId) data.folders.push(moved);
  else                 dstInfo.folder.folders.push(moved);
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
  if (process.platform !== "win32") return { ok: false, error: "Nur unter Windows verfügbar." };
  if (!host) return { ok: false, error: "Host ist erforderlich." };
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
    error: "Serielle Verbindungen nicht verfügbar.\n\nLösung A (empfohlen):\n  npm install @serialport/stream @serialport/bindings-wasm\n\nLösung B:\n  npm install serialport && npx @electron/rebuild",
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
    if (!SerialPortClass) { resolve({ ok: false, error: "serialport nicht installiert." }); return; }

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
ipcMain.handle("ssh:connect", (_e, { sessionId, host, port, username, password }) => {
  return new Promise((resolve) => {
    const old = sshSessions.get(sessionId);
    if (old) { try { old.client.end(); } catch {} sshSessions.delete(sessionId); }
    const client = new SshClient();
    let settled  = false;
    const fail = (err) => {
      if (settled) return; settled = true;
      try { client.end(); } catch {}
      resolve({ ok: false, error: err?.message || String(err) });
    };
    client.on("ready", () => {
      client.shell({ term: "xterm-256color" }, (err, stream) => {
        if (err) { fail(err); return; }
        if (settled) { try { client.end(); } catch {} return; }
        settled = true;
        sshSessions.set(sessionId, { client, stream });
        const send = (data) => {
          if (win && !win.isDestroyed())
            win.webContents.send("ssh:data", { sessionId, data: Buffer.from(data).toString("base64") });
        };
        stream.on("data", send); stream.stderr.on("data", send);
        stream.on("close", () => {
          sshSessions.delete(sessionId);
          if (win && !win.isDestroyed()) win.webContents.send("ssh:closed", { sessionId });
        });
        resolve({ ok: true });
      });
    });
    client.on("error", fail);
    client.on("keyboard-interactive", (_n, _i, _l, _p, finish) => { if (!settled) finish([password]); });
    client.connect({ host, port: port || 22, username, password, tryKeyboard: true, readyTimeout: 10_000 });
  });
});

ipcMain.handle("ssh:send",   (_e, { sessionId, data }) => { sshSessions.get(sessionId)?.stream.write(data); return { ok: true }; });
ipcMain.handle("ssh:resize", (_e, { sessionId, cols, rows }) => { sshSessions.get(sessionId)?.stream.setWindow(rows, cols, 0, 0); return { ok: true }; });
ipcMain.handle("ssh:close",  (_e, { sessionId }) => {
  const s = sshSessions.get(sessionId);
  if (s) { try { s.stream.end(); s.client.end(); } catch {} sshSessions.delete(sessionId); }
  return { ok: true };
});

/* ----------------------------------------
   IPC: WEB (WebContentsView)
---------------------------------------- */
function getWnd() { return BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0]; }

ipcMain.handle("web:open", async (_e, { tabId, url, bounds }) => {
  if (!url) throw new Error("URL fehlt.");
  const wnd = getWnd(); if (!wnd) throw new Error("Kein Fenster.");
  const old = webViews.get(tabId);
  if (old) { try { wnd.contentView.removeChildView(old); old.webContents.destroy(); } catch {} webViews.delete(tabId); }
  const view = new WebContentsView({ webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true } });
  view.webContents.setUserAgent(view.webContents.userAgent.replace(/\s?Electron\/[\d.]+/, ""));
  view.webContents.setWindowOpenHandler(() => ({
    action: "allow",
    overrideBrowserWindowOptions: { width: 1280, height: 800, frame: true, autoHideMenuBar: true, webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: false } }
  }));
  view.webContents.on("did-create-window", (childWin) => {
    childWin.webContents.setUserAgent(childWin.webContents.userAgent.replace(/\s?Electron\/[\d.]+/, ""));
  });
  wnd.contentView.addChildView(view);
  view.setBounds(bounds);
  try {
    await view.webContents.loadURL(url);
  } catch (err) {
    try { wnd.contentView.removeChildView(view); view.webContents.destroy(); } catch {}
    throw err;
  }
  webViews.set(tabId, view);
  return { ok: true };
});

ipcMain.handle("web:show", async (_e, { tabId, bounds }) => {
  const view = webViews.get(tabId); const wnd = getWnd();
  if (!view || !wnd) return { ok: false };
  try { wnd.contentView.removeChildView(view); } catch {}
  wnd.contentView.addChildView(view);
  view.setBounds(bounds);
  return { ok: true };
});

ipcMain.handle("web:hide", async (_e, { tabId }) => {
  const view = webViews.get(tabId); const wnd = getWnd();
  if (!view || !wnd) return { ok: false };
  try { wnd.contentView.removeChildView(view); } catch {}
  return { ok: true };
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
  try {
    const s = await readSettings();
    let lang = s.language;
    if (!lang) {
      const syslang = app.getLocale();
      lang = syslang.startsWith("de") ? "de" : "en";
    }
    // Lokale Datei laden
    const tryLoad = (file) => {
      try { return JSON.parse(fs.readFileSync(file, "utf-8")); } catch { return null; }
    };
    const translations =
      tryLoad(path.join(__dirname, "locales", `${lang}.json`)) ||
      tryLoad(path.join(__dirname, "locales", "de.json")) ||
      tryLoad(path.join(path.dirname(process.execPath), "locales", `${lang}.json`)) ||
      {};
    return { lang, translations };
  } catch (err) {
    return { lang: "de", translations: {} };
  }
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