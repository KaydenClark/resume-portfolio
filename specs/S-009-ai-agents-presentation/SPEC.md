# S-009 - AI Agents Presentation Project

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-009-ai-agents-presentation/SPEC.md`; never move between status folders.

**Spec ID:** S-009
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-07-14
**Catalog description:** Add AI Agents Presentation immediately after LLM Workbench and before the existing personal projects.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

The Projects page presents AI Agents Presentation directly after the LLM
Workbench foundation feature and before Dungeon Friends and Spotify, with links
to both the live demonstration and its public source.

## Why It Matters

AI Agents Presentation is the project that started the owner's deeper use of
AI. It replaces a conventional slide deck with an interactive house-cleaning
metaphor that helps coworkers understand the difference between a chat window,
an agent's working environment, tools, and coordinated agents.

## Current Verified State

- S-008 added LLM Workbench as the unnumbered foundation above the projects.
- Dungeon Friends and Spotify are the only numbered project cards.
- The projects intro describes two personal projects.

## Desired Behavior

- LLM Workbench remains first and visually distinct from numbered projects.
- AI Agents Presentation is numbered 01 and appears before the existing cards.
- The project explains the interactive house-cleaning metaphor and its origin as
  a more useful presentation format than a slide deck.
- The live demo and GitHub source are both clearly available.
- Dungeon Friends and Spotify remain in their existing order as 02 and 03.
- Desktop and mobile preserve the current visual rhythm and accessibility.

## Decisions And Contracts

- Use the owner-provided live URL and GitHub repository.
- Keep the story first-person and credible; do not overstate technical scope.
- Present the project as an interactive demonstration, not as a PowerPoint or a
  generic AI explainer.
- Preserve plain static HTML/CSS/JS and the existing royal visual system.

## Non-Goals

- Changing LLM Workbench content or placement.
- Rewriting the Dungeon Friends or Spotify descriptions.
- Adding a separate project detail page.
- Pushing GitHub `main` without explicit owner approval.

## Dependencies And Blockers

- Extends and supersedes the Projects-page hierarchy from S-008.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Add AI Agents Presentation after Workbench and verify content, links, order, and responsive rendering | done | S-008 | verify-site passed; main.js syntax clean; in-app Browser at 1440x1000 and 390x844; Workbench then 01/02/03 order verified; both owner-provided destinations opened; no overflow or console errors |

## Acceptance Criteria

- [x] LLM Workbench remains above the numbered project showcase.
- [x] AI Agents Presentation is project 01 and appears before Dungeon Friends.
- [x] The description communicates the house-cleaning metaphor and presentation origin.
- [x] The live demo and GitHub links use the owner-provided destinations.
- [x] Dungeon Friends and Spotify remain in order as projects 02 and 03.
- [x] Desktop and mobile have no overflow or relevant console errors.
- [x] Static verification, JavaScript syntax, and spec doctor pass.

## Testing Seams

- Extend `tools/verify-site.mjs` first with project order, numbering, and link checks.
- Render Projects at desktop and approximately 390px mobile widths.
- Follow both AI Agents Presentation links and verify their destinations.

## Verification Procedure

```bash
node tools/verify-site.mjs
node --check docs/assets/main.js
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- This spec owns the new project content, placement, and browser proof.
- README and RUNBOOK change only if their route or command contracts change.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-15 | TK-001 | Ticket closed | verify-site passed; main.js syntax clean; in-app Browser at 1440x1000 and 390x844; Workbench then 01/02/03 order verified; both owner-provided destinations opened; no overflow or console errors | S-009 and README updated; RUNBOOK checked, no route or command changes | Owner visual and copy feedback before publication |
| 2026-07-14 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |

## Completion Result

The Projects page keeps LLM Workbench first, then presents AI Agents
Presentation as a full-width project 01 feature before Dungeon Friends and
Spotify as 02 and 03. The card tells the interactive house-cleaning origin story
and exposes verified links to the live demonstration and public source.

## Remaining Limitations Or Follow-Up Specs

- Owner visual and copy feedback remains welcome before publication.

## Supersession

- Supersedes: S-008
- Superseded by: none
