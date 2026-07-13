# S-005 - Light-Only Brand Template

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-005-light-only-template/SPEC.md`; never move between status folders.

**Spec ID:** S-005
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-07-13
**Catalog description:** Lock the portfolio to the supplied light Brand Template and remove dark-theme overrides.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

Every portfolio page renders in the supplied light Brand Template regardless of
operating-system color preference or previously saved browser theme state.

## Why It Matters

The owner selected one visual direction. A dark-mode preference must not replace
the approved warm light canvas, surface, typography, and accent treatment.

## Current Verified State

- S-004 implemented the supplied light design plus an optional dark variant.
- The theme script can still select dark mode from system or saved preferences.

## Desired Behavior

- The site always uses the template's light palette and surfaces.
- No theme toggle is shown in navigation.
- Existing diagrams and responsive behavior remain functional.

## Decisions And Contracts

- `website/Brand Template/Kayden Clark - Light Site.dc.html` remains the visual source of truth.
- Preserve the static HTML/CSS/JS architecture and all published content.
- Remove dark-theme behavior rather than hiding it behind another control.

## Non-Goals

- Changing content, case-study metrics, links, layout, or approved brand assets.
- Committing, pushing, or deploying the repository.

## Dependencies And Blockers

- Supersedes the optional dark-theme portion of S-004.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Remove dark-mode controls and lock the existing template implementation to light | done | none | verify-site passed; main.js syntax clean; Playwright Edge light/dark-preference desktop screenshots were byte-identical; saved dark preference ignored; 390px home and case pages had no overflow; keyboard diagram focus and Escape reset passed |

## Acceptance Criteria

- [x] No theme toggle appears on any page.
- [x] No dark palette or theme persistence remains in publishable CSS/JS.
- [x] The supplied light palette renders at desktop and approximately 390px mobile widths.
- [x] Existing links, leak checks, diagrams, focus behavior, and reduced-motion support remain valid.

## Testing Seams

- Extend `tools/verify-site.mjs` to reject theme-toggle and dark-theme remnants.
- Render with both light and dark system preferences; screenshots must remain light.
- Run existing static verification and spec doctor.

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- Record proof in this spec.
- RUNBOOK remains unchanged because commands do not change.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-13 | TK-001 | Ticket closed | verify-site passed; main.js syntax clean; Playwright Edge light/dark-preference desktop screenshots were byte-identical; saved dark preference ignored; 390px home and case pages had no overflow; keyboard diagram focus and Escape reset passed | S-005 records the light-only contract and proof; verifier rejects theme controls, dark selectors, dark color scheme, and theme persistence; RUNBOOK unchanged | GitHub Pages deployment and live smoke test remain in S-001 |
| 2026-07-13 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |
| 2026-07-13 | fidelity | Restored the template's static `LIGHT · v2` navigation label without reintroducing a control | verify-site passed; label is non-interactive and the site remains light-only | S-005 evidence appended | none |

## Completion Result

The portfolio is now permanently light and matches the approved light Brand
Template. Theme controls, dark selectors, dark color-scheme declarations, and
system/local-storage theme selection were removed. Browser renders are
identical under light and dark operating-system preferences.

## Remaining Limitations Or Follow-Up Specs

- Deployment and live smoke testing remain in S-001.

## Supersession

- Supersedes: S-004 dark-theme option
- Superseded by: none
