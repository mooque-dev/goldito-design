/* Ticket workbench kit, shared by every ticket-<n>.html (the #147 pattern):
   - WB.ic(name): Lucide outlines (ISC), inline
   - WB.decisions({ Q, DECIDED, onChange, ticket }): the Decisions panel. Each answer is one document in the artifact's
     database (`decisions/<question id>`, plus `decisions/notes`), read back by Claude with ArtifactData. DECIDED is the
     built-in copy (my recommendations, or Mook's answers once they're in); saved answers override it as they load.
     onChange(dec) redraws the decided frames; ticket(dec) returns window.__ticket for the Figma plugin's capture.
   - WB.copy(button, text): copy with a select-the-text fallback. */
(() => {
  const $ = (id) => document.getElementById(id);
  const P = {
    back: '<path d="m15 18-6-6 6-6"/>',
    next: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    cal: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    star: '<path d="M11.5 2.3a.5.5 0 0 1 .9 0l2.3 4.7a2 2 0 0 0 1.5 1.1l5.2.8a.5.5 0 0 1 .3.9l-3.8 3.6a2 2 0 0 0-.6 1.8l.9 5.2a.5.5 0 0 1-.8.6l-4.6-2.5a2 2 0 0 0-1.9 0l-4.6 2.5a.5.5 0 0 1-.8-.6l.9-5.2a2 2 0 0 0-.6-1.8L1.8 9.8a.5.5 0 0 1 .3-.9l5.2-.8a2 2 0 0 0 1.5-1.1z"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    img: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    cam: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    git: '<circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M6 9v12"/>',
  };
  const ic = (n, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
  const when = (t) => { try { return new Date(t).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }); } catch (e) { return ""; } };
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  function copy(btn, text) {
    const label = btn.textContent;
    const done = () => { btn.textContent = "Copied"; setTimeout(() => (btn.textContent = label), 1400); };
    const fallback = () => { const box = btn.closest(".box, .q, section").querySelector(".quote"); if (!box) return; const r = document.createRange(); r.selectNodeContents(box); getSelection().removeAllRanges(); getSelection().addRange(r); };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
  }

  function decisions({ Q, DECIDED, onChange, ticket }) {
    const dec = { ...DECIDED }, saved = {};
    let db = null, me = null, canWrite = false;
    const apply = () => {
      for (const k of Object.keys(DECIDED)) if (saved[k] && saved[k].value) dec[k] = saved[k].value;
      onChange(dec);
      window.__ticket = ticket(dec, Q.map(([id, q, , opts]) => ({ q, a: (opts.find(([v]) => v === dec[id]) || [, "—"])[1] })));
    };
    function draw() {
      $("dec").innerHTML = Q.map(([id, q, why, opts, rec]) => {
        const cur = saved[id];
        return `<div class="q" data-q="${id}"><div class="top"><b class="qt">${q}</b><span class="saved ${cur ? "mine" : ""}">${cur ? `Saved · ${when(cur.at)}` : "Not decided"}</span></div>
          <span class="why">${why}</span><div class="seg" role="group" aria-label="${esc(q)}">${opts.map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${String(cur ? cur.value === v : false)}" ${canWrite ? "" : "disabled"}>${l}${v === rec ? " ✓" : ""}</button>`).join("")}</div></div>`;
      }).join("");
      if (saved.notes && document.activeElement !== $("notes")) { $("notes").value = saved.notes.text || ""; $("notesSaved").textContent = `Saved · ${when(saved.notes.at)}`; }
      $("notes").disabled = !canWrite; $("saveNotes").disabled = !canWrite;
    }
    $("dec").addEventListener("click", async (e) => {
      const b = e.target.closest("button"), q = e.target.closest(".q"); if (!b || !q || !db || !canWrite) return;
      const id = q.dataset.q, body = { value: b.dataset.v, at: Date.now(), by: me };
      saved[id] = body; draw(); apply();
      try { await db.doc(`decisions/${id}`).set(body); } catch (err) { $("dbstate").textContent = "Couldn't save that answer. Try again in a moment."; }
    });
    $("saveNotes").addEventListener("click", async () => {
      if (!db || !canWrite) return;
      const body = { text: $("notes").value.slice(0, 4000), at: Date.now(), by: me };
      try { await db.doc("decisions/notes").set(body); saved.notes = body; $("notesSaved").textContent = `Saved · ${when(body.at)}`; }
      catch (err) { $("notesSaved").textContent = "Couldn't save. Try again."; }
    });
    draw(); apply();
    (async () => {
      const c = window.claude;
      if (!c || !c.use) { $("dbstate").textContent = "Answers save only in the claude.ai artifact. Here you can still try the options above."; return; }
      db = await c.use("db"); const user = await c.use("user");
      if (!db) { $("dbstate").textContent = "Saving isn't available in this view. Open the artifact signed in to answer."; return; }
      try { me = user ? await user.id() : null; } catch (e) {}
      canWrite = true; $("dbstate").textContent = "Answers save as you click, for both of us.";
      db.collection("decisions").onSnapshot((snap) => { snap.docs.forEach((d) => { if (d.exists) saved[d.id] = d.data(); }); draw(); apply(); },
        () => { $("dbstate").textContent = "Lost the connection to saved answers. Reload to try again."; });
      draw();
    })();
    return dec;
  }

  // Spec rows for the Figma plugin: cell text with <code> kept as `backticks`; a row's data-comp names the ticket
  // component it describes (the plugin puts the row on that component's description and Dev Mode annotation).
  const cellText = (td) => { const c = td.cloneNode(true); c.querySelectorAll("code").forEach((k) => k.replaceWith("`" + k.textContent + "`")); return c.textContent.trim().replace(/\s+/g, " "); };
  const specRows = (sel = "[data-spec] tbody tr") => [...document.querySelectorAll(sel)].map((tr) => [...tr.children].map(cellText));
  const specLinks = (sel = "[data-spec] tbody tr") => [...document.querySelectorAll(sel)].map((tr) => tr.dataset.comp || null);
  window.WB = { $, ic, when, esc, copy, decisions, specRows, specLinks };
})();
