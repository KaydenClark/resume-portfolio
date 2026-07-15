# S-001 - Static Portfolio Site

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-001-static-portfolio-site/SPEC.md`; never move between status folders.

**Spec ID:** S-001
**Status:** superseded
**Priority:** 0
**Owner:** Kayden
**Updated:** 2026-07-15
**Catalog description:** Original static portfolio capability and retired GitHub Pages publication plan, superseded by the Vercel-backed public surface in S-007.
**Blockers:** none
**Latest event:** GitHub Pages delivery was retired; S-007 owns the verified Vercel production surface and live smoke proof.
**Next gate:** none

## Outcome

The original v1 static portfolio capability. Its GitHub Pages delivery plan was
retired when S-007 established and verified the canonical Vercel-backed public
surface.

## Why It Matters

This is the product. Recruiters spend under two minutes; the site must survive
a phone, a skim, and a skeptical engineer clicking every link.

## Current Verified State

- `docs/` contains index, three case pages, OpenBrain page, shared CSS/JS, and
  the resume PDF (verified 2026-07-13: leak scan clean, all internal links
  resolve, HTML parses with no unclosed tags, external GitHub links fetched
  live).
- The canonical production site is live at `https://kayden-clark.vercel.app`.
- S-007 records the Vercel production deployment and live browser smoke proof.
- The GitHub Pages URL and setup path are retired and are not publication gates.

## Desired Behavior

- Site is live on the canonical Vercel production alias.
- All external links resolve on the live URL; resume PDF downloads.
- Case-study copy matches owner-confirmed facts (metrics recorded in
  `website/drafts/05-open-questions.md` decision table).

## Decisions And Contracts

- Plain static HTML/CSS/JS, no frameworks, no build step, no CDN dependencies.
- Anonymization contract: generic client descriptors only; employer is "a
  multi-client BPO" in copy; the resume PDF may name employers.
- Private repos (OpenBrain) get on-site writeups, never dead links.
- Vercel is the canonical publication target; production deployment remains
  owner-authorized and requires the verification suite first.

## Non-Goals

- Live data widgets, backends, blogs, analytics (v2 discussions at the
  earliest; new spec if pursued).

## Dependencies And Blockers

- none; the GitHub Pages dependency was retired by the S-007 publication path.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Build core site: index, 3 case pages, OpenBrain page, assets, resume PDF | done | none | verify-site + HTML parse + live external-link fetch, 2026-07-13 |
| TK-002 | Retire first-time GitHub Pages setup in favor of the canonical Vercel publication path | done | none | Retired by owner direction; S-007 records the verified Vercel production deployment |
| TK-003 | Accept the S-007 Vercel live smoke as the publication proof | done | TK-002 | S-007 deployment evidence records live routes, redirects, desktop/mobile checks, and no console errors |

## Acceptance Criteria

- [x] Site reachable at the canonical Vercel production URL.
- [x] `node tools/verify-site.mjs` passes on the deployed content.
- [x] Manual live check: all pages render, all links resolve, resume PDF
      downloads, diagrams respond to hover/keyboard, theme toggle works,
      readable on a ~380px viewport. S-007 records the superseding proof.

## Testing Seams

- `tools/verify-site.mjs` gates leaks, links, and placeholders pre-push.
- Live-URL smoke test is the post-deploy manual seam (record what was clicked).

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- `RUNBOOK.md` owns the Vercel deployment procedure.
- `README.md` identifies the canonical production URL and publication target.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-13 | TK-001 | Core site built (5 HTML pages, shared CSS/JS, resume PDF); Genesis bootstrap ran against this scaffold as the Phase 3 artifact | verify-site passed (leak scan / links / placeholders); HTML parse clean; LLM_Workbench and DnDWebApp links fetched live | Blueprint, Agents, Runbook, Taskboard created and stamped v2.3 | TK-002 deploy + TK-003 live smoke test |
| 2026-07-13 | ad-hoc | Interim feedback draft deployed to Vercel production at `https://kayden-clark.vercel.app` (deployment `dpl_4SnjGanW2aRYiqwohNqL9kLxvsaL`) | Vercel READY; all 6 HTML routes, CSS, JS, and resume PDF returned 200; desktop and 390px screenshots visually checked; no runtime errors in the first hour | Spec updated; no Taskboard change because TK-002 GitHub Pages gate remains open | Owner feedback and planned GitHub Pages deployment remain |
| 2026-07-15 | TK-002/TK-003 | Retired the stale GitHub Pages setup and smoke gates; S-007's Vercel deployment supersedes the original delivery contract | `kayden-clark.vercel.app` returned 200; Vercel reported the `kayden-clark` production deployment Ready; retired Pages URL returned 404; S-007 contains desktop/mobile live proof | S-001, AGENTS, BLUEPRINT, RUNBOOK, README, and generated projections aligned to Vercel | none |

## Completion Result

Superseded rather than completed as originally written. The core static-site
capability shipped, while S-007 replaced the Pages-specific product surface and
owns the canonical Vercel deployment and live verification.

## Remaining Limitations Or Follow-Up Specs

- Case-study artifact downloads/screenshots remain independently owned by S-002.
- Linked-repo hygiene remains independently owned by S-003.

## Supersession

- Supersedes: none
- Superseded by: S-007
