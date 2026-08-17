# S-011 - Vercel Portfolio Consolidation

> Stable path `specs/S-011-vercel-portfolio-consolidation/SPEC.md`; never move between status folders.

**Spec ID:** S-011
**Status:** blocked
**Priority:** 0
**Owner:** Kayden
**Updated:** 2026-08-17
**Catalog description:** Consolidate the public portfolio on the existing `kayden-clark` Vercel project and retire the duplicate `resume-portfolio` project after production verification.
**Blockers:** A valid Vercel CLI authentication session or token is required to deploy the verified site and delete the duplicate project.
**Latest event:** Owner approved consolidation; verified that `kayden-clark` is the intended project and that the local Vercel CLI is unauthenticated.
**Next gate:** Owner authenticates the Vercel CLI, then deploys the immutable `origin/main:docs` tree to `kayden-clark`.

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
- Its latest production deployment is READY but serves an older portfolio
  version, not the Business Process Analyst site currently published from
  `origin/main`.
- `resume-portfolio` (`prj_zZSfMBj0YQnSv5TLYd8XDwN84yL7`) is the duplicate
  project. Its latest production deployment is READY, while its project is not
  live and its public domain returned Vercel `NOT_FOUND` during inspection.
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
| TK-001 | Deploy the immutable current `main/docs` site to `kayden-clark` and verify the public production URL | blocked | Valid Vercel authentication | Vercel production deployment READY; live fetch returns current Business Process Analyst title; `verify-site` passed on the deployed source; desktop/mobile smoke check recorded |
| TK-002 | Retire the duplicate `resume-portfolio` Vercel project after successful replacement verification | blocked | TK-001 | Project no longer appears in the Vercel team project list; `kayden-clark` remains READY and reachable |

## Acceptance Criteria

- [ ] `https://kayden-clark.vercel.app` serves the current Business Process
      Analyst portfolio from the verified `main` source.
- [ ] The Vercel production deployment is READY with no build errors.
- [ ] Home, resume, projects, case-study, and resume-PDF routes succeed on the
      Vercel production URL.
- [ ] The `resume-portfolio` project has been deleted after the replacement
      verification.
- [ ] `node tools/verify-site.mjs` and `node tools/spec-workbench.mjs doctor`
      pass for the source release.

## Testing Seams

- `node tools/verify-site.mjs` validates the static release tree before deploy.
- Vercel deployment metadata validates the production build state.
- Live HTTP/browser checks validate the production routes and resume asset.
- Vercel project listing validates duplicate-project retirement.

## Documentation Impact

- Update `README.md` and `RUNBOOK.md` only after the Vercel production
  transition succeeds; they currently correctly document the live GitHub Pages
  deployment.
- Supersede the hosting portions of S-001 only after acceptance is complete.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-08-17 | spec | Owner approved consolidation to `kayden-clark`; duplicate project identified | Vercel API: `kayden-clark` READY with older deployed content; `resume-portfolio` identified as duplicate and its public domain returned `NOT_FOUND`; GitHub About link verified at the owner-selected Vercel dashboard | Docs checked; no update needed because GitHub Pages remains the actual live host until migration succeeds | Valid Vercel authentication required for deployment and deletion |

## Supersession

- Supersedes: no completed capability.
- Supersedes the Vercel-hosting portion of S-001 only when this spec is complete.
- Superseded by: none.
