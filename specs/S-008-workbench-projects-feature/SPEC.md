# S-008 - Workbench Projects Feature

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-008-workbench-projects-feature/SPEC.md`; never move between status folders.

**Spec ID:** S-008
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-07-14
**Catalog description:** Feature LLM Workbench as the system behind the work above the unchanged personal-projects heading.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

The Projects page opens with a distinct LLM Workbench feature titled “The
system behind the work,” followed by the unchanged “Things I’m building because
I want them to exist” section for Dungeon Friends and Spotify.

## Why It Matters

LLM Workbench explains how the owner approaches building across projects. It
should read as the foundation beneath the portfolio rather than compete with
the two personal projects as another numbered card.

## Current Verified State

- S-007 split the site into landing, resume, and projects pages.
- The Projects page currently begins with the personal-projects heading and two
  feature cards.
- LLM Workbench remains listed on the resume page.

## Desired Behavior

- A compact Workbench feature appears before the existing projects intro.
- The feature is labeled “The system behind the work” and names LLM Workbench.
- The current “Things I’m building because I want them to exist” heading and
  both existing project cards remain unchanged.
- Desktop and mobile preserve the current visual rhythm and accessibility.

## Decisions And Contracts

- Reuse the existing public LLM Workbench GitHub destination already present on
  the resume page.
- Present Workbench as a foundation/method, not project number 03.
- Preserve plain static HTML/CSS/JS and the existing royal visual system.

## Non-Goals

- Rewriting the Dungeon Friends or Spotify content.
- Adding a Workbench detail page or new external destination.
- Pushing GitHub `main` without explicit owner approval.

## Dependencies And Blockers

- Extends and supersedes the Projects-page hierarchy from S-007.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Add and verify the Workbench foundation feature above the existing project heading | done | none | verify-site passed; main.js syntax clean; in-app Browser at 1440x1000 and 390x844; Workbench hierarchy and two-card contract verified; GitHub destination resolved; no overflow or console errors |

## Acceptance Criteria

- [x] “The system behind the work” appears above the existing projects title.
- [x] The feature names and describes LLM Workbench.
- [x] The existing projects title remains word-for-word unchanged.
- [x] Dungeon Friends and Spotify remain the only numbered project cards.
- [x] Desktop and mobile have no overflow or relevant console errors.
- [x] Static verification, JavaScript syntax, and spec doctor pass.

## Testing Seams

- Extend `tools/verify-site.mjs` first with content-order and card-count checks.
- Render Projects at desktop and approximately 390px mobile widths.
- Follow the Workbench link and verify the existing external destination.

## Verification Procedure

```bash
node tools/verify-site.mjs
node --check docs/assets/main.js
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- This spec owns the Workbench feature hierarchy and browser proof.
- README and RUNBOOK checked; update only if their route/command contracts
  change.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-14 | TK-001 | Ticket closed | verify-site passed; main.js syntax clean; in-app Browser at 1440x1000 and 390x844; Workbench hierarchy and two-card contract verified; GitHub destination resolved; no overflow or console errors | S-008 updated; README and RUNBOOK checked, no route or command changes | Vercel redeploy and owner visual feedback |
| 2026-07-14 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |
| 2026-07-14 | deployment | Vercel production deployment `dpl_2Kebzhxj9ukfCSAxSnvaN16wrgDj` reached Ready and the `kayden-clark.vercel.app` alias rendered Workbench before the unchanged personal-projects section | Deployment proof recorded here; no Vercel metadata added to the repository | Owner visual feedback |

## Completion Result

The Projects page now opens with an LLM Workbench foundation band using “My
operating system” as its kicker and “The system behind the work” as its primary
headline. The unchanged “Things I’m building because I want them to exist”
section follows with Dungeon Friends and Spotify as the only numbered project
cards. Desktop/mobile layout, the existing Workbench link, console health,
overflow, and the full static verification suite are green.

## Remaining Limitations Or Follow-Up Specs

- Workbench remains an external GitHub link rather than an internal detail page.
- GitHub `main` publication remains owner-gated.

## Supersession

- Supersedes: S-007
- Superseded by: none
