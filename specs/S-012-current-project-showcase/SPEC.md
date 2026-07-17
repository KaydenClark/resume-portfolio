# S-012 - Current Project Showcase

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-012-current-project-showcase/SPEC.md`; never move between status folders.

**Spec ID:** S-012
**Status:** active
**Priority:** 0
**Owner:** Codex-Engineer
**Updated:** 2026-07-17
**Catalog description:** Keep the selected-project showcase aligned to current product identities, evidence destinations, and truthful active-status framing.
**Blockers:** Adding new external links or adding another project to the selected public showcase requires owner approval under AGENTS.md.
**Latest event:** TK-001 checkpoint aligns the existing Spotify card to Spotify Atlas and adds identity/status verifier coverage without adding an external URL.
**Next gate:** Audit the pushed checkpoint at an exact head and capture the required desktop/mobile screenshots when a browser session is available.

## Outcome

The public Projects page presents the currently selected work with canonical
names, truthful status, concise user-facing narratives, and a verified evidence
destination where one is approved. Portfolio controls never describe
DnDWebApp, dndAPI, or dndclient as archived or inactive while the active
campaign-platform program owns them.

## Why It Matters

Project presentation is the portfolio's strongest proof beyond the resume.
Stale names or lifecycle claims make the site look abandoned and can direct a
recruiter to the wrong product story. At the portfolio harvest, source still
said “Spotify Listening” rather than the settled “Spotify Atlas” identity, and
older canon still called the three D&D repositories archive candidates even
though all three were live and unarchived.

## Current Verified State

- Local source presents LLM Workbench, AI Agents Presentation, Dungeon Friends,
  and Spotify Atlas in that order.
- S-008 and S-009 own the completed Workbench and AI Agents Presentation
  features; S-007 owns the current multipage shell.
- The live production page predates S-009 and currently omits AI Agents
  Presentation; S-011 owns that release drift.
- GitHub reports `KaydenClark/DnDWebApp`, `KaydenClark/dndAPI`, and
  `KaydenClark/dndclient` are all unarchived on 2026-07-17. Current direction
  makes DnDWebApp the active campaign-platform owner while preserving all three
  histories.
- Existing source has no public DnDWebApp card and no external links for
  Dungeon Friends or Spotify Atlas.

## Desired Behavior

- LLM Workbench remains the unnumbered system behind the work.
- AI Agents Presentation remains the first numbered project with its live demo
  and public source.
- Dungeon Friends remains a current, actively iterated game project.
- Spotify uses the canonical product identity “Spotify Atlas” and describes
  personal listening ingestion, visualization, and insight without exposing
  private listening data.
- Every approved external destination resolves and matches the product named by
  the card.
- No portfolio control, verifier, or public copy labels DnDWebApp, dndAPI, or
  dndclient archived, paused, retired, or inactive.
- Whether the DnD campaign platform joins the selected public showcase remains
  an explicit owner editorial choice; the status truth is not optional.

## Decisions And Contracts

- This spec supersedes only the evolving selected-project catalog state; it
  preserves completed evidence in S-007, S-008, and S-009.
- The public showcase is curated, not an automatic mirror of every active
  GPT_OS project.
- Canonical product names come from the owning project controls and current
  owner direction.
- A project gets no dead or speculative link. Private or unapproved work uses
  an on-site summary or no link.
- New external links and expansion of the selected showcase remain owner gates
  under `AGENTS.md`.
- S-003 owns reusable external-destination health checks; S-011 owns production
  publication.

## Non-Goals

- Presenting all nine GPT_OS projects by default.
- Editing the DnDWebApp, dndAPI, dndclient, Dungeon Friends, Spotify Atlas, or
  AI Agents Presentation repositories.
- Claiming private metrics, raw listening history, or unverified release state.
- Deploying or publishing from this planning task.

## Dependencies And Blockers

- S-008 and S-009 provide the completed Workbench and AI Agents presentation
  features.
- S-003 supplies external-destination accuracy checks.
- S-010 supplies privacy acceptance for screenshots, data, and downloadable
  evidence.
- S-011 owns release alignment after project copy and destinations are settled.
- Owner approval is required for any new external link or selected-project
  addition.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Add failing identity/status assertions, rename the existing Spotify card to Spotify Atlas, and align selected-project copy without adding a new external link | in-progress | none | red/green and full local checks passed; exact-head audit and screenshots pending |
| TK-002 | Add owner-approved evidence destinations for Dungeon Friends and Spotify Atlas, then verify each destination and the desktop/mobile card behavior | blocked | TK-001, S-003, and owner approval for each new external link | pending |
| TK-003 | Decide whether the active DnD campaign platform belongs in the selected showcase; if approved, add one cohesive DnDWebApp presentation without inactive framing or repository consolidation claims | blocked | TK-001 and owner editorial choice | pending |
| TK-004 | Run the complete local project-presentation proof and hand the exact expected markers to S-011's release candidate | ready | TK-002, TK-003 | pending |

### Ticket Done Criteria And Required Proof

- **TK-001:** Done when a failing verifier assertion precedes source changes,
  the public card uses “Spotify Atlas,” selected-project copy remains accurate,
  and no new external URL is added. Proof is red/green output, source diff,
  JavaScript syntax, full verifier, and desktop/mobile screenshots.
- **TK-002:** Done when Kayden approves each new destination, the Dungeon
  Friends and Spotify Atlas cards expose only those verified destinations, and
  layout/accessibility remain intact. Proof is approval, S-003 results,
  browser navigation, screenshots, console health, and full verification.
- **TK-003:** Done when Kayden records include or decline. If included, one
  cohesive DnDWebApp presentation uses current campaign-platform framing and
  approved evidence without implying repository retirement or history loss.
  Proof is the owner verdict; an included card also requires S-003 checks and
  desktop/mobile browser evidence.
- **TK-004:** Done when all selected-project identities, order, approved links,
  mobile/desktop rendering, focus behavior, and console checks pass and S-011
  receives exact expected live markers. Proof is the verifier, syntax check,
  browser evidence, link report, and marker handoff.

## Acceptance Criteria

- [ ] The selected showcase uses canonical, current project identities.
- [ ] Spotify is presented as Spotify Atlas with privacy-safe, accurate scope.
- [ ] Workbench, AI Agents Presentation, and Dungeon Friends retain their
      intended hierarchy and truthful narratives.
- [ ] No publishable or canonical portfolio text labels DnDWebApp, dndAPI, or
      dndclient archived, paused, retired, or inactive.
- [ ] Every public external project destination is owner-approved, resolves,
      and matches the named project.
- [ ] Desktop and approximately 390px mobile layouts remain readable and
      keyboard-accessible.
- [ ] The DnD campaign-platform inclusion choice is recorded without blocking
      status accuracy for existing content.

## Testing Seams

- Extend `tools/verify-site.mjs` first with the Spotify Atlas identity and
  forbidden stale DnD lifecycle framing.
- Verify content order and card count without making card count a proxy for the
  unresolved DnD inclusion choice.
- Fetch approved public destinations and confirm repository/product identity.
- Exercise desktop and approximately 390px mobile rendering, focus order, and
  console health.

## Verification Procedure

```bash
node tools/verify-site.mjs
node --check docs/assets/main.js
node tools/spec-workbench.mjs doctor
```

Approved external destinations also receive a live fetch and browser check.

## Documentation Impact

- This spec owns selected-project identity, narrative, status, and proof.
- `README.md` updates when public project names or routes change.
- `BLUEPRINT.md` owns the curated-showcase principle and current product map.
- `RUNBOOK.md` changes only if the verification workflow changes.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-17 | spec | Portfolio coverage harvest | Source inspection confirmed current local order and Spotify naming; GitHub read-only metadata confirmed all three DnD repositories are unarchived | S-012 created; Blueprint stale archive canon removed; S-003 reframed around destination accuracy | TK-001 through TK-004 remain |
| 2026-07-17 | TK-001 | Added verifier assertions for the Spotify Atlas identity, privacy-safe scope, project order, and direct stale lifecycle framing; renamed and aligned the existing link-free Spotify card | Red: `node tools/verify-site.mjs` failed on six expected Spotify identity/scope assertions, and a focused stale-status probe failed with `IDENTITY README.md gives DnDWebApp a stale lifecycle status`; green: verifier, JavaScript syntax, and spec doctor passed; source diff added no external URL | `README.md`, `BLUEPRINT.md`, and S-012 updated; Runbook checked, no change needed because commands did not change | Exact-head audit and desktop/mobile screenshots remain before close |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Full case studies or interactive project demos are separate capabilities and
  require explicit owner direction.

## Supersession

- Supersedes: S-009 for future selected-project catalog state
- Superseded by: none
