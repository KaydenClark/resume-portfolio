# S-011 - Vercel Portfolio Consolidation

> Stable path `specs/S-011-vercel-portfolio-consolidation/SPEC.md`; never move between status folders.

**Spec ID:** S-011
**Status:** complete
**Priority:** 0
**Owner:** Kayden
**Updated:** 2026-08-17
**Catalog description:** Consolidate the public portfolio on the existing `kayden-clark` Vercel project and retire the duplicate `resume-portfolio` project after production verification.
**Blockers:** none
**Latest event:** `kayden-clark` is verified READY in production; the duplicate `resume-portfolio` project was removed.
**Next gate:** none

## Outcome

The public Vercel portfolio is served only from the existing `kayden-clark`
project. The duplicate `resume-portfolio` project is removed only after the
replacement serves the current verified portfolio.

## Why It Matters

One canonical Vercel project avoids stale deployments, ambiguous public URLs,
and accidental maintenance of two portfolio surfaces.

## Current Verified State

- `kayden-clark` (`prj_rVSX2lIr2HZa6N3u0pHJR1agff1i`) is the owner-designated
  Vercel project. Its production domain is `https://kayden-clark.vercel.app`.
- Its latest production deployment is READY and serves the current Business
  Process Analyst portfolio from the verified `main/docs` release with the
  mobile wrapper-width correction recorded in this spec.
- The duplicate `resume-portfolio` project was permanently removed from the
  Vercel team after replacement verification.
- GitHub Pages currently serves the verified current site from `main/docs`.
- The GitHub repository About link points to the owner-selected
  `kayden-clark` Vercel project dashboard.
- The local Vercel CLI has neither a valid `VERCEL_TOKEN` nor an authenticated
  local login. No deployment or deletion can proceed safely until that changes.

## Desired Behavior

- `kayden-clark` serves the exact current portfolio from the immutable
  `origin/main:docs` tree.
- The public Vercel production URL returns the Business Process Analyst title,
  current resume asset, and working internal links.
- `resume-portfolio` is deleted only after its replacement is verified.
- GitHub Pages remains unchanged unless the owner separately directs its
  retirement.

## Decisions And Contracts

- `kayden-clark` is the sole intended Vercel project for this portfolio.
- Never deploy from the dirty local checkout; deploy a clean worktree or an
  immutable archive of `origin/main:docs`.
- The `resume-portfolio` project is a duplicate and may be deleted only after
  the successful `kayden-clark` deployment is verified.
- Deployment is authentication-gated. Do not add, expose, or commit a Vercel
  token; use the owner's Vercel login or securely provided token.
- A repository dashboard URL is not a public portfolio URL. Keep the current
  About link per owner direction; only point it at a Vercel production domain
  if the owner later asks for a public visitor link.

## Non-Goals

- Changing portfolio copy, visual design, metrics, or evidence claims.
- Retiring GitHub Pages without a separate owner instruction.
- Creating a third Vercel project or purchasing/configuring a custom domain.

## Dependencies And Blockers

- Valid Vercel authentication for the owner's team.
- Existing Vercel project `kayden-clark` access.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Deploy the immutable current `main/docs` site to `kayden-clark` and verify the public production URL | done | none | Vercel deployment `dpl_Axq5vwbVhNdYdpk8iGj8HB8FDcGQ` READY; current BPA homepage and resume PDF returned 200; 390px browser measurement confirmed 375px document width |
| TK-002 | Retire the duplicate `resume-portfolio` Vercel project after successful replacement verification | done | none | Vercel CLI reported project removal; subsequent team project listing contains `kayden-clark` and excludes `resume-portfolio` |

## Acceptance Criteria

- [x] `https://kayden-clark.vercel.app` serves the current Business Process
      Analyst portfolio from the verified `main` source plus the documented
      mobile wrapper-width correction.
- [x] The Vercel production deployment is READY with no build errors.
- [x] Home, resume, projects, case-study, and resume-PDF routes succeed on the
      Vercel production URL.
- [x] The `resume-portfolio` project has been deleted after the replacement
      verification.
- [x] `node tools/verify-site.mjs` and `node tools/spec-workbench.mjs doctor`
      pass for the source release.

## Testing Seams

- `node tools/verify-site.mjs` validates the static release tree before deploy.
- Vercel deployment metadata validates the production build state.
- Live HTTP/browser checks validate the production routes and resume asset.
- Vercel project listing validates duplicate-project retirement.

## Documentation Impact

- `README.md` and `RUNBOOK.md` record Vercel `kayden-clark` as the production
  project and prescribe deployment from a clean `docs/` tree.
- This spec supersedes the Vercel-hosting portion of S-001.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-08-17 | spec | Owner approved consolidation to `kayden-clark`; duplicate project identified | Vercel API: `kayden-clark` READY with older deployed content; `resume-portfolio` identified as duplicate and its public domain returned `NOT_FOUND`; GitHub About link verified at the owner-selected Vercel dashboard | Docs checked; no update needed because GitHub Pages remains the actual live host until migration succeeds | Valid Vercel authentication required for deployment and deletion |
| 2026-08-17 | TK-001 | Deployed current portfolio with the mobile wrapper-width correction to `kayden-clark` | `node tools/verify-site.mjs` passed; Vercel deployment `dpl_Axq5vwbVhNdYdpk8iGj8HB8FDcGQ` READY; live homepage and PDF returned 200; 390px CDP measurement: `innerWidth=390`, `scrollWidth=375`, `bodyScrollWidth=375` | README and RUNBOOK switched to the Vercel production procedure | none |
| 2026-08-17 | TK-002 | Removed duplicate `resume-portfolio` project | Vercel CLI reported success; follow-up team project listing excludes `resume-portfolio` and confirms `kayden-clark` remains READY | S-011 completion state recorded | none |

## Completion Result

`kayden-clark` is the sole Vercel project for the portfolio. It serves the
current Business Process Analyst portfolio at `https://kayden-clark.vercel.app`
from READY production deployment `dpl_Axq5vwbVhNdYdpk8iGj8HB8FDcGQ`. The
duplicate `resume-portfolio` project and its deployment history are removed.

## Supersession

- Supersedes: no completed capability.
- Supersedes the Vercel-hosting portion of S-001.
- Superseded by: none.
