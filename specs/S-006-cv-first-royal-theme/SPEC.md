# S-006 - CV-First Royal Theme

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-006-cv-first-royal-theme/SPEC.md`; never move between status folders.

**Spec ID:** S-006
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-07-14
**Catalog description:** Reframe the portfolio around the current CV with an accessible royal light/dark theme and refined rainbow geometry.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

The portfolio homepage mirrors the structure and emphasis of the current CV,
while the shared site presentation supports light and dark modes with restrained
gold framing, the approved rainbow palette, denser interlocking diamond motifs,
and a subtle smaller hexagon field.

## Why It Matters

The site needs to work as a clear, recruiter-skimmable extension of the current
CV while case-study artifacts are still being developed. The visual system
should feel distinctive and royal without reducing readability or making the
brand decorative at the expense of the resume content.

## Current Verified State

- S-004 aligned the static site to the supplied visual template.
- S-005 intentionally locked that implementation to light mode.
- The current CV is a one-page resume organized as Summary, Core Skills,
  Professional Experience, Key Achievements, and AI & Technical Projects /
  Certification.

## Desired Behavior

- The homepage follows the current CV's content hierarchy and wording, with
  case studies retained as supporting evidence.
- Every publishable page offers an accessible light/dark mode control.
- The chosen theme persists and defaults to the operating-system preference
  when no explicit choice is stored.
- Gold between `#8A7105` and `#B19206` frames corners and primary accents.
- Rainbow rules and motifs use the owner-approved eight-color palette.
- Decorative diamonds interlock more densely while keeping their individual
  colors.
- Background hexagons render at 7% opacity and approximately 5% smaller than
  the current template pattern.

## Decisions And Contracts

- Preserve plain static HTML/CSS/JS and the existing case-study URL structure.
- The current CV is the content source of truth for the homepage hierarchy.
- Use `#9D8106` as the central royal-gold token, inside the owner-approved range.
- Use the exact approved rainbow colors: `#DE2B31`, `#885A89`, `#4DAA57`,
  `#3A7CA5`, `#E0BD3E`, `#CF4F84`, `#FF6201`, and `#1ABCBD`.
- Keep all screenshots and site demo data synthetic and anonymized.
- Add no external dependencies or new external links in this slice.
- The owner's request confirms publication of claims already present in the
  current CV; do not add unsupported claims or client-identifying detail.

## Non-Goals

- Completing or rewriting unfinished case-study artifacts.
- Adding a build system, framework, CDN dependency, or animation-heavy effects.
- Publishing, pushing, or deploying the branch.

## Dependencies And Blockers

- Extends S-001 and S-004.
- Supersedes S-005's light-only theme contract.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Make the homepage CV-first and apply the royal light/dark visual system across all pages | done | none | verify-site passed with fragment checks; main.js syntax clean; Edge at 1440x1000 and 390x844 in light/dark; keyboard toggle persisted after reload; system fallback left storage empty; no overflow or console errors; four screenshots captured under output/playwright |

## Acceptance Criteria

- [x] Homepage sections reflect the current CV's Summary, Core Skills,
  Professional Experience, Key Achievements, and AI/Technical Projects.
- [x] Case-study routes remain discoverable as supporting work samples.
- [x] Light/dark theme control works with keyboard and assistive technology,
  persists an explicit choice, and respects system preference by default.
- [x] Gold corner geometry, the exact eight-color rainbow palette, denser
  interlocking diamonds, and 7%-opacity smaller hexagons are visibly present.
- [x] Desktop and approximately 390px mobile layouts have no horizontal
  overflow and remain readable in both themes.
- [x] Leak, internal-link, placeholder, JavaScript syntax, and spec-doctor gates
  pass.

## Testing Seams

- Extend `tools/verify-site.mjs` first with CV structure, palette, theme-control,
  persistence, hexagon-opacity, and geometry assertions.
- Exercise the public site in a browser at desktop and approximately 390px
  widths in both themes, including keyboard activation and refresh persistence.
- Run the existing static-site verifier and spec doctor.

## Verification Procedure

```bash
node tools/verify-site.mjs
node --check docs/assets/main.js
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- Record implementation and visual proof in this spec.
- Update RUNBOOK only if preview or verification commands change.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-14 | TK-001 | Ticket closed | verify-site passed with fragment checks; main.js syntax clean; Edge at 1440x1000 and 390x844 in light/dark; keyboard toggle persisted after reload; system fallback left storage empty; no overflow or console errors; four screenshots captured under output/playwright | S-006 records the CV-first content and royal theme contract; verifier extended for CV structure, palette, theme hooks, contrast tokens, and fragment targets; RUNBOOK unchanged because commands did not change | none |
| 2026-07-14 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |

## Completion Result

The homepage now follows the current CV's Summary, Core Skills, Professional
Experience, Key Achievements, and AI/Technical Projects hierarchy, with the
three case studies retained as supporting evidence. Every page has an
accessible, persistent light/dark control; an unset preference follows the
operating system. The shared visual system uses the approved rainbow palette,
midpoint royal-gold corner framing, contrast-safe approved gold for small light
text, eight interlocking colored diamonds, and a 7%-opacity hex field reduced
from 56x100 to 53x95. Static verification and real-browser desktop/mobile proof
are green, including fragment targets, keyboard activation, persistence,
overflow, contrast review, and console checks.

## Remaining Limitations Or Follow-Up Specs

- Case-study artifact production remains in S-002.
- Deployment and live smoke testing remain in S-001.

## Supersession

- Supersedes: S-005
- Superseded by: none
