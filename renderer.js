// renderer.js
"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // ── Lokalisierung ────────────────────────────────────────────────────
  const _EMBEDDED = {
    de: {"searchPlaceholder": "🔍 Suchen...", "settings": "Einstellungen", "save": "Speichern", "cancel": "Abbrechen", "delete": "Löschen", "close": "Schließen", "ok": "OK", "yes": "Ja", "no": "Nein", "edit": "Bearbeiten", "rename": "Umbenennen", "duplicate": "Duplizieren", "ctxNewFolder": "Neuer Ordner", "ctxRenameFolder": "Ordner umbenennen…", "ctxDeleteFolder": "Ordner löschen…", "ctxNewRdp": "Neue RDP-Verbindung…", "ctxNewSsh": "Neue SSH-Verbindung…", "ctxNewWeb": "Neue Website…", "ctxNewSerial": "Neue Serielle Verbindung…", "ctxEdit": "Bearbeiten…", "ctxDelete": "Löschen…", "settingsTitle": "Einstellungen", "sectionConnData": "📁 Verbindungsdaten", "import": "Importieren", "importDesc": "mRemoteNG XML oder Devolutions RDM XML", "importBtn": "📥 Importieren…", "export": "Exportieren", "exportDesc": "Alle Verbindungen als JSON-Backup speichern", "exportBtn": "📤 Exportieren…", "openDataFolder": "Daten-Ordner öffnen", "openDataFolderBtn": "📂 Öffnen", "sectionDesign": "🎨 Design", "darkMode": "🌙 Dunkel", "lightMode": "☀️ Hell", "sectionSshTerminal": "🖥 SSH Terminal", "fontSize": "Schriftgröße", "fontSizeDesc": "Gilt für neue SSH-Sitzungen", "sectionCredentials": "🔐 Zugangsdaten", "personalCreds": "Persönliche Zugangsdaten (RDP)", "personalCredsDesc": "Für RDP – Toggle im Verbindungs-Formular aktivieren.", "username": "Benutzername", "password": "Passwort", "passwordSaved": "Gespeichert – leer lassen zum Behalten", "saveBtn": "💾 Speichern", "deleteBtn": "🗑 Löschen", "sshPasswords": "SSH-Passwörter", "sshPasswordsDesc": "Pro Verbindung, mit \"Merken\" beim SSH-Verbinden gespeichert", "sectionConnStatus": "📡 Verbindungsstatus", "connStatusDesc": "TCP-Check auf den Verbindungsport – grüner/roter Punkt in der Sidebar. Beim Hover wird die Latenz angezeigt.", "intervalOff": "Aus", "interval30s": "30 Sek.", "interval1m": "1 Min.", "interval5m": "5 Min.", "sectionLanguage": "🌐 Sprache", "langDesc": "Wird nach einem Neustart angewendet.", "langDe": "🇩🇪 Deutsch", "langEn": "🇬🇧 English", "restartRequired": "Neustart erforderlich", "restartMsg": "Die Sprache wird nach einem Neustart angewendet.", "sectionAbout": "ℹ Über", "aboutApp": "Remote Connection Manager", "aboutDesc": "Entwickelt mit Electron + Node.js", "aboutConns": "Verbindungen", "aboutFolders": "Ordner", "connVerbindung": "VERBINDUNG", "connName": "Name", "connHostIp": "Host / IP", "connPort": "Port", "connUsername": "Benutzername", "connUsernameOptional": "Benutzername (optional)", "connNotes": "Notizen", "connNotesPlaceholder": "Optionale Notizen zur Verbindung…", "connAnzeige": "ANZEIGE", "connFullscreen": "Vollbild", "connWindow": "Fenster", "connMultiMonitor": "Multi-Monitor", "connWidth": "Breite", "connHeight": "Höhe", "connOptionen": "OPTIONEN", "connAdmin": "Admin-Sitzung", "connAdminDesc": "Als Konsolenadministrator (/admin) verbinden", "connClipboard": "Zwischenablage", "connClipboardDesc": "Kopieren / Einfügen zwischen lokal und remote", "connPrinter": "Drucker weiterleiten", "connPrinterDesc": "Lokale Drucker im RDP-Fenster verfügbar machen", "connColorDepth": "Farbtiefe", "connAdvanced": "Erweitert – Gateway & Laufwerke", "connGatewayHost": "Gateway-Host", "connUsage": "Nutzung", "connUsageAlways": "immer", "connUsageIfNeeded": "bei Bedarf", "connUsageNever": "nie", "connDrives": "Laufwerke weiterleiten", "connDrivesPlaceholder": "leer = keine   * = alle   z. B. C:;D:;", "connAnmeldedaten": "ANMELDEDATEN", "connUsePersonal": "Persönliche Zugangsdaten verwenden", "connUsePersonalDesc": "Username + Passwort aus Einstellungen → Persönliche Zugangsdaten", "connUsePersonalOff": "Wenn deaktiviert: Windows-Anmeldedialog erscheint beim Verbinden.", "sshPassword": "Passwort (optional)", "sshPasswordSaved": "Neues Passwort (leer = bestehendes behalten)", "sshPasswordPlaceholder": "Leer = beim Verbinden abfragen", "sshRemember": "Passwort merken", "sshRememberDesc": "DPAPI-verschlüsselt", "sshPasswordSavedLabel": "✓ Passwort gespeichert", "sshPasswordDelete": "Löschen", "newRdpTitle": "Neue RDP-Verbindung", "newSshTitle": "Neue SSH-Verbindung", "newWebTitle": "Neue Web-Verbindung", "editConnTitle": "Verbindung bearbeiten", "editSshTitle": "SSH bearbeiten", "editWebTitle": "Web-Verbindung bearbeiten", "webUrl": "URL", "webUrlPlaceholder": "https://", "webName": "Name", "serialPort": "COM-Port", "serialBaudRate": "Baudrate", "serialDataBits": "Datenbits", "serialParity": "Parität", "serialStopBits": "Stoppbits", "serialParityNone": "Keine", "serialParityEven": "Gerade", "serialParityOdd": "Ungerade", "serialRefreshPorts": "Ports neu laden", "newSerialTitle": "Neue Serielle Verbindung", "editSerialTitle": "Serielle Verbindung bearbeiten", "promptPassword": "Passwort", "confirmDelete": "Löschen bestätigen", "confirmDeleteConn": "Verbindung wirklich löschen?", "confirmDeleteFolder": "Ordner und alle Verbindungen darin wirklich löschen?", "confirmDeleteSshPasswords": "Alle gespeicherten SSH-Passwörter löschen?", "confirmDeletePersonalCreds": "Persönliche Zugangsdaten wirklich löschen?", "importSuccess": "Import erfolgreich", "importError": "Import-Fehler", "exportSuccess": "Export erfolgreich", "exportError": "Export-Fehler", "startError": "Start-Fehler", "saved": "Gespeichert", "deleted": "Gelöscht", "done": "Erledigt", "allSshDeleted": "Alle gespeicherten Passwörter wurden gelöscht.", "personalCredsSaved": "Persönliche Zugangsdaten gespeichert.", "personalCredsUpdated": "Persönliche Zugangsdaten aktualisiert.", "personalCredsDeleted": "Persönliche Zugangsdaten wurden gelöscht.", "importPersonalTitle": "Persönliche Zugangsdaten", "connecting": "Verbindet...", "focusWindow": "🪟 Fenster in den Vordergrund", "connInfoNotes": "NOTIZEN", "connInfoNotesPlaceholder": "Notizen zur Verbindung eingeben…", "connInfoSaved": "✓ Gespeichert", "connInfoError": "Fehler beim Speichern", "folderName": "Ordnername", "folderNamePlaceholder": "z. B. Produktion", "newFolderTitle": "Neuer Ordner", "renameFolderTitle": "Ordner umbenennen", "noResults": "Keine Ergebnisse.", "openDataFolderDesc": "Ordner mit connections.json im Explorer anzeigen", "themeAppliedImmediately": "Wird sofort angewendet", "closeTab": "Tab schließen", "colorScheme": "Farbschema", "ctxNewSubFolder": "Neuer Unterordner…", "emptyStateHint": "Rechtsklick → Neuer Ordner / Neue Verbindung", "rdpError": "RDP-Fehler", "rdpConnectFailed": "Start fehlgeschlagen.", "sshConnError": "SSH-Verbindungsfehler", "sshConnFailed": "Verbindung fehlgeschlagen.", "exportedTo": "Gespeichert unter:\n{0}", "deleteTitle": "Löschen", "deleteFolderTitle": "Ordner löschen", "deleteConnTitle": "Verbindung löschen", "deletePasswordsTitle": "Passwörter löschen", "unknownTypesNote": "Unbekannte Typen (bitte melden):", "sshPasswordKeepPlaceholder": "Leer lassen um gespeichertes zu behalten", "importInvalidXml": "Die Datei konnte nicht als XML gelesen werden.", "importUnknownFormat": "Unbekanntes Format.\nUnterstützt: mRemoteNG XML, Devolutions RDM XML", "sshPasswordForLabel": "Passwort für", "confirmTitle": "Bestätigen", "continueQuestion": "Fortfahren?", "newSubfolderTitle": "Neuer Unterordner", "newNameLabel": "Neuer Name", "errorTitle": "Fehler", "allFiles": "Alle Dateien", "connectionDataXml": "Verbindungsdaten (XML)", "rootFolderError": "Root-Ordner konnte nicht erstellt werden.", "passwordEnterPlaceholder": "Passwort eingeben", "connectionClosed": "Verbindung getrennt", "connectionClosedTabClosing": "Verbindung getrennt – Tab schließt...", "noFolderTitle": "Kein Ordner", "noFolderMsg": "Noch kein Ordner vorhanden. Jetzt anlegen?", "importPersonalCredsMsg": "{0} neue RDP-Verbindung(en) importiert.\n\nSollen alle die Persönlichen Zugangsdaten\n(Einstellungen → Zugangsdaten) verwenden?", "sectionDataSource": "🔄 Datenquelle", "dataSourceDesc": "Bestimmt wo connections.json gespeichert wird. Änderungen werden sofort wirksam.", "dataSourceLocal": "Lokal", "dataSourceSmb": "Netzlaufwerk (SMB)", "smbPathLabel": "Pfad zur connections.json", "smbPathPlaceholder": "\\\\server\\freigabe\\rcm\\connections.json", "smbModeReadonly": "Nur lesen", "smbModeReadwrite": "Lesen & Schreiben", "smbOfflineNotice": "Netzlaufwerk nicht erreichbar – zeige letzten bekannten Stand"},
    en: {"searchPlaceholder": "🔍 Search...", "settings": "Settings", "save": "Save", "cancel": "Cancel", "delete": "Delete", "close": "Close", "ok": "OK", "yes": "Yes", "no": "No", "edit": "Edit", "rename": "Rename", "duplicate": "Duplicate", "ctxNewFolder": "New Folder", "ctxRenameFolder": "Rename Folder…", "ctxDeleteFolder": "Delete Folder…", "ctxNewRdp": "New RDP Connection…", "ctxNewSsh": "New SSH Connection…", "ctxNewWeb": "New Website…", "ctxNewSerial": "New Serial Connection…", "ctxEdit": "Edit…", "ctxDelete": "Delete…", "settingsTitle": "Settings", "sectionConnData": "📁 Connection Data", "import": "Import", "importDesc": "mRemoteNG XML or Devolutions RDM XML", "importBtn": "📥 Import…", "export": "Export", "exportDesc": "Save all connections as JSON backup", "exportBtn": "📤 Export…", "openDataFolder": "Open Data Folder", "openDataFolderBtn": "📂 Open", "sectionDesign": "🎨 Design", "darkMode": "🌙 Dark", "lightMode": "☀️ Light", "sectionSshTerminal": "🖥 SSH Terminal", "fontSize": "Font Size", "fontSizeDesc": "Applies to new SSH sessions", "sectionCredentials": "🔐 Credentials", "personalCreds": "Personal Credentials (RDP)", "personalCredsDesc": "For RDP – enable the toggle in the connection form.", "username": "Username", "password": "Password", "passwordSaved": "Saved – leave empty to keep", "saveBtn": "💾 Save", "deleteBtn": "🗑 Delete", "sshPasswords": "SSH Passwords", "sshPasswordsDesc": "Per connection, saved with \"Remember\" during SSH connect", "sectionConnStatus": "📡 Connection Status", "connStatusDesc": "TCP check on connection port – green/red dot in sidebar. Hover to see latency.", "intervalOff": "Off", "interval30s": "30 sec.", "interval1m": "1 min.", "interval5m": "5 min.", "sectionLanguage": "🌐 Language", "langDesc": "Applied after restart.", "langDe": "🇩🇪 Deutsch", "langEn": "🇬🇧 English", "restartRequired": "Restart required", "restartMsg": "The language will be applied after restart.", "sectionAbout": "ℹ About", "aboutApp": "Remote Connection Manager", "aboutDesc": "Built with Electron + Node.js", "aboutConns": "Connections", "aboutFolders": "Folders", "connVerbindung": "CONNECTION", "connName": "Name", "connHostIp": "Host / IP", "connPort": "Port", "connUsername": "Username", "connUsernameOptional": "Username (optional)", "connNotes": "Notes", "connNotesPlaceholder": "Optional connection notes…", "connAnzeige": "DISPLAY", "connFullscreen": "Fullscreen", "connWindow": "Window", "connMultiMonitor": "Multi-Monitor", "connWidth": "Width", "connHeight": "Height", "connOptionen": "OPTIONS", "connAdmin": "Admin Session", "connAdminDesc": "Connect as console administrator (/admin)", "connClipboard": "Clipboard", "connClipboardDesc": "Copy / Paste between local and remote", "connPrinter": "Forward Printer", "connPrinterDesc": "Make local printers available in RDP window", "connColorDepth": "Color Depth", "connAdvanced": "Advanced – Gateway & Drives", "connGatewayHost": "Gateway Host", "connUsage": "Usage", "connUsageAlways": "always", "connUsageIfNeeded": "if needed", "connUsageNever": "never", "connDrives": "Forward Drives", "connDrivesPlaceholder": "empty = none   * = all   e.g. C:;D:;", "connAnmeldedaten": "CREDENTIALS", "connUsePersonal": "Use personal credentials", "connUsePersonalDesc": "Username + Password from Settings → Personal Credentials", "connUsePersonalOff": "If disabled: Windows login dialog appears when connecting.", "sshPassword": "Password (optional)", "sshPasswordSaved": "New password (leave empty to keep existing)", "sshPasswordPlaceholder": "Empty = prompt when connecting", "sshRemember": "Remember password", "sshRememberDesc": "DPAPI-encrypted", "sshPasswordSavedLabel": "✓ Password saved", "sshPasswordDelete": "Delete", "newRdpTitle": "New RDP Connection", "newSshTitle": "New SSH Connection", "newWebTitle": "New Web Connection", "editConnTitle": "Edit Connection", "editSshTitle": "Edit SSH", "editWebTitle": "Edit Web Connection", "webUrl": "URL", "webUrlPlaceholder": "https://", "webName": "Name", "serialPort": "COM Port", "serialBaudRate": "Baud Rate", "serialDataBits": "Data Bits", "serialParity": "Parity", "serialStopBits": "Stop Bits", "serialParityNone": "None", "serialParityEven": "Even", "serialParityOdd": "Odd", "serialRefreshPorts": "Refresh ports", "newSerialTitle": "New Serial Connection", "editSerialTitle": "Edit Serial Connection", "promptPassword": "Password", "confirmDelete": "Confirm Delete", "confirmDeleteConn": "Really delete this connection?", "confirmDeleteFolder": "Really delete folder and all its connections?", "confirmDeleteSshPasswords": "Delete all saved SSH passwords?", "confirmDeletePersonalCreds": "Really delete personal credentials?", "importSuccess": "Import successful", "importError": "Import error", "exportSuccess": "Export successful", "exportError": "Export error", "startError": "Launch error", "saved": "Saved", "deleted": "Deleted", "done": "Done", "allSshDeleted": "All saved passwords have been deleted.", "personalCredsSaved": "Personal credentials saved.", "personalCredsUpdated": "Personal credentials updated.", "personalCredsDeleted": "Personal credentials have been deleted.", "importPersonalTitle": "Personal Credentials", "connecting": "Connecting...", "focusWindow": "🪟 Bring Window to Front", "connInfoNotes": "NOTES", "connInfoNotesPlaceholder": "Enter connection notes…", "connInfoSaved": "✓ Saved", "connInfoError": "Error saving", "folderName": "Folder name", "folderNamePlaceholder": "e.g. Production", "newFolderTitle": "New Folder", "renameFolderTitle": "Rename Folder", "noResults": "No results.", "openDataFolderDesc": "Open folder containing connections.json in Explorer", "themeAppliedImmediately": "Applied immediately", "closeTab": "Close tab", "colorScheme": "Color scheme", "ctxNewSubFolder": "New Subfolder…", "emptyStateHint": "Right-click → New Folder / New Connection", "rdpError": "RDP Error", "rdpConnectFailed": "Failed to start.", "sshConnError": "SSH Connection Error", "sshConnFailed": "Connection failed.", "exportedTo": "Saved to:\n{0}", "deleteTitle": "Delete", "deleteFolderTitle": "Delete Folder", "deleteConnTitle": "Delete Connection", "deletePasswordsTitle": "Delete Passwords", "unknownTypesNote": "Unknown types (please report):", "sshPasswordKeepPlaceholder": "Leave empty to keep saved password", "importInvalidXml": "The file could not be read as XML.", "importUnknownFormat": "Unknown format.\nSupported: mRemoteNG XML, Devolutions RDM XML", "sshPasswordForLabel": "Password for", "confirmTitle": "Confirm", "continueQuestion": "Continue?", "newSubfolderTitle": "New Subfolder", "newNameLabel": "New Name", "errorTitle": "Error", "allFiles": "All Files", "connectionDataXml": "Connection Data (XML)", "rootFolderError": "Root folder could not be created.", "passwordEnterPlaceholder": "Enter password", "connectionClosed": "Connection closed", "connectionClosedTabClosing": "Connection closed – tab closing...", "noFolderTitle": "No Folder", "noFolderMsg": "No folder exists yet. Create one now?", "importPersonalCredsMsg": "{0} new RDP connection(s) imported.\n\nUse personal credentials\n(Settings → Credentials) for all of them?", "sectionDataSource": "🔄 Data Source", "dataSourceDesc": "Determines where connections.json is stored. Changes apply immediately.", "dataSourceLocal": "Local", "dataSourceSmb": "Network Drive (SMB)", "smbPathLabel": "Path to connections.json", "smbPathPlaceholder": "\\\\server\\share\\rcm\\connections.json", "smbModeReadonly": "Read only", "smbModeReadwrite": "Read & Write", "smbOfflineNotice": "Network drive unreachable – showing last known state"}
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
      if(s?.isMaximized){maxBtn.title="Wiederherstellen";maxIcon.textContent="🗗";}
      else{maxBtn.title="Maximieren";maxIcon.textContent="▢";}
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
      m.innerHTML=`<div class="modal-header">${escHtml(title)}</div><div class="modal-body"><label>${escHtml(label)}</label><input type="${password?"password":"text"}" id="mi" placeholder="${String(placeholder).replaceAll('"',"&quot;")}"/></div><div class="modal-actions"><button class="btn" id="mc">${cancelLabel}</button><button class="btn primary" id="mo">${okLabel}</button></div>`;
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
        <input type="text" id="f-name" placeholder="z. B. Fileserver"/></div>
    </div>
    <div class="rdp-field-row">
      <div class="rdp-field rdp-field-grow"><label>${t("connHostIp")}</label>
        <input type="text" id="f-host" placeholder="192.168.1.1 oder server.local"/></div>
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
          <input type="text" id="p-dr" placeholder="leer = keine &nbsp; * = alle &nbsp; z. B. C:;D:;"/></div>
      </div>
    </div>
  </details>

</div>
  <div class="rdp-section" style="border-bottom:none">
    <div class="rdp-section-title">${t("connNotes")}</div>
    <textarea id="f-notes" rows="3"
      style="width:100%;box-sizing:border-box;resize:vertical;padding:8px 10px;font-size:13px;
             background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);
             border-radius:6px;outline:none;font-family:inherit"
      placeholder="${t('connNotesPlaceholder')}"></textarea>
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

      m.querySelector("#f-notes").value = defaults.profile?.notes || defaults.notes || "";
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
        profile.notes = m.querySelector("#f-notes")?.value.trim() || "";
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
        <input type="text" id="s-name" placeholder="z. B. Webserver"/></div>
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
    <div class="rdp-section-title">${t("password")}</div>
    <div class="rdp-field-row"><div class="rdp-field rdp-field-grow">
      <label>${hasSaved?t("sshPasswordSaved"):t("sshPassword")}</label>
      <input type="password" id="s-pass"
        placeholder="${hasSaved?"Leer lassen":"Leer = beim Verbinden abfragen"}"/>
    </div></div>
    <div class="rdp-toggle-row" style="margin-top:6px">
      <div class="rdp-toggle-info">
        <span>${t("sshRemember")}</span>
        <span class="rdp-toggle-desc">DPAPI-verschlüsselt</span>
      </div>
      <label class="toggle">
        <input type="checkbox" id="s-save" ${hasSaved?"checked":""}>
        <span class="toggle-track"><span class="toggle-thumb"></span></span>
      </label>
    </div>
    ${hasSaved?`<div style="margin-top:5px;font-size:11px;color:var(--tx-5)">${t("sshPasswordSavedLabel")} &nbsp;<a href="#" id="s-clearpw" style="color:var(--err);text-decoration:none">${t("sshPasswordDelete")}</a></div>`:""}
  </div>

  <div class="rdp-section" style="border-bottom:none">
    <div class="rdp-section-title">${t("connNotes")}</div>
    <textarea id="s-notes" rows="3"
      style="width:100%;box-sizing:border-box;resize:vertical;padding:8px 10px;font-size:13px;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:6px;outline:none;font-family:inherit"
      placeholder="${t('connNotesPlaceholder')}"></textarea>
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
      m.querySelector("#s-notes").value = defaults.notes || "";
      m.querySelector("#s-name").focus(); m.querySelector("#s-name").select();

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
        m.querySelector("#s-save").checked = false;
        m.querySelector("#s-clearpw").closest("div").remove();
        m.querySelector("#s-pass").placeholder = "Leer = beim Verbinden abfragen";
      });

      const cl = (v) => { bd.remove(); resolve(v); };

      m.querySelector("#btn-ok").addEventListener("click", () => {
        const host = m.querySelector("#s-host").value.trim();
        const user = m.querySelector("#s-user").value.trim();
        if (!host) { m.querySelector("#s-host").focus(); return; }
        if (!user) { m.querySelector("#s-user").focus(); return; }
        const port = Number(m.querySelector("#s-port").value.trim() || "22");
        if (!Number.isFinite(port) || port <= 0 || port > 65535) { m.querySelector("#s-port").focus(); return; }
        cl({
          name: m.querySelector("#s-name").value.trim() || host,
          host, port, username: user,
          notes:        m.querySelector("#s-notes")?.value.trim() || "",
          password:     m.querySelector("#s-pass")?.value || "",
          savePassword: !!m.querySelector("#s-save")?.checked,
          clearPassword: hasSaved && !m.querySelector("#s-save")?.checked,
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
  function findFolderNameById(folders,id){for(const f of folders){if(f.id===id)return f.name;const r=findFolderNameById(f.folders||[],id);if(r!==null)return r;}return null;}

  /* =========================================================
     Multi-Tab Manager
  ========================================================== */
  const tabs=new Map();
  let activeTabId=null,_tabCtr=0;
  const genTabId=()=>"tab-"+(++_tabCtr);

  // ── Verbindungsstatus (TCP-Check) ───────────────────────────────────────
  const statusMap = new Map(); // id → { reachable, latency, checking }
  let pingIntervalId = null;

  function getStatusDotHtml(id) {
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

  async function pingConnection(conn) {
    if (!conn.host) return;
    statusMap.set(conn.id, { ...statusMap.get(conn.id), checking: true });
    updateDot(conn.id);
    try {
      const port = conn.port || (conn.type === 'ssh' ? 22 : 3389);
      const r = await window.api.conn.ping({ host: conn.host, port });
      console.log(`[RDM ping] ${conn.name} (${conn.host}:${port}) → ${r.reachable ? r.latency+"ms" : "nicht erreichbar"}`);
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
        for (const c of f.items || []) { if (c.host) all.push(c); }
        collect(f.folders);
      }
    }
    collect(model?.folders);
    console.log("[RDM ping] Verbindungen zum Prüfen:", all.length, all.map(c=>c.id+":"+c.host));
    for (let i = 0; i < all.length; i += 5)
      await Promise.all(all.slice(i, i + 5).map(pingConnection));
  }

  // ── Verbindungs-Info-Panel (Hauptbereich bei Auswahl) ──────────────────
  let infoPanelTimer = null;

  function showConnInfoPanel(conn, folderId) {
    const area  = document.getElementById("tab-content-area");
    const existing = area.querySelector(".conn-info-panel");
    if (existing) existing.remove();

    // Nur anzeigen wenn kein aktiver Tab im Vordergrund
    const hasActiveTab = activeTabId && tabs.get(activeTabId);
    const notes  = conn.notes || conn.profile?.notes || "";
    const icon   = conn.type === "ssh" ? "🔒" : conn.type === "web" ? "🌐" : conn.type === "serial" ? "🔌" : "🪟";
    const meta   = conn.type === "web"
      ? (conn.url || "")
      : `${conn.host || ""}${conn.port ? " · Port " + conn.port : ""}`;

    const panel = document.createElement("div");
    panel.className = "conn-info-panel" + (hasActiveTab ? " conn-info-panel-hidden" : "");
    panel.dataset.connId = conn.id;
    panel.innerHTML = `
      <div class="conn-info-card">
        <div class="conn-info-header">
          <span class="conn-info-icon">${icon}</span>
          <div>
            <div class="conn-info-name">${escHtml(conn.name)}</div>
            <div class="conn-info-meta">${escHtml(meta)}</div>
          </div>
          <button class="conn-info-close" title="${t('close')}">✕</button>
        </div>
        <div class="conn-info-notes-label">${t("connInfoNotes")}</div>
        <textarea class="conn-info-notes" placeholder="${t('connInfoNotesPlaceholder')}">${escHtml(notes)}</textarea>
        <div class="conn-info-save-status"></div>
      </div>
    `;
    area.appendChild(panel);

    panel.querySelector(".conn-info-close").addEventListener("click", () => {
      panel.remove();
    });
    const ta     = panel.querySelector("textarea");
    const status = panel.querySelector(".conn-info-save-status");

    ta.addEventListener("input", () => {
      clearTimeout(infoPanelTimer);
      status.textContent = "";
      infoPanelTimer = setTimeout(async () => {
        try {
          await window.api.store.updateConnection({
            folderId, connectionId: conn.id,
            notes: ta.value
          });
          // update in-memory model
          const item = (function findItem(folders) {
            for (const f of folders || []) {
              const c = (f.items || []).find(x => x.id === conn.id);
              if (c) { c.notes = ta.value; return c; }
              const sub = findItem(f.folders);
              if (sub) return sub;
            }
          })(model?.folders);
          status.textContent = t("connInfoSaved");
          setTimeout(() => { status.textContent = ""; }, 2000);
        } catch {
          status.textContent = t("connInfoError");
        }
      }, 800);
    });
  }

  function hideConnInfoPanel() {
    const area = document.getElementById("tab-content-area");
    area.querySelector(".conn-info-panel")?.remove();
  }

  async function applyPingInterval() {
    if (pingIntervalId) { clearInterval(pingIntervalId); pingIntervalId = null; }
    const s = await window.api.settings.load();
    const ms = Number(s?.pingInterval) || 0;
    if (ms === 0) {
      // Deaktiviert → Status zurücksetzen
      statusMap.clear();
      document.querySelectorAll(".status-dot").forEach(el => {
        el.className = "status-dot status-unknown";
        el.title = "";
      });
      return;
    }
    // Sofort prüfen + Intervall starten
    pingAllVisible();
    pingIntervalId = setInterval(pingAllVisible, ms);
  }

  const tabBarEl=document.getElementById("tab-bar");
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
      tabEl.appendChild(titleEl);tabEl.appendChild(closeEl);
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
    await deactivateCurrentTab();
    const tab=tabs.get(tabId);if(!tab)return;
    activeTabId=tabId;
    hideConnInfoPanel();
    if(tab.type==="web"){await new Promise(r=>requestAnimationFrame(r));try{await window.api.web.show({tabId,bounds:getContentBounds()});}catch{}}
    else if(tab.type==="ssh"){tab.container.classList.add("active");if(tab.fitAddon)tab.fitAddon.fit();if(tab.term)tab.term.focus();}
    else if(["rdp","settings"].includes(tab.type)){tab.container.classList.add("active");}
    else if(tab.type==="serial"){tab.container.classList.add("active");if(tab.fitAddon)tab.fitAddon.fit();if(tab.term)tab.term.focus();}
    renderTabBar();
  }

  async function closeTab(tabId){
    const tab=tabs.get(tabId);if(!tab)return;
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
    // Wenn alle Tabs zu: Info-Panel für ausgewählte Verbindung zeigen
    if(tabs.size===0&&selectedConnId){
      (function showSelected(folders){
        for(const f of folders||[]){
          const c=(f.items||[]).find(x=>x.id===selectedConnId);
          if(c){showConnInfoPanel(c,f.id);return;}
          showSelected(f.folders);
        }
      })(model?.folders);
    }
  }

  async function openConnection(conn){
    if(conn.type==="web"&&conn.url){await openWebTab({name:conn.name,url:conn.url});return;}
    if(conn.type==="serial"){
      await openSerialTab({name:conn.name,comPort:conn.comPort,baudRate:conn.baudRate||9600,dataBits:conn.dataBits||8,parity:conn.parity||"none",stopBits:conn.stopBits||1});
      return;
    }
    if(conn.type==="ssh"){
      const prev=await hideActiveWebTab();
      let username=conn.username||"", password=null;
      try{
        const r=await window.api.cred.load({id:conn.id});
        if(r?.ok) password=r.password;
      }catch{}
      if(!password){
        const typed=await showPrompt({title:`SSH – ${conn.name}`,label:`${t("sshPasswordForLabel")} ${username}@${conn.host||""}`,password:true});
        if(typed===null){await restoreWebTab(prev);return;}
        password=typed;
      }
      await openSshTab({name:conn.name,host:conn.host,port:conn.port||22,username,password});
      return;
    }
    await openRdpTab({connId:conn.id,name:conn.name,host:conn.host,port:conn.port?Number(conn.port):undefined,profile:conn.profile||{}});
  }

  async function openWebTab({name,url}){
    const tabId=genTabId();await deactivateCurrentTab();
    tabs.set(tabId,{id:tabId,type:"web",title:name||url,url});activeTabId=tabId;renderTabBar();
    await new Promise(r=>requestAnimationFrame(r));
    try{await window.api.web.open({tabId,url,bounds:getContentBounds()});}
    catch(err){tabs.delete(tabId);activeTabId=null;renderTabBar();await showAlert({title:"Ladefehler",message:String(err?.message||err)});}
  }

  async function openSshTab({name,host,port,username,password}){
    const tabId=genTabId(),sessionId="ssh-"+tabId;
    await deactivateCurrentTab();
    const container=document.createElement("div");container.className="ssh-tab-container active";
    tabContentArea.appendChild(container);
    const tabData={id:tabId,type:"ssh",title:name||host,sessionId,host,username,container,term:null,fitAddon:null,offData:null,offClosed:null};
    tabs.set(tabId,tabData);activeTabId=tabId;renderTabBar();
    const connResult=await window.api.ssh.connect({sessionId,host,port,username,password});
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
    const tabData={id:tabId,type:"rdp",title:name,host,container,offClosed:null};
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
    const container=document.createElement("div");container.className="settings-tab-container active";
    container.innerHTML=`
      <div class="settings-content">
        <h1 class="settings-page-title">${t("settingsTitle")}</h1>
        <section class="settings-section">
          <div class="settings-section-title">${t("sectionConnData")}</div>
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
              <div class="settings-item-label">${t("sshPasswords")}</div>
              <div class="settings-item-desc">${t("sshPasswordsDesc")}</div>
            </div>
            <button class="settings-action-btn" id="s-clear-creds">${t("deleteBtn")}</button>
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
          <div class="settings-section-title">${t("sectionDataSource")}</div>
          <div class="settings-item-desc" style="margin-bottom:12px">${t("dataSourceDesc")}</div>
          <div style="display:flex;gap:20px;margin-bottom:12px">
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="radio" name="data-source" value="local" ${currentSettings?.dataSource!=="smb"?"checked":""}/>
              <span>${t("dataSourceLocal")}</span>
            </label>
            <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
              <input type="radio" name="data-source" value="smb" ${currentSettings?.dataSource==="smb"?"checked":""}/>
              <span>${t("dataSourceSmb")}</span>
            </label>
          </div>
          <div id="smb-config" style="padding-left:2px;display:${currentSettings?.dataSource==="smb"?"block":"none"}">
            <div class="settings-item-label" style="margin-bottom:6px">${t("smbPathLabel")}</div>
            <input type="text" id="smb-path" value="${escHtml(currentSettings?.smbPath||"")}" placeholder="${t("smbPathPlaceholder")}"
              style="width:100%;box-sizing:border-box;padding:8px 10px;font-size:13px;background:var(--bg-input);color:var(--tx-in);border:1px solid var(--bd-2);border-radius:6px;outline:none;margin-bottom:12px;font-family:monospace"/>
            <div style="display:flex;gap:20px">
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
                <input type="radio" name="smb-mode" value="readonly" ${currentSettings?.smbWriteMode!=="readwrite"?"checked":""}/>
                <span>${t("smbModeReadonly")}</span>
              </label>
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
                <input type="radio" name="smb-mode" value="readwrite" ${currentSettings?.smbWriteMode==="readwrite"?"checked":""}/>
                <span>${t("smbModeReadwrite")}</span>
              </label>
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
            <strong style="color:#ccc">${t("aboutApp")}</strong><br>
            ${t("aboutDesc")}<br>
            <span style="color:#555">${t("aboutConns")}: ${(model?.folders||[]).reduce((n,f)=>n+(f.items?.length||0),0)} · ${t("aboutFolders")}: ${(model?.folders||[]).length}</span>
          </div>
        </section>
      </div>`;
    tabContentArea.appendChild(container);
    const tabData={id:tabId,type:"settings",title:t("settingsTitle"),container};
    tabs.set(tabId,tabData);activeTabId=tabId;renderTabBar();
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
    container.querySelectorAll('input[name="data-source"]').forEach(r => {
      r.addEventListener("change", async () => {
        try {
          const s = await window.api.settings.load() || {};
          s.dataSource = r.value;
          await window.api.settings.save(s);
          const cfgDiv = container.querySelector("#smb-config");
          if (cfgDiv) cfgDiv.style.display = r.value === "smb" ? "block" : "none";
          await loadAndRender();
        } catch(err) { console.error(err); }
      });
    });
    const smbPathInput = container.querySelector("#smb-path");
    if (smbPathInput) {
      smbPathInput.addEventListener("blur", async () => {
        try {
          const s = await window.api.settings.load() || {};
          s.smbPath = smbPathInput.value.trim();
          await window.api.settings.save(s);
          await loadAndRender();
        } catch(err) { console.error(err); }
      });
    }
    container.querySelectorAll('input[name="smb-mode"]').forEach(r => {
      r.addEventListener("change", async () => {
        try {
          const s = await window.api.settings.load() || {};
          s.smbWriteMode = r.value;
          await window.api.settings.save(s);
        } catch(err) { console.error(err); }
      });
    });
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
        <input type="text" id="sr-name" placeholder="z. B. Cisco Switch"/></div>
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
    <div style="font-size:11px;color:#555;line-height:1.6">
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
  async function openSerialTab({name, comPort, baudRate=9600, dataBits=8, parity="none", stopBits=1}){
    const tabId=genTabId(), sessionId="serial-"+tabId;
    await deactivateCurrentTab();
    const container=document.createElement("div");
    container.className="ssh-tab-container active"; // xterm reuse
    tabContentArea.appendChild(container);
    const tabData={id:tabId,type:"serial",title:name||comPort,sessionId,comPort,container,term:null,fitAddon:null,offData:null,offClosed:null};
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
        for(const item of(folder.items||[])){if(`${item.name} ${item.host||""} ${item.url||""}`.toLowerCase().includes(q))results.push({item,folderId:folder.id,path:fp});}
        searchFolders(folder.folders||[],fp);
      }
    }
    searchFolders(model?.folders||[],[]);
    if(!results.length){treeContainer.appendChild(el("div",{style:"opacity:.6;padding:12px;font-size:12px;"},t("noResults")));return;}
    for(const{item,path}of results){
      const icon=item.type==="web"?"🌐":item.type==="ssh"?"🔒":"🪟";
      const div=document.createElement("div");div.className="tree-item search-result";
      div.innerHTML=`<div class="search-result-name">${icon} ${escHtml(item.name)}${item.host?getStatusDotHtml(item.id):""}</div><div class="search-breadcrumb">${escHtml(path.join(" › "))}</div>`;
      div.addEventListener("dblclick",async()=>{try{await openConnection(item);}catch(err){await showAlert({title:t("errorTitle"),message:String(err?.message||err)});}});
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
      header.addEventListener("dragover",(e)=>{if(currentDrag&&(currentDrag.kind==="connection"||(currentDrag.kind==="folder"&&currentDrag.id!==folder.id))){e.preventDefault();e.dataTransfer.dropEffect="move";header.classList.add("drag-over");}});
      header.addEventListener("dragleave",()=>header.classList.remove("drag-over"));
      header.addEventListener("drop",async()=>{
        header.classList.remove("drag-over");if(!currentDrag)return;
        try{
          if(currentDrag.kind==="connection")await window.api.store.moveConnection({sourceFolderId:currentDrag.folderId,connectionId:currentDrag.id,targetFolderId:folder.id});
          else if(currentDrag.kind==="folder"&&currentDrag.id!==folder.id)await window.api.store.moveFolder({folderId:currentDrag.id,targetFolderId:folder.id});
          await loadAndRender();
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
        item.addEventListener("click",()=>{clearSelection();item.classList.add("active");selectedFolderId=folder.id;selectedConnId=conn.id;showConnInfoPanel(conn,folder.id);});
        item.addEventListener("dblclick",async()=>{try{await openConnection(conn);}catch(err){console.error(err);await showAlert({title:t("startError"),message:String(err?.message||err)});}});
        item.setAttribute("draggable","true");
        item.addEventListener("dragstart",(e)=>{currentDrag={kind:"connection",id:conn.id,folderId:folder.id};e.dataTransfer.effectAllowed="move";item.classList.add("dragging");});
        item.addEventListener("dragend",()=>{currentDrag=null;item.classList.remove("dragging");});
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
      addItem(t("ctxNewSsh"),async()=>{const fid=await getOrCreateFolder();if(!fid)return;const result=await showSshForm({title:t("newSshTitle"),defaults:{port:22}});if(!result)return;const cr=await window.api.store.createSshConnection({folderId:fid,name:result.name,host:result.host,port:result.port,username:result.username});if(cr?.connId&&result.savePassword&&result.password){try{await window.api.cred.save({id:cr.connId,password:result.password});}catch{}}await loadAndRender();});
      addItem(t("ctxNewWeb"),async()=>{const fid=await getOrCreateFolder();if(!fid)return;const res=await showWebsiteForm({title:t("newWebTitle")});if(!res)return;await window.api.store.createWebConnection({folderId:fid,name:res.name,url:res.url});await loadAndRender();});
      addItem(t("ctxNewSerial"),async()=>{const fid=await getOrCreateFolder();if(!fid)return;const res=await showSerialForm({title:t("newSerialTitle")});if(!res)return;await window.api.store.createSerialConnection({folderId:fid,name:res.name,comPort:res.comPort,baudRate:res.baudRate,dataBits:res.dataBits,parity:res.parity,stopBits:res.stopBits});await loadAndRender();});
    }

    if(ctxType==="folder"&&context.folderId){
      addDivider();
      if((context.depth||1)<MAX_DEPTH){addItem(t("ctxNewSubFolder"),async()=>{const name=await showPrompt({title:t("newSubfolderTitle"),label:t("folderName")});if(!name)return;await window.api.store.createFolder({name,parentId:context.folderId});await loadAndRender();});}
      addItem(t("ctxRenameFolder"),async()=>{const current=findFolderNameById(model?.folders||[],context.folderId)||"";const next=await showPrompt({title:t("renameFolderTitle"),label:t("newNameLabel"),defaultValue:current});if(!next||next.trim()===current)return;await window.api.store.renameFolder({folderId:context.folderId,name:next.trim()});await loadAndRender();});
      addItem(t("ctxDeleteFolder"),async()=>{if(!await showConfirm({title:t("deleteFolderTitle"),message:t("confirmDeleteFolder")}))return;await window.api.store.deleteFolder({folderId:context.folderId});if(selectedFolderId===context.folderId)selectedFolderId=null;selectedConnId=null;await loadAndRender();});
    }

    if(ctxType==="connection"&&context.folderId&&context.connectionId){
      addDivider();
      function findInTree(folders,fid,cid){for(const fd of folders){if(fd.id===fid){const c=(fd.items||[]).find(x=>x.id===cid);if(c)return c;}const r=findInTree(fd.folders||[],fid,cid);if(r)return r;}return null;}
      const entry=findInTree(model?.folders||[],context.folderId,context.connectionId);
      if(entry?.type==="web"){addItem(t("ctxEdit"),async()=>{for(const[tid,t]of tabs){if(t.type==="web"&&t.url===entry.url){await closeTab(tid);break;}}const res=await showWebsiteForm({title:t("editWebTitle"),defaults:{name:entry.name,url:entry.url}});if(!res)return;await window.api.store.updateWebConnection({folderId:context.folderId,connectionId:context.connectionId,name:res.name||entry.name,url:res.url});await loadAndRender();});}
      else if(entry?.type==="ssh"){addItem(t("ctxEdit"),async()=>{let hasSavedPassword=false;try{hasSavedPassword=!!(await window.api.cred.load({id:entry.id}))?.ok;}catch{}const result=await showSshForm({title:t("editSshTitle"),defaults:{name:entry.name,host:entry.host,port:entry.port,username:entry.username,hasSavedPassword,notes:entry.notes||""}});if(!result)return;await window.api.store.updateConnection({folderId:context.folderId,connectionId:context.connectionId,name:result.name,host:result.host,port:result.port,username:result.username,notes:result.notes||""});try{if(result.savePassword&&result.password){await window.api.cred.save({id:entry.id,password:result.password});}else if(result.clearPassword){await window.api.cred.delete({id:entry.id});}}catch{}await loadAndRender();});}
      else if(entry?.type==="serial"){addItem(t("ctxEdit"),async()=>{const result=await showSerialForm({title:t("editSerialTitle"),defaults:{name:entry.name,comPort:entry.comPort,baudRate:entry.baudRate,dataBits:entry.dataBits,parity:entry.parity,stopBits:entry.stopBits}});if(!result)return;await window.api.store.updateConnection({folderId:context.folderId,connectionId:context.connectionId,name:result.name,comPort:result.comPort,baudRate:result.baudRate,dataBits:result.dataBits,parity:result.parity,stopBits:result.stopBits});await loadAndRender();});}
      else{addItem(t("ctxEdit"),async()=>{let hasSavedPassword=false;try{hasSavedPassword=!!(await window.api.cred.load({id:entry.id}))?.ok;}catch{}let rdpMode="none";try{const mr=await window.api.cred.getMode({id:entry.id});rdpMode=mr?.mode||"none";}catch{}
        const result=await showConnectionForm({title:t("editConnTitle"),defaults:{name:entry.name,host:entry.host,port:entry.port,profile:entry.profile||{},hasSavedPassword,credMode:rdpMode}});if(!result)return;await window.api.store.updateConnection({folderId:context.folderId,connectionId:context.connectionId,name:result.name,host:result.host,port:result.port??"",profile:result.profile||{},notes:result.profile?.notes||""});try{if(result.credMode!==undefined)await window.api.cred.setMode({id:entry.id,mode:result.credMode});}catch{}await loadAndRender();});}
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

  loadAndRender();
  applyPingInterval();

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