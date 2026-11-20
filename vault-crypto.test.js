/* Isolierte Tests für vault-crypto.js
   Prüft alle sicherheitskritischen Eigenschaften, bevor das
   Modul überhaupt in die Nähe echter Daten kommt. */
const vc = require("./vault-crypto.js");

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else      { fail++; console.log(`  ✗ FEHLGESCHLAGEN: ${name}`); }
}

console.log("=== 1. Grundlegendes Ver-/Entschlüsseln ===");
{
  const header = vc.createVaultHeader("meinGeheimesPasswort");
  const key = vc.unlockVault("meinGeheimesPasswort", header);
  check("richtiges Passwort entsperrt (key != null)", key !== null);

  const secret = "switch-admin-passwort-123!";
  const packed = vc.encryptWithKey(key, secret);
  const back = vc.decryptWithKey(key, packed);
  check("entschlüsselt == Original", back === secret);
  check("verschlüsselt != Original", packed !== secret);
  check("verschlüsselt enthält Original nicht im Klartext", !packed.includes(secret));
}

console.log("\n=== 2. Falsches Passwort wird abgewiesen ===");
{
  const header = vc.createVaultHeader("richtigesPasswort");
  const key = vc.unlockVault("falschesPasswort", header);
  check("falsches Passwort → null", key === null);
}

console.log("\n=== 3. Gleicher Klartext → unterschiedliche Chiffre (IV-Zufall) ===");
{
  const header = vc.createVaultHeader("pw");
  const key = vc.unlockVault("pw", header);
  const a = vc.encryptWithKey(key, "identischerText");
  const b = vc.encryptWithKey(key, "identischerText");
  check("zwei Verschlüsselungen sind verschieden", a !== b);
  check("beide entschlüsseln zum selben Text",
    vc.decryptWithKey(key, a) === "identischerText" &&
    vc.decryptWithKey(key, b) === "identischerText");
}

console.log("\n=== 4. Manipulation wird erkannt (GCM-Auth) ===");
{
  const header = vc.createVaultHeader("pw");
  const key = vc.unlockVault("pw", header);
  const packed = vc.encryptWithKey(key, "wichtigeDaten");
  // letzten Buchstaben des Ciphertext-Teils verändern
  const parts = packed.split(":");
  const enc = Buffer.from(parts[2], "base64");
  enc[enc.length - 1] ^= 0x01; // ein Bit kippen
  parts[2] = enc.toString("base64");
  const tampered = parts.join(":");
  let threw = false;
  try { vc.decryptWithKey(key, tampered); } catch { threw = true; }
  check("manipulierte Daten werfen Fehler", threw);
}

console.log("\n=== 5. Falscher Schlüssel kann nicht entschlüsseln ===");
{
  const h1 = vc.createVaultHeader("passwortEins");
  const h2 = vc.createVaultHeader("passwortZwei");
  const k1 = vc.unlockVault("passwortEins", h1);
  const k2 = vc.unlockVault("passwortZwei", h2);
  const packed = vc.encryptWithKey(k1, "geheim");
  let threw = false;
  try { vc.decryptWithKey(k2, packed); } catch { threw = true; }
  check("Entschlüsseln mit fremdem Schlüssel schlägt fehl", threw);
}

console.log("\n=== 6. Salt ist pro Tresor unterschiedlich ===");
{
  const h1 = vc.createVaultHeader("gleichesPasswort");
  const h2 = vc.createVaultHeader("gleichesPasswort");
  check("gleiches Passwort → unterschiedlicher Salt", h1.salt !== h2.salt);
  check("gleiches Passwort → unterschiedlicher Verifier", h1.verifier !== h2.verifier);
}

console.log("\n=== 7. Header enthält kein Klartext-Passwort ===");
{
  const header = vc.createVaultHeader("streng-geheim-9000");
  const asString = JSON.stringify(header);
  check("Passwort taucht nicht im Header auf", !asString.includes("streng-geheim-9000"));
}

console.log("\n=== 8. Sonderzeichen / Unicode im Geheimnis ===");
{
  const header = vc.createVaultHeader("pw");
  const key = vc.unlockVault("pw", header);
  const tricky = "Pä$$wörd\t🔑\n\"'\\:mit:doppelpunkten";
  const back = vc.decryptWithKey(key, vc.encryptWithKey(key, tricky));
  check("Unicode/Sonderzeichen bleiben erhalten", back === tricky);
}

console.log("\n=== 9. Leeres Geheimnis ===");
{
  const header = vc.createVaultHeader("pw");
  const key = vc.unlockVault("pw", header);
  const back = vc.decryptWithKey(key, vc.encryptWithKey(key, ""));
  check("leerer String bleibt leerer String", back === "");
}

console.log("\n=== 10. Auth-Tag-Härtung (Tag-Truncation-Schutz) ===");
{
  const header = vc.createVaultHeader("pw");
  const key = vc.unlockVault("pw", header);
  const packed = vc.encryptWithKey(key, "wichtigeDaten");
  const parts = packed.split(":");

  // (a) Verkürzter Auth-Tag (8 statt 16 Byte) muss abgewiesen werden
  const shortTag = Buffer.from(parts[1], "base64").slice(0, 8).toString("base64");
  let threwShort = false;
  try { vc.decryptWithKey(key, [parts[0], shortTag, parts[2]].join(":")); }
  catch { threwShort = true; }
  check("verkürzter Auth-Tag (8 Byte) wird abgewiesen", threwShort);

  // (b) Kaputtes Format (nur 2 Teile) muss abgewiesen werden
  let threwFormat = false;
  try { vc.decryptWithKey(key, parts[0] + ":" + parts[2]); }
  catch { threwFormat = true; }
  check("ungültiges Format (2 statt 3 Teile) wird abgewiesen", threwFormat);
}

console.log(`\n========================================`);
console.log(`Ergebnis: ${pass} bestanden, ${fail} fehlgeschlagen`);
console.log(`========================================`);
process.exit(fail === 0 ? 0 : 1);