# S-010 - Light Site Template Refresh

> Stable path `specs/S-010-light-site-template-refresh/SPEC.md`; never move between status folders.

**Spec ID:** S-010
**Status:** complete
**Priority:** 0
**Owner:** Claude
**Updated:** 2026-08-16
**Catalog description:** Re-point the site's visual layer at the refreshed Light Site brand template (teal accent, seven-stop rainbow, diamond crosshatch) without touching navigation or copy.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

The published site renders in the current Claude Design "ScrubLordKay Brand
Template" — specifically the `Kayden Clark - Light Site` screen at its authored
defaults. The prior royal-gold / eight-stop / hexagon layer is gone. Navigation,
page set, headings, and body copy are unchanged; only UI primitives moved.

The owner's design defaults, read from the template's `data-props` block:

| Prop | Default |
|---|---|
| `accent` | `#14707A` (teal; soft pair `#DBEEF0`) |
| `motif` | `Diamonds` |
| `patternVisibility` | `7%` |
| `showRainbow` | `true` |

## Decisions And Contracts

- **Source of truth** is `website/Brand Template/Kayden Clark - Light Site.dc.html`.
  That local mirror was re-synced from the Claude Design project on 2026-08-16;
  the July 13 copy was stale (it still had `Hexagons` + `#225829` defaults and a
  30px diamond tile instead of the current 112px-at-0.85 tile).
- **Tokens** replace the S-004/S-006 palette wholesale in `docs/assets/style.css`:
  surfaces `#f7f5f2 / #fffdfa / #efede7 / #fcfaf5`, borders
  `#e3ded3 / #ddd7cb / #eeeae0`, ink `#241e12 / #3d3522 / #625b4c / #9a9179`,
  accent `#14707a` on `#ffffff`, links `#176e91`.
- **Rainbow** is the template's seven stops at 115deg:
  `#ec0f8c #2323e0 #29abe2 #2ecc40 #e8221a #ff8c1a #ffe600`. A 180deg twin
  (`--rainbow-v`) serves the evidence-kit spine.
- **Background pattern** is the Diamonds motif: a 112-unit crosshatch rendered
  at a 95px tile (112 x 0.85), rainbow-stroked, `opacity .07`.
- **Hero** adopts the template geometry: `border-radius: 8px 8px 20px 20px` and a
  6px rainbow cap. The S-006 gold bracket corners are removed — they came from
  the HUD Console direction, not the Light Site.
- **Section labels keep the S-009 diamond**, recoloured to the new rainbow,
  rather than adopting the template's literal `//` prefix. S-009 deliberately
  removed slash prefixes and `tools/verify-site.mjs` still guards that; a
  CSS-only reintroduction would have reversed an owner decision silently.
- **Dark theme is retained.** The Light Site template is light-only, but the
  toggle is existing behavior, so the dark block mirrors the same token roles
  with a lifted teal (`#3fb3bd`) instead of being deleted.
- **Brand-kit binaries** (crests, sword wordmark) stay in
  `website/Brand Template/assets/`. `docs/` is the publish boundary and the site
  does not reference them; only `kc-logo-rainbow.png` and `headshot.jpg` ship.

## Non-Goals

- No navigation, tab, page-set, heading, or body-copy changes.
- No published metric or claim changes.
- No deployment or push; GitHub Pages publishes from `main` on push.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Re-sync the stale local Light Site mirror from the Claude Design project | done | none | Local copy diverged (Hexagons/#225829/30px tile); rewritten from `DesignSync get_file`; Brand System `.dc.html` diffed and confirmed identical apart from `data-comment-anchor` attributes |
| TK-002 | Replace the brand token layer and retune every hardcoded legacy colour | done | TK-001 | No undefined CSS custom properties; no `--royal-gold` / `--gold-ink` / eight-stop hexes remain |
| TK-003 | Re-point the verifier's brand contract at the new template tokens | done | TK-002 | `node tools/verify-site.mjs` passes; contract now pins accent, soft, contrast, link, surfaces, seven stops, and the 95px pattern tile |

## Acceptance Criteria

- [x] `docs/assets/style.css` resolves the template defaults: accent `#14707a`,
      soft `#dbeef0`, link `#176e91`, page `#f7f5f2`, card `#fffdfa`.
- [x] Hero card renders `8px 8px 20px 20px` with a 6px seven-stop rainbow cap.
- [x] Background pattern is the 95px rainbow diamond crosshatch at 7% opacity.
- [x] No legacy royal-gold token, eight-stop rainbow hex, or hexagon tile
      remains anywhere in the stylesheet.
- [x] Navigation, page set, and body copy are byte-identical to before.
- [x] Light and dark both clear WCAG AA on body text, accent-on-card, primary
      button, and nav/footer links.
- [x] No horizontal overflow at 375px on any page.
- [x] Static verification and spec doctor pass.

## Verification Procedure

```bash
node tools/verify-site.mjs
node --check docs/assets/main.js
node tools/spec-workbench.mjs doctor
git diff --stat -- docs
```

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-08-16 | TK-001 | Ticket closed | Stale mirror replaced from the live design project; motif/accent defaults confirmed as Diamonds/#14707A | S-010 records the re-sync and the staleness finding | none |
| 2026-08-16 | TK-002 | Ticket closed | CSS custom-property audit clean; computed-style probe on all four page types matched the template (hero 8/8/20/20 + 6px cap, chips `#dbeef0`/`#cfe3d6`/`#14707a`, callout `0 12px 12px 0`, impact 26px/800, diagram frame `#fcfaf5`, cs h1 38.4px/900) | S-010 records tokens and geometry | none |
| 2026-08-16 | TK-003 | Ticket closed | `verify-site` passed (33 publishable files, links + placeholders clean) | Verifier brand contract updated in place | none |
| 2026-08-16 | spec | Contrast measured | Light: body 11.15, accent-on-card 5.70, primary button 5.79, nav 6.18, footer 5.25. Dark: body 14.24, accent-on-card 6.96. All AA. | Recorded here | `--text-mute` eyebrow/meta ink is 3.09:1 — the template's own `#9A9179`, kept for fidelity; see Remaining Gap |
| 2026-08-16 | spec | Mobile checked | 375px: `scrollWidth == innerWidth` on home, résumé, projects, and case study; no overflowing elements besides the off-canvas skip link | Recorded here | none |
| 2026-08-16 | spec | Spec completed | Acceptance gates satisfied | Blueprint catalog updated | none |

## Completion Result

The site now renders the refreshed Light Site template: warm paper surfaces,
teal accent, seven-stop rainbow hairlines, and a sparse rainbow diamond
crosshatch. Tabs, page structure, and copy are untouched. The dark toggle
survives on mirrored tokens.

## Remaining Gap

The template's muted eyebrow/meta ink (`#9A9179`, mapped to `--text-mute`)
measures 3.09:1 on card white — below AA for small text, and it is the
template's own value, so it was kept rather than silently corrected. Darkening
that one token to `#7d7462` reaches 4.55:1 with no other visual change. Owner
call.

## Supersession

- Supersedes: S-004 (Brand Template Alignment), S-006 (CV-First Royal Theme)
  visual layers. S-005's light-only lock is partially relaxed: the dark toggle
  predates this spec and is retained.
- Superseded by: none.
