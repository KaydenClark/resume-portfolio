# S-004 - Brand Template Alignment

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-004-brand-template-alignment/SPEC.md`; never move between status folders.

**Spec ID:** S-004
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-07-13
**Catalog description:** Apply the supplied SLK brand template to the static portfolio without changing its verified content architecture.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

The existing recruiter-facing static portfolio uses the supplied SLK visual
system across the home page, case studies, OpenBrain writeup, and operations
playbook while preserving its content, privacy, accessibility, and no-build
hosting contracts.

## Why It Matters

The site should present one coherent personal brand and demonstrate front-end
craft without sacrificing the fast, skimmable, resilient behavior already
verified by S-001.

## Current Verified State

- S-001 provides a content-complete plain HTML/CSS/JS site under `docs/`.
- `website/Brand Template/` contains the owner-supplied visual reference,
  design tokens, component examples, screenshots, and approved brand assets.

## Desired Behavior

- All publishable pages use the template's light editorial styling, typography,
  color, navigation, panel, button, and section-heading language.
- Home-page hierarchy remains recruiter-skimmable and existing destinations,
  diagrams, theme control, and keyboard behavior remain functional.
- The layout remains usable at desktop and approximately 380px mobile widths.

## Decisions And Contracts

- `website/Brand Template/` is the visual source of truth.
- Preserve plain static HTML/CSS/JS and existing page/content architecture.
- Reuse only approved local template assets; add no CDN or external dependency.
- Do not alter published metrics or claims in this slice.
- Preserve anonymization, reduced-motion support, focus states, and semantic HTML.

## Non-Goals

- Rewriting the site in React or importing the Command Information Center app.
- Publishing new claims, metrics, case-study screenshots, or external links.
- Deploying or pushing to GitHub.

## Dependencies And Blockers

- Extends the verified static-site capability in S-001.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Align all static portfolio pages to the supplied SLK brand template | done | none | verify-site passed; main.js syntax clean; Playwright Edge at 1440x1000 and 390x844; light/dark screenshots; theme toggle and keyboard diagram checks passed; no mobile overflow |

## Acceptance Criteria

- [x] Shared design tokens and components match the supplied brand reference.
- [x] Home, case-study, OpenBrain, and playbook surfaces render coherently.
- [x] Existing internal links, privacy scan, and placeholder scan pass.
- [x] Desktop and approximately 380px mobile browser checks pass.
- [x] Reduced-motion and keyboard-visible focus behavior remain present.

## Testing Seams

- Extend `tools/verify-site.mjs` with brand-system assertions before styling.
- Compare browser screenshots against the supplied template references.
- Run the existing static-site verifier and spec doctor.

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- Update this spec with visual and functional evidence.
- Update `RUNBOOK.md` only if the local preview or verification procedure changes.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-13 | TK-001 | Ticket closed | verify-site passed; main.js syntax clean; Playwright Edge at 1440x1000 and 390x844; light/dark screenshots; theme toggle and keyboard diagram checks passed; no mobile overflow | S-004 records the brand contract and verification evidence; verifier extended with brand gates; RUNBOOK unchanged because preview commands did not change | GitHub Pages deployment and live smoke test remain in S-001 |
| 2026-07-13 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |

## Completion Result

The static portfolio now implements the supplied SLK Brand Template as a shared
light-first design system with a companion dark theme. The homepage identity
card, indexed sections, cards, playbook callout, long-form case-study surfaces,
and responsive layouts were visually compared against the supplied reference.
All static verification, syntax, interaction, keyboard, and overflow checks pass.

## Remaining Limitations Or Follow-Up Specs

- GitHub Pages deployment and live smoke testing remain in S-001.

## Supersession

- Supersedes: none
- Superseded by: none
