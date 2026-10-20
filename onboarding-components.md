## Large-text pet onboarding: components (11.15, #115)

From the playable design `design/concept-prototypes/onboarding.html` (round 4, Oct 20). Every part of the page mapped to what exists in `frontend/components/ui`, DESIGN.md §6 and the Figma components, so nothing new clashes with the app.

**Count:** 16 parts reuse a component as is, 12 extend one (10 components get a new variant or prop: Button, Top bar (Onboarding), ScreenHeader, CheckRow, ChoiceChips, Tag, TextField, PetCard, Banner, List Row), 2 are new: `VoiceRecorder` and `TraitChart`.

| Part | Decision | Component | Props · states | Tokens | Aligned on the page |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Next (pinned, every answer screen); Save at the end of Part 1, Done on the last Part 2 question | Extend | `Button` primary, the proposed `large` size (DESIGN §6) at 60 tall in this flow | label; Default · Pressed · Disabled (until an answer is picked) · enabled at once when an answer is pre-selected | `primary`, `primaryText`, `ui.radius.button` (pill); new `layout.largeButton` 60 | Disabled = `border` fill + `textMuted` label, like Button; semibold label |
| Pick another, Use 3.2 kg | Reuse | `Button` secondary | label | `surface`, `borderStrong`, `primary` | 1 px `borderStrong` outline and `primary` label (was a 2 px ink outline) |
| Tell sitters more about Max + About 3 min · 14 quick questions | Extend | `Button` secondary + new `hint` prop (second line) | label, hint | `fontSize.small`, `textMuted` for the hint | Same outline as secondary |
| Skip, I'm not sure · Finish later · I know the exact weight · Something else · Fix the words · Remove photo · Change · Add · Not now | Reuse | `TextButton` | label, onPress | `primary`, `fontWeight.semibold` | No underline now, 44+ tall |
| Back | Reuse | `BackLink` | chevron + Back | `primary` | Was an icon-only chevron |
| Top bar with progress | Extend | Top bar, Onboarding variant (DESIGN §6.1: Back + step dots): a progress bar with its label instead of the dots, and an optional right `TextButton` (Finish later) | label (Basics · 3 of 7, Personality · 4 of 14), value | `track`, `primary` | Fill is `primary` (was gold, which is under 3:1 on `track`) |
| Progress bars (top bar, Home reminder) | Reuse | Figma `Progress Bar` (not in code yet; add to `ui/`) | value 0 to 1 | `track`, `primary` |  |
| Question and helper line | Extend | `ScreenHeader` + `size="large"`: title 28 (already `fontSize.title` + 4) in `fontWeight.bold`, subtitle 18, optional Tag above | title, subtitle, tag | `fontFamily.display`, `fontWeight.bold`; new `fontSize.subtitle` 18 | Title weight 700 needs Fredoka 700 loaded next to the skin's 600 |
| Answer rows: the questions, breed, age, weight (with hint line and a trailing Tag) | Extend | `CheckRow` + `variant="card"` + `size="large"` (radio) | label, hint, trailing, checked, radio; Default · Checked · Disabled | `borderStrong`, `primary`, `accent`, `radius.lg`; new `layout.largeRow` 64, `fontSize.large` 20 | 1 px `borderStrong`; checked = 2 px `primary` + `accent` (was 2 px and 3 px) |
| Fact rows on the voice review (checkbox, answer, From “quote”) | Reuse | `CheckRow` card large (the same extension, checkbox) | label, hint, checked | as above | Same look as the answer rows |
| Dog or Cat | Reuse | `RoleCard` (Figma `Choice Card`), description optional | icon, title, selected | `accent`, `primary`, `radius.lg` | Icon on a round `accent` tile |
| Foods to avoid (pick several) | Extend | `ChoiceChips` + `size="large"` (64 tall, 20 px) | options, multi, value | `borderStrong`, `primary`, `ui.radius.chip`; `layout.largeRow`, `fontSize.large` | 1 px outline; on = `primary` fill |
| Suggested (on rows) and the Suggested dot (on chips) | Extend | `Tag` tone `brand` + new `icon` prop; icon-only form for the dot (with an accessibility label) | label, icon, tone | `accent`, `primary`, `ui.radius.tag` | Was butter and gold; now brand, like other AI and source labels |
| For your sitter's safety | Extend | `Tag` tone `neutral` + `icon` (the same extension) | label, icon | `track`, `textMuted` | Was butter and gold |
| We heard … · From your photo … · photo confirmed with Change | Reuse | `Banner` info (+ its action: Change, Use 3.2 kg) | icon, body, action | `accent`, `border`, `primary`, `radius.md` | Was butter with an 18 px corner |
| Photo slot | Reuse | `MediaPicker` (Take photo · Choose from library) + Figma `Photo Tile` Upload state |  | `borderStrong` dashed, `radius.lg` | In the app the button opens MediaPicker; the demo picks the sample |
| Looks like a Maltese. Right? | Reuse | `Card` + `Tag` brand + two `Button` secondary (Yes, Pick another) |  | `surface`, `border`, `radius.lg` | Card gets its 1 px `border`; Yes is secondary now, so Next stays the one filled button |
| You said “…” | Reuse | `Card` with a Caption eyebrow |  | `surface`, `border` | Not called Quote Card: that name is the price card |
| Name, exact weight (kg), typed words | Extend | `TextField` + `size="large"` + `unit` suffix | label, unit, inputMode | `borderStrong`, `primary`, `radius.md`; `fontSize.large` | 1 px outline, focus = `primary` border (no glow) |
| Mic button and its states | New | `VoiceRecorder` | maxSeconds (60), onTranscript; Idle · Recording (timer, level bars, Stop) · Reading (spinner) · Done | `primary`, `primaryText`, `accent` (halo), `motion.base`; 88 px is the component's own size |  |
| Personality: bars, pentagon option, “Not shared yet” line | New | `TraitChart` | traits [{axis, level 0 to 4, word}], layout bars or pentagon, emptyText; Shared · Partly shared (one line lists the rest) · Not shared (one line, no empty bars) | `primary`, `track`, `borderStrong`, `textMuted`, `fontSize.small` | Bars are `primary` on `track`; no numbers |
| Max at a glance card | Extend | `PetCard` + `variant="glance"`: Avatar photo 56, name, “Dog · Maltese · Adult · 3.2 kg”, safety Tags, `TraitChart`, breed needs | pet, profile, viewer (owner or sitter) | `surface`, `border`, `radius.lg` | Round Avatar like PetCard (was a rounded square) |
| Safety chips on the card | Reuse | `Tag` warning · neutral (+ icon) · success |  | `warningSurface`, `warning`, `track`, `textMuted`, `successSurface`, `success` | “Owner isn't sure” is neutral (was butter); “not shared yet” is a line, not a tag |
| Breed needs | Reuse | `Card` tone `mint` |  | `blockMint`, `radius.xl` |  |
| Request summary, booking on Home | Reuse | `Card` tone `butter` (`BookingCard` in the app) |  | `blockButter` |  |
| Home reminder (Help Chloe get to know Max) | Extend | `Banner` info + `secondaryAction` (Not now) + optional `progress`; the main action shown as a 44 px `Button` | title, body, action, secondaryAction, progress | `accent`, `border`, `primary`, `radius.md` | Was a peach block with two big buttons |
| Pet tile on Home, Mochi's compact card | Reuse | `PetCard` (+ a quiet No personality yet · Add line, or Tag success Profile complete) |  |  |  |
| Your answers with Change | Extend | Figma `List Row` (Lines = 2) + Trailing = Text button |  |  |  |
| Max is ready to book | Reuse | `EmptyState` layout (icon, title, one line) with Button primary + Button secondary with hint |  | `accent` |  |
| Toast, Home and New request headers | Reuse | `Toast`, App Bar / Top bar (title in the display face) |  |  |  |

### New tokens (only where nothing fits)

| Token | Value | Use |
| :--- | :--- | :--- |
| `fontSize.large` | 20 | Answer labels, chips, Next in the large-text flow |
| `fontSize.subtitle` | 18 | Helper line under a question (also closes the open 18 px subtitle question, DESIGN §0.7) |
| `layout.largeRow` | 64 | Answer rows and chips in the large-text flow |
| `layout.largeButton` | 60 | The pinned Next |

Not new: the question weight is `fontWeight.bold` (700; the page's `--font-question-weight` maps to it), the question size is `fontSize.title` + 4 (28, as `ScreenHeader`), and the 88 px mic is `VoiceRecorder`'s own size.

### Large-text pattern (this flow only)

- One question per screen: `ScreenHeader` large, answers as `CheckRow` card large, one pinned `Button` large (Next), `TextButton` Skip under it.
- Tapping an answer only selects it; Next moves on. Next is disabled until an answer is picked, and enabled at once when one is pre-selected (Suggested, heard by voice, or answered before). One extra tap per question, worth it: people review before moving, a mis-tap costs nothing, and pre-selected answers still need a clear way forward.
- The last screen of Part 1 says Save; the last Part 2 question says Done.
- AI only suggests (`Tag` brand Suggested, `Banner` info We heard); safety answers are never pre-selected.
