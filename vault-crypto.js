/* =========================================================
   vault-crypto.js  —  Krypto-Kern für den geteilten Tresor
   ---------------------------------------------------------
   Nur Standard-Bausteine aus Nodes eingebautem 'crypto'.
   Nichts selbst erfundenes.

   Design:
   - scrypt leitet aus dem Freischalt-Passwort einen 32-Byte-Schlüssel ab
     (mit zufälligem Salt, bewusst rechenintensiv gegen Brute-Force).
   - AES-256-GCM verschlüsselt authentifiziert (erkennt Manipulation)
     mit zufälligem IV pro Verschlüsselung.
   - Ein separater "Verifier" erlaubt zu prüfen, ob ein eingegebenes
     Passwort korrekt ist, OHNE das Passwort zu speichern.
========================================================= */
const crypto = require("crypto");

// scrypt-Parameter: N=2^15 ist ein guter Kompromiss (sicher, ~100ms).
// maxmem muss erhöht werden, da Nodes Default (32 MB) für N=32768 zu klein ist.
// Speicherbedarf ≈ 128 * N * r Bytes ≈ 32 MB, mit Puffer 64 MB.
const SCRYPT_N = 32768, SCRYPT_r = 8, SCRYPT_p = 1, KEY_LEN = 32;
const SCRYPT_MAXMEM = 64 * 1024 * 1024;

// Aus Passwort + Salt einen Schlüssel ableiten
function deriveKey(password, salt) {
  return crypto.scryptSync(password, salt, KEY_LEN, {
    N: SCRYPT_N, r: SCRYPT_r, p: SCRYPT_p, maxmem: SCRYPT_MAXMEM,
  });
}

/* --- Einrichtung: neuen Tresor-Header erzeugen ---
   Gibt ein Objekt zurück, das man gefahrlos speichern kann.
   Es enthält KEIN Passwort – nur Salt und einen Verifier-Block,
   mit dem man später prüfen kann, ob ein Passwort stimmt. */
function createVaultHeader(password) {
  const salt = crypto.randomBytes(16);
  const key  = deriveKey(password, salt);
  // Verifier: wir verschlüsseln einen bekannten Text. Stimmt das Passwort
  // später, lässt er sich entschlüsseln; stimmt es nicht, schlägt GCM fehl.
  const verifier = encryptWithKey(key, "vault-ok");
  return {
    v: 1,
    salt: salt.toString("base64"),
    verifier,
  };
}

/* --- Passwort gegen Header prüfen ---
   Gibt den abgeleiteten Schlüssel zurück (wenn korrekt) oder null. */
function unlockVault(password, header) {
  try {
    const salt = Buffer.from(header.salt, "base64");
    const key  = deriveKey(password, salt);
    const check = decryptWithKey(key, header.verifier);
    if (check === "vault-ok") return key;
    return null;
  } catch {
    return null; // falsches Passwort → GCM-Auth schlägt fehl → Exception
  }
}

/* --- Kern: mit einem Schlüssel verschlüsseln (AES-256-GCM) ---
   Gibt einen kompakten String zurück: iv:authTag:ciphertext (base64). */
function encryptWithKey(key, plaintext) {
  const iv = crypto.randomBytes(12); // GCM-Standard: 12 Byte
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(String(plaintext), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("base64"), tag.toString("base64"), enc.toString("base64")].join(":");
}

/* --- Kern: mit einem Schlüssel entschlüsseln --- */
function decryptWithKey(key, packed) {
  const parts = String(packed).split(":");
  if (parts.length !== 3) throw new Error("Ungültiges Format");
  const [iv, tag, enc] = parts.map(p => Buffer.from(p, "base64"));
  // IV muss 12 Byte, Auth-Tag muss volle 16 Byte (128 Bit) sein.
  // Das verhindert "Tag-Truncation": ein kurzer Tag wäre leichter zu fälschen.
  if (iv.length !== 12 || tag.length !== 16) throw new Error("Ungültiges Format");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv, { authTagLength: 16 });
  decipher.setAuthTag(tag); // wenn manipuliert oder falscher Schlüssel → wirft bei final()
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}

module.exports = {
  createVaultHeader,
  unlockVault,
  encryptWithKey,
  decryptWithKey,
  deriveKey, // exportiert für Tests
};