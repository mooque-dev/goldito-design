/* A strip at the top of each page from one day of work, so you can walk them in order (‹ previous · next ›)
   or jump to any of them, and always get back to that day's doc. Add a page: list it in SERIES and load
   this script on it. Text follows the site's language (html[data-lang]). */
(() => {
  const SERIES = {
    day: ["Oct 25", "10월 25일"],
    doc: "update-2026-10-25.html",
    pages: [
      ["update-2026-10-25.html", "The day's doc", "오늘 문서"],
      ["feed-trial.html", "Moments trial", "모먼츠 시안"],
      ["diary-compare.html", "Diary views", "다이어리 보기"],
      ["tone-trial.html", "Pet tone", "펫 톤"],
      ["words-trial.html", "Playful words", "재치 있는 말"],
      ["delights.html", "Little delights", "작은 즐거움"],
      ["intro-trial.html", "Intro", "인트로"],
      ["ux-audit.html", "UX audit", "UX 점검"],
      ["ux-calls.html", "Pick the UX calls", "UX 결정 고르기"],
    ],
  };
  const file = location.pathname.split("/").pop() || "index.html";
  const i = SERIES.pages.findIndex((p) => p[0] === file);
  if (i < 0) return;
  const css = `.series{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:10px 12px;border-radius:16px;background:var(--color-surface);border:1px solid var(--color-border);font:600 13.5px var(--font-ui)}
.series .sd{color:var(--color-text-muted);font-weight:700;white-space:nowrap}
.series .sl{display:flex;flex-wrap:wrap;gap:6px;flex:1;min-width:0}
.series a{display:inline-flex;align-items:center;gap:5px;min-height:36px;padding:0 12px;border-radius:999px;color:var(--color-text);text-decoration:none;border:1.5px solid var(--color-border)}
.series a[aria-current=page]{background:var(--color-accent);border-color:var(--color-primary)}
.series .pn{display:flex;gap:6px;margin-left:auto}
.series .pn a{min-height:44px;font-weight:700}
.series .pn>span{display:inline-flex;align-items:center;min-height:44px;padding:0 12px;border-radius:999px;color:var(--color-text-muted);border:1.5px dashed var(--color-border)}
.series a:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px}
@media (max-width:640px){.series .pn{margin-left:0;width:100%}.series .pn a,.series .pn>span{flex:1;justify-content:center}}`;
  const t = (en, ko) => `<span class="en">${en}</span><span class="ko">${ko}</span>`;
  const prev = SERIES.pages[i - 1], next = SERIES.pages[i + 1];
  const nav = document.createElement("nav");
  nav.className = "series";
  nav.setAttribute("aria-label", "Pages from " + SERIES.day[0]);
  nav.innerHTML = `<style>${css}</style><span class="sd">${t(SERIES.day[0], SERIES.day[1])} · ${i + 1}/${SERIES.pages.length}</span>
    <span class="sl">${SERIES.pages.map(([f, en, ko]) => `<a href="${f}"${f === file ? ' aria-current="page"' : ""}>${t(en, ko)}</a>`).join("")}</span>
    <span class="pn">${prev ? `<a href="${prev[0]}">‹ ${t(prev[1], prev[2])}</a>` : `<span>${t("First", "처음")}</span>`}${next ? `<a href="${next[0]}">${t(next[1], next[2])} ›</a>` : `<a href="${SERIES.doc}">${t("Back to the doc", "문서로")} ›</a>`}</span>`;
  const put = () => { const host = document.querySelector(".wrap, main"); if (host) host.insertBefore(nav, host.firstChild); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", put); else put();
})();
