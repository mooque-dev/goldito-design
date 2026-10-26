/* One site bar for every page of the design site: brand · page tabs · search · guide (?) · language.
   Search: the button, "/" or ⌘K / Ctrl+K opens it; results come from search-index.js (built by search-index.mjs).
   Include with <script src="nav.js" defer></script> (or ../nav.js); links resolve relative to this file.
   Settings (the gear button): language EN / 한국어, appearance System / Light / Dark, motion System / Reduced, remembered per
   browser and shared with frames on the same site. Pages mark text with class "en" / "ko", or listen for the
   "goldito-lang" event and read document.documentElement.dataset.lang. Appearance sets html[data-theme] (no attribute =
   follow the system), which ds.css and the pages' own dark blocks already read; motion sets html[data-motion="reduce"].
   Tooltips: any element with data-tip="…" (and optional data-tip-ko="…") gets a small label on hover and keyboard focus. */
(() => {
  const base = new URL(".", document.currentScript.src);
  const root = document.documentElement;
  const pref = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  const store = { get: () => pref.get("goldito-lang"), set: (v) => pref.set("goldito-lang", v) };
  // Appearance and motion apply before the bar is drawn, so a chosen theme flashes as little as possible.
  const applyTheme = (t) => { if (t === "light" || t === "dark") root.dataset.theme = t; else delete root.dataset.theme; };
  const applyMotion = (m) => { if (m === "reduce") root.dataset.motion = "reduce"; else delete root.dataset.motion; };
  applyTheme(pref.get("goldito-theme")); applyMotion(pref.get("goldito-motion"));
  root.dataset.lang = store.get() === "ko" ? "ko" : "en";
  root.lang = root.dataset.lang;
  const ko = () => root.dataset.lang === "ko";

  const C = (name, fallback) => `var(--color-${name},${fallback})`;
  const st = document.createElement("style");
  st.id = "site-nav-css";
  st.textContent = `
    html[data-lang="ko"] .en{display:none !important} html:not([data-lang="ko"]) .ko{display:none !important}
    .site-nav{box-sizing:border-box;position:sticky;top:env(safe-area-inset-top,0px);z-index:50;flex:0 0 auto;display:grid;
      grid-template-columns:1fr auto 1fr;align-items:center;gap:1rem;padding:.5rem clamp(1rem,3vw,2rem);
      background:${C("surface", "var(--surface,Canvas)")};border-bottom:1px solid ${C("border", "var(--tint-border,rgba(127,127,127,.25))")};font:500 .9375rem/1.2 var(--font-ui,var(--font,Inter,-apple-system,system-ui,sans-serif))}
    .site-nav a{text-decoration:none;color:inherit}
    .site-brand{justify-self:start;display:inline-flex;align-items:center;gap:.5rem;font-weight:700;color:${C("text", "var(--text,CanvasText)")};white-space:nowrap}
    .site-brand i{font-style:normal;display:inline-grid;place-items:center;width:28px;height:28px;border-radius:8px;background:${C("primary", "var(--primary,#2D6A4F)")};color:#fff;font-size:.875rem}
    .site-tabs{display:inline-flex;gap:4px;padding:4px;border-radius:999px;background:${C("track", "rgba(127,127,127,.15)")};max-width:100%;overflow-x:auto;scrollbar-width:none}
    .site-tabs a{display:inline-flex;align-items:center;min-height:40px;padding:0 1rem;flex:0 0 auto;border-radius:999px;color:${C("text-muted", "var(--text-muted,GrayText)")};font-weight:600;white-space:nowrap}
    .site-tabs a:hover{color:${C("text", "var(--text,CanvasText)")}}
    .site-tabs a[aria-current="page"]{background:${C("surface", "var(--surface,Canvas)")};color:${C("text", "var(--text,CanvasText)")};box-shadow:0 0 0 1px ${C("border", "var(--tint-border,rgba(127,127,127,.25))")}}
    .site-end{justify-self:end;display:inline-flex;align-items:center;gap:.5rem}
    .site-help{width:40px;height:40px;border-radius:50%;border:1px solid ${C("border-strong", "rgba(127,127,127,.5)")};background:none;font:700 1rem/1 inherit;color:${C("text", "var(--text,CanvasText)")};cursor:pointer}
    .site-help[aria-expanded="true"]{background:${C("primary", "#2D6A4F")};color:${C("primary-text", "#fff")};border-color:transparent}
    .site-set-btn{display:inline-flex;align-items:center;gap:.375rem;height:40px;min-width:44px;padding:0 .75rem 0 .625rem;border-radius:999px;border:1px solid ${C("border-strong", "rgba(127,127,127,.5)")};background:none;color:${C("text", "var(--text,CanvasText)")};font:inherit;font-size:.8125rem;font-weight:700;cursor:pointer}
    .site-set-btn svg{width:18px;height:18px;flex:0 0 auto}
    .site-set-btn[aria-expanded="true"]{background:${C("primary", "#2D6A4F")};color:${C("primary-text", "#fff")};border-color:transparent}
    .site-settings{position:fixed;z-index:61;top:calc(env(safe-area-inset-top,0px) + var(--site-nav-h,60px) + 8px);right:clamp(.75rem,3vw,2rem);width:min(20rem,calc(100vw - 1.5rem));
      background:${C("surface", "Canvas")};color:${C("text", "CanvasText")};border:1px solid ${C("border", "rgba(127,127,127,.3)")};border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.18);padding:1rem 1.125rem;font:400 .875rem/1.5 var(--font-ui,system-ui,sans-serif);display:flex;flex-direction:column;gap:.875rem}
    .site-settings[hidden]{display:none}
    .site-settings h2{margin:0;font:600 1.125rem/1.2 var(--font-display,inherit)}
    .site-settings .grp{display:flex;flex-direction:column;gap:.375rem}
    .site-settings .grp>span{font-size:.6875rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C("text-muted", "GrayText")}}
    .site-seg{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:2px;padding:3px;border-radius:999px;border:1px solid ${C("border-strong", "rgba(127,127,127,.5)")}}
    .site-seg button{border:0;background:none;min-height:38px;padding:0 .5rem;border-radius:999px;font:inherit;font-weight:600;font-size:.8125rem;color:${C("text-muted", "var(--text-muted,GrayText)")};cursor:pointer;white-space:nowrap}
    .site-seg button[aria-checked="true"]{background:${C("primary", "var(--primary,#2D6A4F)")};color:${C("primary-text", "var(--primary-foreground,#fff)")}}
    .site-settings small{color:${C("text-muted", "GrayText")};font-size:.75rem}
    .site-settings .x{align-self:flex-end;margin-top:-.25rem;border:0;background:none;color:${C("text-muted", "GrayText")};font:inherit;font-weight:600;cursor:pointer;min-height:32px}
    .upd-nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:.5rem;font:500 .875rem/1.2 var(--font-ui,system-ui,sans-serif)}
    .upd-nav a{display:inline-flex;flex-direction:column;justify-content:center;min-height:44px;padding:.25rem .875rem;border-radius:12px;border:1px solid ${C("border", "rgba(127,127,127,.3)")};background:${C("surface", "Canvas")};color:${C("text", "CanvasText")};text-decoration:none}
    .upd-nav a:hover{border-color:${C("border-strong", "rgba(127,127,127,.5)")}}
    .upd-nav a small{font-size:.75rem;color:${C("text-muted", "GrayText")};font-weight:600}
    .upd-nav a b{font-weight:700}
    .upd-nav [rel="prev"]{justify-self:start} .upd-nav [rel="next"]{justify-self:end;text-align:right}
    .upd-nav .all{justify-self:center;flex-direction:row;align-items:center;border-radius:999px;font-weight:700;color:${C("primary", "#2D6A4F")}}
    .upd-nav .latest{justify-self:end;font-size:.75rem;font-weight:700;border-radius:999px;padding:.25rem .75rem;background:${C("accent", "#D8F3DC")};color:${C("primary", "#2D6A4F")}}
    main>.lede,.wrap>.lede{margin:0;color:${C("text-muted", "GrayText")}}
    html[data-motion="reduce"] *,html[data-motion="reduce"] *::before,html[data-motion="reduce"] *::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important;scroll-behavior:auto !important}
    .site-nav :focus-visible,.site-guide :focus-visible{outline:2px solid ${C("primary", "var(--primary,#2D6A4F)")};outline-offset:2px}
    /* Guide panel */
    .site-guide{position:fixed;z-index:60;top:calc(env(safe-area-inset-top,0px) + var(--site-nav-h,60px) + 8px);right:clamp(.75rem,3vw,2rem);width:min(24rem,calc(100vw - 1.5rem));max-height:calc(100dvh - var(--site-nav-h,60px) - 24px);overflow:auto;
      background:${C("surface", "Canvas")};color:${C("text", "CanvasText")};border:1px solid ${C("border", "rgba(127,127,127,.3)")};border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.18);padding:1rem 1.125rem;font:400 .875rem/1.5 var(--font-ui,system-ui,sans-serif);display:flex;flex-direction:column;gap:.75rem}
    .site-guide[hidden]{display:none}
    .site-guide h2{margin:0;font:600 1.125rem/1.2 var(--font-display,inherit)}
    .site-guide h3{margin:0;font-size:.6875rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C("text-muted", "GrayText")}}
    .site-guide p{margin:0}
    .site-guide ol,.site-guide ul{margin:0;padding-left:1.125rem;display:flex;flex-direction:column;gap:.375rem}
    .site-guide a{color:${C("primary", "#2D6A4F")};font-weight:600}
    .site-guide .site-pages{list-style:none;padding:0;gap:.25rem}
    .site-guide .site-pages a{display:flex;flex-direction:column;padding:.375rem .5rem;border-radius:10px;text-decoration:none;color:inherit;font-weight:400}
    .site-guide .site-pages a:hover{background:${C("track", "rgba(127,127,127,.12)")}}
    .site-guide .site-pages a[aria-current="page"]{background:${C("accent", "rgba(45,106,79,.12)")}}
    .site-guide .site-pages b{font-weight:700}
    .site-guide .site-pages small{color:${C("text-muted", "GrayText")};font-size:.8125rem}
    .site-guide kbd{font:600 .6875rem/1 ui-monospace,monospace;border:1px solid ${C("border-strong", "#999")};border-bottom-width:2px;border-radius:4px;padding:1px 4px}
    .site-guide .x{align-self:flex-end;margin-top:-.25rem;border:0;background:none;color:${C("text-muted", "GrayText")};font:inherit;font-weight:600;cursor:pointer;min-height:32px}
    /* Search */
    .site-search-btn{display:inline-flex;align-items:center;gap:.5rem;height:40px;padding:0 .75rem 0 .625rem;border-radius:999px;border:1px solid ${C("border-strong", "rgba(127,127,127,.5)")};background:none;color:${C("text", "var(--text,CanvasText)")};font:inherit;font-size:.875rem;cursor:pointer}
    .site-search-btn svg{width:18px;height:18px;flex:0 0 auto}
    .site-search-btn kbd{font:600 .6875rem/1 ui-monospace,monospace;border:1px solid ${C("border-strong", "#999")};border-radius:4px;padding:2px 5px}
    .site-search{position:fixed;inset:0;z-index:80;background:rgba(10,12,10,.45);display:flex;justify-content:center;align-items:flex-start;padding:calc(env(safe-area-inset-top,0px) + 8vh) 1rem 1rem}
    .site-search[hidden]{display:none}
    .site-search li.cat{list-style:none;margin:.75rem .25rem .25rem;font-size:.6875rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C("text-muted", "GrayText")}}
    .site-search li.pick{display:inline-block;margin:.125rem}
    .site-search li.pick a{display:inline-flex!important;flex-direction:row!important;min-height:36px;align-items:center!important;justify-content:center;padding:0 .875rem!important;gap:0!important;border-radius:999px;border:1.5px solid ${C("border-strong", "rgba(127,127,127,.5)")}}
    .site-search li.pick[aria-selected="true"] a{background:${C("accent", "#D8F3DC")};border:2px solid ${C("primary", "#1B4332")}}
    .site-search .box{width:min(40rem,100%);max-height:78vh;display:flex;flex-direction:column;background:${C("surface", "Canvas")};color:${C("text", "CanvasText")};border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.3);overflow:hidden;font:400 .9375rem/1.45 var(--font-ui,system-ui,sans-serif)}
    .site-search .field{display:flex;align-items:center;gap:.625rem;padding:.875rem 1rem;border-bottom:1px solid ${C("border", "rgba(127,127,127,.3)")}}
    .site-search .field svg{width:20px;height:20px;color:${C("text-muted", "GrayText")};flex:0 0 auto}
    .site-search input{flex:1;min-width:0;border:0;outline:0;background:none;color:inherit;font:inherit;font-size:1.0625rem}
    .site-search .esc{border:1px solid ${C("border-strong", "#999")};border-radius:6px;background:none;color:${C("text-muted", "GrayText")};font:600 .75rem/1 inherit;padding:4px 7px;cursor:pointer}
    .site-search ul{list-style:none;margin:0;padding:.375rem;overflow:auto}
    .site-search li a{display:flex;flex-direction:column;gap:.125rem;padding:.625rem .75rem;border-radius:12px;text-decoration:none;color:inherit}
    .site-search li[aria-selected="true"] a{background:${C("track", "rgba(127,127,127,.14)")}}
    .site-search li small{font-size:.6875rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${C("text-muted", "GrayText")}}
    .site-search li b{font-weight:700}
    .site-search li span{font-size:.8125rem;color:${C("text-muted", "GrayText")};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .site-search mark{background:${C("warning-surface", "#FFF3C4")};color:inherit;border-radius:3px;padding:0 1px}
    .site-search .empty{padding:1rem 1.125rem;color:${C("text-muted", "GrayText")};font-size:.875rem}
    .site-search .hint{display:flex;gap:1rem;padding:.5rem 1rem;border-top:1px solid ${C("border", "rgba(127,127,127,.3)")};font-size:.75rem;color:${C("text-muted", "GrayText")}}
    @media (max-width:900px){.site-search-btn .lbl,.site-search-btn kbd{display:none}.site-search-btn{width:40px;padding:0;justify-content:center}}
    /* Tooltip */
    .site-tip{position:fixed;z-index:70;max-width:16rem;padding:.4rem .6rem;border-radius:8px;background:${C("text", "#1A1A1A")};color:${C("surface", "#fff")};font:500 .8125rem/1.35 var(--font-ui,system-ui,sans-serif);pointer-events:none;box-shadow:0 4px 14px rgba(0,0,0,.18)}
    [data-tip]{cursor:help}
    a[data-tip],button[data-tip],[role="button"][data-tip],label[data-tip]{cursor:pointer}
    @media (max-width:900px){.site-brand b{display:none}}
    @media (max-width:720px){.site-nav{grid-template-columns:auto 1fr;row-gap:.5rem}.site-end{grid-column:2;grid-row:1}.site-tabs{grid-column:1/-1;grid-row:2;justify-self:stretch;display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}
      .site-tabs a{padding:0 .25rem;justify-content:center;text-align:center;font-size:.8125rem;line-height:1.15;min-height:44px;white-space:normal}.site-set-btn .lbl{display:none}}`;
  document.head.appendChild(st);

  // ---------- tooltips (all pages, including frames) ----------
  let tip = null, owner = null;
  const hideTip = () => { if (tip) tip.remove(); tip = null; if (owner) owner.removeAttribute("aria-describedby"); owner = null; };
  const showTip = (el) => {
    const text = (ko() && el.dataset.tipKo) || el.dataset.tip; if (!text) return;
    hideTip(); owner = el;
    tip = document.createElement("div"); tip.className = "site-tip"; tip.id = "site-tip"; tip.setAttribute("role", "tooltip"); tip.textContent = text;
    document.body.appendChild(tip); el.setAttribute("aria-describedby", "site-tip");
    const r = el.getBoundingClientRect(), t = tip.getBoundingClientRect();
    const top = r.top - t.height - 8 > 8 ? r.top - t.height - 8 : r.bottom + 8;
    tip.style.top = `${top}px`; tip.style.left = `${Math.max(8, Math.min(innerWidth - t.width - 8, r.left + r.width / 2 - t.width / 2))}px`;
  };
  document.addEventListener("pointerover", (e) => { const el = e.target.closest && e.target.closest("[data-tip]"); if (el && el !== owner) showTip(el); else if (!el && owner) hideTip(); });
  document.addEventListener("focusin", (e) => { const el = e.target.closest && e.target.closest("[data-tip]"); if (el) showTip(el); });
  document.addEventListener("focusout", hideTip);
  addEventListener("scroll", hideTip, true);
  addEventListener("keydown", (e) => { if (e.key === "Escape") hideTip(); });

  // Inside one of our own frames (the Prototype viewer, the Overview's look previews): no bar.
  // Inside claude.ai (an artifact is shown in a cross-origin frame), the bar still shows.
  let ours = false;
  try { ours = window.parent !== window && !!window.parent.document.querySelector('script[src*="nav.js"]'); } catch (e) { ours = false; }
  if (ours) return;


  // Pages outside the tabs, grouped for the empty search and the guide (and searchable by title and line).
  const PRESETS = [
    ["Design system", "디자인 시스템", [
      ["kit.html", "Design kit", "디자인 키트", "Every component, live, with states and code", "모든 컴포넌트를 상태와 코드와 함께"],
      ["qa-ds-kit.html", "Kit QA", "키트 QA", "Before and after for the kit, checks, what's open", "키트 전후 비교, 점검, 남은 일"],
      ["status.html", "Design status", "디자인 현황", "Work in progress and the design system table", "진행 중인 일과 디자인 시스템 표"],
      ["decisions.html", "Open decisions", "결정 사항", "Icons, pet chips, what got pushed", "아이콘, 펫 칩, 푸시된 것"],
      ["illustrations.html", "Illustrations", "일러스트", "The Goldito spot illustrations (in progress)", "Goldito 일러스트 (진행 중)"],
      ["pixel-pets.html", "Pixel pets", "픽셀 펫", "Pet room sprites (in progress)", "펫 방 스프라이트 (진행 중)"],
      ["pet-360.html", "Pets 360", "펫 360", "Every pet with a body: front, back, side, walk, lie, eat, poop", "모든 펫의 몸: 앞, 뒤, 옆, 걷기, 눕기, 먹기, 응가"]]],
    ["Updates", "업데이트", [
      ["update-2026-10-25.html", "Oct 25 update", "10월 25일 업데이트", "Moments merged; photo viewer, Diary views, pet tone and dark mode, playful words, little delights", "모먼츠 머지; 사진 보기, 다이어리 보기, 펫 톤과 다크 모드, 재치 있는 말, 작은 즐거움"],
      ["rundown-2026-10-25.html", "Oct 25 rundown", "10월 25일 한눈에 보기", "Links to everything from Oct 25, what is held, and the decisions checklist", "10월 25일의 모든 링크, 보류한 것, 결정 체크리스트"],
      ["update-2026-10-24.html", "Oct 24 update", "10월 24일 업데이트", "Feed trial (all pets, stickers, Decorate), View tabs, five stages, two PRs in review", "피드 시안 (모든 펫, 스티커, 꾸미기), 뷰 탭, 다섯 단계, PR 둘 리뷰"],
      ["update-2026-10-23.html", "Oct 23 update", "10월 23일 업데이트", "Design tickets in today's slot, nav trial, Figma decisions and flags, DESIGN.md", "오늘 슬롯의 디자인 티켓, 내비게이션 시안, 피그마 결정과 표시, DESIGN.md"],
      ["update-2026-10-22.html", "Oct 22 update", "10월 22일 업데이트", "Design kit, header C, Lucide, Jakarta, the merge chain", "디자인 키트, 헤더 C, Lucide, Jakarta, 머지 순서"],
      ["update-2026-10-21.html", "Oct 21 update", "10월 21일 업데이트", "UI audit, demo polish, judge panel", "UI 감사, 데모 다듬기, 심사위원 패널"],
      ["update-2026-10-20.html", "Oct 20 update", "10월 20일 업데이트", "Expressive merged, gold coin logo, #115 hand-off", "Expressive 머지, 골드 코인 로고, #115 전달"],
      ["update-2026-10-19.html", "Oct 19 update", "10월 19일 업데이트", "Header, calendar and the look in review", "헤더, 캘린더, 룩 리뷰 중"]]],
    ["QA and reviews", "QA와 리뷰", [
      ["play-and-pick.html", "Play and pick", "해 보고 고르기", "Nine calls from Oct 24: play each, pick, copy your picks to the team", "10/24의 결정 아홉 개: 해 보고, 고르고, 팀에 복사"],
      ["audit-2026-10-21.html", "UI audit", "UI 감사", "74 issues with reasons", "근거와 함께 74개 이슈"],
      ["qa-ui-fixes.html", "UI fixes QA", "UI 수정 QA", "Header, focus ring, Back, placeholders", "헤더, 포커스 링, 뒤로, 플레이스홀더"],
      ["qa-copy-batch.html", "Copy batch QA", "문구 QA", "Sign out, Weekly rules, dates, labels", "Sign out, Weekly rules, 날짜, 레이블"],
      ["qa-expressive.html", "Patterns QA", "패턴 QA", "Illustrations in content, section titles", "콘텐츠 일러스트, 섹션 제목"],
      ["qa-sitter-card.html", "Sitter card", "시터 카드", "The card and the search pill, playable", "카드와 검색 필, 체험 가능"],
      ["qa-jakarta.html", "Typeface QA", "서체 QA", "Fredoka for titles, Plus Jakarta Sans for the rest, before and after", "제목 Fredoka, 나머지 Plus Jakarta Sans, 전후 비교"],
      ["header-trial.html", "Header trial", "헤더 시안", "Who am I signed in as? Now, A and C, playable", "누구로 로그인했는지: 지금, A, C 체험"],
      ["nav-trial.html", "Nav trial", "내비게이션 시안", "Chat got its own tab, Diary inside Feed (shipped #340); compare with before", "채팅 탭, 피드 안 다이어리 (#340 반영); 이전과 비교"],
      ["diary-compare.html", "Diary trial", "다이어리 시안", "Play the decided Diary as Robert and Chloe: Days, Calendar, Footprints, Decorate", "결정된 다이어리를 Robert와 Chloe로: 날짜, 달력, 발자국, 꾸미기"],
      ["ux-calls.html", "UX calls (decided)", "UX 결정 (확정)", "The 12 UX calls drawn as phone screens, decided by Mook on Oct 25", "UX 결정 12개를 폰 화면으로, 10/25 Mook 확정"],
      ["video-plan.html", "Demo video plan", "데모 영상 계획", "Four storyboards, the model lines to say, and the recording checklist (#116)", "스토리보드 네 가지, 모델 설명 대본, 촬영 체크리스트 (#116)"],
      ["ux-audit.html", "UX patterns audit", "UX 패턴 점검", "Back, close, feedback, confirms, labels and forms on main: 55 findings, 12 calls", "뒤로, 닫기, 피드백, 확인, 라벨, 입력: 발견 55, 결정 12"],
      ["copy-audit.html", "Copy audit", "카피 점검", "Words, errors, emoji and playful words on main: 12 findings, Log in / Log out, Diary page, and the Playful words switch", "단어, 오류, 이모지, 재치 있는 말: 발견 12, Log in / Log out, 다이어리 페이지, 재치 있는 말 스위치"],
      ["intro-trial.html", "Intro trial", "인트로 시안", "The first minute: boot, Welcome, how it works, Try the demo, sign up; today vs a proposal; playable", "첫 1분: 부팅, 웰컴, 소개, 데모, 가입; 지금 vs 제안; 체험 가능"],
      ["sitter-home-trial.html", "Sitter Home trial", "시터 홈 시안", "A new sitter's Home before and after the first booking: a card that fills in, a paw trail that carries on as the stay's stages", "첫 예약 전후 새 시터의 홈: 채워지는 카드, 머무름 단계로 이어지는 발자국 길"],
      ["delights.html", "Little delights", "작은 즐거움", "Every micro-interaction with variations: paw walks, paw loaders, stamps, bursts, hints; playable", "모든 마이크로 인터랙션과 변형: 발자국 걷기, 발바닥 로더, 도장, 터짐, 힌트; 체험 가능"],
      ["words-trial.html", "Playful words", "재치 있는 말", "Paw-fect and friends, each shown as a toast, title or empty state; dog and cat words; playable", "파우-펙트 등, 토스트, 제목, 빈 화면으로 보기; 강아지와 고양이 말; 체험 가능"],
      ["tone-trial.html", "Pet tone trial", "펫 톤 시안", "Colors from the pet's photo or Goldito green, light and dark, and Max's room; playable", "펫 사진의 색 또는 골디토 그린, 라이트와 다크, 맥스의 방; 체험 가능"],
      ["feed-trial.html", "Feed trial", "피드 시안", "Feed and Diary: all pets first, View tabs, stickers from any photo; playable", "피드와 다이어리: 모든 펫 먼저, 뷰 탭, 사진으로 스티커; 체험 가능"],
      ["booking-flow.html", "Booking flow", "예약 흐름", "Step-by-step booking request, playable, for the product call", "단계별 예약 요청, 체험 가능, 제품 결정용"]]],
    ["Demo and judges", "데모와 심사", [
      ["judge-panel.html", "Judge panel", "심사위원 패널", "Goldito in two minutes", "2분 안에 보는 Goldito"],
      ["demo-run-sheet.html", "Demo run sheet", "데모 진행표", "What to click, in order", "순서대로 누를 것"],
      ["video.html", "Video plan", "영상 계획", "The #116 shot list", "#116 샷 리스트"],
      ["chat.html", "Chat booking", "채팅 예약", "The booking chat prototype", "예약 채팅 프로토타입"]]],
    ["Tickets", "티켓", [
      ["ticket-147.html", "#147 Home header", "#147 홈 헤더", "Workbench", "워크벤치"],
      ["ticket-120.html", "#120 Sitter calendar", "#120 시터 달력", "Workbench", "워크벤치"],
      ["ticket-119.html", "#119 Skins and pixel pets", "#119 스킨과 픽셀 펫", "Workbench", "워크벤치"],
      ["ticket-117.html", "#117 Wrap up", "#117 마무리", "Workbench", "워크벤치"]]],
  ];
  const presetItems = PRESETS.flatMap(([cen, cko, list]) => list.map(([h, ten, tko, xen, xko]) => ({ p: [cen, cko], h, t: [ten, tko], x: [xen, xko] })));
  const pages = [
    ["Overview", "개요", "index.html", "Start here: status, the look, every README promise", "여기서 시작: 현황, 룩, README의 모든 약속",
      ["Tap “Play the Draft” to try the design.", "The README table shows, for every promise, whether the app has it and where to play it.", "New to the project? “Get started” has the 3 steps and how to run the app."],
      ["“초안 체험하기”로 디자인을 눌러 보세요.", "README 표는 약속마다 앱에 있는지와 어디서 체험하는지 보여 줘요.", "처음이라면 “시작하기”에 3단계와 앱 실행 방법이 있어요."]],
    ["Prototype", "프로토타입", "prototype.html", "Every screen: today's app next to the Draft, with notes and links", "모든 화면: 지금 앱과 초안을 나란히, 노트와 링크",
      ["Pick a screen on the left (on phones, the menu at the top).", "The Draft phone is tappable; the list and notes follow as you tap.", "Keys: <kbd>↑</kbd> <kbd>↓</kbd> screens, <kbd>1</kbd>–<kbd>4</kbd> looks."],
      ["왼쪽에서 화면을 고르세요 (폰에서는 위쪽 메뉴).", "초안 폰은 누를 수 있고, 누르는 대로 목록과 노트가 따라와요.", "단축키: <kbd>↑</kbd> <kbd>↓</kbd> 화면, <kbd>1</kbd>–<kbd>4</kbd> 룩."]],
    ["Step by step", "단계별", "steps.html", "Booking, care request, Meet & Greet and checkout, one question per screen", "예약, 케어 의뢰서, Meet & Greet, 결제를 한 화면에 질문 하나로",
      ["Tap through the phone, or jump with the thumbnails.", "Keys: <kbd>←</kbd> <kbd>→</kbd> back · next, <kbd>1</kbd>–<kbd>4</kbd> flows, <kbd>L</kbd> larger text, <kbd>D</kbd> dark.", "Reset answers puts the demo data back."],
      ["폰을 누르거나 썸네일로 바로 이동하세요.", "단축키: <kbd>←</kbd> <kbd>→</kbd> 뒤로 · 다음, <kbd>1</kbd>–<kbd>4</kbd> 흐름, <kbd>L</kbd> 글자 크게, <kbd>D</kbd> 다크.", "답 초기화는 데모 데이터로 되돌려요."]],
    ["Brand", "브랜드", "brand.html", "The gold coin logo, the logo files, color, type and the design rules", "골드 코인 로고, 로고 파일, 색, 서체, 디자인 규칙",
      ["The gold coin is the logo; Logo files has every file to download, and the other directions stay for reference.", "Swatches show light · dark values of the app's tokens.", "The rules at the bottom apply to every screen."],
      ["골드 코인이 로고예요. 로고 파일에서 모든 파일을 받을 수 있고, 다른 방향은 참고용으로 남아요.", "색 견본은 앱 토큰의 라이트 · 다크 값이에요.", "아래 규칙은 모든 화면에 적용돼요."]],
    ["Plan", "계획", "plan.html", "Decisions waiting, the schedule to Oct 30, who does what", "기다리는 결정, 10/30까지 일정, 누가 무엇을",
      ["Decisions come first: each one unblocks work below it.", "The schedule is to scale; ticked, light-green bars are done.", "The design log lists what changed, newest first."],
      ["결정이 먼저: 하나씩 아래 작업을 풀어 줘요.", "일정은 실제 비율이고, 체크된 연한 초록 막대는 끝난 것이에요.", "디자인 기록은 바뀐 것을 최신순으로 보여 줘요."]],
    ["Project", "프로젝트", "project.html", "The whole project, an audit, the design tickets and how to push to GitHub", "프로젝트 전체, 점검, 디자인 티켓, GitHub에 올리는 법",
      ["Start with the map if you're new.", "The audit's last column shows what isn't on GitHub yet.", "Each design ticket has my take and a next step; section 4 walks you through a push."],
      ["처음이라면 지도부터.", "점검 표의 마지막 열은 아직 GitHub에 없는 것을 보여 줘요.", "디자인 티켓마다 제 의견과 다음 단계가 있고, 4번이 푸시를 단계별로 안내해요."]],
    ["Sketches", "스케치", "sketches.html", "Design tickets sketched as screens, with why, and the ones to skip", "화면으로 그린 디자인 티켓과 이유, 건너뛸 티켓",
      ["The table at the top says what I did with each ticket.", "Each sketch has why now, what I decided, and a question for you.", "Phone rows scroll sideways (drag, wheel or arrow keys)."],
      ["맨 위 표가 티켓마다 한 일을 보여 줘요.", "스케치마다 왜 지금, 정한 것, 묵 님께 질문이 있어요.", "폰 줄은 옆으로 스크롤돼요 (드래그, 휠, 화살표 키)."]],
    ["Updates", "업데이트", "updates.html", "Every daily design update, newest first", "날마다의 디자인 업데이트, 최신순",
      ["Each update has the same parts: Worked on, Needs the team, Left before the freeze, then that day's full notes.", "On an update, the bar at the top and bottom goes to the older and newer one.", "The newest is marked Latest."],
      ["업데이트마다 같은 구성이에요: 작업한 것, 팀이 해 줄 것, 동결 전 남은 일, 그리고 그날의 전체 노트.", "업데이트 위아래 막대로 이전과 다음 업데이트로 가요.", "가장 새것에 최신 표시가 있어요."]],
  ];
  const here = location.pathname.replace(/\/$/, "/index.html");
  // Daily updates live under the Updates tab (one list: the "Updates" group in PRESETS, newest first).
  const UPDATES = (PRESETS.find((g) => g[0] === "Updates") || [, , []])[2];
  const isUpdate = UPDATES.some(([h]) => new URL(h, base).pathname === here);
  const page = pages.find(([, , href]) => new URL(href, base).pathname === here) || (isUpdate && pages.find(([, , h]) => h === "updates.html")) || pages[0];
  const both = (en, k) => `<span class="en">${en}</span><span class="ko">${k}</span>`;
  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Site");
  nav.innerHTML = `<a class="site-brand" href="${new URL("index.html", base).pathname}" aria-label="Goldito design, overview" data-tip="Back to the Overview" data-tip-ko="개요로 돌아가기"><i aria-hidden="true">🐾</i><b>Goldito design</b></a>
    <span class="site-tabs">${pages.map(([en, k, href, ten, tko]) => {
      const url = new URL(href, base);
      return `<a href="${url.pathname}"${url.pathname === here || (isUpdate && href === "updates.html") ? ' aria-current="page"' : ""} data-tip="${ten}" data-tip-ko="${tko}">${both(en, k)}</a>`;
    }).join("")}</span>
    <span class="site-end"><button type="button" class="site-search-btn" aria-haspopup="dialog" aria-controls="site-search" data-tip="Search the whole site (/ or ⌘K)" data-tip-ko="사이트 전체 검색 (/ 또는 ⌘K)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="lbl">${both("Search", "검색")}</span><kbd>/</kbd><span class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">${both("Search", "검색")}</span></button><button type="button" class="site-help" aria-expanded="false" aria-controls="site-guide" aria-label="Guide: how to use this page" data-tip="How to use this page" data-tip-ko="이 페이지 사용법">?</button>
      <button type="button" class="site-set-btn" aria-haspopup="dialog" aria-expanded="false" aria-controls="site-settings" aria-label="Settings: language, appearance, motion" data-tip="Language, appearance and motion" data-tip-ko="언어, 화면 모드, 움직임"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg><span class="lbl" data-set-lang></span></button></span>`;
  document.body.prepend(nav);

  // ---------- on a daily update: older · all · newer, at the top and the bottom ----------
  if (isUpdate) {
    const i = UPDATES.findIndex(([h]) => new URL(h, base).pathname === here);
    const older = UPDATES[i + 1], newer = UPDATES[i - 1];
    const day = (u) => both(u[1].replace(" update", ""), u[2].replace(" 업데이트", ""));
    const bar = () => {
      const el = document.createElement("nav"); el.className = "upd-nav"; el.setAttribute("aria-label", "Updates");
      el.innerHTML = (older ? `<a rel="prev" href="${new URL(older[0], base).pathname}"><small>${both("← Older", "← 이전")}</small><b>${day(older)}</b></a>` : `<span></span>`)
        + `<a class="all" href="${new URL("updates.html", base).pathname}">${both("All updates", "모든 업데이트")}</a>`
        + (newer ? `<a rel="next" href="${new URL(newer[0], base).pathname}"><small>${both("Newer →", "다음 →")}</small><b>${day(newer)}</b></a>` : `<span class="latest">${both("Latest", "최신")}</span>`);
      return el;
    };
    const main = document.querySelector("main") || document.body;
    main.prepend(bar()); main.append(bar());
  }
  // ---------- settings (gear): language, appearance, motion ----------
  const setBtn = nav.querySelector(".site-set-btn");
  const settings = document.createElement("div");
  settings.className = "site-settings"; settings.id = "site-settings"; settings.hidden = true;
  settings.setAttribute("role", "dialog"); settings.setAttribute("aria-label", "Settings");
  const seg = (key, label, opts) => `<div class="grp" role="radiogroup" aria-label="${label[0]}"><span>${both(label[0], label[1])}</span><div class="site-seg" data-key="${key}">${opts.map(([v, en, kr]) => `<button type="button" role="radio" data-v="${v}">${kr ? both(en, kr) : en}</button>`).join("")}</div></div>`;
  settings.innerHTML = `<h2>${both("Settings", "설정")}</h2>
    ${seg("lang", ["Language", "언어"], [["en", "EN"], ["ko", "한국어"]])}
    ${seg("theme", ["Appearance", "화면 모드"], [["system", "System", "시스템"], ["light", "Light", "라이트"], ["dark", "Dark", "다크"]])}
    ${seg("motion", ["Motion", "움직임"], [["system", "System", "시스템"], ["reduce", "Reduced", "줄이기"]])}
    <small>${both("Saved in this browser and used on every page of the site.", "이 브라우저에 저장되고 사이트의 모든 페이지에 적용돼요.")}</small>
    <button type="button" class="x">${both("Close", "닫기")}</button>`;
  document.body.appendChild(settings);
  const current = { lang: () => root.dataset.lang, theme: () => pref.get("goldito-theme") || "system", motion: () => pref.get("goldito-motion") || "system" };
  const sync = () => {
    settings.querySelectorAll(".site-seg").forEach((g) => g.querySelectorAll("button").forEach((b) => {
      const on = b.dataset.v === current[g.dataset.key](); b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; }));
    setBtn.querySelector("[data-set-lang]").textContent = root.dataset.lang === "ko" ? "한국어" : "EN";
  };
  const setLang = (l) => { root.dataset.lang = root.lang = l; store.set(l); window.dispatchEvent(new CustomEvent("goldito-lang", {detail: l})); };
  const choose = (key, v) => {
    if (key === "lang") setLang(v);
    if (key === "theme") { pref.set("goldito-theme", v); applyTheme(v); window.dispatchEvent(new CustomEvent("goldito-theme", {detail: v})); }
    if (key === "motion") { pref.set("goldito-motion", v); applyMotion(v); }
    sync();
  };
  sync();
  settings.addEventListener("click", (e) => { const b = e.target.closest(".site-seg button"); if (b) choose(b.closest(".site-seg").dataset.key, b.dataset.v); });
  // radio groups: arrow keys move the choice, like native radios
  settings.addEventListener("keydown", (e) => {
    const b = e.target.closest(".site-seg button"); if (!b || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault(); const all = [...b.parentElement.children], i = all.indexOf(b), n = all[(i + (/Right|Down/.test(e.key) ? 1 : all.length - 1)) % all.length];
    choose(b.parentElement.dataset.key, n.dataset.v); n.focus();
  });
  const setSettings = (open) => { settings.hidden = !open; setBtn.setAttribute("aria-expanded", String(open)); hideTip(); if (open) { if (!guide.hidden) setGuide(false); settings.querySelector('[aria-checked="true"]').focus(); } };
  setBtn.addEventListener("click", () => setSettings(settings.hidden));
  settings.querySelector(".x").addEventListener("click", () => { setSettings(false); setBtn.focus(); });
  document.addEventListener("click", (e) => { if (!settings.hidden && !settings.contains(e.target) && !setBtn.contains(e.target)) setSettings(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !settings.hidden) { setSettings(false); setBtn.focus(); } });
  // another page or frame of the site changed a setting: follow it
  addEventListener("storage", (e) => {
    if (e.key === "goldito-theme") applyTheme(e.newValue);
    if (e.key === "goldito-motion") applyMotion(e.newValue);
    if (e.key === "goldito-lang" && e.newValue && e.newValue !== root.dataset.lang) { root.dataset.lang = root.lang = e.newValue; window.dispatchEvent(new CustomEvent("goldito-lang", {detail: e.newValue})); }
    sync();
  });

  // ---------- guide panel (?) ----------
  const help = nav.querySelector(".site-help");
  const guide = document.createElement("div");
  guide.className = "site-guide"; guide.id = "site-guide"; guide.hidden = true;
  guide.setAttribute("role", "dialog"); guide.setAttribute("aria-label", "Guide");
  guide.innerHTML = `<h2>${both(`On this page: ${page[0]}`, `이 페이지: ${page[1]}`)}</h2>
    <ul>${page[5].map((t, i) => `<li>${both(t, page[6][i])}</li>`).join("")}</ul>
    <h3>${both("New here? Three steps", "처음이라면? 3단계")}</h3>
    <ol><li>${both(`<a href="${new URL("prototype.html#stage-1/c", base).pathname}#stage-1/c">Play the Draft</a>: the whole stay, ① to ⑤.`, `<a href="${new URL("prototype.html", base).pathname}#stage-1/c">초안 체험</a>: 스테이 전체, ①부터 ⑤까지.`)}</li>
      <li>${both(`<a href="${new URL("plan.html", base).pathname}">Check the Plan</a>: what's decided, what's waiting.`, `<a href="${new URL("plan.html", base).pathname}">계획 보기</a>: 정해진 것과 기다리는 것.`)}</li>
      <li>${both(`<a href="${new URL("index.html", base).pathname}#start">Run the real app</a>: hosted demo or on your computer.`, `<a href="${new URL("index.html", base).pathname}#start">실제 앱 실행</a>: 호스팅 데모 또는 내 컴퓨터에서.`)}</li></ol>
    <h3>${both("All pages", "모든 페이지")}</h3>
    <ul class="site-pages">${pages.map(([en, k, href, ten, tko]) => { const url = new URL(href, base);
      return `<li><a href="${url.pathname}"${url.pathname === here ? ' aria-current="page"' : ""}><b>${both(en, k)}</b><small>${both(ten, tko)}</small></a></li>`; }).join("")}</ul>
    ${PRESETS.map(([cen, cko, list]) => `<h3>${both(cen, cko)}</h3><ul class="site-pages">${list.map(([h, ten, tko, xen, xko]) => { const url = new URL(h, base);
      return `<li><a href="${url.pathname}"${url.pathname === here ? ' aria-current="page"' : ""}><b>${both(ten, tko)}</b><small>${both(xen, xko)}</small></a></li>`; }).join("")}</ul>`).join("")}
    <h3>${both("Elsewhere", "외부")}</h3>
    <ul class="site-pages"><li><a href="https://mooque-dev.github.io/goldito-design/logo-files/" target="_blank" rel="noopener"><b>${both("Logo files ↗", "로고 파일 ↗")}</b><small>${both("Every logo, icon and pixel pet to download, with Customize", "모든 로고, 아이콘, 픽셀 펫 다운로드와 Customize")}</small></a></li></ul>
    <button type="button" class="x">${both("Close", "닫기")}</button>`;
  document.body.appendChild(guide);
  const setGuide = (open) => { guide.hidden = !open; help.setAttribute("aria-expanded", String(open)); hideTip(); if (open) { if (!settings.hidden) setSettings(false); guide.querySelector("a,button").focus(); } };
  help.addEventListener("click", () => setGuide(guide.hidden));
  guide.querySelector(".x").addEventListener("click", () => { setGuide(false); help.focus(); });
  document.addEventListener("click", (e) => { if (!guide.hidden && !guide.contains(e.target) && e.target !== help) setGuide(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !guide.hidden) { setGuide(false); help.focus(); } });

  // ---------- search ----------
  const sbtn = nav.querySelector(".site-search-btn");
  const sdlg = document.createElement("div");
  sdlg.className = "site-search"; sdlg.id = "site-search"; sdlg.hidden = true;
  sdlg.setAttribute("role", "dialog"); sdlg.setAttribute("aria-modal", "true"); sdlg.setAttribute("aria-label", "Search the site");
  sdlg.innerHTML = `<div class="box"><div class="field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input type="search" role="combobox" aria-expanded="true" aria-controls="site-search-list" aria-autocomplete="list" autocomplete="off" spellcheck="false">
      <button type="button" class="esc">Esc</button></div>
    <ul id="site-search-list" role="listbox"></ul>
    <div class="hint">${both("↑ ↓ to move · Enter to open · Esc to close", "↑ ↓ 이동 · Enter 열기 · Esc 닫기")}</div></div>`;
  document.body.appendChild(sdlg);
  const sinput = sdlg.querySelector("input"), slist = sdlg.querySelector("ul");
  let INDEX = null, hits = [], sel = 0, lastFocus = null;
  const loadIndex = () => INDEX ? Promise.resolve(INDEX) : new Promise((res) => {
    if (window.GOLDITO_SEARCH) { INDEX = presetItems.concat(window.GOLDITO_SEARCH); res(INDEX); return; }
    const s = document.createElement("script"); s.src = new URL("search-index.js", base).href;
    s.onload = () => { INDEX = presetItems.concat(window.GOLDITO_SEARCH || []); res(INDEX); }; s.onerror = () => { INDEX = presetItems; res(INDEX); };
    document.head.appendChild(s);
  });
  const norm = (s) => (s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const mark = (s, terms) => { let h = esc(s); for (const q of terms) if (q) h = h.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "<mark>$1</mark>"); return h; };
  const run = () => {
    const L = ko() ? 1 : 0, q = norm(sinput.value).trim(), terms = q.split(/\s+/).filter(Boolean);
    if (!terms.length) {
      // Empty search = a map of the site: every page outside the tabs, by category, as quick picks.
      hits = presetItems.map((it) => ({ it }));
      let i = -1;
      slist.innerHTML = `<li class="empty">${both("Type to search every page, sketch, ticket and Prototype screen, or pick a page:", "모든 페이지, 스케치, 티켓, 화면을 검색하거나 페이지를 고르세요:")}</li>` +
        PRESETS.map(([cen, cko, list]) => `<li class="cat" role="presentation">${both(cen, cko)}</li>` + list.map(([h, ten, tko]) => { i++;
          const url = new URL(h, base); return `<li role="option" id="ss-${i}" aria-selected="${i === 0}" class="pick"><a href="${url.href}" tabindex="-1"><b>${both(ten, tko)}</b></a></li>`; }).join("")).join("");
      sel = 0; sinput.setAttribute("aria-activedescendant", "ss-0"); return;
    }
    hits = (INDEX || []).map((it) => {
      const title = norm(it.t[L] + " " + it.t[1 - L]), body = norm(it.x[L] + " " + it.x[1 - L] + " " + it.p.join(" "));
      let score = 0;
      for (const w of terms) { if (title.includes(w)) score += title.startsWith(w) ? 14 : 10; else if (body.includes(w)) score += 3; else return null; }
      if (!it.h.includes("#")) score += 2; // whole pages first among equals
      return { it, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 40);
    sel = 0;
    slist.innerHTML = hits.length ? hits.map(({ it }, i) => {
      const href = /^https?:/.test(it.h) ? it.h : new URL(it.h, base).href;
      const body = it.x[L] || "", lower = norm(body), at = Math.max(0, lower.indexOf(terms.find((w) => lower.includes(w)) || "") - 50);
      const snip = (at > 0 ? "…" : "") + body.slice(at, at + 180);
      return `<li role="option" id="ss-${i}" aria-selected="${i === sel}"><a href="${href}"${/^https?:/.test(it.h) && !it.h.includes(location.host) ? ' target="_blank" rel="noopener"' : ""} tabindex="-1"><small>${esc(it.p[L])}</small><b>${mark(it.t[L], terms)}</b>${snip ? `<span>${mark(snip, terms)}</span>` : ""}</a></li>`;
    }).join("") : `<li class="empty">${both("Nothing found. Try another word, or switch the language.", "찾은 게 없어요. 다른 단어로, 또는 언어를 바꿔 보세요.")}</li>`;
    sinput.setAttribute("aria-activedescendant", hits.length ? "ss-0" : "");
  };
  const move = (d) => { if (!hits.length) return; sel = (sel + d + hits.length) % hits.length;
    slist.querySelectorAll("li[role=option]").forEach((li, i) => li.setAttribute("aria-selected", String(i === sel)));
    const cur = slist.querySelector(`#ss-${sel}`); if (cur) { cur.scrollIntoView({ block: "nearest" }); sinput.setAttribute("aria-activedescendant", cur.id); } };
  const openSearch = async () => { lastFocus = document.activeElement; hideTip(); if (!guide.hidden) setGuide(false); if (!settings.hidden) setSettings(false); sdlg.hidden = false; sinput.placeholder = ko() ? "검색: 페이지, 스케치, 티켓, 화면…" : "Search pages, sketches, tickets, screens…";
    sinput.focus(); sinput.select(); await loadIndex(); run(); };
  const closeSearch = () => { sdlg.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); };
  sbtn.addEventListener("click", openSearch);
  sdlg.querySelector(".esc").addEventListener("click", closeSearch);
  sdlg.addEventListener("click", (e) => { if (e.target === sdlg) closeSearch(); });
  sinput.addEventListener("input", run);
  sinput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter") { const a = slist.querySelector(`#ss-${sel} a`); if (a) { e.preventDefault(); closeSearch(); a.click(); } }
    else if (e.key === "Escape") { e.preventDefault(); closeSearch(); }
  });
  sdlg.addEventListener("keydown", (e) => { if (e.key === "Tab") { e.preventDefault(); sinput.focus(); } }); // focus stays in the dialog
  slist.addEventListener("click", (e) => { const a = e.target.closest("a"); if (a && !a.target) closeSearch(); });
  addEventListener("keydown", (e) => {
    const typing = e.target.closest && e.target.closest("input, textarea, select, [contenteditable]");
    if (!sdlg.hidden) return;
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); }
    else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); openSearch(); }
  });
  addEventListener("goldito-lang", () => { if (!sdlg.hidden) run(); });

  // Run edge to edge even when the page pads its body; tell the guide how tall the bar is.
  const cs = getComputedStyle(document.body);
  const [t, l, r] = [cs.paddingTop, cs.paddingLeft, cs.paddingRight].map(parseFloat);
  nav.style.margin = `${-t}px ${-r}px ${t ? 24 : 0}px ${-l}px`;
  if (cs.display.includes("flex") && !cs.flexDirection.startsWith("column")) nav.style.flexBasis = `calc(100% + ${l + r}px)`;
  const measure = () => root.style.setProperty("--site-nav-h", `${nav.offsetHeight}px`);
  measure(); addEventListener("resize", measure);
})();
