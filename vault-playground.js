/* =========================================================
   vault-playground.js  —  Krypto-Kern interaktiv ausprobieren
   ---------------------------------------------------------
   Zum Selber-Ausprobieren: Passwort festlegen, Texte ver- und
   entschlüsseln, mit falschem Passwort testen. Fasst NICHTS
   von der echten App an – alles nur im Speicher.

   Start:  node vault-playground.js
========================================================= */
const readline = require("readline");
const vc = require("./vault-crypto.js");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

// Zustand dieser Sitzung
let header = null;   // der "Tresor-Header" (Salt + Verifier), wie er gespeichert würde
let key = null;      // der entsperrte Schlüssel (nur im Speicher)
const safe = {};     // "verschlüsselte Ablage": name -> verschlüsselter String

function line() { console.log("─".repeat(56)); }

async function main() {
  console.log("");
  line();
  console.log("  🔐  VAULT-CRYPTO  —  INTERAKTIVER TEST");
  line();
  console.log("Hier kannst du den Verschlüsselungs-Kern selbst ausprobieren.");
  console.log("Nichts davon berührt deine echte connections.json.\n");

  // Schritt 1: Tresor einrichten (Passwort festlegen)
  const pw = await ask("① Lege ein Freischalt-Passwort fest: ");
  header = vc.createVaultHeader(pw);
  key = vc.unlockVault(pw, header);
  console.log("\n   ✓ Tresor eingerichtet.");
  console.log("   So sieht der gespeicherte Header aus (enthält KEIN Passwort):");
  console.log("   " + JSON.stringify(header).slice(0, 90) + "…\n");

  await menu();
}

async function menu() {
  while (true) {
    line();
    console.log("Was möchtest du tun?");
    console.log("  [1] Ein Passwort verschlüsseln und ablegen");
    console.log("  [2] Ablage anzeigen (so läge es in der Datei)");
    console.log("  [3] Ein Passwort entschlüsseln");
    console.log("  [4] Mit FALSCHEM Passwort entsperren (Test)");
    console.log("  [5] Beenden");
    const choice = (await ask("→ ")).trim();

    if (choice === "1") {
      const name = (await ask("   Name (z. B. 'Switch-Kern'): ")).trim() || "unbenannt";
      const secret = await ask("   Passwort/Geheimnis: ");
      safe[name] = vc.encryptWithKey(key, secret);
      console.log(`\n   ✓ '${name}' verschlüsselt abgelegt.`);
      console.log("   Verschlüsselt sieht es so aus:");
      console.log("   " + safe[name] + "\n");
    }

    else if (choice === "2") {
      console.log("");
      const names = Object.keys(safe);
      if (!names.length) { console.log("   (noch nichts abgelegt)\n"); continue; }
      console.log("   So läge es verschlüsselt in der Datei:");
      console.log("   " + JSON.stringify(safe, null, 2).replace(/\n/g, "\n   ") + "\n");
    }

    else if (choice === "3") {
      const names = Object.keys(safe);
      if (!names.length) { console.log("\n   (noch nichts abgelegt)\n"); continue; }
      console.log("\n   Vorhanden: " + names.join(", "));
      const name = (await ask("   Welches entschlüsseln? ")).trim();
      if (!safe[name]) { console.log("   ✗ Kein Eintrag mit diesem Namen.\n"); continue; }
      try {
        const dec = vc.decryptWithKey(key, safe[name]);
        console.log(`\n   ✓ Entschlüsselt: "${dec}"\n`);
      } catch (e) {
        console.log("   ✗ Entschlüsseln fehlgeschlagen: " + e.message + "\n");
      }
    }

    else if (choice === "4") {
      const testpw = await ask("\n   Gib ein Passwort ein (auch ein falsches): ");
      const k = vc.unlockVault(testpw, header);
      if (k === null) {
        console.log("   ✗ FALSCH – Passwort abgewiesen, Tresor bleibt zu. (So soll es sein.)\n");
      } else {
        console.log("   ✓ RICHTIG – dieses Passwort entsperrt den Tresor.\n");
      }
    }

    else if (choice === "5") {
      console.log("\n👋 Beendet. Es wurde nichts gespeichert.\n");
      rl.close();
      return;
    }

    else {
      console.log("   (bitte 1–5 eingeben)\n");
    }
  }
}

main();