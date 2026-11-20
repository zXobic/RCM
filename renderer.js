// renderer.js
"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // ── Lokalisierung ────────────────────────────────────────────────────
  const _EMBEDDED = {
    de: {"searchPlaceholder": "🔍 Suchen...", "save": "Speichern", "cancel": "Abbrechen", "close": "Schließen", "ok": "OK", "yes": "Ja", "no": "Nein", "ctxNewFolder": "Neuer Ordner", "ctxRenameFolder": "Ordner umbenennen…", "ctxDeleteFolder": "Ordner löschen…", "ctxNewRdp": "Neue RDP-Verbindung…", "ctxNewSsh": "Neue SSH-Verbindung…", "ctxNewWeb": "Neue Website…", "ctxNewSerial": "Neue Serielle Verbindung…", "ctxEdit": "Bearbeiten…", "ctxDelete": "Löschen…", "settingsTitle": "Einstellungen", "import": "Importieren", "importDesc": "mRemoteNG XML oder Devolutions RDM XML", "export": "Exportieren", "exportDesc": "Alle Verbindungen als JSON-Backup speichern", "openDataFolder": "Daten-Ordner öffnen", "openDataFolderBtn": "📂 Öffnen", "sectionDesign": "🎨 Design", "darkMode": "🌙 Dunkel", "lightMode": "☀️ Hell", "sectionSshTerminal": "🖥 SSH Terminal", "fontSize": "Schriftgröße", "fontSizeDesc": "Gilt für neue SSH-Sitzungen", "sectionCredentials": "🔐 Zugangsdaten", "personalCreds": "Persönliche Zugangsdaten (RDP)", "username": "Benutzername", "password": "Passwort", "passwordSaved": "Gespeichert – leer lassen zum Behalten", "saveBtn": "💾 Speichern", "deleteBtn": "🗑 Löschen", "sshPasswords": "SSH-Passwörter", "sshPasswordsDesc": "Pro Verbindung, mit \"Merken\" beim SSH-Verbinden gespeichert", "sectionConnStatus": "📡 Verbindungsstatus", "connStatusDesc": "TCP-Check auf den Verbindungsport – grüner/roter Punkt in der Sidebar. Beim Hover wird die Latenz angezeigt.", "intervalOff": "Aus", "interval30s": "30 Sek.", "interval1m": "1 Min.", "interval5m": "5 Min.", "sectionLanguage": "🌐 Sprache", "langDesc": "Wird nach einem Neustart angewendet.", "langDe": "🇩🇪 Deutsch", "langEn": "🇬🇧 English", "restartRequired": "Neustart erforderlich", "restartMsg": "Die Sprache wird nach einem Neustart angewendet.", "sectionAbout": "ℹ Über", "aboutApp": "Remote Connection Manager", "aboutDesc": "Entwickelt mit Electron + Node.js", "aboutConns": "Verbindungen", "aboutFolders": "Ordner", "connVerbindung": "VERBINDUNG", "connName": "Name", "connHostIp": "Host / IP", "connPort": "Port", "connUsername": "Benutzername", "connAnzeige": "ANZEIGE", "connFullscreen": "Vollbild", "connWindow": "Fenster", "connMultiMonitor": "Multi-Monitor", "connWidth": "Breite", "connOptionen": "OPTIONEN", "connAdmin": "Admin-Sitzung", "connAdminDesc": "Als Konsolenadministrator (/admin) verbinden", "connClipboard": "Zwischenablage", "connPrinter": "Drucker weiterleiten", "connPrinterDesc": "Lokale Drucker im RDP-Fenster verfügbar machen", "connColorDepth": "Farbtiefe", "connAdvanced": "Erweitert – Gateway & Laufwerke", "connGatewayHost": "Gateway-Host", "connUsage": "Nutzung", "connUsageAlways": "immer", "connUsageIfNeeded": "bei Bedarf", "connUsageNever": "nie", "connDrives": "Laufwerke weiterleiten", "connDrivesPlaceholder": "leer = keine   * = alle   z. B. C:;D:;", "connAnmeldedaten": "ANMELDEDATEN", "connUsePersonal": "Persönliche Zugangsdaten verwenden", "connUsePersonalDesc": "Username + Passwort aus Einstellungen → Persönliche Zugangsdaten", "connUsePersonalOff": "Wenn deaktiviert: Windows-Anmeldedialog erscheint beim Verbinden.", "sshPassword": "Passwort (optional)", "sshPasswordSaved": "Neues Passwort (leer = bestehendes behalten)", "sshPasswordPlaceholder": "Leer = beim Verbinden abfragen", "sshPasswordSavedLabel": "✓ Passwort gespeichert", "sshPasswordDelete": "Löschen", "newRdpTitle": "Neue RDP-Verbindung", "newSshTitle": "Neue SSH-Verbindung", "newWebTitle": "Neue Web-Verbindung", "editConnTitle": "Verbindung bearbeiten", "editSshTitle": "SSH bearbeiten", "editWebTitle": "Web-Verbindung bearbeiten", "serialParityNone": "Keine", "serialParityEven": "Gerade", "serialParityOdd": "Ungerade", "newSerialTitle": "Neue Serielle Verbindung", "editSerialTitle": "Serielle Verbindung bearbeiten", "confirmDeleteConn": "Verbindung wirklich löschen?", "confirmDeleteFolder": "Ordner und alle Verbindungen darin wirklich löschen?", "confirmDeleteSshPasswords": "Alle gespeicherten SSH-Passwörter löschen?", "confirmDeletePersonalCreds": "Persönliche Zugangsdaten wirklich löschen?", "importError": "Import-Fehler", "exportSuccess": "Export erfolgreich", "exportError": "Export-Fehler", "startError": "Start-Fehler", "saved": "Gespeichert", "done": "Erledigt", "allSshDeleted": "Alle gespeicherten Passwörter wurden gelöscht.", "personalCredsSaved": "Persönliche Zugangsdaten gespeichert.", "personalCredsUpdated": "Persönliche Zugangsdaten aktualisiert.", "importPersonalTitle": "Persönliche Zugangsdaten", "connecting": "Verbindet...", "connInfoNotes": "NOTIZEN", "connInfoNotesPlaceholder": "Notizen zur Verbindung eingeben…", "connInfoSaved": "✓ Gespeichert", "connInfoError": "Fehler beim Speichern", "folderName": "Ordnername", "folderNamePlaceholder": "z. B. Produktion", "renameFolderTitle": "Ordner umbenennen", "noResults": "Keine Ergebnisse.", "openDataFolderDesc": "Ordner mit connections.json im Explorer anzeigen", "themeAppliedImmediately": "Wird sofort angewendet", "closeTab": "Tab schließen", "ctxNewSubFolder": "Neuer Unterordner…", "emptyStateHint": "Rechtsklick → Neuer Ordner / Neue Verbindung", "rdpError": "RDP-Fehler", "rdpConnectFailed": "Start fehlgeschlagen.", "sshConnError": "SSH-Verbindungsfehler", "sshConnFailed": "Verbindung fehlgeschlagen.", "exportedTo": "Gespeichert unter:\n{0}", "deleteTitle": "Löschen", "deleteFolderTitle": "Ordner löschen", "deleteConnTitle": "Verbindung löschen", "deletePasswordsTitle": "Passwörter löschen", "unknownTypesNote": "Unbekannte Typen (bitte melden):", "sshPasswordKeepPlaceholder": "Leer lassen um gespeichertes zu behalten", "importInvalidXml": "Die Datei konnte nicht als XML gelesen werden.", "importUnknownFormat": "Unbekanntes Format.\nUnterstützt: mRemoteNG XML, Devolutions RDM XML", "sshPasswordForLabel": "Passwort für", "confirmTitle": "Bestätigen", "continueQuestion": "Fortfahren?", "newSubfolderTitle": "Neuer Unterordner", "newNameLabel": "Neuer Name", "errorTitle": "Fehler", "allFiles": "Alle Dateien", "connectionDataXml": "Verbindungsdaten (XML)", "rootFolderError": "Root-Ordner konnte nicht erstellt werden.", "passwordEnterPlaceholder": "Passwort eingeben", "connectionClosed": "Verbindung getrennt", "connectionClosedTabClosing": "Verbindung getrennt – Tab schließt...", "noFolderTitle": "Kein Ordner", "noFolderMsg": "Noch kein Ordner vorhanden. Jetzt anlegen?", "importPersonalCredsMsg": "{0} neue RDP-Verbindung(en) importiert.\n\nSollen alle die Persönlichen Zugangsdaten\n(Einstellungen → Zugangsdaten) verwenden?", "dataSourceLocal": "Lokal", "dataSourceSmb": "Netzlaufwerk (SMB)", "smbPathLabel": "Pfad zur connections.json", "smbPathPlaceholder": "\\\\server\\freigabe\\rcm\\connections.json", "smbModeReadonly": "Nur lesen", "smbModeReadwrite": "Lesen & Schreiben", "smbOfflineNotice": "Netzlaufwerk nicht erreichbar – zeige letzten bekannten Stand", "ctxNotes": "Notizen…", "dataSourceChangeBtn": "Ändern…", "dataSourceLocalDetail": "Verbindungen werden lokal auf diesem Gerät gespeichert", "dataSourceDialogTitle": "Datenquelle konfigurieren", "dataSourceModeLabel": "Speicherort", "dataSourceBrowse": "Durchsuchen…", "smbModeLabel": "Zugriffsmodus", "dataSourceNoPath": "Bitte zuerst einen Pfad zur connections.json auswählen.", "dataSourceCreateTitle": "Datei anlegen?", "dataSourceCreateMsg": "Unter diesem Pfad existiert noch keine gültige connections.json:\n\n{0}\n\nSoll eine neue, leere Datei angelegt werden?", "dataSourceCreateOk": "Anlegen", "sshAuthMethod": "Anmeldung", "sshAuthPassword": "Passwort", "sshAuthKey": "Schlüsseldatei", "sshKeyPath": "Private Schlüsseldatei", "sshKeyPathPlaceholder": "Noch keine Datei ausgewählt", "sshKeyPassphraseHint": "Die Passphrase wird beim Verbinden abgefragt und nicht gespeichert.", "sshPassphraseForLabel": "Passphrase des Schlüssels für", "rdpNamePlaceholder": "z. B. Fileserver", "sshNamePlaceholder": "z. B. Webserver", "serialNamePlaceholder": "z. B. Cisco Switch", "windowRestore": "Wiederherstellen", "windowMaximize": "Maximieren", "windowMinimize": "Minimieren", "rdpHostPlaceholder": "192.168.1.1 oder server.local", "sshJumpEnable": "Über Jumphost verbinden", "sshJumpDesc": "Verbindung über einen Sprungserver leiten", "sshJumpHost": "Jumphost (Host / IP)", "sshJumpHostPlaceholder": "z. B. bastion.firma.local", "sshJumpUser": "Jumphost-Benutzer", "sshJumpKeyPath": "Jumphost-Schlüsseldatei", "sshJumpHint": "Am Jumphost wird immer per Schlüssel angemeldet. Die Passphrase wird beim Verbinden abgefragt.", "vaultUnlockTitle": "Geteilte Zugangsdaten entsperren", "vaultUnlockDesc": "Für die gemeinsam genutzten Passwörter (z. B. Switch-Zugänge) wird das Team-Passwort benötigt.", "vaultUnlockLabel": "Team-Passwort", "vaultUnlockBtn": "Entsperren", "vaultRemember": "Auf diesem Rechner merken", "vaultWrongPassword": "Falsches Passwort.", "vaultForgotLink": "Passwort vergessen?", "vaultSetupTitle": "Geteilte Zugangsdaten einrichten", "vaultSetupDesc": "Lege ein Team-Passwort fest, mit dem die gemeinsam genutzten Verbindungspasswörter verschlüsselt werden. Alle, die diese Zugänge nutzen, brauchen dieses Passwort.", "vaultSetupPw1": "Team-Passwort", "vaultSetupPw2": "Team-Passwort wiederholen", "vaultSetupBtn": "Einrichten", "vaultSetupEmpty": "Bitte ein Passwort eingeben.", "vaultSetupMismatch": "Die Passwörter stimmen nicht überein.", "vaultSetupWarn": "⚠ Wird dieses Passwort vergessen, sind die geteilten Passwörter unwiederbringlich verloren. Bewahre es sicher auf.", "vaultResetTitle": "Geteilte Passwörter zurücksetzen?", "vaultResetMsg": "Alle geteilten Passwörter werden gelöscht und der Tresor entfernt. Die Verbindungen selbst bleiben erhalten, aber die geteilten Passwörter müssen neu eingegeben werden. Fortfahren?", "vaultResetOk": "Zurücksetzen", "sshPwStorageLabel": "Passwort speichern", "sshPwModeNone": "Nicht speichern (beim Verbinden fragen)", "sshPwModePersonal": "Persönlich", "sshPwModePersonalHint": "(nur ich, lokal per DPAPI)", "sshPwModeShared": "Geteilt", "sshPwModeSharedHint": "(für alle, verschlüsselt im Team-Tresor)", "vaultNeededMsg": "Ohne entsperrten Tresor kann kein geteiltes Passwort gespeichert werden.", "vaultMissingTitle": "Tresor nicht gefunden", "vaultMissingMsg": "Diese Verbindung hat ein geteiltes Passwort, aber am aktuellen Speicherort wurde kein Tresor (vault.json) gefunden. Bitte stelle sicher, dass die Datei vault.json neben der connections.json liegt.", "dataSourcePickExisting": "Vorhandene wählen…", "dataSourcePickNew": "Neu anlegen…", "vaultStatusChecking": "Prüfe…", "vaultStatusNone": "Kein Tresor eingerichtet", "vaultStatusLocked": "Tresor vorhanden (gesperrt)", "vaultStatusUnlocked": "Tresor vorhanden (entsperrt)", "vaultResetHint": "Bei vergessenem Team-Passwort zurücksetzen. Die geteilten Passwörter gehen dabei verloren.", "vaultResetBtn": "Zurücksetzen…", "vaultResetDoneTitle": "Tresor zurückgesetzt", "vaultResetDoneMsg": "Der Tresor wurde entfernt. {0} geteilte Passwörter wurden gelöscht. Du kannst nun ein neues Team-Passwort einrichten, wenn du wieder ein geteiltes Passwort speicherst.", "rdpAllPersonalLabel": "Alle RDP-Verbindungen", "rdpAllPersonalHint": "Alle vorhandenen RDP-Verbindungen auf persönliche Anmeldung umstellen.", "rdpAllPersonalBtn": "Auf persönlich umstellen", "rdpAllPersonalNone": "Es gibt keine RDP-Verbindungen.", "rdpAllPersonalConfirmTitle": "Alle RDP auf persönlich?", "rdpAllPersonalConfirmMsg": "{0} RDP-Verbindungen werden auf persönliche Anmeldung umgestellt. Fortfahren?", "rdpAllPersonalDoneTitle": "Umgestellt", "rdpAllPersonalDoneMsg": "{0} RDP-Verbindungen wurden auf persönliche Anmeldung umgestellt.", "rdpAllPersonalAlready": "Alle RDP-Verbindungen stehen bereits auf persönlich.", "vaultForgetBtn": "Gemerktes Passwort vergessen", "vaultForgetTitle": "Gemerktes Passwort vergessen?", "vaultForgetMsg": "Das auf diesem Rechner gemerkte Team-Passwort wird entfernt. Beim nächsten Start wird wieder danach gefragt. Die geteilten Passwörter bleiben erhalten.", "vaultForgetDoneTitle": "Passwort vergessen", "vaultForgetDoneMsg": "Das gemerkte Team-Passwort wurde von diesem Rechner entfernt.", "vaultNoVaultHint": "Kein Tresor eingerichtet.", "vaultNothingRemembered": "Auf diesem Rechner ist kein Passwort gemerkt.", "quickSearchPlaceholder": "Verbindung suchen und mit Enter verbinden…", "quickSearchHint": "↑↓ Navigieren · Enter Verbinden · Esc Schließen", "quickSearchNone": "Keine Verbindung gefunden", "sectionShortcuts": "⌨ Tastenkombinationen", "shortcutQuickSearch": "Schnellsuche öffnen", "shortcutQuickSearchHint": "Globales Kürzel, das das Schnellsuche-Fenster öffnet (auch wenn die App im Hintergrund ist).", "shortcutChange": "Ändern", "shortcutDefault": "Standard", "shortcutPressKeys": "Tasten drücken…", "shortcutRecording": "Drücke die gewünschte Tastenkombination (Esc bricht ab).", "shortcutNeedModifier": "Bitte mit Strg, Shift oder Alt kombinieren.", "shortcutSaved": "Gespeichert.", "shortcutInUse": "Diese Kombination ist belegt. Bitte eine andere wählen.", "sectionConnOptions": "🔌 Verbindungsoptionen", "storageOptionsLabel": "Speicheroptionen", "storageSmbActive": "(SMB aktiv)", "storageLocalActive": "(Lokal aktiv)", "updateChecking": "Suche nach Updates…", "updateAvailable": "Version {0} ist verfügbar.", "updateInstallBtn": "Installieren", "updateDownloading": "Wird heruntergeladen…", "updateReady": "Update bereit. Zum Installieren neu starten.", "updateRestartBtn": "Neu starten", "updateError": "Update-Suche fehlgeschlagen.", "updateStartingInstaller": "Update wird installiert – die App startet gleich neu…", "aboutVersion": "Version", "webUnreachableTitle": "Seite nicht erreichbar", "webUnreachableMsg": "{0} konnte nicht geladen werden. Der Server ist möglicherweise offline oder nicht erreichbar.", "sectionBackground": "🖥 Hintergrundbetrieb", "trayMode": "Beim Schließen in den Infobereich", "trayModeDesc": "Das X versteckt RCM nur. Es läuft im Infobereich (neben der Uhr) weiter, die Schnellsuche per Tastenkürzel bleibt verfügbar. Beenden per Rechtsklick auf das Symbol.", "autostart": "Mit Windows starten", "autostartDesc": "RCM startet bei der Anmeldung unsichtbar im Infobereich. Wirkt nur in der installierten App."},
    en: {"searchPlaceholder": "🔍 Search...", "save": "Save", "cancel": "Cancel", "close": "Close", "ok": "OK", "yes": "Yes", "no": "No", "ctxNewFolder": "New Folder", "ctxRenameFolder": "Rename Folder…", "ctxDeleteFolder": "Delete Folder…", "ctxNewRdp": "New RDP Connection…", "ctxNewSsh": "New SSH Connection…", "ctxNewWeb": "New Website…", "ctxNewSerial": "New Serial Connection…", "ctxEdit": "Edit…", "ctxDelete": "Delete…", "settingsTitle": "Settings", "import": "Import", "importDesc": "mRemoteNG XML or Devolutions RDM XML", "export": "Export", "exportDesc": "Save all connections as JSON backup", "openDataFolder": "Open Data Folder", "openDataFolderBtn": "📂 Open", "sectionDesign": "🎨 Design", "darkMode": "🌙 Dark", "lightMode": "☀️ Light", "sectionSshTerminal": "🖥 SSH Terminal", "fontSize": "Font Size", "fontSizeDesc": "Applies to new SSH sessions", "sectionCredentials": "🔐 Credentials", "personalCreds": "Personal Credentials (RDP)", "username": "Username", "password": "Password", "passwordSaved": "Saved – leave empty to keep", "saveBtn": "💾 Save", "deleteBtn": "🗑 Delete", "sshPasswords": "SSH Passwords", "sshPasswordsDesc": "Per connection, saved with \"Remember\" during SSH connect", "sectionConnStatus": "📡 Connection Status", "connStatusDesc": "TCP check on connection port – green/red dot in sidebar. Hover to see latency.", "intervalOff": "Off", "interval30s": "30 sec.", "interval1m": "1 min.", "interval5m": "5 min.", "sectionLanguage": "🌐 Language", "langDesc": "Applied after restart.", "langDe": "🇩🇪 Deutsch", "langEn": "🇬🇧 English", "restartRequired": "Restart required", "restartMsg": "The language will be applied after restart.", "sectionAbout": "ℹ About", "aboutApp": "Remote Connection Manager", "aboutDesc": "Built with Electron + Node.js", "aboutConns": "Connections", "aboutFolders": "Folders", "connVerbindung": "CONNECTION", "connName": "Name", "connHostIp": "Host / IP", "connPort": "Port", "connUsername": "Username", "connAnzeige": "DISPLAY", "connFullscreen": "Fullscreen", "connWindow": "Window", "connMultiMonitor": "Multi-Monitor", "connWidth": "Width", "connOptionen": "OPTIONS", "connAdmin": "Admin Session", "connAdminDesc": "Connect as console administrator (/admin)", "connClipboard": "Clipboard", "connPrinter": "Forward Printer", "connPrinterDesc": "Make local printers available in RDP window", "connColorDepth": "Color Depth", "connAdvanced": "Advanced – Gateway & Drives", "connGatewayHost": "Gateway Host", "connUsage": "Usage", "connUsageAlways": "always", "connUsageIfNeeded": "if needed", "connUsageNever": "never", "connDrives": "Forward Drives", "connDrivesPlaceholder": "empty = none   * = all   e.g. C:;D:;", "connAnmeldedaten": "CREDENTIALS", "connUsePersonal": "Use personal credentials", "connUsePersonalDesc": "Username + Password from Settings → Personal Credentials", "connUsePersonalOff": "If disabled: Windows login dialog appears when connecting.", "sshPassword": "Password (optional)", "sshPasswordSaved": "New password (leave empty to keep existing)", "sshPasswordPlaceholder": "Empty = prompt when connecting", "sshPasswordSavedLabel": "✓ Password saved", "sshPasswordDelete": "Delete", "newRdpTitle": "New RDP Connection", "newSshTitle": "New SSH Connection", "newWebTitle": "New Web Connection", "editConnTitle": "Edit Connection", "editSshTitle": "Edit SSH", "editWebTitle": "Edit Web Connection", "serialParityNone": "None", "serialParityEven": "Even", "serialParityOdd": "Odd", "newSerialTitle": "New Serial Connection", "editSerialTitle": "Edit Serial Connection", "confirmDeleteConn": "Really delete this connection?", "confirmDeleteFolder": "Really delete folder and all its connections?", "confirmDeleteSshPasswords": "Delete all saved SSH passwords?", "confirmDeletePersonalCreds": "Really delete personal credentials?", "importError": "Import error", "exportSuccess": "Export successful", "exportError": "Export error", "startError": "Launch error", "saved": "Saved", "done": "Done", "allSshDeleted": "All saved passwords have been deleted.", "personalCredsSaved": "Personal credentials saved.", "personalCredsUpdated": "Personal credentials updated.", "importPersonalTitle": "Personal Credentials", "connecting": "Connecting...", "connInfoNotes": "NOTES", "connInfoNotesPlaceholder": "Enter connection notes…", "connInfoSaved": "✓ Saved", "connInfoError": "Error saving", "folderName": "Folder name", "folderNamePlaceholder": "e.g. Production", "renameFolderTitle": "Rename Folder", "noResults": "No results.", "openDataFolderDesc": "Open folder containing connections.json in Explorer", "themeAppliedImmediately": "Applied immediately", "closeTab": "Close tab", "ctxNewSubFolder": "New Subfolder…", "emptyStateHint": "Right-click → New Folder / New Connection", "rdpError": "RDP Error", "rdpConnectFailed": "Failed to start.", "sshConnError": "SSH Connection Error", "sshConnFailed": "Connection failed.", "exportedTo": "Saved to:\n{0}", "deleteTitle": "Delete", "deleteFolderTitle": "Delete Folder", "deleteConnTitle": "Delete Connection", "deletePasswordsTitle": "Delete Passwords", "unknownTypesNote": "Unknown types (please report):", "sshPasswordKeepPlaceholder": "Leave empty to keep saved password", "importInvalidXml": "The file could not be read as XML.", "importUnknownFormat": "Unknown format.\nSupported: mRemoteNG XML, Devolutions RDM XML", "sshPasswordForLabel": "Password for", "confirmTitle": "Confirm", "continueQuestion": "Continue?", "newSubfolderTitle": "New Subfolder", "newNameLabel": "New Name", "errorTitle": "Error", "allFiles": "All Files", "connectionDataXml": "Connection Data (XML)", "rootFolderError": "Root folder could not be created.", "passwordEnterPlaceholder": "Enter password", "connectionClosed": "Connection closed", "connectionClosedTabClosing": "Connection closed – tab closing...", "noFolderTitle": "No Folder", "noFolderMsg": "No folder exists yet. Create one now?", "importPersonalCredsMsg": "{0} new RDP connection(s) imported.\n\nUse personal credentials\n(Settings → Credentials) for all of them?", "dataSourceLocal": "Local", "dataSourceSmb": "Network Drive (SMB)", "smbPathLabel": "Path to connections.json", "smbPathPlaceholder": "\\\\server\\share\\rcm\\connections.json", "smbModeReadonly": "Read only", "smbModeReadwrite": "Read & Write", "smbOfflineNotice": "Network drive unreachable – showing last known state", "ctxNotes": "Notes…", "dataSourceChangeBtn": "Change…", "dataSourceLocalDetail": "Connections are stored locally on this device", "dataSourceDialogTitle": "Configure Data Source", "dataSourceModeLabel": "Storage location", "dataSourceBrowse": "Browse…", "smbModeLabel": "Access mode", "dataSourceNoPath": "Please select a path to connections.json first.", "dataSourceCreateTitle": "Create file?", "dataSourceCreateMsg": "No valid connections.json exists at this path yet:\n\n{0}\n\nCreate a new, empty file?", "dataSourceCreateOk": "Create", "sshAuthMethod": "Authentication", "sshAuthPassword": "Password", "sshAuthKey": "Key file", "sshKeyPath": "Private key file", "sshKeyPathPlaceholder": "No file selected yet", "sshKeyPassphraseHint": "The passphrase is prompted when connecting and is never stored.", "sshPassphraseForLabel": "Key passphrase for", "rdpNamePlaceholder": "e.g. Fileserver", "sshNamePlaceholder": "e.g. Webserver", "serialNamePlaceholder": "e.g. Cisco Switch", "windowRestore": "Restore", "windowMaximize": "Maximize", "windowMinimize": "Minimize", "rdpHostPlaceholder": "192.168.1.1 or server.local", "sshJumpEnable": "Connect via jumphost", "sshJumpDesc": "Route the connection through a bastion server", "sshJumpHost": "Jumphost (host / IP)", "sshJumpHostPlaceholder": "e.g. bastion.company.local", "sshJumpUser": "Jumphost user", "sshJumpKeyPath": "Jumphost key file", "sshJumpHint": "The jumphost always authenticates by key. The passphrase is prompted when connecting.", "vaultUnlockTitle": "Unlock shared credentials", "vaultUnlockDesc": "The team password is required for the shared passwords (e.g. switch access).", "vaultUnlockLabel": "Team password", "vaultUnlockBtn": "Unlock", "vaultRemember": "Remember on this computer", "vaultWrongPassword": "Wrong password.", "vaultForgotLink": "Forgot password?", "vaultSetupTitle": "Set up shared credentials", "vaultSetupDesc": "Set a team password used to encrypt the shared connection passwords. Everyone using these will need this password.", "vaultSetupPw1": "Team password", "vaultSetupPw2": "Repeat team password", "vaultSetupBtn": "Set up", "vaultSetupEmpty": "Please enter a password.", "vaultSetupMismatch": "The passwords do not match.", "vaultSetupWarn": "⚠ If this password is lost, the shared passwords are gone for good. Keep it safe.", "vaultResetTitle": "Reset shared passwords?", "vaultResetMsg": "All shared passwords will be deleted and the vault removed. The connections themselves remain, but shared passwords must be re-entered. Continue?", "vaultResetOk": "Reset", "sshPwStorageLabel": "Save password", "sshPwModeNone": "Don't save (ask when connecting)", "sshPwModePersonal": "Personal", "sshPwModePersonalHint": "(only me, locally via DPAPI)", "sshPwModeShared": "Shared", "sshPwModeSharedHint": "(for everyone, encrypted in the team vault)", "vaultNeededMsg": "A shared password cannot be saved without an unlocked vault.", "vaultMissingTitle": "Vault not found", "vaultMissingMsg": "This connection has a shared password, but no vault (vault.json) was found at the current storage location. Please make sure vault.json is next to connections.json.", "dataSourcePickExisting": "Choose existing…", "dataSourcePickNew": "Create new…", "vaultStatusChecking": "Checking…", "vaultStatusNone": "No vault set up", "vaultStatusLocked": "Vault present (locked)", "vaultStatusUnlocked": "Vault present (unlocked)", "vaultResetHint": "Reset if the team password was forgotten. The shared passwords will be lost.", "vaultResetBtn": "Reset…", "vaultResetDoneTitle": "Vault reset", "vaultResetDoneMsg": "The vault was removed. {0} shared passwords were deleted. You can set up a new team password when you next save a shared password.", "rdpAllPersonalLabel": "All RDP connections", "rdpAllPersonalHint": "Switch all existing RDP connections to personal login.", "rdpAllPersonalBtn": "Switch to personal", "rdpAllPersonalNone": "There are no RDP connections.", "rdpAllPersonalConfirmTitle": "Switch all RDP to personal?", "rdpAllPersonalConfirmMsg": "{0} RDP connections will be switched to personal login. Continue?", "rdpAllPersonalDoneTitle": "Switched", "rdpAllPersonalDoneMsg": "{0} RDP connections were switched to personal login.", "rdpAllPersonalAlready": "All RDP connections are already set to personal.", "vaultForgetBtn": "Forget remembered password", "vaultForgetTitle": "Forget remembered password?", "vaultForgetMsg": "The team password remembered on this computer will be removed. You will be asked for it again on next start. The shared passwords remain intact.", "vaultForgetDoneTitle": "Password forgotten", "vaultForgetDoneMsg": "The remembered team password was removed from this computer.", "vaultNoVaultHint": "No vault set up.", "vaultNothingRemembered": "No password is remembered on this computer.", "quickSearchPlaceholder": "Search connection and press Enter to connect…", "quickSearchHint": "↑↓ Navigate · Enter Connect · Esc Close", "quickSearchNone": "No connection found", "sectionShortcuts": "⌨ Keyboard shortcuts", "shortcutQuickSearch": "Open quick search", "shortcutQuickSearchHint": "Global shortcut that opens the quick search window (even when the app is in the background).", "shortcutChange": "Change", "shortcutDefault": "Default", "shortcutPressKeys": "Press keys…", "shortcutRecording": "Press the desired key combination (Esc to cancel).", "shortcutNeedModifier": "Please combine with Ctrl, Shift or Alt.", "shortcutSaved": "Saved.", "shortcutInUse": "This combination is in use. Please choose another.", "sectionConnOptions": "🔌 Connection options", "storageOptionsLabel": "Storage options", "storageSmbActive": "(SMB active)", "storageLocalActive": "(Local active)", "updateChecking": "Checking for updates…", "updateAvailable": "Version {0} is available.", "updateInstallBtn": "Install", "updateDownloading": "Downloading…", "updateReady": "Update ready. Restart to install.", "updateRestartBtn": "Restart", "updateError": "Update check failed.", "updateStartingInstaller": "Installing update – the app will restart shortly…", "aboutVersion": "Version", "webUnreachableTitle": "Page unreachable", "webUnreachableMsg": "{0} could not be loaded. The server may be offline or unreachable.", "sectionBackground": "🖥 Background mode", "trayMode": "Minimize to tray on close", "trayModeDesc": "The X only hides RCM. It keeps running in the notification area (next to the clock) and the quick search shortcut stays available. Quit via right-click on the icon.", "autostart": "Start with Windows", "autostartDesc": "RCM starts hidden in the notification area when you sign in. Only works in the installed app."}
  };
  let _tr = _EMBEDDED.de;
  let _lang = "de";
  // Sprache IMMER direkt aus settings lesen – zuverlässigste Quelle
  try {
    const _s = await window.api.settings.load();
    if (_s?.language) {
      _lang = _s.language;
    } else {
      // Erster Start: Systemsprache verwenden
      const syslang = navigator.language || navigator.userLanguage || "de";
      _lang = syslang.toLowerCase().startsWith("de") ? "de" : "en";
    }
  } catch {
    _lang = "de";
  }
  _tr = _EMBEDDED[_lang] || _EMBEDDED.de;
  // Zusätzlich externe Locale-Datei laden wenn vorhanden
  try {
    const loc = await window.api.locale.get();
    if (loc?.translations && Object.keys(loc.translations).length > 5) {
      _tr = loc.translations;
    }
  } catch {}
  function t(key, ...args) {
    let s = _tr[key] ?? _EMBEDDED.de[key] ?? key;
    args.forEach((a, i) => { s = s.replace(`{${i}}`, a); });
    return s;
  }
  document.documentElement.setAttribute("lang", _lang);

  // Statische index.html-Attribute nachträglich übersetzen
  const _settingsBtn = document.querySelector('#settings-btn');
  if (_settingsBtn) _settingsBtn.title = t("settingsTitle");
  const _searchInput = document.querySelector('#search-input');
  if (_searchInput) _searchInput.placeholder = t("searchPlaceholder");
  const _minBtn = document.querySelector('#min-btn');
  if (_minBtn) _minBtn.title = t("windowMinimize");
  const _maxBtn0 = document.querySelector('#max-btn');
  if (_maxBtn0) _maxBtn0.title = t("windowMaximize");
  const _closeBtn = document.querySelector('#close-btn');
  if (_closeBtn) _closeBtn.title = t("close");

  function escHtml(s) {
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  /* =========================
     Window Controls
  ========================== */
  const minBtn=document.getElementById("min-btn"),maxBtn=document.getElementById("max-btn"),
        closeBtn=document.getElementById("close-btn"),maxIcon=document.getElementById("max-icon");
  if(minBtn)  minBtn.addEventListener("click",  ()=>window.api?.minimize?.());
  if(maxBtn)  maxBtn.addEventListener("click",  ()=>window.api?.maximize?.());
  if(closeBtn)closeBtn.addEventListener("click",()=>window.api?.close?.());
  if(window.api?.onWindowState&&maxBtn&&maxIcon){
    window.api.onWindowState((s)=>{
      // Windows-11-Symbole: E923 = Wiederherstellen (zwei Fenster), E922 = Maximieren
      if(s?.isMaximized){maxBtn.title=t("windowRestore");maxIcon.textContent="";}
      else{maxBtn.title=t("windowMaximize");maxIcon.textContent="";}
    });
  }
  const dragRegion=document.querySelector(".drag-region");
  if(dragRegion)dragRegion.addEventListener("dblclick",()=>window.api?.maximize?.());

  /* =========================================================
     Settings laden
  ========================================================== */
  const DEFAULT_SETTINGS = { sshFontSize: 14, theme: "dark" }; // "dark" | "light"
  let appSettings = { ...DEFAULT_SETTINGS };
  try {
    const saved = await window.api.settings.load();
    if (saved && typeof saved === "object") Object.assign(appSettings, saved);
  } catch {}
  async function saveSettings() { try { await window.api.settings.save(appSettings); } catch {} }

  /* Theme-System */
  function resolvedTheme() {
    return appSettings.theme === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    const resolved = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", resolved);

    // Offene Terminals updaten.
    // try/catch nötig: beim ersten Aufruf (Startup) ist `tabs` noch
    // nicht initialisiert (Temporal Dead Zone) – dann einfach überspringen.
    try {
      for (const [, tab] of tabs) {
        if ((tab.type === "ssh" || tab.type === "serial") && tab.term) {
          tab.term.options.theme = getTerminalTheme();
        }
      }
    } catch {}
  }

  function getTerminalTheme() {
    const t = resolvedTheme();
    return t === "light"
      ? { background: "#f8f8f8", foreground: "#1e1e1e", cursor: "#1e1e1e", selection: "rgba(0,0,0,0.15)" }
      : { background: "#1e1e1e", foreground: "#ddd",    cursor: "#ddd",    selection: "rgba(255,255,255,0.3)" };
  }

  // Beim Start Theme anwenden
  applyTheme(appSettings.theme || "dark");



  /* =========================================================
     Modals
  ========================================================== */
  function showPrompt({title="Eingabe",label="Wert",placeholder="",defaultValue="",password=false}={}) {
    return new Promise((resolve)=>{
      const bd=document.createElement("div");bd.className="modal-backdrop";
      const m=document.createElement("div");m.className="modal";
      m.innerHTML=`<div class="modal-header">${escHtml(title)}</div><div class="modal-body"><label>${escHtml(label)}</label><input type="${password?"password":"text"}" id="mi" placeholder="${String(placeholder).replaceAll('"',"&quot;")}"/></div><div class="modal-actions"><button class="btn" id="mc">${t("cancel")}</button><button class="btn primary" id="mo">${t("ok")}</button></div>`;
      bd.appendChild(m);document.body.appendChild(bd);
      const inp=m.querySelector("#mi");inp.value=defaultValue??"";inp.focus();inp.select();
      const cl=(v)=>{bd.remove();resolve(v);};
      m.querySelector("#mo").addEventListener("click",()=>cl(inp.value));
      m.querySelector("#mc").addEventListener("click",()=>cl(null));
      bd.addEventListener("click",(e)=>{if(e.target===bd)cl(null);});
      m.addEventListener("keydown",(e)=>{if(e.key==="Enter")cl(inp.value);if(e.key==="Escape")cl(null);});
      m.addEventListener("contextmenu",(e)=>e.preventDefault());
    });
  }

  function showConfirm({title=t("confirmTitle"),message=t("continueQuestion"),okLabel=t("ok"),cancelLabel=t("cancel")}={}) {
    return new Promise((resolve)=>{
      const bd=document.createElement("div");bd.className="modal-backdrop";
      const m=document.createElement("div");m.className="modal";
      m.innerHTML=`<div class="modal-header">${escHtml(title)}</div><div class="modal-body"><div style="font-size:14px;line-height:1.5;white-space:pre-wrap">${escHtml(message)}</div></div><div class="modal-actions"><button class="btn" id="mc">${escHtml(cancelLabel)}</button><button class="btn primary" id="mo">${escHtml(okLabel)}</button></div>`;
      bd.appendChild(m);document.body.appendChild(bd);
      const cl=(v)=>{bd.remove();resolve(v);};
      m.querySelector("#mo").addEventListener("click",()=>cl(true));
      m.querySelector("#mc").addEventListener("click",()=>cl(false));
      bd.addEventListener("click",(e)=>{if(e.target===bd)cl(false);});
      m.addEventListener("keydown",(e)=>{if(e.key==="Escape")cl(false);if(e.key==="Enter")cl(true);});
      m.addEventListener("contextmenu",(e)=>e.preventDefault());
    });
  }

  function showAlert({title="Hinweis",message=""}={}) {
    return new Promise((resolve)=>{
      const bd=document.createElement("div");bd.className="modal-backdrop";
      const m=document.createElement("div");m.className="modal";
      m.innerHTML=`<div class="modal-header">${escHtml(title)}</div><div class="modal-body"><div style="font-size:14px;line-height:1.5;white-space:pre-wrap">${escHtml(message)}</div></div><div class="modal-actions"><button class="btn primary" id="mo">OK</button></div>`;
      bd.appendChild(m);document.body.appendChild(bd);
      const cl=()=>{bd.remove();resolve(true);};
      m.querySelector("#mo").addEventListener("click",cl);
      bd.addEventListener("click",(e)=>{if(e.target===bd)cl();});
      m.addEventListener("keydown",(e)=>{if(e.key==="Escape"||e.key==="Enter")cl();});
      m.addEventListener("contextmenu",(e)=>e.preventDefault());
    });
  }

  /* =========================================================
     Forms
  ========================================================== */
  async function showConnectionForm({title, defaults={}}={}) {
    return new Promise((resolve) => {
      const bd=document.createElement("div"); bd.className="modal-backdrop";
      const m=document.createElement("div");  m.className="modal modal-wide";
      const p = defaults.profile || {};
      const hasSaved = !!defaults.hasSavedPassword;

      m.innerHTML=`
<div class="modal-header">${escHtml(title||t("editConnTitle"))}</div>
<div class="modal-body rdp-form">

  <div class="rdp-section">
    <div class="rdp-section-title">${t("connVerbindung")}</div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow"><label>${t("connName")}</label>
        <input type="text" id="f-name" placeholder="${t('rdpNamePlaceholder')}"/></div>
    </div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow"><label>${t("connHostIp")}</label>
        <input type="text" id="f-host" placeholder="${t('rdpHostPlaceholder')}"/></div>
      <div class="rdp-field" style="width:82px"><label>${t("connPort")}</label>
        <input type="text" id="f-port" value="3389"/></div>
    </div>
    </div>
  </div>

  <div class="rdp-section">
    <div class="rdp-section-title">${t("connAnmeldedaten")}</div>
    <div class="rdp-toggle-row">
      <div class="rdp-toggle-info">
        <span>${t("connUsePersonal")}</span>
        <span class="rdp-toggle-desc">${t("connUsePersonalDesc")}</span>
      </div>
      <label class="toggle">
        <input type="checkbox" id="p-use-personal" ${defaults.credMode==="personal"?"checked":""}>
        <span class="toggle-track"><span class="toggle-thumb"></span></span>
      </label>
    </div>
    <div style="margin-top:6px;font-size:11px;color:var(--tx-6)">
      ${t("connUsePersonalOff")}
    </div>
  </div>

  <div class="rdp-section">
    <div class="rdp-section-title">${t("connAnzeige")}</div>
    <div class="rdp-display-options">
      <label class="rdp-display-card">
        <input type="radio" name="rdp-disp" value="fullscreen" id="p-full">
        <div class="rdp-display-card-inner"><div class="rdp-display-icon">&#x26F6;</div><div>${t("connFullscreen")}</div></div>
      </label>
      <label class="rdp-display-card">
        <input type="radio" name="rdp-disp" value="window" id="p-win">
        <div class="rdp-display-card-inner"><div class="rdp-display-icon">&#x2291;</div><div>${t("connWindow")}</div></div>
      </label>
      <label class="rdp-display-card">
        <input type="radio" name="rdp-disp" value="multimon" id="p-mm">
        <div class="rdp-display-card-inner"><div class="rdp-display-icon">&#x1F5A5;</div><div>${t("connMultiMonitor")}</div></div>
      </label>
    </div>
    <div id="rdp-res-row" class="rdp-field-row" style="display:none">
      <div class="rdp-field" style="width:90px"><label>${t("connWidth")}</label>
        <input type="number" id="p-w" placeholder="1920"/></div>
      <div class="rdp-field-sep">&times;</div>
      <div class="rdp-field" style="width:90px"><label>H&ouml;he</label>
        <input type="number" id="p-h" placeholder="1080"/></div>
    </div>
  </div>

  <div class="rdp-section">
    <div class="rdp-section-title">${t("connOptionen")}</div>
    <div class="rdp-toggle-row">
      <div class="rdp-toggle-info"><span>${t("connAdmin")}</span>
        <span class="rdp-toggle-desc">${t("connAdminDesc")}</span></div>
      <label class="toggle"><input type="checkbox" id="p-ad">
        <span class="toggle-track"><span class="toggle-thumb"></span></span></label>
    </div>
    <div class="rdp-toggle-row">
      <div class="rdp-toggle-info"><span>${t("connClipboard")}</span>
        <span class="rdp-toggle-desc">Kopieren / Einf&uuml;gen zwischen lokal und remote</span></div>
      <label class="toggle"><input type="checkbox" id="p-cb" checked>
        <span class="toggle-track"><span class="toggle-thumb"></span></span></label>
    </div>
    <div class="rdp-toggle-row">
      <div class="rdp-toggle-info"><span>${t("connPrinter")}</span>
        <span class="rdp-toggle-desc">${t("connPrinterDesc")}</span></div>
      <label class="toggle"><input type="checkbox" id="p-pr">
        <span class="toggle-track"><span class="toggle-thumb"></span></span></label>
    </div>
    <div class="rdp-field-row" style="margin-top:12px">
      <div class="rdp-field" style="width:170px"><label>${t("connColorDepth")}</label>
        <select id="p-bpp">
          <option value="32">32 Bit (True Color)</option>
          <option value="24">24 Bit</option>
          <option value="16">16 Bit (High Color)</option>
        </select></div>
    </div>
  </div>

  <details class="rdp-advanced">
    <summary class="rdp-advanced-summary">${t("connAdvanced")}</summary>
    <div class="rdp-advanced-body">
      <div class="rdp-field-row">
        <div class="rdp-field rdp-field-grow"><label>${t("connGatewayHost")}</label>
          <input type="text" id="p-gh" placeholder="rdgw.firma.local"/></div>
        <div class="rdp-field" style="width:130px"><label>${t("connUsage")}</label>
          <select id="p-gu">
            <option value="2">${t("connUsageAlways")}</option>
            <option value="1">${t("connUsageIfNeeded")}</option>
            <option value="0">${t("connUsageNever")}</option>
          </select></div>
      </div>
      <div class="rdp-field-row">
        <div class="rdp-field rdp-field-grow"><label>${t("connDrives")}</label>
          <input type="text" id="p-dr" placeholder="${t('connDrivesPlaceholder')}"/></div>
      </div>
    </div>
  </details>

</div>
<div class="modal-actions">
  <button class="btn" id="btn-cancel">${t("cancel")}</button>
  <button class="btn primary" id="btn-ok">${t("save")}</button>
</div>`;

      bd.appendChild(m); document.body.appendChild(bd);

      // Prefill
      m.querySelector("#f-name").value = defaults.name || "";
      m.querySelector("#f-host").value = defaults.host || "";
      m.querySelector("#f-port").value = defaults.port != null ? String(defaults.port) : "3389";

      m.querySelector("#p-bpp").value  = String(p.colorDepth ?? 32);
      m.querySelector("#p-w").value    = p.width  != null ? String(p.width)  : "";
      m.querySelector("#p-h").value    = p.height != null ? String(p.height) : "";
      m.querySelector("#p-dr").value   = p.drives || "";
      m.querySelector("#p-gh").value   = p.gateway?.host || "";
      m.querySelector("#p-gu").value   = String(p.gateway?.usage ?? 2);
      m.querySelector("#p-ad").checked = !!p.admin;
      m.querySelector("#p-cb").checked = p.clipboard !== false;
      m.querySelector("#p-pr").checked = !!p.printers;

      // Anzeige-Modus vorbelegen
      const resRow = m.querySelector("#rdp-res-row");
      if (p.multimon)             { m.querySelector("#p-mm").checked = true; }
      else if (p.fullscreen===false){ m.querySelector("#p-win").checked = true; resRow.style.display = "flex"; }
      else                        { m.querySelector("#p-full").checked = true; }
      m.querySelectorAll('input[name="rdp-disp"]').forEach(r => {
        r.addEventListener("change", () => {
          resRow.style.display = (r.value === "window" && r.checked) ? "flex" : "none";
        });
      });

      const fN = m.querySelector("#f-name"); fN.focus(); fN.select();
      const cl = (v) => { bd.remove(); resolve(v); };

      m.querySelector("#btn-ok").addEventListener("click", () => {
        const host = m.querySelector("#f-host").value.trim();
        if (!host) { m.querySelector("#f-host").focus(); return; }
        const portStr = m.querySelector("#f-port").value.trim();
        const port = portStr ? Number(portStr) : undefined;
        if (portStr && (!Number.isFinite(port) || port <= 0 || port > 65535)) { m.querySelector("#f-port").focus(); return; }
        const dispMode = m.querySelector('input[name="rdp-disp"]:checked')?.value || "fullscreen";
        const profile = {
          fullscreen: dispMode !== "window",
          multimon:   dispMode === "multimon",
          admin:      m.querySelector("#p-ad").checked,
          clipboard:  m.querySelector("#p-cb").checked,
          printers:   m.querySelector("#p-pr").checked,
          colorDepth: Number(m.querySelector("#p-bpp").value),
          width:      dispMode === "window" && m.querySelector("#p-w").value ? Number(m.querySelector("#p-w").value) : undefined,
          height:     dispMode === "window" && m.querySelector("#p-h").value ? Number(m.querySelector("#p-h").value) : undefined,
          drives:     m.querySelector("#p-dr").value.trim(),
          gateway: {
            host:  m.querySelector("#p-gh").value.trim() || undefined,
            usage: Number(m.querySelector("#p-gu").value),
          },
        };
        const usePersonal = m.querySelector("#p-use-personal").checked;
        cl({
          name: m.querySelector("#f-name").value.trim() || host, host, port, profile,
          credMode: usePersonal ? "personal" : "none",
        });
      });
      m.querySelector("#btn-cancel").addEventListener("click", () => cl(null));
      bd.addEventListener("click", (e) => { if (e.target === bd) cl(null); });
      m.addEventListener("keydown", (e) => { if (e.key === "Escape") cl(null); });
      m.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }
  async function showSshForm({title, defaults={}}={}) {
    return new Promise((resolve) => {
      const bd=document.createElement("div");bd.className="modal-backdrop";
      const m=document.createElement("div");m.className="modal";
      const hasSaved = !!defaults.hasSavedPassword;

      m.innerHTML=`
<div class="modal-header">${escHtml(title||t("editSshTitle"))}</div>
<div class="modal-body rdp-form">
  <div class="rdp-section">
    <div class="rdp-section-title">${t("connVerbindung")}</div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow"><label>${t("connName")}</label>
        <input type="text" id="s-name" placeholder="${t('sshNamePlaceholder')}"/></div>
    </div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow"><label>${t("connHostIp")}</label>
        <input type="text" id="s-host"/></div>
      <div class="rdp-field" style="width:80px"><label>${t("connPort")}</label>
        <input type="text" id="s-port" value="22"/></div>
    </div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow"><label>${t("connUsername")}</label>
        <input type="text" id="s-user" placeholder="root"/></div>
    </div>
  </div>
      <div class="rdp-section" style="border-bottom:none">
    <div class="rdp-section-title">${t("sshAuthMethod")}</div>
    <div style="display:flex;gap:10px;margin-bottom:14px">
      <label class="rdp-display-card" style="flex:1">
        <input type="radio" name="s-auth" value="password" ${defaults.authType!=="key"?"checked":""}/>
        <div class="rdp-display-card-inner" style="padding:10px 8px;text-align:center;font-size:13px">🔑 ${t("sshAuthPassword")}</div>
      </label>
      <label class="rdp-display-card" style="flex:1">
        <input type="radio" name="s-auth" value="key" ${defaults.authType==="key"?"checked":""}/>
        <div class="rdp-display-card-inner" style="padding:10px 8px;text-align:center;font-size:13px">📄 ${t("sshAuthKey")}</div>
      </label>
    </div>

    <div id="s-auth-password" style="display:${defaults.authType==="key"?"none":"block"}">
      <div class="rdp-field-row"><div class="rdp-field rdp-field-grow">
        <label>${hasSaved?t("sshPasswordSaved"):t("sshPassword")}</label>
        <input type="password" id="s-pass"
          placeholder="${hasSaved?t("sshPasswordKeepPlaceholder"):t("sshPasswordPlaceholder")}"/>
      </div></div>
      <div class="pw-storage">
        <div class="pw-storage-title">${t("sshPwStorageLabel")}</div>
        <label class="pw-storage-opt">
          <input type="radio" name="s-pwmode" value="none" ${(!hasSaved && defaults.sharedPassword==null)?"checked":""}/>
          <span class="pw-storage-main">${t("sshPwModeNone")}</span>
        </label>
        <label class="pw-storage-opt">
          <input type="radio" name="s-pwmode" value="personal" ${hasSaved?"checked":""}/>
          <span class="pw-storage-main">${t("sshPwModePersonal")}</span>
          <span class="pw-storage-hint">${t("sshPwModePersonalHint")}</span>
        </label>
        <label class="pw-storage-opt">
          <input type="radio" name="s-pwmode" value="shared" ${defaults.sharedPassword!=null?"checked":""}/>
          <span class="pw-storage-main">${t("sshPwModeShared")}</span>
          <span class="pw-storage-hint">${t("sshPwModeSharedHint")}</span>
        </label>
      </div>
      ${hasSaved?`<div style="margin-top:8px;font-size:11px;color:var(--tx-5)">${t("sshPasswordSavedLabel")} &nbsp;<a href="#" id="s-clearpw" style="color:var(--err);text-decoration:none">${t("sshPasswordDelete")}</a></div>`:""}
    </div>

    <div id="s-auth-key" style="display:${defaults.authType==="key"?"block":"none"}">
      <div class="rdp-field-row"><div class="rdp-field rdp-field-grow">
        <label>${t("sshKeyPath")}</label>
        <div style="display:flex;gap:8px">
          <input type="text" id="s-keypath" readonly placeholder="${t("sshKeyPathPlaceholder")}"
            style="flex:1;box-sizing:border-box;padding:8px 10px;font-size:12px;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:6px;outline:none;font-family:monospace"/>
          <button class="btn" id="s-keybrowse" type="button">${t("dataSourceBrowse")}</button>
        </div>
      </div></div>
      <div style="margin-top:8px;font-size:11px;color:var(--tx-5)">${t("sshKeyPassphraseHint")}</div>
    </div>
  </div>

  <div class="rdp-section" style="border-bottom:none">
    <div class="rdp-toggle-row">
      <div class="rdp-toggle-info">
        <span>${t("sshJumpEnable")}</span>
        <span class="rdp-toggle-desc">${t("sshJumpDesc")}</span>
      </div>
      <label class="toggle">
        <input type="checkbox" id="s-jump-enable" ${defaults.jump?"checked":""}>
        <span class="toggle-track"><span class="toggle-thumb"></span></span>
      </label>
    </div>
    <div id="s-jump-fields" style="display:${defaults.jump?"block":"none"};margin-top:12px">
      <div class="rdp-field-row">
        <div class="rdp-field rdp-field-grow"><label>${t("sshJumpHost")}</label>
          <input type="text" id="s-jump-host" placeholder="${t('sshJumpHostPlaceholder')}"/></div>
        <div class="rdp-field" style="width:80px"><label>${t("connPort")}</label>
          <input type="text" id="s-jump-port" value="22"/></div>
      </div>
      <div class="rdp-field-row">
        <div class="rdp-field rdp-field-grow"><label>${t("sshJumpUser")}</label>
          <input type="text" id="s-jump-user" placeholder="root"/></div>
      </div>
      <div class="rdp-field-row"><div class="rdp-field rdp-field-grow">
        <label>${t("sshJumpKeyPath")}</label>
        <div style="display:flex;gap:8px">
          <input type="text" id="s-jump-keypath" readonly placeholder="${t("sshKeyPathPlaceholder")}"
            style="flex:1;box-sizing:border-box;padding:8px 10px;font-size:12px;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:6px;outline:none;font-family:monospace"/>
          <button class="btn" id="s-jump-keybrowse" type="button">${t("dataSourceBrowse")}</button>
        </div>
      </div></div>
      <div style="margin-top:8px;font-size:11px;color:var(--tx-5)">${t("sshJumpHint")}</div>
    </div>
  </div>
<div class="modal-actions">
  <button class="btn" id="btn-cancel">${t("cancel")}</button>
  <button class="btn primary" id="btn-ok">${t("save")}</button>
</div>`;

      bd.appendChild(m); document.body.appendChild(bd);
      m.querySelector("#s-name").value = defaults.name  || "";
      m.querySelector("#s-host").value = defaults.host  || "";
      m.querySelector("#s-port").value = defaults.port  != null ? String(defaults.port) : "22";
      m.querySelector("#s-user").value = defaults.username || "";
      m.querySelector("#s-name").focus(); m.querySelector("#s-name").select();

      // Auth-Umschaltung Passwort/Schlüssel
      let keyPath = defaults.keyPath || "";
      const kpInput = m.querySelector("#s-keypath");
      if (kpInput) kpInput.value = keyPath;
      m.querySelectorAll('input[name="s-auth"]').forEach(r => {
        r.addEventListener("change", () => {
          m.querySelector("#s-auth-password").style.display = r.value === "password" ? "block" : "none";
          m.querySelector("#s-auth-key").style.display      = r.value === "key"      ? "block" : "none";
        });
      });
      m.querySelector("#s-keybrowse")?.addEventListener("click", async () => {
        const picked = await window.api.ssh.pickKeyPath();
        if (picked?.filePath) { keyPath = picked.filePath; if (kpInput) kpInput.value = keyPath; }
      });

      // ── Jumphost ──
      let jumpKeyPath = defaults.jump?.keyPath || "";
      const jkpInput = m.querySelector("#s-jump-keypath");
      if (jkpInput) jkpInput.value = jumpKeyPath;
      if (defaults.jump) {
        m.querySelector("#s-jump-host").value = defaults.jump.host || "";
        m.querySelector("#s-jump-port").value = defaults.jump.port != null ? String(defaults.jump.port) : "22";
        m.querySelector("#s-jump-user").value = defaults.jump.username || "";
      }
      m.querySelector("#s-jump-enable")?.addEventListener("change", (e) => {
        m.querySelector("#s-jump-fields").style.display = e.target.checked ? "block" : "none";
      });
      m.querySelector("#s-jump-keybrowse")?.addEventListener("click", async () => {
        const picked = await window.api.ssh.pickKeyPath();
        if (picked?.filePath) { jumpKeyPath = picked.filePath; if (jkpInput) jkpInput.value = jumpKeyPath; }
      });

      // Credential-Modus-Umschalter
      const credSection=m.querySelector("#cred-section");
      if(credSection){
        const personalInfo=m.querySelector("#cm-personal-info");
        const ownSection=m.querySelector("#cm-own-section");
        m.querySelectorAll('input[name="cred-mode"]').forEach(r=>{
          r.addEventListener("change",()=>{
            personalInfo.style.display=r.value==="personal"&&r.checked?"block":"none";
            ownSection.style.display=r.value==="own"&&r.checked?"block":"none";
          });
        });
        m.querySelector("#cred-clearpw")?.addEventListener("click",(e)=>{
          e.preventDefault();
          m.querySelector("#cred-save").checked=false;
          m.querySelector("#cred-clearpw")?.closest("div")?.remove();
        });
      }

      // "Passwort löschen"-Link
      m.querySelector("#s-clearpw")?.addEventListener("click", async (e) => {
        e.preventDefault();
        const noneRadio = m.querySelector('input[name="s-pwmode"][value="none"]');
        if (noneRadio) noneRadio.checked = true;
        m.querySelector("#s-clearpw").closest("div").remove();
        m.querySelector("#s-pass").placeholder = t("sshPasswordPlaceholder");
      });

      const cl = (v) => { bd.remove(); resolve(v); };

      m.querySelector("#btn-ok").addEventListener("click", () => {
        const host = m.querySelector("#s-host").value.trim();
        const user = m.querySelector("#s-user").value.trim();
        if (!host) { m.querySelector("#s-host").focus(); return; }
        if (!user) { m.querySelector("#s-user").focus(); return; }
        const port = Number(m.querySelector("#s-port").value.trim() || "22");
        if (!Number.isFinite(port) || port <= 0 || port > 65535) { m.querySelector("#s-port").focus(); return; }
        const authSel = m.querySelector('input[name="s-auth"]:checked')?.value === "key" ? "key" : "password";
        if (authSel === "key" && !keyPath.trim()) { m.querySelector("#s-keybrowse")?.focus(); return; }

        // Jumphost auslesen (nur wenn aktiviert)
        const jumpOn = !!m.querySelector("#s-jump-enable")?.checked;
        let jumpHost = "", jumpPort = 22, jumpUser = "", jKeyPath = "";
        if (jumpOn) {
          jumpHost = m.querySelector("#s-jump-host").value.trim();
          jumpUser = m.querySelector("#s-jump-user").value.trim();
          jKeyPath = jumpKeyPath.trim();
          const jp = Number(m.querySelector("#s-jump-port").value.trim() || "22");
          if (!jumpHost) { m.querySelector("#s-jump-host").focus(); return; }
          if (!jumpUser) { m.querySelector("#s-jump-user").focus(); return; }
          if (!jKeyPath) { m.querySelector("#s-jump-keybrowse")?.focus(); return; }
          if (!Number.isFinite(jp) || jp <= 0 || jp > 65535) { m.querySelector("#s-jump-port").focus(); return; }
          jumpPort = jp;
        }

        const pwMode = authSel === "key" ? "none"
          : (m.querySelector('input[name="s-pwmode"]:checked')?.value || "none");

        cl({
          name: m.querySelector("#s-name").value.trim() || host,
          host, port, username: user,
          authType: authSel,
          keyPath:  authSel === "key" ? keyPath.trim() : (keyPath.trim() || ""),
          password:     authSel === "key" ? "" : (m.querySelector("#s-pass")?.value || ""),
          pwMode, // "none" | "personal" | "shared"
          hadSaved: hasSaved,
          // Jumphost: leerer Host = kein Jumphost (Backend entfernt ihn dann)
          jumpHost:     jumpOn ? jumpHost : "",
          jumpPort:     jumpOn ? jumpPort : 22,
          jumpUsername: jumpOn ? jumpUser : "",
          jumpKeyPath:  jumpOn ? jKeyPath : "",
        });
      });
      m.querySelector("#btn-cancel").addEventListener("click", () => cl(null));
      bd.addEventListener("click", (e) => { if (e.target === bd) cl(null); });
      m.addEventListener("keydown", (e) => { if (e.key === "Escape") cl(null); });
      m.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  async function showWebsiteForm({title,defaults={}}) {
    return new Promise((resolve)=>{
      const bd=document.createElement("div");bd.className="modal-backdrop";
      const m=document.createElement("div");m.className="modal";
      m.innerHTML=`<div class="modal-header">${escHtml(title||t("editWebTitle"))}</div><div class="modal-body"><label>Name (optional)</label><input type="text" id="w-name"/><label style="margin-top:10px;display:block">URL</label><input type="text" id="w-url" placeholder="https://..."/></div><div class="modal-actions"><button class="btn" id="btn-cancel">${t("cancel")}</button><button class="btn primary" id="btn-ok">${t("save")}</button></div>`;
      bd.appendChild(m);document.body.appendChild(bd);
      const n=m.querySelector("#w-name"),u=m.querySelector("#w-url");
      n.value=defaults.name??"";u.value=defaults.url??"https://";n.focus();n.select();
      const cl=(v)=>{bd.remove();resolve(v);};
      m.querySelector("#btn-ok").addEventListener("click",()=>{const url=u.value.trim();if(!url||!/^https?:\/\//i.test(url)){u.focus();return;}cl({name:n.value.trim(),url});});
      m.querySelector("#btn-cancel").addEventListener("click",()=>cl(null));
      bd.addEventListener("click",(e)=>{if(e.target===bd)cl(null);});
      m.addEventListener("keydown",(e)=>{if(e.key==="Escape")cl(null);if(e.key==="Enter")m.querySelector("#btn-ok").click();});
      m.addEventListener("contextmenu",(e)=>e.preventDefault());
    });
  }

  /* =========================================================
     Sidebar + Model
  ========================================================== */
  const sidebarEl=document.querySelector(".sidebar"),treeContainer=document.getElementById("sidebar-tree");
  let model=null,selectedFolderId=null,selectedConnId=null,currentDrag=null;

  function el(tag,props={},...children){
    const node=document.createElement(tag);
    Object.entries(props).forEach(([k,v])=>{
      if(k==="class")node.className=v;else if(k==="dataset")Object.assign(node.dataset,v);
      else if(k.startsWith("on")&&typeof v==="function")node.addEventListener(k.slice(2).toLowerCase(),v);
      else node.setAttribute(k,v);
    });
    children.flat().forEach(c=>node.appendChild(typeof c==="string"?document.createTextNode(c):c));
    return node;
  }

  function clearSelection(){document.querySelectorAll(".tree-item,.tree-folder-header").forEach(i=>i.classList.remove("active"));selectedConnId=null;}
  // Findet die Liste (Array), in der ein Ordner liegt, und seinen Index darin.
  // Sucht sowohl auf oberster Ebene als auch in Unterordnern.
  function findFolderParentList(folders,id,parentId){
    for(let i=0;i<(folders||[]).length;i++){
      if(folders[i].id===id)return {list:folders,index:i,parentId:parentId||null};
      const r=findFolderParentList(folders[i].folders||[],id,folders[i].id);
      if(r)return r;
    }
    return null;
  }
  // Sortiert einen Ordner neben einen Geschwister-Ordner ein (davor/dahinter),
  // auf derselben Ebene wie das Geschwister.
  async function dropFolderBeside({dragId,siblingId,before}){
    try{
      // Ebene und Position des Ziel-Geschwisters bestimmen
      const sib=findFolderParentList(model?.folders,siblingId);
      if(!sib)return;
      let targetIndex=sib.index+(before?0:1);
      // Grenzfall: gezogener Ordner liegt in DERSELBEN Liste vor der Zielposition
      const drag=findFolderParentList(model?.folders,dragId);
      if(drag&&drag.list===sib.list){
        if(drag.index<targetIndex)targetIndex-=1;
        if(drag.index===targetIndex)return; // gleiche Stelle → nichts tun
      }
      await window.api.store.moveFolder({
        folderId:dragId,
        targetFolderId:sib.parentId, // null = oberste Ebene
        targetIndex
      });
      await loadAndRender();
    }catch(err){console.error(err);await showAlert({title:t("errorTitle"),message:String(err?.message||err)});}
  }

  // Findet einen Ordner (das Objekt selbst) im Model anhand seiner ID.
  function findFolderInModel(folders,id){for(const f of(folders||[])){if(f.id===id)return f;const r=findFolderInModel(f.folders||[],id);if(r)return r;}return null;}
  // Fügt eine gezogene Verbindung an der Zielposition ein (Umsortieren).
  // Berücksichtigt den Grenzfall, dass beim Umsortieren im GLEICHEN Ordner
  // das Herausnehmen die Indizes verschiebt.
  async function dropConnectionAt({drag,targetFolderId,targetConnId,before}){
    try{
      const targetFolder=findFolderInModel(model?.folders,targetFolderId);
      if(!targetFolder)return;
      const items=targetFolder.items||[];
      let targetIndex=items.findIndex(c=>c.id===targetConnId);
      if(targetIndex===-1)targetIndex=items.length;
      else if(!before)targetIndex+=1; // untere Hälfte → dahinter einfügen
      // Grenzfall: gleicher Ordner und die gezogene Verbindung liegt VOR
      // der Zielposition → nach dem Herausnehmen rutscht alles eins hoch.
      if(drag.folderId===targetFolderId){
        const fromIndex=items.findIndex(c=>c.id===drag.id);
        if(fromIndex!==-1&&fromIndex<targetIndex)targetIndex-=1;
        if(fromIndex===targetIndex)return; // an dieselbe Stelle → nichts tun
      }
      await window.api.store.moveConnection({
        sourceFolderId:drag.folderId,
        connectionId:drag.id,
        targetFolderId,
        targetIndex
      });
      await loadAndRender();
    }catch(err){console.error(err);await showAlert({title:t("errorTitle"),message:String(err?.message||err)});}
    finally{currentDrag=null;}
  }

  /* =========================================================
     Multi-Tab Manager
  ========================================================== */
  const tabs=new Map();
  let activeTabId=null,_tabCtr=0;
  const genTabId=()=>"tab-"+(++_tabCtr);

  // ── Verbindungsstatus (TCP-Check) ───────────────────────────────────────
  const statusMap = new Map(); // id → { reachable, latency, checking }
  let statusEnabled = true; // ob die Statusanzeige aktiv ist (pingInterval > 0)
  let pingIntervalId = null;

  function getStatusDotHtml(id) {
    // Wenn die Statusanzeige aus ist, gar keinen Kreis erzeugen
    if (!statusEnabled) return "";
    const s = statusMap.get(id);
    if (!s) return `<span class="status-dot status-unknown" data-sid="${id}"></span>`;
    if (s.checking) return `<span class="status-dot status-checking" data-sid="${id}"></span>`;
    return s.reachable
      ? `<span class="status-dot status-online" data-sid="${id}" title="${s.latency}ms"></span>`
      : `<span class="status-dot status-offline" data-sid="${id}"></span>`;
  }

  function updateDot(id) {
    const s = statusMap.get(id);
    const cls = !s ? 'status-unknown' : s.checking ? 'status-checking' : s.reachable ? 'status-online' : 'status-offline';
    const tip = s?.reachable ? `${s.latency}ms` : '';
    document.querySelectorAll(`.status-dot[data-sid="${id}"]`).forEach(el => {
      el.className = `status-dot ${cls}`;
      el.title = tip;
    });
  }

  // Zerlegt eine Web-URL in Host und Port für den Erreichbarkeits-Check.
  // Beispiele: "https://host"        → { host, port: 443 }
  //            "http://host"         → { host, port: 80 }
  //            "https://host:8443"   → { host, port: 8443 }
  // Gibt null zurück, wenn die URL nicht auswertbar ist.
  function hostPortFromUrl(url) {
    try {
      // Falls kein Protokoll angegeben ist, https annehmen
      const u = new URL(/^https?:\/\//i.test(url) ? url : "https://" + url);
      const host = u.hostname;
      if (!host) return null;
      let port = u.port ? Number(u.port) : (u.protocol === "http:" ? 80 : 443);
      return { host, port };
    } catch {
      return null;
    }
  }

  async function pingConnection(conn) {
    // Host+Port bestimmen – bei Web-Verbindungen aus der URL,
    // sonst direkt aus dem host/port-Feld.
    let host, port;
    if (conn.type === "web") {
      const hp = hostPortFromUrl(conn.url);
      if (!hp) return; // URL nicht auswertbar → kein Check
      host = hp.host; port = hp.port;
    } else {
      if (!conn.host) return;
      host = conn.host;
      port = conn.port || (conn.type === 'ssh' ? 22 : 3389);
    }
    statusMap.set(conn.id, { ...statusMap.get(conn.id), checking: true });
    updateDot(conn.id);
    try {
      const r = await window.api.conn.ping({ host, port });
      statusMap.set(conn.id, { reachable: r.reachable, latency: r.latency, checking: false });
    } catch(e) {
      console.error("[RDM ping] Fehler bei", conn.name, e.message);
      statusMap.set(conn.id, { reachable: false, latency: null, checking: false });
    }
    updateDot(conn.id);
  }

  async function pingAllVisible() {
    // model ist bereits geladen – kein zweiter store.load() nötig
    const all = [];
    function collect(folders) {
      for (const f of folders || []) {
        for (const c of f.items || []) { if (c.host || (c.type === "web" && c.url)) all.push(c); }
        collect(f.folders);
      }
    }
    collect(model?.folders);
    for (let i = 0; i < all.length; i += 5)
      await Promise.all(all.slice(i, i + 5).map(pingConnection));
  }

  // ── Datenquelle konfigurieren (geführter Dialog) ───────────────────────
  function showDataSourceDialog() {
    return new Promise(async (resolve) => {
      const s = await window.api.settings.load() || {};
      let mode      = s.dataSource === "smb" ? "smb" : "local";
      let smbPath   = s.smbPath || "";
      let writeMode = s.smbWriteMode === "readwrite" ? "readwrite" : "readonly";

      const bd = document.createElement("div"); bd.className = "modal-backdrop";
      const m  = document.createElement("div"); m.className = "modal";

      function renderDataSourceDialog() {
        m.innerHTML = `
          <div class="modal-header">${t("dataSourceDialogTitle")}</div>
          <div class="modal-body">
            <label>${t("dataSourceModeLabel")}</label>
            <div style="display:flex;gap:10px;margin:8px 0 16px">
              <label class="rdp-display-card" style="flex:1">
                <input type="radio" name="ds-mode" value="local" ${mode==="local"?"checked":""}/>
                <div class="rdp-display-card-inner" style="padding:12px 8px;text-align:center">
                  <div style="font-size:20px;margin-bottom:4px">💻</div>${t("dataSourceLocal")}
                </div>
              </label>
              <label class="rdp-display-card" style="flex:1">
                <input type="radio" name="ds-mode" value="smb" ${mode==="smb"?"checked":""}/>
                <div class="rdp-display-card-inner" style="padding:12px 8px;text-align:center">
                  <div style="font-size:20px;margin-bottom:4px">🖧</div>${t("dataSourceSmb")}
                </div>
              </label>
            </div>
            <div id="ds-smb-section" style="display:${mode==="smb"?"block":"none"}">
              <label>${t("smbPathLabel")}</label>
              <input type="text" id="ds-path" value="${escHtml(smbPath)}" placeholder="${t("smbPathPlaceholder")}" readonly
                style="width:100%;box-sizing:border-box;padding:8px 10px;font-size:12px;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:6px;outline:none;font-family:monospace;margin:6px 0 8px"/>
              <div style="display:flex;gap:8px;margin-bottom:16px">
                <button class="btn" id="ds-pick-existing" style="flex:1">${t("dataSourcePickExisting")}</button>
                <button class="btn" id="ds-pick-new" style="flex:1">${t("dataSourcePickNew")}</button>
              </div>
              <label>${t("smbModeLabel")}</label>
              <div style="display:flex;gap:10px;margin-top:6px">
                <label class="rdp-display-card" style="flex:1">
                  <input type="radio" name="ds-write" value="readonly" ${writeMode==="readonly"?"checked":""}/>
                  <div class="rdp-display-card-inner" style="padding:10px 8px;text-align:center;font-size:12px">${t("smbModeReadonly")}</div>
                </label>
                <label class="rdp-display-card" style="flex:1">
                  <input type="radio" name="ds-write" value="readwrite" ${writeMode==="readwrite"?"checked":""}/>
                  <div class="rdp-display-card-inner" style="padding:10px 8px;text-align:center;font-size:12px">${t("smbModeReadwrite")}</div>
                </label>
              </div>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn" id="ds-cancel">${t("cancel")}</button>
            <button class="btn primary" id="ds-save">${t("save")}</button>
          </div>`;
        wire();
      }

      function wire() {
        m.querySelectorAll('input[name="ds-mode"]').forEach(r => {
          r.addEventListener("change", () => {
            mode = r.value;
            m.querySelector("#ds-smb-section").style.display = mode === "smb" ? "block" : "none";
          });
        });
        m.querySelectorAll('input[name="ds-write"]').forEach(r => {
          r.addEventListener("change", () => { writeMode = r.value; });
        });
        const pickExisting = m.querySelector("#ds-pick-existing");
        if (pickExisting) pickExisting.addEventListener("click", async () => {
          const picked = await window.api.datasource.pickExisting();
          if (picked?.filePath) {
            smbPath = picked.filePath;
            m.querySelector("#ds-path").value = smbPath;
          }
        });
        const pickNew = m.querySelector("#ds-pick-new");
        if (pickNew) pickNew.addEventListener("click", async () => {
          const picked = await window.api.datasource.pickNewFolder();
          if (picked?.filePath) {
            smbPath = picked.filePath;
            m.querySelector("#ds-path").value = smbPath;
          }
        });
        m.querySelector("#ds-cancel").addEventListener("click", () => cl(false));
        m.querySelector("#ds-save").addEventListener("click", onSave);
      }

      async function onSave() {
        if (mode === "smb") {
          if (!smbPath) {
            await showAlert({ title: t("dataSourceDialogTitle"), message: t("dataSourceNoPath") });
            return;
          }
          // Prüfen ob am Pfad eine gültige JSON liegt
          const check = await window.api.datasource.checkPath({ filePath: smbPath });
          if (!check.valid) {
            // Keine (gültige) Datei → fragen ob anlegen
            const create = await showConfirm({
              title: t("dataSourceCreateTitle"),
              message: t("dataSourceCreateMsg", smbPath),
              okLabel: t("dataSourceCreateOk"),
              cancelLabel: t("cancel")
            });
            if (!create) return; // Abbruch – Dialog bleibt offen
            try {
              await window.api.datasource.createFile({ filePath: smbPath });
            } catch (err) {
              await showAlert({ title: t("errorTitle"), message: String(err?.message || err) });
              return;
            }
          }
        }
        // Speichern
        const cur = await window.api.settings.load() || {};
        cur.dataSource   = mode;
        cur.smbPath      = mode === "smb" ? smbPath : (cur.smbPath || "");
        cur.smbWriteMode = writeMode;
        await window.api.settings.save(cur);
        cl(true);
      }

      const cl = (v) => { bd.remove(); resolve(v); };
      bd.appendChild(m); document.body.appendChild(bd);
      renderDataSourceDialog();
      bd.addEventListener("click", (e) => { if (e.target === bd) cl(false); });
      m.addEventListener("keydown", (e) => { if (e.key === "Escape") cl(false); });
      m.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  // ── Notiz-Dialog (über Rechtsklick → Notizen) ──────────────────────────
  function showNotesDialog(conn, folderId) {
    return new Promise((resolve) => {
      const notes = conn.notes || conn.profile?.notes || "";
      const icon  = conn.type === "ssh" ? "🔒" : conn.type === "web" ? "🌐" : conn.type === "serial" ? "🔌" : "🪟";
      const meta  = conn.type === "web"
        ? (conn.url || "")
        : `${conn.host || ""}${conn.port ? " · Port " + conn.port : ""}`;

      const bd = document.createElement("div"); bd.className = "modal-backdrop";
      const m  = document.createElement("div"); m.className = "modal";
      m.innerHTML = `
        <div class="modal-header">${icon} ${escHtml(conn.name)}</div>
        <div class="modal-body">
          <div style="font-size:12px;color:var(--tx-5);margin-bottom:10px">${escHtml(meta)}</div>
          <label>${t("connInfoNotes")}</label>
          <textarea id="nd-notes" rows="8"
            style="width:100%;box-sizing:border-box;resize:vertical;padding:10px 12px;font-size:13px;line-height:1.5;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:8px;outline:none;font-family:inherit"
            placeholder="${t('connInfoNotesPlaceholder')}">${escHtml(notes)}</textarea>
        </div>
        <div class="modal-actions">
          <button class="btn" id="nd-cancel">${t("cancel")}</button>
          <button class="btn primary" id="nd-ok">${t("save")}</button>
        </div>`;
      bd.appendChild(m); document.body.appendChild(bd);

      const ta = m.querySelector("#nd-notes");
      ta.focus();
      const cl = (v) => { bd.remove(); resolve(v); };

      m.querySelector("#nd-ok").addEventListener("click", async () => {
        try {
          await window.api.store.updateConnection({
            folderId, connectionId: conn.id, notes: ta.value
          });
          const found = findConnById(conn.id);
          if (found) found.conn.notes = ta.value;
          renderTabBar(); // 📝-Indikator aktualisieren
          cl(true);
        } catch (err) {
          await showAlert({ title: t("connInfoError"), message: String(err?.message || err) });
        }
      });
      m.querySelector("#nd-cancel").addEventListener("click", () => cl(null));
      bd.addEventListener("click", (e) => { if (e.target === bd) cl(null); });
      m.addEventListener("keydown", (e) => { if (e.key === "Escape") cl(null); });
      m.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  async function applyPingInterval() {
    if (pingIntervalId) { clearInterval(pingIntervalId); pingIntervalId = null; }
    const s = await window.api.settings.load();
    const ms = Number(s?.pingInterval) || 0;
    if (ms === 0) {
      // Deaktiviert → Merker setzen, Status leeren, vorhandene Kreise entfernen
      statusEnabled = false;
      statusMap.clear();
      document.querySelectorAll(".status-dot").forEach(el => el.remove());
      return;
    }
    // Aktiviert → Merker setzen und neu zeichnen (damit Kreise wieder erscheinen)
    statusEnabled = true;
    loadAndRender();
    // Sofort prüfen + Intervall starten
    pingAllVisible();
    pingIntervalId = setInterval(pingAllVisible, ms);
  }

  const tabBarEl=document.getElementById("tab-bar");
  // F5 = aktive Website neu laden (Strg/Umschalt+F5 = ohne Cache), wenn der
  // Fokus gerade im RCM-Fenster liegt. Im Web-View selbst fängt main.js F5 ab.
  document.addEventListener("keydown",(e)=>{
    if(e.key!=="F5")return;
    const tab=activeTabId?tabs.get(activeTabId):null;
    if(tab?.type!=="web")return;
    e.preventDefault();
    window.api.web.reload({tabId:activeTabId,hard:e.ctrlKey||e.shiftKey}).catch(()=>{});
  });
  // Mausrad über der Tab-Leiste → horizontales Scrollen (um an hintere Tabs
  // zu kommen, wenn viele offen sind). Vertikales Raddrehen wird umgeleitet.
  if(tabBarEl){
    tabBarEl.addEventListener("wheel",(e)=>{
      if(e.deltaY===0)return;              // nur reagieren, wenn vertikal gescrollt wird
      e.preventDefault();                  // Standard-Scrollen unterdrücken
      tabBarEl.scrollLeft += e.deltaY;     // vertikale Radbewegung → horizontal
    },{passive:false});
  }
  const tabContentArea=document.getElementById("tab-content-area");

  function getContentBounds(){const r=tabContentArea.getBoundingClientRect();return{x:Math.round(r.left),y:Math.round(r.top),width:Math.round(r.width),height:Math.round(r.height)};}

  async function hideActiveWebTab(){
    const tab=activeTabId?tabs.get(activeTabId):null;
    if(tab?.type!=="web")return null;
    try{await window.api.web.hide({tabId:activeTabId});}catch{}
    return activeTabId;
  }
  async function restoreWebTab(tabId){
    if(!tabId||!tabs.has(tabId)||activeTabId!==tabId)return;
    await new Promise(r=>requestAnimationFrame(r));
    try{await window.api.web.show({tabId,bounds:getContentBounds()});}catch{}
  }

  function getTabIcon(type){if(type==="web")return"🌐";if(type==="ssh")return"🔒";if(type==="rdp")return"🪟";if(type==="serial")return"🔌";return"⚙";}

  // Notizen einer Verbindung anhand ihrer ID im Model finden
  function findConnById(id, folders = model?.folders) {
    for (const f of folders || []) {
      const c = (f.items || []).find(x => x.id === id);
      if (c) return { conn: c, folderId: f.id };
      const sub = findConnById(id, f.folders);
      if (sub) return sub;
    }
    return null;
  }
  function getConnNotes(connId) {
    const found = findConnById(connId);
    if (!found) return "";
    return found.conn.notes || found.conn.profile?.notes || "";
  }

  // Notiz-Popover, geöffnet über das 📝 in der Tab-Leiste
  let notesPopoverEl = null;
  let notesPopoverTimer = null;
  function closeNotesPopover() {
    if (notesPopoverEl) { notesPopoverEl.remove(); notesPopoverEl = null; }
    document.removeEventListener("mousedown", onNotesPopoverOutside, true);
  }
  function onNotesPopoverOutside(e) {
    if (notesPopoverEl && !notesPopoverEl.contains(e.target) &&
        !e.target.classList?.contains("tab-notes")) {
      closeNotesPopover();
    }
  }
  function openNotesPopover(anchorEl, connId) {
    closeNotesPopover();
    const found = findConnById(connId);
    if (!found) return;
    const notes = found.conn.notes || found.conn.profile?.notes || "";

    const pop = document.createElement("div");
    pop.className = "tab-notes-popover";
    pop.innerHTML = `
      <div class="tab-notes-popover-title">${t("connInfoNotes")}</div>
      <textarea class="tab-notes-popover-area" placeholder="${t('connInfoNotesPlaceholder')}">${escHtml(notes)}</textarea>
      <div class="tab-notes-popover-status"></div>
    `;
    document.body.appendChild(pop);

    // Position: unter dem Anker, rechtsbündig damit es nicht rausläuft
    const r = anchorEl.getBoundingClientRect();
    pop.style.top = (r.bottom + 4) + "px";
    let left = r.right - pop.offsetWidth;
    if (left < 8) left = 8;
    pop.style.left = left + "px";

    const ta = pop.querySelector("textarea");
    const status = pop.querySelector(".tab-notes-popover-status");
    ta.focus();
    ta.addEventListener("input", () => {
      clearTimeout(notesPopoverTimer);
      status.textContent = "";
      notesPopoverTimer = setTimeout(async () => {
        try {
          await window.api.store.updateConnection({
            folderId: found.folderId, connectionId: connId, notes: ta.value
          });
          const fresh = findConnById(connId);
          if (fresh) fresh.conn.notes = ta.value;
          status.textContent = t("connInfoSaved");
          renderTabBar(); // 📝-Indikator ggf. aktualisieren
          setTimeout(() => { status.textContent = ""; }, 2000);
        } catch { status.textContent = t("connInfoError"); }
      }, 800);
    });

    notesPopoverEl = pop;
    setTimeout(() => document.addEventListener("mousedown", onNotesPopoverOutside, true), 0);
  }

  function renderTabBar(){
    tabBarEl.innerHTML="";
    if(tabs.size===0){tabBarEl.style.display="none";return;}
    tabBarEl.style.display="flex";
    tabs.forEach((tab)=>{
      const tabEl=document.createElement("div");
      tabEl.className="tab"+(tab.id===activeTabId?" active":"");tabEl.dataset.id=tab.id;
      const titleEl=document.createElement("span");titleEl.className="tab-title";titleEl.textContent=getTabIcon(tab.type)+" "+tab.title;titleEl.title=tab.title;
      const closeEl=document.createElement("button");closeEl.className="tab-close";closeEl.textContent="×";closeEl.title=t("closeTab");
      closeEl.addEventListener("click",(e)=>{e.stopPropagation();closeTab(tab.id);});
      tabEl.appendChild(titleEl);
      // 📝 Notiz-Button – nur wenn die Verbindung Notizen hat
      if(tab.connId && getConnNotes(tab.connId).trim()){
        const notesEl=document.createElement("button");
        notesEl.className="tab-notes";notesEl.textContent="📝";notesEl.title=t("connInfoNotes");
        notesEl.addEventListener("click",(e)=>{
          e.stopPropagation();
          if(notesPopoverEl){closeNotesPopover();}
          else{openNotesPopover(notesEl,tab.connId);}
        });
        tabEl.appendChild(notesEl);
      }
      tabEl.appendChild(closeEl);
      tabEl.addEventListener("click",()=>activateTab(tab.id));
      tabBarEl.appendChild(tabEl);
    });
    const settingsBtn=document.getElementById("settings-btn");
    if(settingsBtn){
      const settingsActive=[...tabs.values()].some(t=>t.type==="settings")&&tabs.get(activeTabId)?.type==="settings";
      settingsBtn.classList.toggle("active",settingsActive);
    }
  }

  async function deactivateCurrentTab(){
    if(!activeTabId)return;const tab=tabs.get(activeTabId);if(!tab)return;
    if(tab.type==="web"){try{await window.api.web.hide({tabId:activeTabId});}catch{}}
    else if(["ssh","rdp","settings","serial"].includes(tab.type)){if(tab.container)tab.container.classList.remove("active");}
  }

  async function activateTab(tabId){
    if(tabId===activeTabId)return;
    closeNotesPopover();
    await deactivateCurrentTab();
    const tab=tabs.get(tabId);if(!tab)return;
    activeTabId=tabId;
    if(tab.type==="web"){await new Promise(r=>requestAnimationFrame(r));try{await window.api.web.show({tabId,bounds:getContentBounds()});}catch{}}
    else if(tab.type==="ssh"){tab.container.classList.add("active");if(tab.fitAddon)tab.fitAddon.fit();if(tab.term)tab.term.focus();}
    else if(["rdp","settings"].includes(tab.type)){tab.container.classList.add("active");}
    else if(tab.type==="serial"){tab.container.classList.add("active");if(tab.fitAddon)tab.fitAddon.fit();if(tab.term)tab.term.focus();}
    renderTabBar();
  }

  async function closeTab(tabId){
    const tab=tabs.get(tabId);if(!tab)return;
    closeNotesPopover();
    if(tab.type==="web"){try{await window.api.web.close({tabId});}catch{}}
    else if(tab.type==="ssh"){
      if(tab.offData)tab.offData();if(tab.offClosed)tab.offClosed();
      try{await window.api.ssh.close({sessionId:tab.sessionId});}catch{}
      if(tab.term)tab.term.dispose();if(tab.container)tab.container.remove();
    }
    else if(tab.type==="rdp"){
      if(tab.offClosed)tab.offClosed();
      try{await window.api.rdp.close({tabId});}catch{}
      if(tab.container)tab.container.remove();
    }
    else if(tab.type==="serial"){
      if(tab.offData)tab.offData();if(tab.offClosed)tab.offClosed();
      try{await window.api.serial.close({sessionId:tab.sessionId});}catch{}
      if(tab.term)tab.term.dispose();if(tab.container)tab.container.remove();
    }
    else if(tab.type==="serial"){
      if(tab.offData)tab.offData();if(tab.offClosed)tab.offClosed();
      try{await window.api.serial.close({sessionId:tab.sessionId});}catch{}
      if(tab.term)tab.term.dispose();if(tab.container)tab.container.remove();
    }
    else if(tab.type==="settings"){
      if(tab.container)tab.container.remove();
      document.getElementById("settings-btn")?.classList.remove("active");
    }
    tabs.delete(tabId);
    if(activeTabId===tabId){
      activeTabId=null;
      const remaining=[...tabs.keys()];
      if(remaining.length>0){
        const nextId=remaining[remaining.length-1],nextTab=tabs.get(nextId);
        activeTabId=nextId;
        if(nextTab.type==="web"){await new Promise(r=>requestAnimationFrame(r));try{await window.api.web.show({tabId:nextId,bounds:getContentBounds()});}catch{}}
        else if(nextTab.type==="ssh"){nextTab.container.classList.add("active");if(nextTab.fitAddon)nextTab.fitAddon.fit();if(nextTab.term)nextTab.term.focus();}
        else if(["rdp","settings"].includes(nextTab.type)){nextTab.container.classList.add("active");}
      }
    }
    renderTabBar();
  }

  // Wendet die gewählte Passwort-Speicherart auf eine SSH-Verbindung an.
  // "personal" → DPAPI (lokal), "shared" → Vault-verschlüsselt in connections.json, "none" → nichts.
  async function applySshPassword(connId, folderId, result) {
    if (result.authType === "key") return; // Key-Modus: kein Passwort
    const mode = result.pwMode || "none";

    if (mode === "personal") {
      if (result.password) {
        try { await window.api.cred.save({ id: connId, password: result.password }); } catch {}
      }
      // evtl. vorhandenes geteiltes PW entfernen (Moduswechsel)
      try { await window.api.store.updateConnection({ folderId, connectionId: connId, sharedPassword: "" }); } catch {}
    }
    else if (mode === "shared") {
      // Tresor muss entsperrt sein (legt ihn beim ersten Mal an)
      const ok = await ensureVaultUnlocked();
      if (!ok) { await showAlert({ title: t("vaultSetupTitle"), message: t("vaultNeededMsg") }); return; }
      if (result.password) {
        const enc = await window.api.vault.encrypt({ plaintext: result.password });
        if (enc.ok) {
          await window.api.store.updateConnection({ folderId, connectionId: connId, sharedPassword: enc.ciphertext });
        }
      }
      // evtl. vorhandenes persönliches DPAPI-PW entfernen (Moduswechsel)
      try { await window.api.cred.delete({ id: connId }); } catch {}
    }
    else { // none
      if (result.hadSaved) { try { await window.api.cred.delete({ id: connId }); } catch {} }
      try { await window.api.store.updateConnection({ folderId, connectionId: connId, sharedPassword: "" }); } catch {}
    }
  }

  // ── Schnellsuche (Command-Palette) ─────────────────────────────────────
  let quickSearchOpen = false;
  // Wandelt ein Electron-Accelerator ("CommandOrControl+Shift+Space")
  // in eine lesbare Anzeige um ("Strg + Shift + Leertaste").
  function shortcutToDisplay(acc) {
    if (!acc) return "";
    return acc
      .replace(/CommandOrControl|CmdOrCtrl/gi, "Strg")
      .replace(/\bControl\b|\bCtrl\b/gi, "Strg")
      .replace(/\bSpace\b/gi, "Leertaste")
      .replace(/\+/g, " + ");
  }

  function showQuickSearch() {
    if (quickSearchOpen) return;
    quickSearchOpen = true;

    // Alle Verbindungen flach sammeln (mit Ordnerpfad für Anzeige)
    const all = [];
    (function walk(folders, pathParts) {
      for (const f of folders || []) {
        const p = [...pathParts, f.name];
        for (const c of f.items || []) all.push({ conn: c, path: p.join(" / ") });
        walk(f.folders, p);
      }
    })(model?.folders, []);

    const typeIcon = (t) => t === "rdp" ? "🖥️" : t === "ssh" ? "⌨️" : t === "web" ? "🌐" : t === "serial" ? "🔌" : "•";

    const bd = document.createElement("div");
    bd.className = "quicksearch-backdrop";
    const box = document.createElement("div");
    box.className = "quicksearch-box";
    box.innerHTML = `
      <input type="text" id="qs-input" class="quicksearch-input" placeholder="${t("quickSearchPlaceholder")}" autocomplete="off" spellcheck="false"/>
      <div id="qs-results" class="quicksearch-results"></div>
      <div class="quicksearch-hint">${t("quickSearchHint")}</div>`;
    bd.appendChild(box);
    document.body.appendChild(bd);

    const input = box.querySelector("#qs-input");
    const results = box.querySelector("#qs-results");
    let filtered = [];
    let sel = 0;

    function renderQuickSearchList() {
      const q = input.value.trim().toLowerCase();
      filtered = !q ? all.slice(0, 50) : all.filter(({ conn, path }) => {
        const notes = conn.notes || conn.profile?.notes || "";
        const hay = `${conn.name} ${conn.host || conn.url || ""} ${path} ${notes}`.toLowerCase();
        return q.split(/\s+/).every(term => hay.includes(term));
      }).slice(0, 50);
      if (sel >= filtered.length) sel = Math.max(0, filtered.length - 1);
      if (filtered.length === 0) {
        results.innerHTML = `<div class="quicksearch-empty">${t("quickSearchNone")}</div>`;
        return;
      }
      results.innerHTML = filtered.map(({ conn, path }, i) => `
        <div class="quicksearch-item ${i === sel ? "selected" : ""}" data-idx="${i}">
          <span class="qs-icon">${typeIcon(conn.type)}</span>
          <span class="qs-main">
            <span class="qs-name">${escHtml(conn.name)}</span>
            <span class="qs-sub">${escHtml(conn.host || conn.url || "")}${path ? " · " + escHtml(path) : ""}</span>
          </span>
        </div>`).join("");
      const selEl = results.querySelector(".quicksearch-item.selected");
      if (selEl) selEl.scrollIntoView({ block: "nearest" });
    }

    async function connectSel() {
      const chosen = filtered[sel];
      close();
      if (chosen) { try { await openConnection(chosen.conn); } catch (err) { await showAlert({ title: t("startError"), message: String(err?.message || err) }); } }
    }

    function close() {
      quickSearchOpen = false;
      bd.remove();
    }

    input.addEventListener("input", () => { sel = 0; renderQuickSearchList(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); if (sel < filtered.length - 1) { sel++; renderQuickSearchList(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (sel > 0) { sel--; renderQuickSearchList(); } }
      else if (e.key === "Enter") { e.preventDefault(); connectSel(); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
    });
    results.addEventListener("click", (e) => {
      const item = e.target.closest(".quicksearch-item");
      if (!item) return;
      sel = Number(item.dataset.idx);
      connectSel();
    });
    bd.addEventListener("mousedown", (e) => { if (e.target === bd) close(); });

    renderQuickSearchList();
    input.focus();
  }

  async function openConnection(conn){
    if(conn.type==="web"&&conn.url){await openWebTab({connId:conn.id,name:conn.name,url:conn.url});return;}
    if(conn.type==="serial"){
      await openSerialTab({connId:conn.id,name:conn.name,comPort:conn.comPort,baudRate:conn.baudRate||9600,dataBits:conn.dataBits||8,parity:conn.parity||"none",stopBits:conn.stopBits||1});
      return;
    }
    if(conn.type==="ssh"){
      const prev=await hideActiveWebTab();
      let username=conn.username||"", password=null, passphrase=null;
      const useKey = conn.authType==="key" && !!conn.keyPath;

      // Jumphost-Passphrase (immer Key) – zuerst abfragen, falls Jumphost aktiv
      let jump=null;
      if(conn.jump && conn.jump.host){
        const jpass=await showPrompt({title:`Jumphost – ${conn.jump.host}`,label:`${t("sshPassphraseForLabel")} ${conn.jump.username||""}@${conn.jump.host}`,password:true});
        if(jpass===null){await restoreWebTab(prev);return;}
        jump={host:conn.jump.host,port:conn.jump.port||22,username:conn.jump.username||"",keyPath:conn.jump.keyPath||"",passphrase:jpass};
      }

      if(useKey){
        // Passphrase wird bewusst NICHT gespeichert – bei jedem Verbinden abfragen
        const typed=await showPrompt({title:`SSH – ${conn.name}`,label:`${t("sshPassphraseForLabel")} ${username}@${conn.host||""}`,password:true});
        if(typed===null){await restoreWebTab(prev);return;}
        passphrase=typed; // leer lassen = Schlüssel ohne Passphrase
      }else if(conn.sharedPassword){
        // Geteiltes Passwort: Tresor entsperren und entschlüsseln
        const st=await window.api.vault.status();
        if(!st.exists){
          // Verschlüsseltes Passwort vorhanden, aber kein Tresor-Header am Datenort.
          // Das darf NICHT den Einrichtungs-Dialog auslösen (neues Passwort würde
          // die bestehenden Geheimnisse nicht entschlüsseln können).
          await showAlert({title:t("vaultMissingTitle"),message:t("vaultMissingMsg")});
          await restoreWebTab(prev);return;
        }
        const ok=await ensureVaultUnlocked();
        if(!ok){await restoreWebTab(prev);return;}
        const dec=await window.api.vault.decrypt({ciphertext:conn.sharedPassword});
        if(dec.ok){password=dec.plaintext;}
        else{await showAlert({title:t("vaultUnlockTitle"),message:dec.error||"Fehler"});await restoreWebTab(prev);return;}
      }else{
        try{
          const r=await window.api.cred.load({id:conn.id});
          if(r?.ok) password=r.password;
        }catch{}
        if(!password){
          const typed=await showPrompt({title:`SSH – ${conn.name}`,label:`${t("sshPasswordForLabel")} ${username}@${conn.host||""}`,password:true});
          if(typed===null){await restoreWebTab(prev);return;}
          password=typed;
        }
      }
      await openSshTab({connId:conn.id,name:conn.name,host:conn.host,port:conn.port||22,username,password,authType:useKey?"key":"password",keyPath:useKey?conn.keyPath:undefined,passphrase,jump});
      return;
    }
    await openRdpTab({connId:conn.id,name:conn.name,host:conn.host,port:conn.port?Number(conn.port):undefined,profile:conn.profile||{}});
  }

  async function openWebTab({connId,name,url}){
    const tabId=genTabId();await deactivateCurrentTab();
    tabs.set(tabId,{id:tabId,type:"web",title:name||url,url,connId});activeTabId=tabId;renderTabBar();
    await new Promise(r=>requestAnimationFrame(r));
    let result;
    try{result=await window.api.web.open({tabId,url,bounds:getContentBounds()});}
    catch(err){result={ok:false,error:String(err?.message||err)};}
    // Wenn das Laden fehlschlug (z. B. Server nicht erreichbar): Tab wieder
    // entfernen und eine kurze Meldung zeigen, statt ein leeres Fenster.
    if(!result||result.ok===false){
      tabs.delete(tabId);activeTabId=null;renderTabBar();
      await showAlert({title:t("webUnreachableTitle"),message:t("webUnreachableMsg",name||url)});
    }
  }

  async function openSshTab({connId,name,host,port,username,password,authType,keyPath,passphrase,jump}){
    const tabId=genTabId(),sessionId="ssh-"+tabId;
    await deactivateCurrentTab();
    const container=document.createElement("div");container.className="ssh-tab-container active";
    tabContentArea.appendChild(container);
    const tabData={id:tabId,type:"ssh",title:name||host,sessionId,host,username,connId,container,term:null,fitAddon:null,offData:null,offClosed:null};
    tabs.set(tabId,tabData);activeTabId=tabId;renderTabBar();
    const connResult=await window.api.ssh.connect({sessionId,host,port,username,password,authType,keyPath,passphrase,jump});
    if(!connResult.ok){tabs.delete(tabId);container.remove();activeTabId=null;renderTabBar();await showAlert({title:t("sshConnError"),message:connResult.error||t("sshConnFailed")});return;}
    const term=new Terminal({cursorBlink:true,fontSize:appSettings.sshFontSize||14,fontFamily:"Consolas,'Courier New',monospace",theme:{background:"#1e1e1e",foreground:"#ddd",cursor:"#ddd",selection:"rgba(255,255,255,0.3)"}});
    const fitAddon=new FitAddon.FitAddon();
    term.loadAddon(fitAddon);term.open(container);fitAddon.fit();
    try{await window.api.ssh.resize({sessionId,cols:term.cols,rows:term.rows});}catch{}
    term.focus();
    term.attachCustomKeyEventHandler((e)=>{
      if(e.type!=="keydown")return true;
      if(e.ctrlKey&&e.shiftKey&&e.key==="C"){const sel=term.getSelection();if(sel)window.api.clipboard.write(sel).catch(()=>{});return false;}
      if(e.ctrlKey&&e.shiftKey&&e.key==="V"){window.api.clipboard.read().then(t=>{if(t)window.api.ssh.send({sessionId,data:t});}).catch(()=>{});return false;}
      return true;
    });
    container.addEventListener("contextmenu",(e)=>{
      e.preventDefault();const selection=term.getSelection();
      document.querySelectorAll(".ssh-ctx-menu").forEach(m=>m.remove());
      const menu=document.createElement("div");menu.className="context-menu ssh-ctx-menu";
      if(selection){const ci=document.createElement("div");ci.className="menu-item";ci.textContent="Kopieren";ci.addEventListener("click",()=>{window.api.clipboard.write(selection).catch(()=>{});menu.remove();});menu.appendChild(ci);}
      const pi=document.createElement("div");pi.className="menu-item";pi.textContent="Einfügen";
      pi.addEventListener("click",()=>{window.api.clipboard.read().then(t=>{if(t)window.api.ssh.send({sessionId,data:t});}).catch(()=>{});menu.remove();});
      menu.appendChild(pi);
      menu.style.left=Math.min(e.clientX,window.innerWidth-160)+"px";menu.style.top=Math.min(e.clientY,window.innerHeight-80)+"px";
      document.body.appendChild(menu);
      const close=()=>{menu.remove();document.removeEventListener("click",close);};setTimeout(()=>document.addEventListener("click",close),10);
    });
    tabData.term=term;tabData.fitAddon=fitAddon;
    term.onData(data=>window.api.ssh.send({sessionId,data}));
    tabData.offData=window.api.ssh.onData(({sessionId:sid,data})=>{if(sid!==sessionId)return;term.write(Uint8Array.from(atob(data),c=>c.charCodeAt(0)));});
    tabData.offClosed=window.api.ssh.onClosed(({sessionId:sid})=>{if(sid!==sessionId)return;term.writeln(`\r\n\x1b[33m[${t("connectionClosedTabClosing")}]\x1b[0m`);setTimeout(()=>closeTab(tabId),1500);});
  }

  async function openRdpTab({connId,name,host,port,profile}){
    const tabId=genTabId();await deactivateCurrentTab();
    const container=document.createElement("div");container.className="rdp-tab-container active";
    const portLabel=port&&port!==3389?`:${port}`:"";
    container.innerHTML=`<div class="rdp-placeholder"><div class="rdp-placeholder-icon">🪟</div><div class="rdp-placeholder-name">${escHtml(name)}</div><div class="rdp-placeholder-host">${escHtml(host)}${escHtml(portLabel)}</div><div class="rdp-placeholder-status connecting" id="rdp-status-${tabId}">${t("connecting")}</div><button class="btn primary rdp-focus-btn" id="rdp-focus-btn-${tabId}" style="margin-top:4px">🪟 Fenster in den Vordergrund</button></div>`;
    tabContentArea.appendChild(container);
    const tabData={id:tabId,type:"rdp",title:name,host,connId,container,offClosed:null};
    tabs.set(tabId,tabData);activeTabId=tabId;renderTabBar();
    container.querySelector(`#rdp-focus-btn-${tabId}`).addEventListener("click",()=>window.api.rdp.focus({tabId}).catch(()=>{}));
    const p=profile||{};
    // Persönliche Zugangsdaten: wenn aktiv → an rdp:launch übergeben → cmdkey
    let rdpUsername=null, rdpPassword=null;
    if(connId){
      try{
        const modeR=await window.api.cred.getMode({id:connId});
        if(modeR?.mode==="personal"){
          const pers=await window.api.cred.loadPersonal();
          if(pers?.ok){
            rdpUsername=pers.username||null;
            rdpPassword=pers.password||null;
          }
        }
      }catch{}
    }
    const result=await window.api.rdp.launch({
      tabId, host, port,
      fullscreen:  p.fullscreen!==false,
      multimon:    !!p.multimon,
      width:       p.width,
      height:      p.height,
      admin:       !!p.admin,
      username:    rdpUsername||p.username||"",
      password:    rdpPassword||null,
      clipboard:   p.clipboard!==false,
      printers:    !!p.printers,
      drives:      p.drives||"",
      colorDepth:  p.colorDepth||32,
      gateway:     p.gateway?.host?{host:p.gateway.host,usage:p.gateway.usage??2}:undefined,
    });
    if(!result.ok){tabs.delete(tabId);container.remove();activeTabId=null;renderTabBar();await showAlert({title:t("rdpError"),message:result.error||t("rdpConnectFailed")});return;}
    setTimeout(()=>{if(!tabs.has(tabId))return;const elS=container.querySelector(`#rdp-status-${tabId}`);if(elS){elS.textContent="Verbunden";elS.className="rdp-placeholder-status connected";}},3000);
    tabData.offClosed=window.api.rdp.onClosed(({tabId:tid})=>{
      if(tid!==tabId)return;
      const statusEl=container.querySelector(`#rdp-status-${tabId}`);
      if(statusEl){statusEl.textContent=t("connectionClosed");statusEl.className="rdp-placeholder-status disconnected";}
      const focusBtn=container.querySelector(`#rdp-focus-btn-${tabId}`);if(focusBtn)focusBtn.style.display="none";
      setTimeout(()=>closeTab(tabId),3000);
    });
  }

  window.addEventListener("resize",async()=>{
    if(!activeTabId)return;const tab=tabs.get(activeTabId);if(!tab)return;
    if(tab.type==="web"){try{await window.api.web.resize({tabId:activeTabId,bounds:getContentBounds()});}catch{}}
    else if(tab.type==="ssh"&&tab.fitAddon&&tab.term){tab.fitAddon.fit();try{await window.api.ssh.resize({sessionId:tab.sessionId,cols:tab.term.cols,rows:tab.term.rows});}catch{}}
  });

  /* =========================================================
     Einstellungen-Tab
  ========================================================== */
  async function openSettingsTab(){
    for(const[tid,tab]of tabs){if(tab.type==="settings"){await activateTab(tid);return;}}
    const tabId=genTabId();await deactivateCurrentTab();
    let personalCreds={ok:false};
    try{personalCreds=await window.api.cred.loadPersonal();}catch{}
    let currentSettings={};
    try{currentSettings=await window.api.settings.load()||{};}catch{}
    const currentLangSetting = currentSettings.language || _lang;
    // Aktuelles Schnellsuche-Kürzel (oder Default), für die Anzeige im Feld
    const currentShortcut = currentSettings.quickSearchShortcut || "CommandOrControl+Shift+Space";
    // Verbindungen und Ordner rekursiv zählen (inkl. Unterordner)
    function countConns(folders) {
      let n = 0;
      for (const f of folders || []) { n += (f.items?.length || 0); n += countConns(f.folders); }
      return n;
    }
    function countFolders(folders) {
      let n = 0;
      for (const f of folders || []) { n += 1; n += countFolders(f.folders); }
      return n;
    }
    const totalConns   = countConns(model?.folders);
    const totalFolders = countFolders(model?.folders);
    const container=document.createElement("div");container.className="settings-tab-container active";
    container.innerHTML=`
      <div class="settings-content">
        <h1 class="settings-page-title">${t("settingsTitle")}</h1>
<section class="settings-section">
          <div class="settings-section-title">${t("sectionCredentials")}</div>

          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--tx-5);margin-bottom:8px">${t("personalCreds")}</div>
          <div class="pers-cred-row">
            <label>${t("username")}</label>
            <input type="text" id="s-pers-user" placeholder="user@domain.local" value="${personalCreds?.username||''}"/>
          </div>
          <div class="pers-cred-row">
            <label>${t("password")}</label>
            <input type="password" id="s-pers-pw" placeholder="${personalCreds?.ok?t("passwordSaved"):t('passwordEnterPlaceholder')}"/>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px;justify-content:flex-end">
            <button class="settings-action-btn" id="s-pers-save">${t("saveBtn")}</button>
            ${personalCreds?.ok?`<button class="settings-action-btn" id="s-pers-del" style="color:var(--err)">${t("deleteBtn")}</button>`:""}
          </div>

          <div style="border-top:1px solid var(--bd-4);margin-top:14px;padding-top:14px" class="settings-item">
            <div class="settings-item-left">
              <div class="settings-item-label">${t("rdpAllPersonalLabel")}</div>
              <div class="settings-item-desc">${t("rdpAllPersonalHint")}</div>
            </div>
            <button class="settings-action-btn" id="rdp-all-personal">${t("rdpAllPersonalBtn")}</button>
          </div>

          <div style="margin-top:14px;padding-top:0" class="settings-item">
            <div class="settings-item-left">
              <div class="settings-item-label">${t("sshPasswords")}</div>
              <div class="settings-item-desc">${t("sshPasswordsDesc")}</div>
            </div>
            <button class="settings-action-btn" id="s-clear-creds">${t("deleteBtn")}</button>
          </div>
        </section>

        <section class="settings-section">
          <div class="settings-section-title">${t("sectionShortcuts")}</div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-item-label">${t("shortcutQuickSearch")}</div>
              <div class="settings-item-desc">${t("shortcutQuickSearchHint")}</div>
              <div id="qs-shortcut-msg" style="font-size:12px;margin-top:6px;min-height:16px"></div>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;flex-shrink:0">
              <input type="text" id="qs-shortcut-display" readonly
                value="${escHtml(shortcutToDisplay(currentShortcut))}"
                style="width:180px;box-sizing:border-box;padding:8px 10px;font-size:13px;text-align:center;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:6px;outline:none;cursor:pointer"/>
              <div style="display:flex;gap:8px">
                <button class="settings-action-btn" id="qs-shortcut-change">${t("shortcutChange")}</button>
                <button class="settings-action-btn" id="qs-shortcut-default">${t("shortcutDefault")}</button>
              </div>
            </div>
          </div>
        </section>

        <section class="settings-section">
          <div class="settings-section-title">${t("sectionBackground")}</div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-item-label">${t("trayMode")}</div>
              <div class="settings-item-desc">${t("trayModeDesc")}</div>
            </div>
            <label class="toggle"><input type="checkbox" id="set-tray-mode" ${currentSettings?.trayMode!==false?"checked":""}>
              <span class="toggle-track"><span class="toggle-thumb"></span></span></label>
          </div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-item-label">${t("autostart")}</div>
              <div class="settings-item-desc">${t("autostartDesc")}</div>
            </div>
            <label class="toggle"><input type="checkbox" id="set-autostart" ${currentSettings?.autostart===true?"checked":""}>
              <span class="toggle-track"><span class="toggle-thumb"></span></span></label>
          </div>
        </section>

        <section class="settings-section">
          <div class="settings-section-title">${t("sectionDesign")}</div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-item-label">🎨 Design</div>
              <div class="settings-item-desc">${t("themeAppliedImmediately")}</div>
            </div>
            <div class="theme-options" id="s-theme-opts">
              <label class="theme-card">
                <input type="radio" name="s-theme" value="dark" ${appSettings.theme!=="light"?"checked":""}>
                <div class="theme-card-inner"><div class="theme-card-icon">🌙</div>${t("darkMode").replace("🌙 ","")}</div>
              </label>
              <label class="theme-card">
                <input type="radio" name="s-theme" value="light" ${appSettings.theme==="light"?"checked":""}>
                <div class="theme-card-inner"><div class="theme-card-icon">☀️</div>${t("lightMode").replace("☀️ ","")}</div>
              </label>
            </div>
          </div>
        </section>

                <section class="settings-section">
          <div class="settings-section-title">${t("sectionConnOptions")}</div>
          <div class="settings-item">
            <div class="settings-item-left"><div class="settings-item-label">${t("import")}</div><div class="settings-item-desc">${t("importDesc")}</div></div>
            <button class="settings-action-btn" id="s-import">📥 ${t("import")}…</button>
          </div>
          <div class="settings-item">
            <div class="settings-item-left"><div class="settings-item-label">${t("export")}</div><div class="settings-item-desc">${t("exportDesc")}</div></div>
            <button class="settings-action-btn" id="s-export">📤 ${t("export")}…</button>
          </div>
          <div class="settings-item">
            <div class="settings-item-left"><div class="settings-item-label">${t("openDataFolder")}</div><div class="settings-item-desc">${t("openDataFolderDesc")}</div></div>
            <button class="settings-action-btn" id="s-open-folder">${t("openDataFolderBtn")}</button>
          </div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-item-label" id="ds-current-mode">${t("storageOptionsLabel")} ${currentSettings?.dataSource==="smb"?t("storageSmbActive"):t("storageLocalActive")}</div>
              <div class="settings-item-desc" id="ds-current-detail">${
                currentSettings?.dataSource==="smb"
                  ? escHtml(currentSettings?.smbPath||"")+" · "+(currentSettings?.smbWriteMode==="readwrite"?t("smbModeReadwrite"):t("smbModeReadonly"))
                  : t("dataSourceLocalDetail")
              }</div>
            </div>
            <button class="settings-action-btn" id="ds-change-btn">${t("dataSourceChangeBtn")}</button>
          </div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-item-label" id="vault-status-label">${t("vaultStatusChecking")}</div>
              <div class="settings-item-desc">${t("vaultResetHint")}</div>
            </div>
            <div style="display:flex;gap:8px;flex-shrink:0">
              <button class="settings-action-btn" id="vault-forget-btn">${t("vaultForgetBtn")}</button>
              <button class="settings-action-btn" id="vault-reset-btn" style="color:var(--err)">${t("vaultResetBtn")}</button>
            </div>
          </div>
        </section>
<section class="settings-section">
          <div class="settings-section-title">${t("sectionConnStatus")}</div>
          <div class="settings-item-desc" style="margin-bottom:12px">${t("connStatusDesc")}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <label class="rdp-display-card" style="flex:1;min-width:70px">
              <input type="radio" name="ping-interval" value="0" ${(currentSettings?.pingInterval||0)==0?"checked":""}>
              <div class="rdp-display-card-inner" style="padding:8px 6px;font-size:12px">
                <div style="font-size:16px;margin-bottom:2px">🚫</div>${t("intervalOff")}
              </div>
            </label>
            <label class="rdp-display-card" style="flex:1;min-width:70px">
              <input type="radio" name="ping-interval" value="30000" ${(currentSettings?.pingInterval||0)==30000?"checked":""}>
              <div class="rdp-display-card-inner" style="padding:8px 6px;font-size:12px">
                <div style="font-size:16px;margin-bottom:2px">⚡</div>${t("interval30s")}
              </div>
            </label>
            <label class="rdp-display-card" style="flex:1;min-width:70px">
              <input type="radio" name="ping-interval" value="60000" ${(currentSettings?.pingInterval||0)==60000?"checked":""}>
              <div class="rdp-display-card-inner" style="padding:8px 6px;font-size:12px">
                <div style="font-size:16px;margin-bottom:2px">🕐</div>${t("interval1m")}
              </div>
            </label>
            <label class="rdp-display-card" style="flex:1;min-width:70px">
              <input type="radio" name="ping-interval" value="300000" ${(currentSettings?.pingInterval||0)==300000?"checked":""}>
              <div class="rdp-display-card-inner" style="padding:8px 6px;font-size:12px">
                <div style="font-size:16px;margin-bottom:2px">🕔</div>${t("interval5m")}
              </div>
            </label>
          </div>
        </section>

        <section class="settings-section">
          <div class="settings-section-title">${t("sectionSshTerminal")}</div>
          <div class="settings-item">
            <div class="settings-item-left"><div class="settings-item-label">${t("fontSize")}</div><div class="settings-item-desc">${t("fontSizeDesc")}</div></div>
            <div class="settings-number-row">
              <button class="settings-number-btn" id="s-font-minus">−</button>
              <span class="settings-number-value" id="s-font-value">${appSettings.sshFontSize||14}</span>
              <button class="settings-number-btn" id="s-font-plus">+</button>
            </div>
          </div>
        </section>
        <section class="settings-section">
          <div class="settings-section-title">${t("sectionLanguage")}</div>
          <div class="settings-item-desc" style="margin-bottom:12px">${t("langDesc")}</div>
          <div style="display:flex;gap:20px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="radio" name="app-lang" value="de" ${currentLangSetting==="de"?"checked":""}/>
              <span>${t("langDe")}</span>
            </label>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="radio" name="app-lang" value="en" ${currentLangSetting==="en"?"checked":""}/>
              <span>${t("langEn")}</span>
            </label>
          </div>
        </section>

        <section class="settings-section">
          <div class="settings-section-title">${t("sectionAbout")}</div>
          <div class="settings-about">
            <strong style="color:var(--tx-2)">${t("aboutApp")}</strong><br>
            ${t("aboutDesc")}<br>
            <span style="color:var(--tx-5)">${t("aboutVersion")}: <span id="about-version">…</span></span><br>
            <span style="color:var(--tx-6)">${t("aboutConns")}: ${totalConns} · ${t("aboutFolders")}: ${totalFolders}</span>
          </div>
        </section>
      </div>`;
    tabContentArea.appendChild(container);
    const tabData={id:tabId,type:"settings",title:t("settingsTitle"),container};
    tabs.set(tabId,tabData);activeTabId=tabId;renderTabBar();
    // App-Version im Über-Bereich einsetzen (kommt asynchron vom Backend)
    (async () => {
      try {
        const v = await window.api.getVersion();
        const el = container.querySelector("#about-version");
        if (el) el.textContent = v || "?";
      } catch { /* ignorieren */ }
    })();
    container.querySelector("#s-import").addEventListener("click",async()=>await importConnections());
    container.querySelector("#s-export").addEventListener("click",async()=>{
      try{
        const data=await window.api.store.load();
        const result=await window.api.dialog.saveFile({defaultName:"connections-backup.json",content:JSON.stringify(data,null,2)});
        if(result)await showAlert({title:t("exportSuccess"),message:t("exportedTo",result.filePath)});
      }catch(err){await showAlert({title:t("exportError"),message:String(err?.message||err)});}
    });
    container.querySelector("#s-open-folder").addEventListener("click",async()=>await window.api.store.openFolder());
    const fontValue=container.querySelector("#s-font-value");
    container.querySelector("#s-pers-save")?.addEventListener("click",async()=>{
      const user=container.querySelector("#s-pers-user").value.trim();
      const pw=container.querySelector("#s-pers-pw").value;
      if(!user){container.querySelector("#s-pers-user").focus();return;}
      // Wenn Passwortfeld leer und bereits gespeichert → nur Username updaten
      if(!pw&&personalCreds?.ok){
        const r=await window.api.cred.loadPersonal();
        if(r?.ok){await window.api.cred.savePersonal({username:user,password:r.password});await showAlert({title:t("saved"),message:t("personalCredsUpdated")});return;}
      }
      if(!pw){container.querySelector("#s-pers-pw").focus();return;}
      await window.api.cred.savePersonal({username:user,password:pw});
      await showAlert({title:t("saved"),message:t("personalCredsSaved")});
    });
    container.querySelector("#s-pers-del")?.addEventListener("click",async()=>{
      if(!await showConfirm({title:t("deleteTitle"),message:t("confirmDeletePersonalCreds")}))return;
      await window.api.cred.deletePersonal();
      await showAlert({title:"Gelöscht",message:"Persönliche Zugangsdaten wurden gelöscht."});
    });

    // Alle RDP-Verbindungen auf persönliche Anmeldung umstellen
    const rdpAllBtn = container.querySelector("#rdp-all-personal");

    // Sammelt alle RDP-Verbindungs-IDs im aktuellen Model
    function collectRdpIds() {
      const ids = [];
      (function walk(folders) {
        for (const f of folders || []) {
          for (const c of f.items || []) { if (c.type === "rdp") ids.push(c.id); }
          walk(f.folders);
        }
      })(model?.folders);
      return ids;
    }

    // Button ausgrauen, wenn es keine RDP gibt ODER alle schon auf "personal" stehen
    async function refreshRdpAllBtn() {
      if (!rdpAllBtn) return;
      const ids = collectRdpIds();
      if (ids.length === 0) { rdpAllBtn.disabled = true; rdpAllBtn.title = t("rdpAllPersonalNone"); return; }
      let allPersonal = true;
      for (const id of ids) {
        try {
          const modeR = await window.api.cred.getMode({ id });
          if (modeR?.mode !== "personal") { allPersonal = false; break; }
        } catch { allPersonal = false; break; }
      }
      rdpAllBtn.disabled = allPersonal;
      rdpAllBtn.title = allPersonal ? t("rdpAllPersonalAlready") : "";
    }
    refreshRdpAllBtn();

    rdpAllBtn?.addEventListener("click", async () => {
      const rdpIds = collectRdpIds();
      if (rdpIds.length === 0) {
        await showAlert({ title: t("rdpAllPersonalBtn"), message: t("rdpAllPersonalNone") });
        return;
      }
      // Nur die Verbindungen ermitteln, die noch NICHT auf persönlich stehen
      const toChange = [];
      for (const id of rdpIds) {
        try {
          const modeR = await window.api.cred.getMode({ id });
          if (modeR?.mode !== "personal") toChange.push(id);
        } catch { toChange.push(id); } // im Zweifel mit umstellen
      }
      if (toChange.length === 0) {
        await showAlert({ title: t("rdpAllPersonalBtn"), message: t("rdpAllPersonalAlready") });
        await refreshRdpAllBtn();
        return;
      }
      const sure = await showConfirm({
        title: t("rdpAllPersonalConfirmTitle"),
        message: t("rdpAllPersonalConfirmMsg", String(toChange.length)),
        okLabel: t("rdpAllPersonalBtn"), cancelLabel: t("cancel")
      });
      if (!sure) return;

      let done = 0;
      for (const id of toChange) {
        try { const r = await window.api.cred.setMode({ id, mode: "personal" }); if (r?.ok) done++; } catch {}
      }
      await showAlert({ title: t("rdpAllPersonalDoneTitle"), message: t("rdpAllPersonalDoneMsg", String(done)) });
      await loadAndRender();
      await refreshRdpAllBtn(); // Button jetzt ausgrauen, da alle umgestellt
    });
    const dsChangeBtn = container.querySelector("#ds-change-btn");
    if (dsChangeBtn) {
      dsChangeBtn.addEventListener("click", async () => {
        const changed = await showDataSourceDialog();
        if (changed) {
          // Anzeige in den Einstellungen aktualisieren
          const s = await window.api.settings.load() || {};
          const modeEl   = container.querySelector("#ds-current-mode");
          const detailEl = container.querySelector("#ds-current-detail");
          if (modeEl)   modeEl.textContent = t("storageOptionsLabel") + " " + (s.dataSource === "smb" ? t("storageSmbActive") : t("storageLocalActive"));
          if (detailEl) detailEl.textContent = s.dataSource === "smb"
            ? (s.smbPath || "") + " · " + (s.smbWriteMode === "readwrite" ? t("smbModeReadwrite") : t("smbModeReadonly"))
            : t("dataSourceLocalDetail");
          await loadAndRender();
          // Tresor am neuen Ort erkennen: alten Schlüssel verwerfen, ggf. neu entsperren
          await initVault({ afterSwitch: true });
        }
      });
    }

    // Tresor-Status anzeigen + Buttons je nach Zustand aktivieren/ausgrauen
    const vaultResetBtn  = container.querySelector("#vault-reset-btn");
    const vaultForgetBtn = container.querySelector("#vault-forget-btn");

    async function refreshVaultButtons() {
      const lbl = container.querySelector("#vault-status-label");
      let st = { exists: false, unlocked: false, remembered: false };
      try { st = await window.api.vault.status(); } catch {}
      if (lbl) lbl.textContent = !st.exists ? t("vaultStatusNone")
        : st.unlocked ? t("vaultStatusUnlocked") : t("vaultStatusLocked");
      // Zurücksetzen nur sinnvoll, wenn ein Tresor existiert
      if (vaultResetBtn) {
        vaultResetBtn.disabled = !st.exists;
        vaultResetBtn.title = st.exists ? "" : t("vaultNoVaultHint");
      }
      // Vergessen nur sinnvoll, wenn ein Tresor existiert UND ein Passwort gemerkt ist
      if (vaultForgetBtn) {
        const canForget = st.exists && st.remembered;
        vaultForgetBtn.disabled = !canForget;
        vaultForgetBtn.title = !st.exists ? t("vaultNoVaultHint")
          : !st.remembered ? t("vaultNothingRemembered") : "";
      }
    }
    refreshVaultButtons();

    if (vaultResetBtn) {
      vaultResetBtn.addEventListener("click", async () => {
        const sure = await showConfirm({
          title: t("vaultResetTitle"),
          message: t("vaultResetMsg"),
          okLabel: t("vaultResetOk"), cancelLabel: t("cancel")
        });
        if (!sure) return;
        const r = await window.api.vault.reset();
        if (r.ok) {
          await showAlert({ title: t("vaultResetDoneTitle"), message: t("vaultResetDoneMsg", String(r.removed || 0)) });
          await refreshVaultButtons();
          await loadAndRender();
        } else {
          await showAlert({ title: t("errorTitle"), message: r.error || "Fehler" });
        }
      });
    }
    if (vaultForgetBtn) {
      vaultForgetBtn.addEventListener("click", async () => {
        const sure = await showConfirm({
          title: t("vaultForgetTitle"),
          message: t("vaultForgetMsg"),
          okLabel: t("vaultForgetBtn"), cancelLabel: t("cancel")
        });
        if (!sure) return;
        const r = await window.api.vault.forget();
        if (r.ok) {
          await showAlert({ title: t("vaultForgetDoneTitle"), message: t("vaultForgetDoneMsg") });
          await refreshVaultButtons();
        } else {
          await showAlert({ title: t("errorTitle"), message: r.error || "Fehler" });
        }
      });
    }
    // ── Schnellsuche-Tastenkombination ──────────────────────────────────
    (function wireShortcut(){
      const disp   = container.querySelector("#qs-shortcut-display");
      const btnCh  = container.querySelector("#qs-shortcut-change");
      const btnDef = container.querySelector("#qs-shortcut-default");
      const msgEl  = container.querySelector("#qs-shortcut-msg");
      if (!disp || !btnCh) return;

      let recording = false;

      function setMsg(text, kind){
        if (!msgEl) return;
        msgEl.textContent = text || "";
        msgEl.style.color = kind === "err" ? "var(--err)" : kind === "ok" ? "var(--ok,#4caf50)" : "var(--tx-5)";
      }

      // Wandelt ein Tastatur-Event in ein Electron-Accelerator um
      // (z. B. Strg+Shift+K -> "CommandOrControl+Shift+K").
      // Gibt null zurück, wenn die Kombination ungültig ist (kein Modifikator).
      function eventToAccelerator(e){
        const mods = [];
        if (e.ctrlKey)  mods.push("CommandOrControl");
        if (e.shiftKey) mods.push("Shift");
        if (e.altKey)   mods.push("Alt");
        // Die eigentliche Taste (nicht der Modifikator selbst)
        let key = e.key;
        if (["Control","Shift","Alt","Meta"].includes(key)) return null; // nur Modifikator gedrückt
        // Sondertasten in Accelerator-Schreibweise übersetzen
        if (key === " ") key = "Space";
        else if (key.length === 1) key = key.toUpperCase();
        else key = key.charAt(0).toUpperCase() + key.slice(1); // z. B. "Enter", "F5"
        // Globale Kürzel brauchen mindestens einen Modifikator
        if (mods.length === 0) return null;
        return [...mods, key].join("+");
      }

      function startRecording(){
        recording = true;
        disp.value = t("shortcutPressKeys");
        setMsg(t("shortcutRecording"), "info");
        disp.focus();
      }

      disp.addEventListener("click", startRecording);
      btnCh.addEventListener("click", startRecording);

      disp.addEventListener("keydown", async (e) => {
        if (!recording) return;
        e.preventDefault();
        if (e.key === "Escape") { // Abbruch
          recording = false;
          const s = await window.api.settings.load() || {};
          disp.value = shortcutToDisplay(s.quickSearchShortcut || "CommandOrControl+Shift+Space");
          setMsg("", "info");
          return;
        }
        const acc = eventToAccelerator(e);
        if (!acc) { setMsg(t("shortcutNeedModifier"), "err"); return; }

        recording = false;
        // Speichern und Backend neu registrieren lassen
        const s = await window.api.settings.load() || {};
        s.quickSearchShortcut = acc;
        await window.api.settings.save(s);
        const r = await window.api.shortcut.reregister();
        if (r?.ok) {
          disp.value = shortcutToDisplay(acc);
          setMsg(t("shortcutSaved"), "ok");
        } else {
          // Registrierung fehlgeschlagen (belegt) – zurück auf alten Wert
          setMsg(t("shortcutInUse"), "err");
          disp.value = shortcutToDisplay(acc);
        }
      });

      btnDef.addEventListener("click", async () => {
        recording = false;
        const s = await window.api.settings.load() || {};
        s.quickSearchShortcut = "CommandOrControl+Shift+Space";
        await window.api.settings.save(s);
        await window.api.shortcut.reregister();
        disp.value = shortcutToDisplay("CommandOrControl+Shift+Space");
        setMsg(t("shortcutSaved"), "ok");
      });
    })();

    // ── Hintergrundbetrieb (Tray / Autostart) ───────────────────────────
    (function wireBackground(){
      const bind = (id, key) => {
        const cb = container.querySelector("#" + id);
        if (!cb) return;
        cb.addEventListener("change", async () => {
          const s = await window.api.settings.load() || {};
          s[key] = cb.checked;
          await window.api.settings.save(s);
          try { await window.api.tray.apply(); } catch {}
        });
      };
      bind("set-tray-mode", "trayMode");
      bind("set-autostart", "autostart");
    })();

    container.querySelectorAll('input[name="app-lang"]').forEach(r => {
      r.addEventListener("change", async () => {
        try {
          const s = await window.api.settings.load() || {};
          s.language = r.value;
          await window.api.settings.save(s);
          await showAlert({ title: t("restartRequired"), message: t("restartMsg") });
        } catch(err) { console.error(err); }
      });
    });
    container.querySelectorAll('input[name="ping-interval"]').forEach(r => {
      r.addEventListener("change", async () => {
        const s = await window.api.settings.load() || {};
        s.pingInterval = Number(r.value);
        await window.api.settings.save(s);
        await applyPingInterval();
      });
    });
    container.querySelector("#s-clear-creds").addEventListener("click",async()=>{
      if(!await showConfirm({title:t("deletePasswordsTitle"),message:t("confirmDeleteSshPasswords")}))return;
      await window.api.cred.clear();
      await showAlert({title:t("done"),message:t("allSshDeleted")});
    });
    container.querySelector("#s-font-minus").addEventListener("click",async()=>{appSettings.sshFontSize=Math.max(8,(appSettings.sshFontSize||14)-1);fontValue.textContent=appSettings.sshFontSize;await saveSettings();});
    container.querySelector("#s-font-plus").addEventListener("click",async()=>{appSettings.sshFontSize=Math.min(28,(appSettings.sshFontSize||14)+1);fontValue.textContent=appSettings.sshFontSize;await saveSettings();});

    // Theme-Auswahl
    container.querySelectorAll('input[name="s-theme"]').forEach(radio=>{
      radio.addEventListener("change",async()=>{
        if(!radio.checked)return;
        appSettings.theme=radio.value;
        applyTheme(radio.value);
        await saveSettings();
      });
    });
  }

  document.getElementById("settings-btn")?.addEventListener("click",async()=>{
    for(const[tid,tab]of tabs){if(tab.type==="settings"){if(activeTabId===tid){await closeTab(tid);return;}await activateTab(tid);return;}}
    await openSettingsTab();
  });

  /* =========================================================
     Import – Hilfsfunktion: Ordnerstruktur aus Pfad-Map aufbauen
     Wird von beiden Importern genutzt.
  ========================================================== */
  async function buildFolderMap(pathSet, rootFolderId) {
    // Pfade nach Tiefe sortieren damit Eltern vor Kindern erstellt werden
    const sorted = [...pathSet].sort((a, b) => a.split("\\").length - b.split("\\").length);
    const map = new Map([["", rootFolderId]]);
    for (const path of sorted) {
      const parts = path.split("\\");
      const name  = parts[parts.length - 1];
      const parentPath = parts.slice(0, -1).join("\\");
      const parentId   = map.get(parentPath) || rootFolderId;
      try {
        const r = await window.api.store.createFolder({ name, parentId });
        map.set(path, r?.folderId || parentId);
      } catch {
        map.set(path, parentId); // Tiefenlimit → in Elternordner einfügen
      }
    }
    return map;
  }

  /* =========================================================
     ✅ Import: mRemoteNG XML
  ========================================================== */
  async function doImportMRemoteNG(doc) {
    const rootName   = doc.documentElement.getAttribute("Name") || "mRemoteNG Import";
    const rootResult = await window.api.store.createFolder({ name: rootName });
    const rootId     = rootResult?.folderId;
    if (!rootId) throw new Error(t("rootFolderError"));

    let imported = 0, skipped = 0;

    async function processChildren(xmlParent, folderId) {
      for (const node of xmlParent.children) {
        const name = node.getAttribute("Name") || "Unbekannt";
        const type = node.getAttribute("Type");
        if (type === "Container") {
          try {
            const r = await window.api.store.createFolder({ name, parentId: folderId });
            await processChildren(node, r?.folderId || folderId);
          } catch { await processChildren(node, folderId); }
        } else if (type === "Connection") {
          const protocol = (node.getAttribute("Protocol") || "").toUpperCase();
          const host     = node.getAttribute("Hostname") || "";
          const portVal  = parseInt(node.getAttribute("Port") || "0") || undefined;
          const username = node.getAttribute("Username") || "";
          if (!host) { skipped++; continue; }
          try {
            if (protocol === "RDP")                              { await window.api.store.createConnection({ folderId, name, host, port: portVal || 3389 }); imported++; }
            else if (["SSH1","SSH2","SSH"].includes(protocol))   { await window.api.store.createSshConnection({ folderId, name, host, port: portVal || 22, username: username || "root" }); imported++; }
            else if (protocol === "HTTP" || protocol === "HTTPS"){ await window.api.store.createWebConnection({ folderId, name, url: `${protocol.toLowerCase()}://${host}${portVal ? `:${portVal}` : ""}` }); imported++; }
            else { skipped++; }
          } catch { skipped++; }
        }
      }
    }

    await processChildren(doc.documentElement, rootId);
    return { imported, skipped };
  }

  /* =========================================================
     ✅ Import: Devolutions Remote Desktop Manager XML
     Format: <ArrayOfConnection> mit <Connection> Einträgen.
     Ordnerpfade stehen im <Group>-Feld (z.B. "IT\Server\Prod").

     Robuste Implementierung:
     - getElementsByTagName statt querySelector (XML-Namespace-sicher)
     - Numerische ConnectionType-Werte (2=RDP, 55=SSH, 25=Web) werden erkannt
     - Viele mögliche Host-Feldnamen werden geprüft
     - Unbekannte Typen werden geloggt damit fehlende Typen gemeldet werden
  ========================================================== */
  async function doImportDevolutions(doc) {

    // Robuster Textleser: durchsucht alle Tags eines Knotens per getName
    function getText(node, ...tags) {
      for (const tag of tags) {
        const els = node.getElementsByTagName(tag);
        if (els.length > 0 && els[0].textContent.trim()) {
          return els[0].textContent.trim();
        }
      }
      return "";
    }

    // Alle Connection-Elemente (namespace-sicher)
    const allConns = Array.from(doc.getElementsByTagName("Connection"));

    // Filtere Ordner-Einträge heraus
    // ConnectionType "Group" / "Folder" oder numerisch 0/1
    const dataConns = allConns.filter(c => {
      const t = getText(c, "ConnectionType").toLowerCase();
      return t !== "" && t !== "group" && t !== "folder" && t !== "0" && t !== "1";
    });

    // Ordnerpfade aus Group-Feldern sammeln
    const pathSet = new Set();
    for (const conn of dataConns) {
      const raw = getText(conn, "Group").replace(/\//g, "\\");
      if (!raw) continue;
      const parts = raw.split("\\").filter(Boolean);
      for (let i = 1; i <= parts.length; i++) {
        pathSet.add(parts.slice(0, i).join("\\"));
      }
    }

    // Root-Ordner anlegen
    const rootResult = await window.api.store.createFolder({ name: "Devolutions Import" });
    const rootId     = rootResult?.folderId;
    if (!rootId) throw new Error(t("rootFolderError"));

    // Ordner-Map aufbauen
    const folderMap = await buildFolderMap(pathSet, rootId);

    let imported = 0, skipped = 0;
    const unknownTypes = new Set();

    for (const conn of dataConns) {
      const rawType = getText(conn, "ConnectionType");
      const name    = getText(conn, "Name") || "Unbekannt";
      const rawGrp  = getText(conn, "Group").replace(/\//g, "\\");
      const folderId = folderMap.get(rawGrp) || rootId;

      // Host aus vielen möglichen Feldnamen
      const host = getText(conn,
        "Host", "HostName", "Hostname",
        "ComputerName", "Server", "RemoteHost", "Address",
        "IPAddress", "MachineName");

      const username = getText(conn, "UserName", "Username", "User");

      // ── Verbindungstyp erkennen (String UND Zahl) ──────────────────
      const typeLow = rawType.toLowerCase();
      const typeNum = parseInt(rawType);

      const isRdp =
        /rdp|remotedesktop|terminal.?serv/i.test(typeLow) ||
        typeNum === 2 || typeNum === 71 ||    // bekannte Devolutions RDP-Enum-Werte
        // Fallback: Port oder RDP-spezifisches Sub-Element vorhanden
        (isNaN(typeNum) === false === false && conn.getElementsByTagName("RDPPort").length > 0) ||
        (!isNaN(typeNum) && getText(conn, "RDPPort") !== "");

      const isSsh =
        /^ssh|shell|putty|secure.?shell/i.test(typeLow) ||
        typeNum === 55 || typeNum === 56 || typeNum === 57;

      const isWeb =
        /web|browser|http|url|site/i.test(typeLow) ||
        typeNum === 25 || typeNum === 26 || typeNum === 27;

      try {
        if (isRdp) {
          // ✅ FIX: Devolutions speichert den RDP-Host manchmal in <Url> statt <Host>
          const rdpHost = host || getText(conn, "Url");
          if (!rdpHost) { skipped++; continue; }
          const port = parseInt(getText(conn, "RDPPort", "Port") || "3389") || 3389;
          await window.api.store.createConnection({ folderId, name, host: rdpHost, port });
          imported++;

        } else if (isSsh) {
          if (!host) { skipped++; continue; }
          const port = parseInt(getText(conn, "SSHPort", "Port") || "22") || 22;
          await window.api.store.createSshConnection({ folderId, name, host, port, username: username || "root" });
          imported++;

        } else if (isWeb) {
          const url = getText(conn, "Url", "URL", "WebUrl", "WebBrowserUrl", "Uri") ||
                      (host ? "https://" + host : "");
          if (!url) { skipped++; continue; }
          await window.api.store.createWebConnection({ folderId, name, url });
          imported++;

        } else {
          // Typ unbekannt – für Debugging merken
          if (rawType) unknownTypes.add(rawType);
          skipped++;
        }
      } catch { skipped++; }
    }

    return { imported, skipped, unknownTypes };
  }


  /* =========================================================
     ✅ Import-Hauptfunktion mit Auto-Erkennung
  ========================================================== */
  async function importConnections() {
    const prev = await hideActiveWebTab();
    try {
      const result = await window.api.dialog.openFile([
        { name: t("connectionDataXml"), extensions: ["xml"] },
        { name: t("allFiles"),           extensions: ["*"] },
      ]);
      if (!result) return;

      // IDs vor Import merken um neue Verbindungen zu erkennen
      const existingIds = new Set();
      try {
        (function collectIds(folders) {
          for (const f of folders || []) {
            for (const c of f.items || []) existingIds.add(c.id);
            collectIds(f.folders);
          }
        })((await window.api.store.load())?.folders);
      } catch {}

      const { content } = result;
      const parser = new DOMParser();
      const doc    = parser.parseFromString(content, "text/xml");

      if (doc.querySelector("parsererror")) {
        await showAlert({ title: t("importError"), message: t("importInvalidXml") });
        return;
      }

      const rootTag = doc.documentElement.tagName.toLowerCase();
      let importResult;

      // ── Devolutions RDM erkennen ─────────────────────────────────────
      // Typisches Merkmal: Root-Tag enthält "arrayofconnection" ODER
      // erstes Connection-Element hat ein <ConnectionType>-Kind
      const isDevolutions =
        rootTag.includes("arrayofconnection") ||
        !!doc.querySelector("Connection > ConnectionType");

      // ── mRemoteNG erkennen ───────────────────────────────────────────
      const isMRemoteNG =
        content.includes("mrng:") ||
        rootTag.includes("connections") ||
        !!doc.documentElement.querySelector("[Type='Connection']");

      if (isDevolutions) {
        importResult = await doImportDevolutions(doc);
      } else if (isMRemoteNG) {
        importResult = await doImportMRemoteNG(doc);
      } else {
        await showAlert({
          title: t("importError"),
          message: t("importUnknownFormat")
        });
        return;
      }

      await loadAndRender();
      const { imported, skipped, unknownTypes } = importResult;
      let msg = `✅ ${imported} Verbindungen importiert`;
      if (skipped) msg += `\n⚠️ ${skipped} übersprungen`;
      if (unknownTypes?.size) msg += `\n\n${t("unknownTypesNote")}\n${[...unknownTypes].join(", ")}`;
      await showAlert({ title: "Import erfolgreich", message: msg });

      // ── Persönliche Zugangsdaten für neue RDP-Verbindungen? ───────────
      const afterData = await window.api.store.load();
      const newRdpConns = [];
      (function collectNew(folders) {
        for (const f of folders || []) {
          for (const c of f.items || [])
            if (c.type === "rdp" && !existingIds.has(c.id)) newRdpConns.push(c);
          collectNew(f.folders);
        }
      })(afterData?.folders);

      if (newRdpConns.length > 0) {
        const usePersonal = await showConfirm({
          title: t("importPersonalTitle"),
          message: t("importPersonalCredsMsg", newRdpConns.length),
          okLabel: t("yes"),
          cancelLabel: t("no")
        });
        if (usePersonal) {
          for (const c of newRdpConns) {
            try { await window.api.cred.setMode({ id: c.id, mode: "personal" }); } catch {}
          }
        }
      }
    } finally {
      await restoreWebTab(prev);
    }
  }

    /* =========================================================
     Formular: Serielle Verbindung
  ========================================================== */
  async function showSerialForm({title, defaults={}}={}) {
    // Verfügbare COM-Ports laden
    let ports = [];
    try {
      const r = await window.api.serial.listPorts();
      if (r?.ok) ports = r.ports || [];
      else if (r?.error) console.warn("Ports:", r.error);
    } catch {}

    return new Promise((resolve) => {
      const bd=document.createElement("div");bd.className="modal-backdrop";
      const m=document.createElement("div");m.className="modal";

      const portOpts = ports.length
        ? ports.map(p=>`<option value="${escHtml(p.path)}">${escHtml(p.path+(p.friendlyName?` – ${p.friendlyName}`:""))}</option>`).join("")
        : `<option value="${escHtml(defaults.comPort||"")}">Kein COM-Port erkannt – manuell eingeben</option>`;

      m.innerHTML=`
<div class="modal-header">${escHtml(title||t("editSerialTitle"))}</div>
<div class="modal-body rdp-form">

  <div class="rdp-section">
    <div class="rdp-section-title">${t("connVerbindung")}</div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow"><label>${t("connName")}</label>
        <input type="text" id="sr-name" placeholder="${t('serialNamePlaceholder')}"/></div>
    </div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow">
        <label>COM-Port</label>
        <select id="sr-port">${portOpts}</select>
      </div>
      <div class="rdp-field" style="width:60px">
        <label style="opacity:0">_</label>
        <button class="btn" id="sr-refresh" title="Ports neu laden" style="height:34px;padding:0 8px">↻</button>
      </div>
    </div>
  </div>

  <div class="rdp-section">
    <div class="rdp-section-title">Parameter</div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow">
        <label>Baud Rate</label>
        <select id="sr-baud">
          <option value="9600">9600 (Cisco/HP Standard)</option>
          <option value="19200">19200</option>
          <option value="38400">38400</option>
          <option value="57600">57600</option>
          <option value="115200">115200</option>
          <option value="230400">230400</option>
        </select>
      </div>
    </div>
    <div class="rdp-field-row" style="margin-top:2px">
      <div class="rdp-field" style="flex:1"><label>Datenbits</label>
        <select id="sr-data"><option value="8" selected>8</option><option value="7">7</option></select></div>
      <div class="rdp-field" style="flex:1"><label>Parität</label>
        <select id="sr-par">
          <option value="none">${t("serialParityNone")}</option>
          <option value="even">${t("serialParityEven")}</option>
          <option value="odd">${t("serialParityOdd")}</option>
        </select></div>
      <div class="rdp-field" style="flex:1"><label>Stoppbits</label>
        <select id="sr-stop"><option value="1" selected>1</option><option value="2">2</option></select></div>
    </div>
  </div>

  <div class="rdp-section" style="border-bottom:none">
    <div style="font-size:11px;color:var(--tx-6);line-height:1.6">
      Cisco: 9600-8-N-1 &nbsp;|&nbsp; HP/Aruba: 9600-8-N-1 &nbsp;|&nbsp; Juniper: 9600-8-N-1<br>
      Neuere Geräte oft 115200
    </div>
  </div>

</div>
<div class="modal-actions">
  <button class="btn" id="btn-cancel">${t("cancel")}</button>
  <button class="btn primary" id="btn-ok">${t("save")}</button>
</div>`;

      bd.appendChild(m);document.body.appendChild(bd);

      // Prefill
      m.querySelector("#sr-name").value = defaults.name||"";
      if(defaults.comPort){const sel=m.querySelector("#sr-port");const opt=[...sel.options].find(o=>o.value===defaults.comPort);if(opt)sel.value=defaults.comPort;else{const o=document.createElement("option");o.value=defaults.comPort;o.textContent=defaults.comPort;sel.insertBefore(o,sel.firstChild);sel.value=defaults.comPort;}}
      if(defaults.baudRate) m.querySelector("#sr-baud").value=String(defaults.baudRate);
      if(defaults.dataBits) m.querySelector("#sr-data").value=String(defaults.dataBits);
      if(defaults.parity)   m.querySelector("#sr-par").value=defaults.parity;
      if(defaults.stopBits) m.querySelector("#sr-stop").value=String(defaults.stopBits);

      // Refresh button
      m.querySelector("#sr-refresh").addEventListener("click",async()=>{
        try{
          const r=await window.api.serial.listPorts();
          const sel=m.querySelector("#sr-port");
          const cur=sel.value;
          sel.innerHTML=(r?.ports?.length
            ?r.ports.map(p=>`<option value="${escHtml(p.path)}">${escHtml(p.path+(p.friendlyName?` – ${p.friendlyName}`:""))}</option>`).join("")
            :`<option value="">Kein COM-Port erkannt</option>`);
          if(cur){const opt=[...sel.options].find(o=>o.value===cur);if(opt)sel.value=cur;}
        }catch{}
      });

      m.querySelector("#sr-name").focus();m.querySelector("#sr-name").select();

      const cl=(v)=>{bd.remove();resolve(v);};

      m.querySelector("#btn-ok").addEventListener("click",()=>{
        const comPort=m.querySelector("#sr-port").value.trim();
        if(!comPort){m.querySelector("#sr-port").focus();return;}
        cl({
          name:     m.querySelector("#sr-name").value.trim()||comPort,
          comPort,
          baudRate: Number(m.querySelector("#sr-baud").value),
          dataBits: Number(m.querySelector("#sr-data").value),
          parity:   m.querySelector("#sr-par").value,
          stopBits: Number(m.querySelector("#sr-stop").value),
        });
      });
      m.querySelector("#btn-cancel").addEventListener("click",()=>cl(null));
      bd.addEventListener("click",(e)=>{if(e.target===bd)cl(null);});
      m.addEventListener("keydown",(e)=>{if(e.key==="Escape")cl(null);});
      m.addEventListener("contextmenu",(e)=>e.preventDefault());
    });
  }

  /* =========================================================
     Tab öffnen: Serial
  ========================================================== */
  async function openSerialTab({connId, name, comPort, baudRate=9600, dataBits=8, parity="none", stopBits=1}){
    const tabId=genTabId(), sessionId="serial-"+tabId;
    await deactivateCurrentTab();
    const container=document.createElement("div");
    container.className="ssh-tab-container active"; // xterm reuse
    tabContentArea.appendChild(container);
    const tabData={id:tabId,type:"serial",title:name||comPort,sessionId,comPort,connId,container,term:null,fitAddon:null,offData:null,offClosed:null};
    tabs.set(tabId,tabData);activeTabId=tabId;renderTabBar();

    const result=await window.api.serial.connect({sessionId,path:comPort,baudRate,dataBits,parity,stopBits});
    if(!result.ok){
      tabs.delete(tabId);container.remove();activeTabId=null;renderTabBar();
      await showAlert({title:"Verbindungsfehler",message:result.error||"Konnte nicht verbinden."});
      return;
    }

    const term=new Terminal({
      cursorBlink:true, fontSize:appSettings.sshFontSize||14,
      fontFamily:"Consolas,'Courier New',monospace",
      theme:getTerminalTheme()
    });
    const fitAddon=new FitAddon.FitAddon();
    term.loadAddon(fitAddon);term.open(container);fitAddon.fit();term.focus();

    // Kopieren/Einfügen wie SSH
    term.attachCustomKeyEventHandler((e)=>{
      if(e.type!=="keydown")return true;
      if(e.ctrlKey&&e.shiftKey&&e.key==="C"){const sel=term.getSelection();if(sel)window.api.clipboard.write(sel).catch(()=>{});return false;}
      if(e.ctrlKey&&e.shiftKey&&e.key==="V"){window.api.clipboard.read().then(t=>{if(t)window.api.serial.send({sessionId,data:t});}).catch(()=>{});return false;}
      return true;
    });
    container.addEventListener("contextmenu",(e)=>{
      e.preventDefault();const selection=term.getSelection();
      document.querySelectorAll(".serial-ctx-menu").forEach(m=>m.remove());
      const menu=document.createElement("div");menu.className="context-menu serial-ctx-menu";
      if(selection){const ci=document.createElement("div");ci.className="menu-item";ci.textContent="Kopieren";ci.addEventListener("click",()=>{window.api.clipboard.write(selection).catch(()=>{});menu.remove();});menu.appendChild(ci);}
      const pi=document.createElement("div");pi.className="menu-item";pi.textContent="Einfügen";
      pi.addEventListener("click",()=>{window.api.clipboard.read().then(t=>{if(t)window.api.serial.send({sessionId,data:t});}).catch(()=>{});menu.remove();});
      menu.appendChild(pi);
      menu.style.left=Math.min(e.clientX,window.innerWidth-160)+"px";menu.style.top=Math.min(e.clientY,window.innerHeight-80)+"px";
      document.body.appendChild(menu);
      const close=()=>{menu.remove();document.removeEventListener("click",close);};setTimeout(()=>document.addEventListener("click",close),10);
    });

    tabData.term=term;tabData.fitAddon=fitAddon;
    term.onData(data=>window.api.serial.send({sessionId,data}));
    tabData.offData  =window.api.serial.onData(({sessionId:sid,data})=>{if(sid!==sessionId)return;term.write(Uint8Array.from(atob(data),c=>c.charCodeAt(0)));});
    tabData.offClosed=window.api.serial.onClosed(({sessionId:sid})=>{
      if(sid!==sessionId)return;
      term.writeln(`\r\n\u001b[33m[${t("connectionClosed")}]\u001b[0m`);

    });
  }

    /* =========================================================
     Suchleiste
  ========================================================== */
  let searchQuery="";
  const searchInput=document.getElementById("search-input");
  if(searchInput){
    searchInput.addEventListener("input",(e)=>{searchQuery=(e.target.value||"").trim();render();});
    searchInput.addEventListener("keydown",(e)=>{if(e.key==="Escape"){searchInput.value="";searchQuery="";render();}});
  }

  function renderSearchResults(query){
    treeContainer.innerHTML="";const q=query.toLowerCase();const results=[];
    function searchFolders(folders,path){
      for(const folder of folders){
        const fp=[...path,folder.name];
        for(const item of(folder.items||[])){
          // Wie die Schnellsuche: Name, Host/URL, Notizen UND Ordnerpfad durchsuchen,
          // mehrere Begriffe (durch Leerzeichen getrennt) müssen alle vorkommen.
          const notes=item.notes||item.profile?.notes||"";
          const hay=`${item.name} ${item.host||""} ${item.url||""} ${notes} ${fp.join(" / ")}`.toLowerCase();
          if(q.split(/\s+/).filter(Boolean).every(term=>hay.includes(term)))results.push({item,folderId:folder.id,path:fp});
        }
        searchFolders(folder.folders||[],fp);
      }
    }
    searchFolders(model?.folders||[],[]);
    if(!results.length){treeContainer.appendChild(el("div",{style:"opacity:.6;padding:12px;font-size:12px;"},t("noResults")));return;}
    for(const{item,folderId,path}of results){
      const icon=item.type==="web"?"🌐":item.type==="ssh"?"🔒":"🪟";
      const div=document.createElement("div");div.className="tree-item search-result";
      div.innerHTML=`<div class="search-result-name">${icon} ${escHtml(item.name)}${(item.host||(item.type==="web"&&item.url))?getStatusDotHtml(item.id):""}</div><div class="search-breadcrumb">${escHtml(path.join(" › "))}</div>`;
      div.addEventListener("dblclick",async()=>{try{await openConnection(item);}catch(err){await showAlert({title:t("errorTitle"),message:String(err?.message||err)});}});
      // Rechtsklick: dasselbe Kontextmenü wie im Baum (Bearbeiten, Löschen, …)
      div.addEventListener("contextmenu",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        showContextMenu(e.clientX,e.clientY,{type:"connection",folderId,connectionId:item.id});
      });
      treeContainer.appendChild(div);
    }
  }

  /* =========================================================
     Render (Sidebar-Baum)
  ========================================================== */
  function render(){
    if(!treeContainer)return;
    if(searchQuery){renderSearchResults(searchQuery);return;}
    treeContainer.innerHTML="";
    const folders=model?.folders||[];
    if(!folders.length){treeContainer.appendChild(el("div",{style:"opacity:.6;padding:12px;font-size:12px;"},t("emptyStateHint")));return;}
    const INDENT=16;
    function renderFolder(folder,depth){
      const isOpen=!!folder.open;
      const header=el("div",{class:"tree-folder-header",dataset:{id:folder.id,depth:String(depth)},style:`padding-left:${10+(depth-1)*INDENT}px`},el("div",{class:"arrow"}),el("div",{class:"folder-name"},folder.name));
      header.addEventListener("click",async()=>{folder.open=!folder.open;try{await window.api.store.setFolderOpen({folderId:folder.id,open:folder.open});}catch{}render();});
      header.addEventListener("mousedown",()=>{clearSelection();header.classList.add("active");selectedFolderId=folder.id;});
      header.setAttribute("draggable","true");
      header.addEventListener("dragstart",(e)=>{currentDrag={kind:"folder",id:folder.id};e.dataTransfer.effectAllowed="move";header.classList.add("dragging");});
      header.addEventListener("dragend",()=>{currentDrag=null;header.classList.remove("dragging");});
      // Ermittelt beim Ziehen über einen Ordner die Zone:
      // obere 25% = davor einsortieren, mittlere 50% = hineinverschachteln,
      // untere 25% = dahinter einsortieren.
      function folderDropZone(e){
        const rect=header.getBoundingClientRect();
        const rel=(e.clientY-rect.top)/rect.height;
        if(rel<0.25)return "before";
        if(rel>0.75)return "after";
        return "into";
      }
      header.addEventListener("dragover",(e)=>{
        if(!currentDrag)return;
        // Ein Ordner darf nicht auf sich selbst gezogen werden
        if(currentDrag.kind==="folder"&&currentDrag.id===folder.id)return;
        e.preventDefault();e.dataTransfer.dropEffect="move";
        header.classList.remove("drag-over","folder-drop-before","folder-drop-after");
        // Verbindungen: immer "into" (in den Ordner). Ordner: Zonen.
        if(currentDrag.kind==="connection"){header.classList.add("drag-over");return;}
        const zone=folderDropZone(e);
        if(zone==="into")header.classList.add("drag-over");
        else if(zone==="before")header.classList.add("folder-drop-before");
        else header.classList.add("folder-drop-after");
      });
      header.addEventListener("dragleave",()=>header.classList.remove("drag-over","folder-drop-before","folder-drop-after"));
      header.addEventListener("drop",async(e)=>{
        const zone=folderDropZone(e);
        header.classList.remove("drag-over","folder-drop-before","folder-drop-after");
        if(!currentDrag)return;
        try{
          if(currentDrag.kind==="connection"){
            // Verbindung in diesen Ordner (ans Ende)
            await window.api.store.moveConnection({sourceFolderId:currentDrag.folderId,connectionId:currentDrag.id,targetFolderId:folder.id});
            await loadAndRender();
          } else if(currentDrag.kind==="folder"&&currentDrag.id!==folder.id){
            if(zone==="into"){
              // Hineinverschachteln (wie bisher)
              await window.api.store.moveFolder({folderId:currentDrag.id,targetFolderId:folder.id});
              await loadAndRender();
            } else {
              // Davor/dahinter auf derselben Ebene einsortieren
              await dropFolderBeside({dragId:currentDrag.id,siblingId:folder.id,before:(zone==="before")});
            }
          }
        }catch(err){console.error(err);await showAlert({title:t("errorTitle"),message:String(err?.message||err)});}
        finally{currentDrag=null;}
      });
      const itemsWrap=el("div",{class:"tree-items"});
      (folder.items||[]).forEach(conn=>{
        const notes=conn.notes||(conn.profile?.notes)||"";
        const notesBadge=notes?` 📝`:"";
        const labelText=conn.type==="web"?`🌐 ${conn.name}${notesBadge}`:conn.type==="ssh"?`🔒 ${conn.name}${notesBadge}`:conn.type==="serial"?`🔌 ${conn.name}${notesBadge}`:`🪟 ${conn.name}${notesBadge}`;
        const item=el("div",{class:"tree-item",dataset:{id:conn.id,type:conn.type||"rdp"},style:`padding-left:${34+(depth-1)*INDENT}px`,...(notes?{title:notes}:{})});
        item.innerHTML=`<span class="tree-item-label">${labelText}</span>${getStatusDotHtml(conn.id)}`;
        item.addEventListener("click",()=>{clearSelection();item.classList.add("active");selectedFolderId=folder.id;selectedConnId=conn.id;});
        item.addEventListener("dblclick",async()=>{try{await openConnection(conn);}catch(err){console.error(err);await showAlert({title:t("startError"),message:String(err?.message||err)});}});
        item.setAttribute("draggable","true");
        item.addEventListener("dragstart",(e)=>{currentDrag={kind:"connection",id:conn.id,folderId:folder.id};e.dataTransfer.effectAllowed="move";item.classList.add("dragging");});
        item.addEventListener("dragend",()=>{currentDrag=null;item.classList.remove("dragging");item.classList.remove("drop-before","drop-after");});
        // Umsortieren: erkennen, ob über oder unter dieser Verbindung eingefügt wird
        item.addEventListener("dragover",(e)=>{
          if(currentDrag?.kind!=="connection")return;
          e.preventDefault();e.dataTransfer.dropEffect="move";
          const rect=item.getBoundingClientRect();
          const before=(e.clientY-rect.top)<rect.height/2; // obere Hälfte = davor
          item.classList.toggle("drop-before",before);
          item.classList.toggle("drop-after",!before);
        });
        item.addEventListener("dragleave",()=>{item.classList.remove("drop-before","drop-after");});
        item.addEventListener("drop",async(e)=>{
          if(currentDrag?.kind!=="connection"){return;}
          e.preventDefault();e.stopPropagation();
          const rect=item.getBoundingClientRect();
          const before=(e.clientY-rect.top)<rect.height/2;
          item.classList.remove("drop-before","drop-after");
          await dropConnectionAt({drag:currentDrag,targetFolderId:folder.id,targetConnId:conn.id,before});
        });
        itemsWrap.appendChild(item);
      });
      const folderEl=el("div",{class:"tree-folder"+(isOpen?" open":"")},header,itemsWrap);
      treeContainer.appendChild(folderEl);
      if(isOpen)(folder.folders||[]).forEach(child=>renderFolder(child,depth+1));
    }
    folders.forEach(f=>renderFolder(f,1));
  }

  function updateOfflineNotice() {
    const el = document.getElementById("sidebar-offline-notice");
    if (!el) return;
    if (model?.__offline) {
      el.textContent = "⚠ " + t("smbOfflineNotice");
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  }

  async function loadAndRender(){
    try{model=await window.api.store.load();if(!selectedFolderId&&model?.folders?.length)selectedFolderId=model.folders[0].id;render();}
    catch(err){console.error(err);model={folders:[]};render();}
    updateOfflineNotice();
    // Status-Punkte nach jedem Render aktualisieren – nur wenn Verbindungstest aktiviert ist
    try{
      const s=await window.api.settings.load();
      if(Number(s?.pingInterval)>0) pingAllVisible();
    }catch{}
  }

  /* =========================================================
     Kontextmenü
  ========================================================== */
  let ctxMenuEl=null;
  function hideContextMenu(){if(ctxMenuEl)ctxMenuEl.classList.add("hidden");}

  function showContextMenu(x,y,context){
    if(!ctxMenuEl){
      ctxMenuEl=document.createElement("div");ctxMenuEl.className="context-menu hidden";document.body.appendChild(ctxMenuEl);
      window.addEventListener("click",hideContextMenu);
      window.addEventListener("mousedown",(e)=>{if(!ctxMenuEl.contains(e.target))hideContextMenu();});
      window.addEventListener("keydown",(e)=>{if(e.key==="Escape")hideContextMenu();});
      ctxMenuEl.addEventListener("contextmenu",(e)=>e.preventDefault());
    }
    ctxMenuEl.innerHTML="";
    const addItem=(label,onClick)=>{
      if(!label?.trim())return;
      const mi=document.createElement("div");mi.className="menu-item";mi.textContent=label;
      mi.addEventListener("click",async()=>{
        hideContextMenu();const prev=await hideActiveWebTab();
        try{await onClick();}
        catch(err){console.error(err);await showAlert({title:t("errorTitle"),message:String(err?.message||err)});}
        finally{await restoreWebTab(prev);}
      });
      ctxMenuEl.appendChild(mi);
    };
    const addDivider=()=>{const d=document.createElement("div");d.className="divider";ctxMenuEl.appendChild(d);};
    const ctxType=context?.type||"blank",MAX_DEPTH=4;

    if(ctxType==="blank"||ctxType==="folder"){
      const getOrCreateFolder=async()=>{
        let id=context?.folderId||selectedFolderId||model?.folders?.[0]?.id;
        if(!id){
          if(!await showConfirm({title:t("noFolderTitle"),message:t("noFolderMsg")}))return null;
          const n=await showPrompt({title:t("ctxNewFolder"),label:t("folderName")});if(!n)return null;
          await window.api.store.createFolder({name:n});const fresh=await window.api.store.load();model=fresh;id=fresh.folders[0].id;
        }
        return id;
      };
      if(ctxType==="blank"){
        addItem(t("ctxNewFolder"),async()=>{
          const name=await showPrompt({title:t("ctxNewFolder"),label:t("folderName"),placeholder:t("folderNamePlaceholder")});
          if(!name)return;await window.api.store.createFolder({name});await loadAndRender();
        });
        addDivider();
      }
      addItem(t("ctxNewRdp"),async()=>{const fid=await getOrCreateFolder();if(!fid)return;const result=await showConnectionForm({title:t("newRdpTitle"),defaults:{port:"3389",profile:{fullscreen:true,clipboard:true,colorDepth:32}}});if(!result)return;const cr=await window.api.store.createConnection({folderId:fid,name:result.name,host:result.host,port:result.port,profile:result.profile||{}});if(cr?.connId&&result.credMode){try{await window.api.cred.setMode({id:cr.connId,mode:result.credMode});}catch{}}await loadAndRender();});
      addItem(t("ctxNewSsh"),async()=>{const fid=await getOrCreateFolder();if(!fid)return;const result=await showSshForm({title:t("newSshTitle"),defaults:{port:22}});if(!result)return;const cr=await window.api.store.createSshConnection({folderId:fid,name:result.name,host:result.host,port:result.port,username:result.username,authType:result.authType,keyPath:result.keyPath,jumpHost:result.jumpHost,jumpPort:result.jumpPort,jumpUsername:result.jumpUsername,jumpKeyPath:result.jumpKeyPath});if(cr?.connId){await applySshPassword(cr.connId,fid,result);}await loadAndRender();});
      addItem(t("ctxNewWeb"),async()=>{const fid=await getOrCreateFolder();if(!fid)return;const res=await showWebsiteForm({title:t("newWebTitle")});if(!res)return;await window.api.store.createWebConnection({folderId:fid,name:res.name,url:res.url});await loadAndRender();});
      addItem(t("ctxNewSerial"),async()=>{const fid=await getOrCreateFolder();if(!fid)return;const res=await showSerialForm({title:t("newSerialTitle")});if(!res)return;await window.api.store.createSerialConnection({folderId:fid,name:res.name,comPort:res.comPort,baudRate:res.baudRate,dataBits:res.dataBits,parity:res.parity,stopBits:res.stopBits});await loadAndRender();});
    }

    if(ctxType==="folder"&&context.folderId){
      addDivider();
      if((context.depth||1)<MAX_DEPTH){addItem(t("ctxNewSubFolder"),async()=>{const name=await showPrompt({title:t("newSubfolderTitle"),label:t("folderName")});if(!name)return;await window.api.store.createFolder({name,parentId:context.folderId});await loadAndRender();});}
      addItem(t("ctxRenameFolder"),async()=>{const current=findFolderInModel(model?.folders,context.folderId)?.name||"";const next=await showPrompt({title:t("renameFolderTitle"),label:t("newNameLabel"),defaultValue:current});if(!next||next.trim()===current)return;await window.api.store.renameFolder({folderId:context.folderId,name:next.trim()});await loadAndRender();});
      addItem(t("ctxDeleteFolder"),async()=>{if(!await showConfirm({title:t("deleteFolderTitle"),message:t("confirmDeleteFolder")}))return;await window.api.store.deleteFolder({folderId:context.folderId});if(selectedFolderId===context.folderId)selectedFolderId=null;selectedConnId=null;await loadAndRender();});
    }

    if(ctxType==="connection"&&context.folderId&&context.connectionId){
      addDivider();
      const entry=findConnById(context.connectionId)?.conn;
      if(entry?.type==="web"){addItem(t("ctxEdit"),async()=>{for(const[tid,t]of tabs){if(t.type==="web"&&t.url===entry.url){await closeTab(tid);break;}}const res=await showWebsiteForm({title:t("editWebTitle"),defaults:{name:entry.name,url:entry.url}});if(!res)return;await window.api.store.updateWebConnection({folderId:context.folderId,connectionId:context.connectionId,name:res.name||entry.name,url:res.url});await loadAndRender();});}
      else if(entry?.type==="ssh"){addItem(t("ctxEdit"),async()=>{let hasSavedPassword=false;try{hasSavedPassword=!!(await window.api.cred.load({id:entry.id}))?.ok;}catch{}const result=await showSshForm({title:t("editSshTitle"),defaults:{name:entry.name,host:entry.host,port:entry.port,username:entry.username,hasSavedPassword,authType:entry.authType,keyPath:entry.keyPath,jump:entry.jump,sharedPassword:entry.sharedPassword,notes:entry.notes||""}});if(!result)return;await window.api.store.updateConnection({folderId:context.folderId,connectionId:context.connectionId,name:result.name,host:result.host,port:result.port,username:result.username,authType:result.authType,keyPath:result.keyPath,jumpHost:result.jumpHost,jumpPort:result.jumpPort,jumpUsername:result.jumpUsername,jumpKeyPath:result.jumpKeyPath,notes:result.notes||""});await applySshPassword(context.connectionId,context.folderId,result);await loadAndRender();});}
      else if(entry?.type==="serial"){addItem(t("ctxEdit"),async()=>{const result=await showSerialForm({title:t("editSerialTitle"),defaults:{name:entry.name,comPort:entry.comPort,baudRate:entry.baudRate,dataBits:entry.dataBits,parity:entry.parity,stopBits:entry.stopBits}});if(!result)return;await window.api.store.updateConnection({folderId:context.folderId,connectionId:context.connectionId,name:result.name,comPort:result.comPort,baudRate:result.baudRate,dataBits:result.dataBits,parity:result.parity,stopBits:result.stopBits});await loadAndRender();});}
      else{addItem(t("ctxEdit"),async()=>{let hasSavedPassword=false;try{hasSavedPassword=!!(await window.api.cred.load({id:entry.id}))?.ok;}catch{}let rdpMode="none";try{const mr=await window.api.cred.getMode({id:entry.id});rdpMode=mr?.mode||"none";}catch{}
        const result=await showConnectionForm({title:t("editConnTitle"),defaults:{name:entry.name,host:entry.host,port:entry.port,profile:entry.profile||{},hasSavedPassword,credMode:rdpMode}});if(!result)return;await window.api.store.updateConnection({folderId:context.folderId,connectionId:context.connectionId,name:result.name,host:result.host,port:result.port??"",profile:result.profile||{}});try{if(result.credMode!==undefined)await window.api.cred.setMode({id:entry.id,mode:result.credMode});}catch{}await loadAndRender();});}
      if(entry){addItem(t("ctxNotes"),async()=>{await showNotesDialog(entry,context.folderId);await loadAndRender();});}
      addItem(t("ctxDelete"),async()=>{if(!await showConfirm({title:t("deleteConnTitle"),message:t("confirmDeleteConn")}))return;for(const[tid,t]of tabs){if((t.type==="web"&&t.url===entry?.url)||(t.type==="ssh"&&t.sessionId?.includes(context.connectionId))){await closeTab(tid);}}await window.api.store.deleteConnection({folderId:context.folderId,connectionId:context.connectionId});if(selectedConnId===context.connectionId)selectedConnId=null;await loadAndRender();});
    }

    (function(){if(!ctxMenuEl)return;while(ctxMenuEl.firstElementChild?.classList.contains("divider"))ctxMenuEl.removeChild(ctxMenuEl.firstElementChild);let prev=false;[...ctxMenuEl.children].forEach(c=>{const isDiv=c.classList.contains("divider");if(isDiv&&prev)c.remove();prev=isDiv;});while(ctxMenuEl.lastElementChild?.classList.contains("divider"))ctxMenuEl.removeChild(ctxMenuEl.lastElementChild);})();

    const mw=260,mh=280;
    ctxMenuEl.style.left=Math.min(x,window.innerWidth-mw-4)+"px";ctxMenuEl.style.top=Math.min(y,window.innerHeight-mh-4)+"px";
    ctxMenuEl.classList.remove("hidden");
  }

  const ctxTarget=sidebarEl||treeContainer;
  if(ctxTarget){
    ctxTarget.addEventListener("contextmenu",(e)=>{
      e.preventDefault();
      const connItem=e.target.closest(".tree-item");
      if(connItem){const head=connItem.closest(".tree-folder")?.querySelector(".tree-folder-header");return showContextMenu(e.clientX,e.clientY,{type:"connection",folderId:head?.dataset?.id,connectionId:connItem.dataset.id});}
      const folderHeader=e.target.closest(".tree-folder-header");
      if(folderHeader)return showContextMenu(e.clientX,e.clientY,{type:"folder",folderId:folderHeader.dataset.id,depth:Number(folderHeader.dataset.depth||"1")});
      showContextMenu(e.clientX,e.clientY,{type:"blank"});
    });
  }

  if(sidebarEl){
    sidebarEl.addEventListener("dragover",(e)=>{if(currentDrag?.kind==="folder"&&!e.target.closest(".tree-folder-header")){e.preventDefault();e.dataTransfer.dropEffect="move";}});
    sidebarEl.addEventListener("drop",async(e)=>{
      if(currentDrag?.kind!=="folder"||e.target.closest(".tree-folder-header"))return;
      try{await window.api.store.moveFolder({folderId:currentDrag.id,targetFolderId:null});await loadAndRender();}
      catch(err){console.error(err);await showAlert({title:t("errorTitle"),message:String(err?.message||err)});}
      finally{currentDrag=null;}
    });
  }

  // ── Geteilter Passwort-Tresor: Dialoge ─────────────────────────────────
  // Entsperr-Dialog beim Start. Bewusst klar als TRESOR beschriftet,
  // damit er nicht mit einem Verbindungspasswort verwechselt wird.
  function showVaultUnlockDialog({ allowRemember = true } = {}) {
    return new Promise((resolve) => {
      const bd = document.createElement("div"); bd.className = "modal-backdrop";
      const m  = document.createElement("div"); m.className = "modal";
      m.innerHTML = `
        <div class="modal-header">🔓 ${t("vaultUnlockTitle")}</div>
        <div class="modal-body">
          <div class="settings-item-desc" style="margin-bottom:12px">${t("vaultUnlockDesc")}</div>
          <label>${t("vaultUnlockLabel")}</label>
          <input type="password" id="vault-pw" style="width:100%;box-sizing:border-box;padding:9px 11px;font-size:13px;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:8px;outline:none;margin-top:6px"/>
          <div id="vault-err" style="color:var(--err);font-size:12px;margin-top:8px;min-height:16px"></div>
          ${allowRemember ? `<label style="display:flex;align-items:center;gap:8px;margin-top:10px;cursor:pointer;font-size:13px">
            <input type="checkbox" id="vault-remember" checked/> <span>${t("vaultRemember")}</span>
          </label>` : ""}
        </div>
        <div class="modal-actions">
          <button class="btn" id="vault-reset-link" style="margin-right:auto;background:none;border:none;color:var(--tx-5);font-size:12px;cursor:pointer">${t("vaultForgotLink")}</button>
          <button class="btn primary" id="vault-ok">${t("vaultUnlockBtn")}</button>
        </div>`;
      bd.appendChild(m); document.body.appendChild(bd);
      const pw = m.querySelector("#vault-pw"); pw.focus();
      const errEl = m.querySelector("#vault-err");

      const attempt = async () => {
        const r = await window.api.vault.unlock({ password: pw.value });
        if (r.ok) {
          if (allowRemember && m.querySelector("#vault-remember")?.checked) {
            try { await window.api.vault.remember({ password: pw.value }); } catch {}
          }
          bd.remove(); resolve(true);
        } else {
          errEl.textContent = t("vaultWrongPassword");
          pw.select();
        }
      };
      m.querySelector("#vault-ok").addEventListener("click", attempt);
      pw.addEventListener("keydown", (e) => { if (e.key === "Enter") attempt(); });
      m.querySelector("#vault-reset-link").addEventListener("click", async () => {
        const sure = await showConfirm({
          title: t("vaultResetTitle"),
          message: t("vaultResetMsg"),
          okLabel: t("vaultResetOk"), cancelLabel: t("cancel")
        });
        if (sure) { await window.api.vault.reset(); bd.remove(); resolve(false); }
      });
    });
  }

  // Einrichtungs-Dialog: Freischalt-Passwort erstmalig festlegen
  function showVaultSetupDialog() {
    return new Promise((resolve) => {
      const bd = document.createElement("div"); bd.className = "modal-backdrop";
      const m  = document.createElement("div"); m.className = "modal";
      m.innerHTML = `
        <div class="modal-header">🔐 ${t("vaultSetupTitle")}</div>
        <div class="modal-body">
          <div class="settings-item-desc" style="margin-bottom:12px">${t("vaultSetupDesc")}</div>
          <label>${t("vaultSetupPw1")}</label>
          <input type="password" id="vs-pw1" style="width:100%;box-sizing:border-box;padding:9px 11px;font-size:13px;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:8px;outline:none;margin:6px 0 12px"/>
          <label>${t("vaultSetupPw2")}</label>
          <input type="password" id="vs-pw2" style="width:100%;box-sizing:border-box;padding:9px 11px;font-size:13px;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:8px;outline:none;margin-top:6px"/>
          <div id="vs-err" style="color:var(--err);font-size:12px;margin-top:8px;min-height:16px"></div>
          <div style="background:var(--bg-warn,#4a3a1a);color:var(--tx-warn,#f0c674);font-size:11px;padding:8px 10px;border-radius:6px;margin-top:8px">${t("vaultSetupWarn")}</div>
        </div>
        <div class="modal-actions">
          <button class="btn" id="vs-cancel">${t("cancel")}</button>
          <button class="btn primary" id="vs-ok">${t("vaultSetupBtn")}</button>
        </div>`;
      bd.appendChild(m); document.body.appendChild(bd);
      const pw1 = m.querySelector("#vs-pw1"), pw2 = m.querySelector("#vs-pw2");
      const errEl = m.querySelector("#vs-err"); pw1.focus();
      m.querySelector("#vs-ok").addEventListener("click", async () => {
        if (!pw1.value) { errEl.textContent = t("vaultSetupEmpty"); return; }
        if (pw1.value !== pw2.value) { errEl.textContent = t("vaultSetupMismatch"); pw2.select(); return; }
        const r = await window.api.vault.setup({ password: pw1.value });
        if (r.ok) {
          try { await window.api.vault.remember({ password: pw1.value }); } catch {}
          bd.remove(); resolve(true);
        } else { errEl.textContent = r.error || "Fehler"; }
      });
      m.querySelector("#vs-cancel").addEventListener("click", () => { bd.remove(); resolve(false); });
    });
  }

  // Stellt sicher, dass der Tresor entsperrt ist – ruft bei Bedarf den Dialog.
  // Gibt true zurück wenn entsperrt, false wenn abgebrochen.
  async function ensureVaultUnlocked() {
    const st = await window.api.vault.status();
    if (st.unlocked) return true;
    if (!st.exists) return await showVaultSetupDialog();
    return await showVaultUnlockDialog();
  }

  // Beim Start: existiert ein Tresor? Dann automatisch via DPAPI versuchen,
  // sonst Entsperr-Dialog. Existiert keiner, passiert nichts (wird bei Bedarf angelegt).
  async function initVault({ afterSwitch = false } = {}) {
    try {
      // Nach Datenquellen-Wechsel: alten entsperrten Schlüssel im Backend verwerfen,
      // damit nicht mit dem falschen Tresor-Schlüssel gearbeitet wird.
      if (afterSwitch) { try { await window.api.vault.lock(); } catch {} }

      const st = await window.api.vault.status();
      if (!st.exists) return; // kein Tresor am (neuen) Ort – ok, wird bei Bedarf angelegt
      const auto = await window.api.vault.tryAutoUnlock();
      if (auto.ok) return; // per DPAPI entsperrt, kein Dialog nötig
      await showVaultUnlockDialog();
    } catch (err) { console.error("[vault init]", err); }
  }

  // Erststart-Assistent: beim allerersten Start einmalig die Datenquelle wählen lassen.
  async function firstRunSetup() {
    try {
      const s = await window.api.settings.load() || {};
      if (s.setupDone) return false; // schon durchlaufen
      // Datenquellen-Dialog zeigen (nutzt die bestehende Logik)
      await showDataSourceDialog();
      // Merker setzen, damit der Assistent nie wieder erscheint –
      // unabhängig davon, ob der Nutzer lokal blieb oder SMB wählte.
      const s2 = await window.api.settings.load() || {};
      s2.setupDone = true;
      await window.api.settings.save(s2);
      return true;
    } catch (err) { console.error("[first run]", err); return false; }
  }

  // ── Web-View-Schutz bei Dialogen ────────────────────────────────────
  // Web-Views (WebContentsView) liegen technisch ÜBER dem HTML und würden
  // sonst Dialoge (modal-backdrop) verdecken. Dieser Beobachter versteckt
  // das aktive Web-View, solange ein Dialog offen ist, und zeigt es danach.
  function installModalWebGuard() {
    let hiddenForModal = false;

    let seq = 0; // erkennt, ob sich der Zustand während einer Aufnahme geändert hat

    function removeSnapshot() {
      document.getElementById("web-snapshot")?.remove();
    }

    async function onModalOpened() {
      if (hiddenForModal) return;
      hiddenForModal = true;
      const my = ++seq;
      // Standbild der aktiven Website aufnehmen, damit sie im Hintergrund
      // sichtbar bleibt, während der echte View ausgeblendet ist.
      const tab = activeTabId ? tabs.get(activeTabId) : null;
      if (tab && tab.type === "web") {
        try {
          const r = await window.api.web.snapshot({ tabId: activeTabId });
          if (my !== seq) return; // Overlay wurde schon wieder geschlossen
          if (r?.ok && r.dataUrl) {
            removeSnapshot();
            const img = document.createElement("img");
            img.id = "web-snapshot";
            img.src = r.dataUrl;
            tabContentArea.appendChild(img);
          }
        } catch {}
      }
      if (my !== seq) return;
      // ALLE Web-Views verstecken – unabhängig davon, welches Tab aktiv ist.
      try { await window.api.web.hideAll(); } catch {}
    }
    async function onModalClosed() {
      if (!hiddenForModal) return;
      hiddenForModal = false;
      ++seq;
      // Das aktuell aktive Web-Tab wieder anzeigen (falls es eins ist),
      // danach erst das Standbild entfernen (vermeidet Flackern).
      const tab = activeTabId ? tabs.get(activeTabId) : null;
      if (tab && tab.type === "web") {
        await new Promise(r => requestAnimationFrame(r));
        try { await window.api.web.show({ tabId: activeTabId, bounds: getContentBounds() }); } catch {}
      }
      removeSnapshot();
    }

    // Dialoge UND die Schnellsuche zählen als "Overlay offen"
    const anyModalOpen = () => document.querySelector(".modal-backdrop, .quicksearch-backdrop") !== null;

    const observer = new MutationObserver(() => {
      if (anyModalOpen()) onModalOpened();
      else onModalClosed();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function startup() {
    installModalWebGuard();  // Web-Views bei offenen Dialogen ausblenden
    // Status-Merker früh setzen, damit beim ersten Zeichnen schon klar ist,
    // ob Kreise angezeigt werden sollen (verhindert kurzes Aufblitzen).
    try {
      const s0 = await window.api.settings.load();
      statusEnabled = (Number(s0?.pingInterval) || 0) > 0;
    } catch { statusEnabled = false; }
    loadAndRender();
    applyPingInterval();
    await firstRunSetup();          // erst Datenquelle wählen (nur beim 1. Start)
    await initVault({ afterSwitch: false }); // dann Tresor am gewählten Ort prüfen
    await loadAndRender();          // Ansicht mit ggf. neuer Datenquelle aktualisieren
  }
  // Schnellsuche: auf globales Kürzel (aus dem Backend) reagieren
  // ── Auto-Update-Banner ──────────────────────────────────────────────
  function initUpdateBanner() {
    const banner   = document.getElementById("update-banner");
    const icon     = document.getElementById("update-icon");
    const textEl   = document.getElementById("update-text");
    const actionBtn= document.getElementById("update-action");
    const dismiss  = document.getElementById("update-dismiss");
    const track    = document.getElementById("update-progress-track");
    const bar      = document.getElementById("update-progress-bar");
    if (!banner) return;

    const show = () => { banner.style.display = "block"; };
    const hide = () => { banner.style.display = "none"; };

    // Icon-Zustand setzen: "spinning" (Lade-Kreis), "ready" (✓), "error" (⚠)
    const setIcon = (state) => { icon.className = ""; if (state) icon.classList.add(state); };

    dismiss.addEventListener("click", hide);

    window.api.onUpdateEvent?.((type, payload) => {
      switch (type) {
        case "update:checking":
          // Discord-artige Suche mit Lade-Animation
          show(); setIcon("spinning");
          textEl.textContent = t("updateChecking");
          actionBtn.style.display = "none";
          track.style.display = "none";
          break;

        case "update:none":
          // Kein Update – Banner leise ausblenden
          hide();
          break;

        case "update:available":
          // Update gefunden – Installieren anbieten (Halb-Automatik)
          show(); setIcon("ready");
          textEl.textContent = t("updateAvailable", payload.version || "");
          actionBtn.style.display = "";
          actionBtn.textContent = t("updateInstallBtn");
          actionBtn.onclick = async () => {
            // SMB-Weg: Installer direkt von der Freigabe starten.
            // Die App schließt sich, damit der Installer die Dateien ersetzen kann.
            textEl.textContent = t("updateStartingInstaller");
            actionBtn.style.display = "none";
            setIcon("spinning");
            await window.api.update.smbInstall();
          };
          break;

        case "update:progress":
          // Download-Fortschritt anzeigen
          track.style.display = "block";
          bar.style.width = (payload.percent || 0) + "%";
          textEl.textContent = t("updateDownloading") + " " + (payload.percent || 0) + "%";
          break;

        case "update:downloaded":
          // Fertig – Neustart zum Installieren anbieten
          setIcon("ready");
          textEl.textContent = t("updateReady");
          track.style.display = "none";
          actionBtn.style.display = "";
          actionBtn.textContent = t("updateRestartBtn");
          actionBtn.onclick = () => window.api.update.install();
          break;

        case "update:error":
          // Fehler (z. B. Freigabe nicht erreichbar) – dezent zeigen
          setIcon("error");
          textEl.textContent = t("updateError");
          actionBtn.style.display = "none";
          track.style.display = "none";
          // Nach kurzer Zeit ausblenden, um nicht zu stören
          setTimeout(hide, 6000);
          break;
      }
    });
  }
  initUpdateBanner();

  // DEV-Abzeichen in der Titelleiste (nur bei "npm start")
  window.api.isDev?.().then(dev => {
    if (!dev) return;
    const title = document.querySelector(".titlebar-left");
    if (title && !title.querySelector(".dev-badge")) {
      const badge = document.createElement("span");
      badge.className = "dev-badge";
      badge.textContent = "DEV";
      title.appendChild(badge);
    }
    document.title += " [DEV]";
  }).catch(() => {});

  window.api.onQuickSearchOpen?.(() => showQuickSearch());
  // Zusätzlich ein lokales Kürzel, wenn die App im Vordergrund ist (Strg+K)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      showQuickSearch();
    }
  });

  startup();

  // ── Datenquelle: Änderungen von anderer Stelle erkennen ─────────────────
  // Vergleicht nur die Revisionsnummer (kein Zeitstempel) – siehe writeStore().
  function preserveLocalOpenState(newFolders, oldFolders) {
    const openMap = new Map();
    (function collect(folders) {
      for (const f of folders || []) { openMap.set(f.id, f.open); collect(f.folders); }
    })(oldFolders);
    (function apply(folders) {
      for (const f of folders || []) {
        if (openMap.has(f.id)) f.open = openMap.get(f.id);
        apply(f.folders);
      }
    })(newFolders);
    return newFolders;
  }

  let dataSourceCheckTimer = null;

  async function checkForDataSourceUpdates() {
    try {
      const fresh = await window.api.store.load();
      if (!model || fresh.rev === model.rev) { updateOfflineNotice(); return; }
      fresh.folders = preserveLocalOpenState(fresh.folders, model.folders);
      model = fresh;
      render();
      updateOfflineNotice();
    } catch (err) { console.error("[RDM sync]", err); }
  }

  function applyDataSourcePolling() {
    if (dataSourceCheckTimer) { clearInterval(dataSourceCheckTimer); dataSourceCheckTimer = null; }
    dataSourceCheckTimer = setInterval(checkForDataSourceUpdates, 60000);
  }
  applyDataSourcePolling();
  window.addEventListener("focus", checkForDataSourceUpdates);

  // ── Sidebar Resize ─────────────────────────────────────────────────────
  (function initSidebarResize() {
    const resizer = document.getElementById("sidebar-resizer");
    const sidebar = document.querySelector(".sidebar");
    if (!resizer || !sidebar) return;

    // Restore saved width
    window.api.settings.load().then(s => {
      if (s?.sidebarWidth) sidebar.style.width = s.sidebarWidth + "px";
    }).catch(() => {});

    let startX = 0, startW = 0;

    resizer.addEventListener("mousedown", e => {
      startX = e.clientX;
      startW = sidebar.offsetWidth;
      resizer.classList.add("dragging");
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      const onMove = e => {
        const newW = Math.max(150, Math.min(500, startW + (e.clientX - startX)));
        sidebar.style.width = newW + "px";
      };
      const onUp = () => {
        resizer.classList.remove("dragging");
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        // Save width
        const w = sidebar.offsetWidth;
        window.api.settings.load().then(s =>
          window.api.settings.save({...(s||{}), sidebarWidth: w})
        ).catch(() => {});
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      e.preventDefault();
    });
  })();
});