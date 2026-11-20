// renderer.js

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Window Controls
  ========================== */
  const minBtn   = document.getElementById("min-btn");
  const maxBtn   = document.getElementById("max-btn");
  const closeBtn = document.getElementById("close-btn");
  const maxIcon  = document.getElementById("max-icon");

  if (minBtn)   minBtn.addEventListener("click", () => window.api?.minimize?.());
  if (maxBtn)   maxBtn.addEventListener("click", () => window.api?.maximize?.());
  if (closeBtn) closeBtn.addEventListener("click", () => window.api?.close?.());

  if (window.api?.onWindowState && maxBtn && maxIcon) {
    window.api.onWindowState((state) => {
      if (state?.isMaximized) {
        maxBtn.title = "Wiederherstellen";
        maxIcon.textContent = "🗗";
      } else {
        maxBtn.title = "Maximieren";
        maxIcon.textContent = "▢";
      }
    });
  }

  /* =========================
     Double Click Maximieren
  ========================== */
  const dragRegion = document.querySelector(".drag-region");
  if (dragRegion) {
    dragRegion.addEventListener("dblclick", () => window.api?.maximize?.());
  }

  /* =========================================================
     Modal-Utilities (statt window.prompt/confirm/alert)
  ========================================================== */
  function showPrompt({ title = "Eingabe", label = "Wert", placeholder = "", defaultValue = "" } = {}) {
    return new Promise((resolve) => {
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-header">${title}</div>
        <div class="modal-body">
          <label>${label}</label>
          <input type="text" id="modal-input" placeholder="${placeholder.replaceAll('"','&quot;')}" />
        </div>
        <div class="modal-actions">
          <button class="btn" id="btn-cancel">Abbrechen</button>
          <button class="btn primary" id="btn-ok">OK</button>
        </div>
      `;
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);

      const input     = modal.querySelector("#modal-input");
      const btnOk     = modal.querySelector("#btn-ok");
      const btnCancel = modal.querySelector("#btn-cancel");

      input.value = defaultValue ?? "";
      input.focus();
      input.select();

      const close = (val) => { backdrop.remove(); resolve(val); };

      btnOk.addEventListener("click", () => close(input.value));
      btnCancel.addEventListener("click", () => close(null));
      backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(null); });
      modal.addEventListener("keydown", (e) => {
        if (e.key === "Enter")  close(input.value);
        if (e.key === "Escape") close(null);
      });
      modal.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  function showConfirm({ title = "Bestätigen", message = "Fortfahren?" } = {}) {
    return new Promise((resolve) => {
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-header">${title}</div>
        <div class="modal-body">
          <div style="font-size:14px; line-height:1.5; white-space:pre-wrap">${message}</div>
        </div>
        <div class="modal-actions">
          <button class="btn" id="btn-cancel">Abbrechen</button>
          <button class="btn primary" id="btn-ok">OK</button>
        </div>
      `;
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);

      const btnOk     = modal.querySelector("#btn-ok");
      const btnCancel = modal.querySelector("#btn-cancel");

      const close = (val) => { backdrop.remove(); resolve(val); };
      btnOk.addEventListener("click", () => close(true));
      btnCancel.addEventListener("click", () => close(false));
      backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(false); });
      modal.addEventListener("keydown", (e) => { if (e.key === "Escape") close(false); if (e.key === "Enter") close(true); });
      modal.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  function showAlert({ title = "Hinweis", message = "" } = {}) {
    return new Promise((resolve) => {
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-header">${title}</div>
        <div class="modal-body">
          <div style="font-size:14px; line-height:1.5; white-space:pre-wrap">${message}</div>
        </div>
        <div class="modal-actions">
          <button class="btn primary" id="btn-ok">OK</button>
        </div>
      `;
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);

      const btnOk = modal.querySelector("#btn-ok");
      const close = () => { backdrop.remove(); resolve(true); };

      btnOk.addEventListener("click", close);
      backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
      modal.addEventListener("keydown", (e) => { if (e.key === "Escape" || e.key === "Enter") close(); });
      modal.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  // RDP-Form (mit Profil)
  async function showConnectionForm({ title, defaults = {} }) {
    return new Promise((resolve) => {
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";

      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-header">${title || "Verbindung"}</div>
        <div class="modal-body">
          <label>Name</label>
          <input type="text" id="f-name" />
          <label style="margin-top:10px; display:block;">Host/IP</label>
          <input type="text" id="f-host" />
          <label style="margin-top:10px; display:block;">Port (optional)</label>
          <input type="text" id="f-port" />

          <div style="margin-top:14px; border-top:1px solid #3a3a3a; padding-top:12px;">
            <div style="font-weight:600; margin-bottom:6px;">RDP‑Profil</div>

            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <label><input type="checkbox" id="p-fullscreen"> Vollbild</label>
              <label><input type="checkbox" id="p-multimon"> Multi‑Monitor</label>
              <label><input type="checkbox" id="p-admin"> Admin‑Sitzung</label>
              <label><input type="checkbox" id="p-clipboard"> Zwischenablage</label>
              <label><input type="checkbox" id="p-printers"> Drucker</label>
            </div>

            <div style="display:flex; gap:10px; margin-top:10px;">
              <div>
                <label>Farbtiefe (bpp)</label>
                <select id="p-bpp" style="width:120px">
                  <option value="32">32</option>
                  <option value="24">24</option>
                  <option value="16">16</option>
                </select>
              </div>
              <div>
                <label>Fensterbreite (optional)</label>
                <input type="number" id="p-width" style="width:140px" placeholder="z.B. 1600" />
              </div>
              <div>
                <label>Fensterhöhe (optional)</label>
                <input type="number" id="p-height" style="width:140px" placeholder="z.B. 900" />
              </div>
            </div>

            <div style="margin-top:10px;">
              <label>Laufwerke (z.B. "*", "C:;D:" – optional)</label>
              <input type="text" id="p-drives" placeholder='z.B. "C:;" oder "*" ' />
            </div>

            <div style="margin-top:10px; display:flex; gap:10px;">
              <div>
                <label>Gateway‑Host (optional)</label>
                <input type="text" id="p-gw-host" placeholder="rdgw.firma.local" />
              </div>
              <div>
                <label>Gateway‑Nutzung</label>
                <select id="p-gw-usage" style="width:160px">
                  <option value="2">immer (2)</option>
                  <option value="1">bei Bedarf (1)</option>
                  <option value="0">nie (0)</option>
                </select>
              </div>
            </div>

            <div style="margin-top:10px;">
              <label>Benutzername (optional, kein Passwort)</label>
              <input type="text" id="p-username" placeholder="DOMAIN\\user oder user@domain" />
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn" id="btn-cancel">Abbrechen</button>
          <button class="btn primary" id="btn-ok">Speichern</button>
        </div>
      `;
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);

      const fName = modal.querySelector("#f-name");
      const fHost = modal.querySelector("#f-host");
      const fPort = modal.querySelector("#f-port");

      fName.value = defaults.name ?? "";
      fHost.value = defaults.host ?? "";
      fPort.value = defaults.port != null ? String(defaults.port) : "";

      const prof = defaults.profile || {};
      const chk = (id, v, d) => modal.querySelector(id).checked = (v !== undefined ? !!v : d);
      chk("#p-fullscreen", prof.fullscreen, true);
      chk("#p-multimon",  prof.multimon,  false);
      chk("#p-admin",     prof.admin,     false);
      chk("#p-clipboard", (prof.clipboard !== false), true);
      chk("#p-printers",  prof.printers,  false);

      modal.querySelector("#p-bpp").value = String(prof.colorDepth ?? 32);
      modal.querySelector("#p-width").value  = prof.width  != null ? String(prof.width)  : "";
      modal.querySelector("#p-height").value = prof.height != null ? String(prof.height) : "";
      modal.querySelector("#p-drives").value = prof.drives ?? "";
      modal.querySelector("#p-gw-host").value = prof.gateway?.host ?? "";
      modal.querySelector("#p-gw-usage").value = String(prof.gateway?.usage ?? 2);
      modal.querySelector("#p-username").value = prof.username ?? "";

      fName.focus(); fName.select();

      const close = (val) => { backdrop.remove(); resolve(val); };

      modal.querySelector("#btn-ok").addEventListener("click", () => {
        const name    = fName.value.trim();
        const host    = fHost.value.trim();
        const portStr = fPort.value.trim();
        if (!host) { fHost.focus(); return; }

        const port = portStr ? Number(portStr) : undefined;
        if (portStr && (!Number.isFinite(port) || port <= 0 || port > 65535)) { fPort.focus(); return; }

        const profile = {
          fullscreen: modal.querySelector("#p-fullscreen").checked,
          multimon:   modal.querySelector("#p-multimon").checked,
          admin:      modal.querySelector("#p-admin").checked,
          clipboard:  modal.querySelector("#p-clipboard").checked,
          printers:   modal.querySelector("#p-printers").checked,
          colorDepth: Number(modal.querySelector("#p-bpp").value),
          width:  modal.querySelector("#p-width").value  ? Number(modal.querySelector("#p-width").value)  : undefined,
          height: modal.querySelector("#p-height").value ? Number(modal.querySelector("#p-height").value) : undefined,
          drives: modal.querySelector("#p-drives").value.trim(),
          username: modal.querySelector("#p-username").value.trim(),
          gateway: {
            host:  modal.querySelector("#p-gw-host").value.trim() || undefined,
            usage: Number(modal.querySelector("#p-gw-usage").value)
          }
        };

        close({ name: name || host, host, port, profile });
      });

      modal.querySelector("#btn-cancel").addEventListener("click", () => close(null));
      backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(null); });
      modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close(null);
        if (e.key === "Enter")  modal.querySelector("#btn-ok").click();
      });
      modal.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  // Website-Form
  async function showWebsiteForm({ title, defaults = {} }) {
    return new Promise((resolve) => {
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-header">${title || "Website"}</div>
        <div class="modal-body">
          <label>Name (optional)</label>
          <input type="text" id="w-name" />
          <label style="margin-top:10px; display:block;">URL</label>
          <input type="text" id="w-url" placeholder="https://..." />
        </div>
        <div class="modal-actions">
          <button class="btn" id="btn-cancel">Abbrechen</button>
          <button class="btn primary" id="btn-ok">Speichern</button>
        </div>
      `;
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);

      const n = modal.querySelector("#w-name");
      const u = modal.querySelector("#w-url");
      n.value = defaults.name ?? "";
      u.value = defaults.url  ?? "https://";
      n.focus(); n.select();

      const close = (val) => { backdrop.remove(); resolve(val); };
      modal.querySelector("#btn-ok").addEventListener("click", () => {
        const name = n.value.trim();
        const url  = u.value.trim();
        if (!url || !/^https?:\/\//i.test(url)) { u.focus(); return; }
        close({ name, url });
      });
      modal.querySelector("#btn-cancel").addEventListener("click", () => close(null));
      backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(null); });
      modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close(null);
        if (e.key === "Enter")  modal.querySelector("#btn-ok").click();
      });
      modal.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

  /* =========================
     Sidebar + Model + Helpers
  ========================== */
  const sidebarEl     = document.querySelector(".sidebar");
  const treeContainer = document.getElementById("sidebar-tree");

  let model = null;
  let selectedFolderId = null;
  let selectedConnId   = null;

  // Drag & Drop State
  let currentDrag = null; // { kind: 'connection'|'folder', id, folderId? }

  function el(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "dataset") Object.assign(node.dataset, v);
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
      else node.setAttribute(k, v);
    });
    children.flat().forEach(c => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return node;
  }

  function clearSelection() {
    document.querySelectorAll(".tree-item, .tree-folder-header").forEach(i => i.classList.remove("active"));
    selectedConnId = null;
  }

  /* =========================
     WEB: Tab-Leiste + BrowserView-Offset (Variante A)
  ========================== */
  let activeWeb = null;         // { tabId, title, url }
  let webTabbarEl = null;
  const WEB_TABBAR_HEIGHT = 36; // muss zu CSS passen

  function ensureWebTabbar() {
    if (webTabbarEl) return webTabbarEl;
    const content = document.querySelector(".content");
    webTabbarEl = document.createElement("div");
    webTabbarEl.className = "web-tabbar";
    webTabbarEl.style.display = "none";
    webTabbarEl.innerHTML = `
      <div class="title" id="web-tab-title"></div>
      <button class="btn-close" id="web-tab-close">Schließen</button>
    `;
    content.prepend(webTabbarEl);

    const btnClose = webTabbarEl.querySelector("#web-tab-close");
    btnClose.addEventListener("click", async () => {
      if (activeWeb) {
        await window.api.web.close({ tabId: activeWeb.tabId });
        activeWeb = null;
        webTabbarEl.style.display = "none";
      }
    });
    return webTabbarEl;
  }

  // → berücksichtigt Padding der .content UND die Tabbar-Höhe
  function getContentBoundsForWebView() {
    const content = document.querySelector(".content");
    const r  = content.getBoundingClientRect();
    const cs = window.getComputedStyle(content);

    const padTop    = parseInt(cs.paddingTop, 10)    || 0;
    const padRight  = parseInt(cs.paddingRight, 10)  || 0;
    const padBottom = parseInt(cs.paddingBottom, 10) || 0;
    const padLeft   = parseInt(cs.paddingLeft, 10)   || 0;

    const tabOffset = activeWeb ? WEB_TABBAR_HEIGHT : 0;

    const x = Math.round(r.left + padLeft);
    const y = Math.round(r.top  + padTop + tabOffset);
    const w = Math.round(r.width  - padLeft - padRight);
    const h = Math.round(r.height - padTop  - padBottom - tabOffset);

    return { x, y, width: w, height: h };
  }

  async function openWebTab({ id, name, url }) {
    const bar = ensureWebTabbar();
    activeWeb = { tabId: "web-" + id, title: name || url, url };
    bar.querySelector("#web-tab-title").textContent = activeWeb.title;
    bar.style.display = "flex";

    // Einen Frame warten, damit die Tabbar (36px) sicher "steht"
    await new Promise(r => requestAnimationFrame(r));

    const b = getContentBoundsForWebView();
    await window.api.web.open({
      tabId: activeWeb.tabId,
      url: activeWeb.url,
      bounds: b
    });
  }

  window.addEventListener("resize", async () => {
    if (!activeWeb) return;
    const b = getContentBoundsForWebView();
    await window.api.web.resize({ tabId: activeWeb.tabId, bounds: b });
  });

  /* =========================
     Render (rekursiv, Tiefe ≤ 4)
  ========================== */
  function render() {
    if (!treeContainer) return;
    treeContainer.innerHTML = "";

    const folders = (model && Array.isArray(model.folders)) ? model.folders : [];
    if (!folders.length) {
      const placeholder = el("div", { style: "opacity:.6; padding:12px; font-size:12px;" },
        "Rechtsklick hier → Neuer Ordner / Neue Verbindung / Neue Website"
      );
      treeContainer.appendChild(placeholder);
      return;
    }

    const INDENT_PX = 16;

    function renderFolder(folder, depth) {
      const isOpen = !!folder.open;

      // Ordner-Header
      const header = el("div", {
        class: "tree-folder-header",
        dataset: { id: folder.id, depth: String(depth) },
        style: `padding-left:${10 + (depth - 1) * INDENT_PX}px`
      },
        el("div", { class: "arrow" }),
        el("div", { class: "folder-name" }, folder.name)
      );

      // Toggle + Persist
      header.addEventListener("click", async () => {
        folder.open = !folder.open;
        try { await window.api.store.setFolderOpen({ folderId: folder.id, open: folder.open }); } catch {}
        render();
      });

      // Auswahl
      header.addEventListener("mousedown", () => {
        clearSelection();
        header.classList.add("active");
        selectedFolderId = folder.id;
      });

      // ----- DnD: Ordner-Header (draggable + droptarget) -----
      header.setAttribute("draggable", "true");

      header.addEventListener("dragstart", (e) => {
        currentDrag = { kind: "folder", id: folder.id };
        e.dataTransfer.effectAllowed = "move";
        header.classList.add("dragging");
      });

      header.addEventListener("dragend", () => {
        currentDrag = null;
        header.classList.remove("dragging");
      });

      header.addEventListener("dragover", (e) => {
        if (currentDrag && (currentDrag.kind === "connection" || (currentDrag.kind === "folder" && currentDrag.id !== folder.id))) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          header.classList.add("drag-over");
        }
      });
      header.addEventListener("dragleave", () => header.classList.remove("drag-over"));

      header.addEventListener("drop", async () => {
        header.classList.remove("drag-over");
        if (!currentDrag) return;

        try {
          if (currentDrag.kind === "connection") {
            await window.api.store.moveConnection({
              sourceFolderId: currentDrag.folderId,
              connectionId: currentDrag.id,
              targetFolderId: folder.id
            });
            await loadAndRender();
          } else if (currentDrag.kind === "folder") {
            if (currentDrag.id === folder.id) return; // noop
            await window.api.store.moveFolder({
              folderId: currentDrag.id,
              targetFolderId: folder.id
            });
            await loadAndRender();
          }
        } catch (err) {
          console.error(err);
          await showAlert({ title: "Verschieben fehlgeschlagen", message: String(err?.message || err) });
        } finally {
          currentDrag = null;
        }
      });

      // Verbindungs-Items
      const itemsWrap = el("div", { class: "tree-items" });
      (folder.items || []).forEach(conn => {
        const label = (conn.type === "web") ? `🌐 ${conn.name}` : conn.name;
        const item = el("div", {
          class: "tree-item",
          dataset: { id: conn.id, type: conn.type || "rdp" },
          style: `padding-left:${34 + (depth - 1) * INDENT_PX}px`
        }, label);

        // Auswahl
        item.addEventListener("click", () => {
          clearSelection();
          item.classList.add("active");
          selectedFolderId = folder.id;
          selectedConnId   = conn.id;
        });

        // Doppelklick -> Start
        item.addEventListener("dblclick", async () => {
          try {
            if ((conn.type || "rdp") === "web" && conn.url) {
              await openWebTab({ id: conn.id, name: conn.name, url: conn.url });
              return;
            }
            // RDP
            const prof = conn.profile || {};
            if (window.api?.launchRdpWithProfile) {
              await window.api.launchRdpWithProfile({
                host: conn.host,
                port: conn.port ? Number(conn.port) : undefined,
                fullscreen: prof.fullscreen !== false,
                multimon:   !!prof.multimon,
                colorDepth: prof.colorDepth ?? 32,
                width:      prof.width,
                height:     prof.height,
                admin:      !!prof.admin,
                username:   prof.username,
                clipboard:  prof.clipboard !== false,
                printers:   !!prof.printers,
                drives:     prof.drives ?? "",
                gateway: prof.gateway?.host ? { host: prof.gateway.host, usage: prof.gateway.usage ?? 2 } : undefined,
              });
            } else {
              await window.api.launchRdp({
                host: conn.host,
                port: conn.port ? Number(conn.port) : undefined,
                fullscreen: true
              });
            }
          } catch (err) {
            console.error(err);
            await showAlert({ title: "Start-Fehler", message: String(err?.message || err) });
          }
        });

        // ----- DnD: Verbindung als Draggable -----
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", (e) => {
          currentDrag = { kind: "connection", id: conn.id, folderId: folder.id };
          e.dataTransfer.effectAllowed = "move";
          item.classList.add("dragging");
        });
        item.addEventListener("dragend", () => {
          currentDrag = null;
          item.classList.remove("dragging");
        });

        itemsWrap.appendChild(item);
      });

      const folderEl = el("div", { class: "tree-folder" + (isOpen ? " open" : "") }, header, itemsWrap);
      treeContainer.appendChild(folderEl);

      // Kinder-Ordner (rekursiv)
      if (isOpen) (folder.folders || []).forEach(child => renderFolder(child, depth + 1));
    }

    folders.forEach(f => renderFolder(f, 1));
  }

  /* =========================
     Laden & Rendern
  ========================== */
  async function loadAndRender() {
    try {
      model = await window.api.store.load();
      if (!selectedFolderId && model?.folders?.length) {
        selectedFolderId = model.folders[0].id;
      }
      render();
    } catch (err) {
      console.error("Store konnte nicht geladen werden:", err);
      model = { folders: [] };
      render();
    }
  }

  /* =========================
     Kontextmenü
  ========================== */
  let ctxMenuEl = null;

  function hideContextMenu() {
    if (ctxMenuEl) ctxMenuEl.classList.add("hidden");
  }

  function showContextMenu(x, y, context) {
    if (!ctxMenuEl) {
      ctxMenuEl = document.createElement("div");
      ctxMenuEl.className = "context-menu hidden";
      document.body.appendChild(ctxMenuEl);

      window.addEventListener("click", hideContextMenu);
      window.addEventListener("mousedown", (e) => {
        if (!ctxMenuEl.contains(e.target)) hideContextMenu();
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") hideContextMenu();
      });
      ctxMenuEl.addEventListener("contextmenu", (e) => e.preventDefault());
    }

    ctxMenuEl.innerHTML = "";

    const addItem = (label, onClick) => {
      const mi = document.createElement("div");
      mi.className = "menu-item";
      mi.textContent = label;
      mi.addEventListener("click", async () => {
        hideContextMenu();
        try { await onClick(); }
        catch (err) {
          console.error(err);
          await showAlert({ title: "Fehler", message: String(err?.message || err) });
        }
      });
      ctxMenuEl.appendChild(mi);
    };

    const addDivider = () => {
      const d = document.createElement("div");
      d.className = "divider";
      ctxMenuEl.appendChild(d);
    };

    const ctxType = context?.type || "blank";
    const MAX_DEPTH = 4;

    // Neu im blank-/folder-Kontext
    if (ctxType === "blank" || ctxType === "folder") {
      addItem("Neuer Ordner…", async () => {
        const name = await showPrompt({
          title: "Neuer Ordner",
          label: "Ordner-Name",
          placeholder: "z. B. Produktion"
        });
        if (!name) return;
        await window.api.store.createFolder({ name }); // Top-Level
        await loadAndRender();
      });

      addItem("Neue Verbindung (RDP)…", async () => {
        let targetFolderId = context?.folderId || selectedFolderId || (model?.folders?.[0]?.id);

        if (!targetFolderId) {
          const createFirst = await showConfirm({
            title: "Kein Ordner vorhanden",
            message: "Es existiert noch kein Ordner. Jetzt einen anlegen?"
          });
          if (!createFirst) return;

          const firstName = await showPrompt({ title: "Neuer Ordner", label: "Ordner-Name" });
          if (!firstName) return;

          await window.api.store.createFolder({ name: firstName });
          const fresh = await window.api.store.load();
          model = fresh;
          targetFolderId = fresh.folders[0].id;
        }

        const result = await showConnectionForm({
          title: "Neue RDP-Verbindung",
          defaults: { name: "", host: "", port: "3389", profile: { fullscreen: true, clipboard: true, colorDepth: 32 } }
        });
        if (!result) return;

        await window.api.store.createConnection({
          folderId: targetFolderId,
          name: result.name,
          host: result.host,
          port: result.port
        });

        // Profil direkt anhängen
        const latest = await window.api.store.load();
        const folder = (latest.folders || []).find(f => f.id === targetFolderId);
        if (folder && Array.isArray(folder.items)) {
          const just = [...folder.items].reverse().find(c => c.host === result.host && c.name === result.name);
          if (just) {
            await window.api.store.updateConnection({
              folderId: targetFolderId,
              connectionId: just.id,
              profile: result.profile || {}
            });
          }
        }

        await loadAndRender();
      });

      addItem("Neue Website…", async () => {
        let targetFolderId = context?.folderId || selectedFolderId || (model?.folders?.[0]?.id);

        if (!targetFolderId) {
          const ok = await showConfirm({
            title: "Kein Ordner vorhanden",
            message: "Es existiert noch kein Ordner. Jetzt einen anlegen?"
          });
          if (!ok) return;

          const first = await showPrompt({ title: "Neuer Ordner", label: "Ordner-Name" });
          if (!first) return;

          await window.api.store.createFolder({ name: first });
          const fresh = await window.api.store.load(); model = fresh;
          targetFolderId = fresh.folders[0].id;
        }

        const res = await showWebsiteForm({ title: "Neue Website" });
        if (!res) return;
        await window.api.store.createWebConnection({ folderId: targetFolderId, name: res.name, url: res.url });
        await loadAndRender();
      });
    }

    // Ordner-Kontext
    if (ctxType === "folder" && context.folderId) {
      addDivider();

      if ((context.depth || 1) < MAX_DEPTH) {
        addItem("Neuer Unterordner…", async () => {
          const name = await showPrompt({
            title: "Neuer Unterordner",
            label: "Ordner-Name",
            placeholder: "z. B. Standort A"
          });
          if (!name) return;
          await window.api.store.createFolder({ name, parentId: context.folderId });
          await loadAndRender();
        });
      }

      addItem("Ordner umbenennen…", async () => {
        const f = (model?.folders || []).find(x => x.id === context.folderId) || {};
        const current = f?.name || "";
        const nextName = await showPrompt({
          title: "Ordner umbenennen",
          label: "Neuer Ordnername",
          defaultValue: current
        });
        if (!nextName || nextName.trim() === current) return;
        await window.api.store.renameFolder({ folderId: context.folderId, name: nextName.trim() });
        await loadAndRender();
      });

      addItem("Ordner löschen…", async () => {
        const f = (model?.folders || []).find(x => x.id === context.folderId);
        const count = (f?.items || []).length;
        const ok = await showConfirm({
          title: "Ordner löschen",
          message: count > 0
            ? `Der Ordner enthält ${count} Verbindung(en).\nWirklich den gesamten Ordner inkl. Inhalte löschen?`
            : "Diesen leeren Ordner wirklich löschen?"
        });
        if (!ok) return;
        await window.api.store.deleteFolder({ folderId: context.folderId });
        if (selectedFolderId === context.folderId) selectedFolderId = null;
        selectedConnId = null;
        await loadAndRender();
      });
    }

    // Verbindung-Kontext (RDP/Web unterscheiden)
    if (ctxType === "connection" && context.folderId && context.connectionId) {
      addDivider();

      function findInTree(folders, folderId, connectionId) {
        for (const fd of folders) {
          if (fd.id === folderId) {
            const c = (fd.items || []).find(x => x.id === connectionId);
            if (c) return c;
          }
          const r = findInTree(fd.folders || [], folderId, connectionId);
          if (r) return r;
        }
        return null;
      }
      const entry = findInTree(model?.folders || [], context.folderId, context.connectionId);

      if ((entry?.type || "rdp") === "web") {
        addItem("Website bearbeiten…", async () => {
          const res = await showWebsiteForm({ title: "Website bearbeiten", defaults: { name: entry.name, url: entry.url } });
          if (!res) return;
          await window.api.store.updateWebConnection({
            folderId: context.folderId,
            connectionId: context.connectionId,
            name: res.name || entry.name,
            url: res.url
          });
          await loadAndRender();
        });
      } else {
        addItem("Verbindung bearbeiten…", async () => {
          const result = await showConnectionForm({
            title: "Verbindung bearbeiten",
            defaults: { name: entry.name, host: entry.host, port: entry.port, profile: entry.profile || {} }
          });
          if (!result) return;

          await window.api.store.updateConnection({
            folderId: context.folderId,
            connectionId: context.connectionId,
            name: result.name,
            host: result.host,
            port: result.port ?? "",
            profile: result.profile || {}
          });
          await loadAndRender();
        });
      }

      addItem("Verbindung löschen…", async () => {
        const ok = await showConfirm({
          title: "Verbindung löschen",
          message: "Diese Verbindung wirklich löschen?"
        });
        if (!ok) return;

        await window.api.store.deleteConnection({
          folderId: context.folderId,
          connectionId: context.connectionId
        });

        if (selectedConnId === context.connectionId) selectedConnId = null;
        await loadAndRender();
      });
    }

    // Positionieren
    const { innerWidth, innerHeight } = window;
    const menuRect = { w: 260, h: 200 };
    const left = Math.min(x, innerWidth - menuRect.w - 4);
    const top  = Math.min(y, innerHeight - menuRect.h - 4);
    ctxMenuEl.style.left = left + "px";
    ctxMenuEl.style.top  = top  + "px";
    ctxMenuEl.classList.remove("hidden");
  }

  // Kontextmenü-Hook auf der gesamten Sidebar
  const ctxTarget = sidebarEl || treeContainer;
  if (ctxTarget) {
    ctxTarget.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      const connItem = e.target.closest(".tree-item");
      if (connItem) {
        const folderEl   = connItem.closest(".tree-folder");
        const folderHead = folderEl.querySelector(".tree-folder-header");
        const folderId   = folderHead?.dataset?.id;
        return showContextMenu(e.clientX, e.clientY, {
          type: "connection",
          folderId,
          connectionId: connItem.dataset.id
        });
      }

      const folderHeader = e.target.closest(".tree-folder-header");
      if (folderHeader) {
        const depth = Number(folderHeader.dataset.depth || "1");
        return showContextMenu(e.clientX, e.clientY, {
          type: "folder",
          folderId: folderHeader.dataset.id,
          depth
        });
      }

      showContextMenu(e.clientX, e.clientY, { type: "blank" });
    });
  } else {
    console.warn("Sidebar/Tree nicht gefunden!");
  }

  /* =========================
     DnD: Ordner auf freie Sidebar -> Top-Level
  ========================== */
  if (sidebarEl) {
    sidebarEl.addEventListener("dragover", (e) => {
      if (currentDrag?.kind === "folder" && !e.target.closest(".tree-folder-header")) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }
    });

    sidebarEl.addEventListener("drop", async (e) => {
      if (currentDrag?.kind !== "folder") return;
      if (e.target.closest(".tree-folder-header")) return;

      try {
        await window.api.store.moveFolder({ folderId: currentDrag.id, targetFolderId: null });
        await loadAndRender();
      } catch (err) {
        console.error(err);
        await showAlert({ title: "Verschieben fehlgeschlagen", message: String(err?.message || err) });
      } finally {
        currentDrag = null;
      }
    });
  }

  // Start
  loadAndRender();
});