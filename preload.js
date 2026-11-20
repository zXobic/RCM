// preload.js
"use strict";

const { contextBridge, ipcRenderer } = require("electron");

function isValidPort(val) { const n = Number(val); return Number.isFinite(n) && n > 0 && n <= 65535; }

const _unsubs = [];

const api = Object.freeze({

  minimize: () => ipcRenderer.send("window-minimize"),
  maximize: () => ipcRenderer.send("window-maximize"),
  close:    () => ipcRenderer.send("window-close"),

  onWindowState: (cb) => {
    if (typeof cb !== "function") return () => {};
    const fn  = (_e, s) => { try { cb(s); } catch {} };
    ipcRenderer.on("window-state", fn);
    const off = () => ipcRenderer.removeListener("window-state", fn);
    _unsubs.push(off); return off;
  },

  /* --- Settings --- */
  settings: Object.freeze({
    load: ()    => ipcRenderer.invoke("settings:load"),
    save: (s)   => ipcRenderer.invoke("settings:save", s),
  }),

  /* --- Clipboard --- */
  clipboard: Object.freeze({
    read:  ()     => ipcRenderer.invoke("clipboard:read"),
    write: (text) => ipcRenderer.invoke("clipboard:write", text),
  }),

  /* --- Dialog --- */
  dialog: Object.freeze({
    openFile: (filters)              => ipcRenderer.invoke("dialog:openFile", { filters }),
    saveFile: ({ defaultName, content }) => ipcRenderer.invoke("dialog:saveFile", { defaultName, content }),
  }),

  /* --- RDP --- */
  rdp: Object.freeze({
    launch:   (opts)      => ipcRenderer.invoke("rdp:launch", opts),
    focus:    ({ tabId }) => ipcRenderer.invoke("rdp:focus",  { tabId }),
    close:    ({ tabId }) => ipcRenderer.invoke("rdp:close",  { tabId }),
    onClosed: (cb) => {
      if (typeof cb !== "function") return () => {};
      const fn  = (_e, p) => { try { cb(p); } catch {} };
      ipcRenderer.on("rdp:closed", fn);
      const off = () => ipcRenderer.removeListener("rdp:closed", fn);
      _unsubs.push(off); return off;
    },
  }),

  /* --- WEB --- */
  web: Object.freeze({
    open:   ({ tabId, url, bounds }) => ipcRenderer.invoke("web:open",   { tabId, url, bounds }),
    show:   ({ tabId, bounds })      => ipcRenderer.invoke("web:show",   { tabId, bounds }),
    hide:   ({ tabId })              => ipcRenderer.invoke("web:hide",   { tabId }),
    resize: ({ tabId, bounds })      => ipcRenderer.invoke("web:resize", { tabId, bounds }),
    close:  ({ tabId })              => ipcRenderer.invoke("web:close",  { tabId }),
    reload: ({ tabId, hard })        => ipcRenderer.invoke("web:reload", { tabId, hard: !!hard }),
  }),

  /* --- SSH --- */
  ssh: Object.freeze({
    connect: ({ sessionId, host, port, username, password }) =>
      ipcRenderer.invoke("ssh:connect", { sessionId, host, port, username, password }),
    send:    ({ sessionId, data })       => ipcRenderer.invoke("ssh:send",   { sessionId, data }),
    resize:  ({ sessionId, cols, rows }) => ipcRenderer.invoke("ssh:resize", { sessionId, cols, rows }),
    close:   ({ sessionId })             => ipcRenderer.invoke("ssh:close",  { sessionId }),
    onData: (cb) => {
      if (typeof cb !== "function") return () => {};
      const fn  = (_e, p) => { try { cb(p); } catch {} };
      ipcRenderer.on("ssh:data", fn);
      const off = () => ipcRenderer.removeListener("ssh:data", fn);
      _unsubs.push(off); return off;
    },
    onClosed: (cb) => {
      if (typeof cb !== "function") return () => {};
      const fn  = (_e, p) => { try { cb(p); } catch {} };
      ipcRenderer.on("ssh:closed", fn);
      const off = () => ipcRenderer.removeListener("ssh:closed", fn);
      _unsubs.push(off); return off;
    },
  }),

  /* --- Store --- */
  store: Object.freeze({
    load:       () => ipcRenderer.invoke("store:load"),
    openFolder: () => ipcRenderer.invoke("store:openFolder"),
    createFolder: ({ name, parentId } = {}) => {
      name = (name ?? "").toString().trim();
      if (!name) throw new Error("Ordnername fehlt.");
      return ipcRenderer.invoke("store:createFolder", { name, parentId });
    },
    renameFolder: ({ folderId, name }) => {
      if (!folderId) throw new Error("folderId fehlt.");
      name = (name ?? "").toString().trim();
      if (!name) throw new Error("Neuer Ordnername fehlt.");
      return ipcRenderer.invoke("store:renameFolder", { folderId, name });
    },
    deleteFolder:  ({ folderId }) => {
      if (!folderId) throw new Error("folderId fehlt.");
      return ipcRenderer.invoke("store:deleteFolder", { folderId });
    },
    setFolderOpen: ({ folderId, open }) => {
      if (!folderId) throw new Error("folderId fehlt.");
      return ipcRenderer.invoke("store:setFolderOpen", { folderId, open: !!open });
    },
    createConnection: ({ folderId, name, host, port, profile }) => {
      if (!folderId) throw new Error("folderId fehlt.");
      host = (host ?? "").toString().trim(); if (!host) throw new Error("Host ist erforderlich.");
      name = (name ?? host).toString().trim();
      let safePort;
      if (port != null && port !== "") { if (!isValidPort(port)) throw new Error("Port ist ungültig."); safePort = Number(port); }
      return ipcRenderer.invoke("store:createConnection", { folderId, type: "rdp", name, host, port: safePort, profile: (profile && typeof profile === "object") ? profile : undefined });
    },
    createSshConnection: ({ folderId, name, host, port, username }) => {
      if (!folderId) throw new Error("folderId fehlt.");
      host = (host ?? "").toString().trim(); username = (username ?? "").toString().trim();
      if (!host) throw new Error("Host ist erforderlich."); if (!username) throw new Error("Benutzername ist erforderlich.");
      name = (name ?? host).toString().trim();
      const safePort = (port != null && port !== "") ? Number(port) : 22;
      if (!isValidPort(safePort)) throw new Error("Port ist ungültig.");
      return ipcRenderer.invoke("store:createConnection", { folderId, type: "ssh", name, host, port: safePort, username });
    },
    createWebConnection: ({ folderId, name, url }) => {
      if (!folderId) throw new Error("folderId fehlt.");
      url = (url ?? "").toString().trim(); if (!url) throw new Error("URL ist erforderlich.");
      name = (name ?? url).toString().trim();
      return ipcRenderer.invoke("store:createConnection", { folderId, type: "web", name, url });
    },
    updateConnection: ({ folderId, connectionId, name, host, port, profile, url, username, comPort, baudRate, dataBits, parity, stopBits }) => {
      if (!folderId || !connectionId) throw new Error("Parameter fehlt.");
      const payload = { folderId, connectionId };
      if (typeof name     === "string") payload.name     = name;
      if (typeof host     === "string") payload.host     = host;
      if (typeof username === "string") payload.username = username;
      if (port !== undefined)           payload.port     = port === "" ? "" : Number(port);
      if (profile && typeof profile === "object") payload.profile = profile;
      if (typeof url      === "string") payload.url      = url;
      if (comPort)  payload.comPort  = comPort;
      if (baudRate) payload.baudRate = baudRate;
      if (dataBits) payload.dataBits = dataBits;
      if (parity)   payload.parity   = parity;
      if (stopBits) payload.stopBits = stopBits;
      return ipcRenderer.invoke("store:updateConnection", payload);
    },
    updateWebConnection: ({ folderId, connectionId, name, url }) => {
      if (!folderId || !connectionId) throw new Error("Parameter fehlt.");
      const payload = { folderId, connectionId };
      if (typeof name === "string") payload.name = name;
      if (typeof url  === "string") payload.url  = url;
      return ipcRenderer.invoke("store:updateConnection", payload);
    },
    deleteConnection: ({ folderId, connectionId }) => {
      if (!folderId || !connectionId) throw new Error("Parameter fehlt.");
      return ipcRenderer.invoke("store:deleteConnection", { folderId, connectionId });
    },
    moveConnection: ({ sourceFolderId, connectionId, targetFolderId }) =>
      ipcRenderer.invoke("store:moveConnection", { sourceFolderId, connectionId, targetFolderId }),
    moveFolder: ({ folderId, targetFolderId }) =>
      ipcRenderer.invoke("store:moveFolder", { folderId, targetFolderId }),
    createSerialConnection: ({ folderId, name, comPort, baudRate = 9600, dataBits = 8, parity = "none", stopBits = 1 }) => {
      if (!folderId) throw new Error("folderId fehlt.");
      if (!comPort)  throw new Error("COM-Port ist erforderlich.");
      name = (name ?? comPort).toString().trim();
      return ipcRenderer.invoke("store:createConnection", { folderId, type: "serial", name, comPort, baudRate, dataBits, parity, stopBits });
    },
  }),

  /* --- Credentials (DPAPI) --- */
  locale: Object.freeze({
    get: () => ipcRenderer.invoke("locale:get"),
  }),
  conn: Object.freeze({
    ping: ({ host, port }) => ipcRenderer.invoke("conn:ping", { host, port }),
  }),
  cred: Object.freeze({
    save:          ({ id, password })        => ipcRenderer.invoke("cred:save",          { id, password }),
    load:          ({ id })                  => ipcRenderer.invoke("cred:load",          { id }),
    delete:        ({ id })                  => ipcRenderer.invoke("cred:delete",        { id }),
    clear:         ()                        => ipcRenderer.invoke("cred:clear"),
    savePersonal:  ({ username, password })  => ipcRenderer.invoke("cred:savePersonal",  { username, password }),
    loadPersonal:  ()                        => ipcRenderer.invoke("cred:loadPersonal"),
    deletePersonal:()                        => ipcRenderer.invoke("cred:deletePersonal"),
    getMode:       ({ id })                  => ipcRenderer.invoke("cred:getMode",       { id }),
    setMode:       ({ id, mode })            => ipcRenderer.invoke("cred:setMode",       { id, mode }),
  }),

  /* --- Serial --- */
  serial: Object.freeze({
    listPorts: () => ipcRenderer.invoke("serial:listPorts"),
    connect: ({ sessionId, path, baudRate, dataBits, parity, stopBits }) =>
      ipcRenderer.invoke("serial:connect", { sessionId, path, baudRate, dataBits, parity, stopBits }),
    send:  ({ sessionId, data })    => ipcRenderer.invoke("serial:send",  { sessionId, data }),
    close: ({ sessionId })          => ipcRenderer.invoke("serial:close", { sessionId }),
    onData: (cb) => {
      if (typeof cb !== "function") return () => {};
      const fn  = (_e, p) => { try { cb(p); } catch {} };
      ipcRenderer.on("serial:data", fn);
      const off = () => ipcRenderer.removeListener("serial:data", fn);
      _unsubs.push(off); return off;
    },
    onClosed: (cb) => {
      if (typeof cb !== "function") return () => {};
      const fn  = (_e, p) => { try { cb(p); } catch {} };
      ipcRenderer.on("serial:closed", fn);
      const off = () => ipcRenderer.removeListener("serial:closed", fn);
      _unsubs.push(off); return off;
    },
  }),
});

contextBridge.exposeInMainWorld("api", api);

window.addEventListener("beforeunload", () => {
  try { _unsubs.splice(0).forEach(fn => { try { fn(); } catch {} }); } catch {}
});