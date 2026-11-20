/* Integrationstest für den Vault-Backend-Ablauf.
   Simuliert was die main.js-Handler tun, aber isoliert mit
   einer temporären Datei – fasst keine echten Daten an. */
const fs = require("fs");
const os = require("os");
const path = require("path");
const vault = require("./vault-crypto.js");

let pass = 0, fail = 0;
const check = (n, c) => { if (c) { pass++; console.log(`  ✓ ${n}`); } else { fail++; console.log(`  ✗ FEHLGESCHLAGEN: ${n}`); } };

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vault-test-"));
const vaultPath = path.join(tmpDir, "vault.json");
const PW = "team-geheim-2024";

console.log("=== Backend-Ablauf: Ersteinrichtung ===");
let vaultKey = null;
{
  // vault:setup
  const header = vault.createVaultHeader(PW);
  fs.writeFileSync(vaultPath, JSON.stringify(header, null, 2), "utf-8");
  vaultKey = vault.unlockVault(PW, header);
  check("Header-Datei wurde geschrieben", fs.existsSync(vaultPath));
  check("Tresor direkt entsperrt nach Setup", vaultKey !== null);
  check("Header-Datei enthält kein Klartext-Passwort", !fs.readFileSync(vaultPath, "utf-8").includes(PW));
}

console.log("\n=== Backend-Ablauf: Neustart simulieren (Key weg) ===");
{
  vaultKey = null; // wie App-Neustart: RAM-Key ist weg
  // vault:status
  const header = JSON.parse(fs.readFileSync(vaultPath, "utf-8"));
  check("Status: Tresor existiert", !!header);
  check("Status: gesperrt (kein Key im RAM)", vaultKey === null);
}

console.log("\n=== Backend-Ablauf: Entsperren mit richtigem/falschem PW ===");
{
  const header = JSON.parse(fs.readFileSync(vaultPath, "utf-8"));
  // falsch
  const wrongKey = vault.unlockVault("falsch", header);
  check("falsches Passwort → kein Key", wrongKey === null);
  // richtig
  vaultKey = vault.unlockVault(PW, header);
  check("richtiges Passwort → entsperrt", vaultKey !== null);
}

console.log("\n=== Backend-Ablauf: Geteiltes Passwort ver-/entschlüsseln ===");
{
  // vault:encrypt (wie beim Speichern einer Verbindung)
  const secret = "cisco-enable-secret";
  const ciphertext = vault.encryptWithKey(vaultKey, secret);
  // Das käme in connections.json als conn.sharedPassword
  const connectionsJson = JSON.stringify({ folders: [{ items: [{ name: "Switch", sharedPassword: ciphertext }] }] });
  check("verschlüsseltes PW steht in der Store-Struktur", connectionsJson.includes(ciphertext));
  check("Klartext steht NICHT in der Store-Struktur", !connectionsJson.includes(secret));

  // vault:decrypt (wie beim Verbinden)
  const parsed = JSON.parse(connectionsJson);
  const stored = parsed.folders[0].items[0].sharedPassword;
  const back = vault.decryptWithKey(vaultKey, stored);
  check("entschlüsselt == Original beim Verbinden", back === secret);
}

console.log("\n=== Backend-Ablauf: Notausgang (reset) ===");
{
  // vault:reset - Header löschen + sharedPassword-Felder entfernen
  fs.unlinkSync(vaultPath);
  vaultKey = null;
  const store = { folders: [{ items: [{ name: "Switch", sharedPassword: "xxx:yyy:zzz" }, { name: "Ohne", host: "h" }] }] };
  let removed = 0;
  (function walk(folders){ for (const f of folders||[]) { for (const c of f.items||[]) { if (c.sharedPassword) { delete c.sharedPassword; removed++; } } walk(f.folders); } })(store.folders);
  check("Header-Datei ist weg", !fs.existsSync(vaultPath));
  check("genau 1 geteiltes Passwort entfernt", removed === 1);
  check("Verbindung bleibt erhalten (nur PW weg)", store.folders[0].items[0].name === "Switch" && !store.folders[0].items[0].sharedPassword);
  check("Verbindung ohne geteiltes PW unberührt", store.folders[0].items[1].host === "h");
}

// Aufräumen
try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}

console.log(`\n========================================`);
console.log(`Ergebnis: ${pass} bestanden, ${fail} fehlgeschlagen`);
console.log(`========================================`);
process.exit(fail === 0 ? 0 : 1);