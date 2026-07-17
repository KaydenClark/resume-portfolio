# S-011 - Release Alignment

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-011-release-alignment/SPEC.md`; never move between status folders.

**Spec ID:** S-011
**Status:** active
**Priority:** 2
**Owner:** unassigned
**Updated:** 2026-07-17
**Catalog description:** Make the approved source checkpoint, public Git recovery point, and Vercel production alias describe the same verified portfolio release.
**Blockers:** Publishing to GitHub main and production deployment require explicit owner authorization and a completed privacy gate.
**Latest event:** Live inspection found production Ready but one feature behind the current source: AI Agents Presentation is absent from the deployed Projects page.
**Next gate:** Claim TK-001 and add a read-only release-drift report.

## Outcome

The portfolio has one observable release state: an approved Git commit is
recoverable remotely, Vercel production serves that exact content, and a
repeatable smoke report proves the public routes, resume PDF, project markers,
and retired-route behavior.

## Why It Matters

The current site returns HTTP 200 and Vercel reports Ready, but readiness alone
does not prove content freshness. The production deployment predates S-009 and
does not show AI Agents Presentation, while the current branch does. Recruiters
and the owner need release evidence that distinguishes availability from
source-to-production alignment.

## Current Verified State

- `https://kayden-clark.vercel.app`, `resume.html`, `projects.html`, and the
  resume PDF returned HTTP 200 on 2026-07-17.
- Vercel deployment `dpl_2Kebzhxj9ukfCSAxSnvaN16wrgDj` is production and Ready,
  created 2026-07-14.
- The live Projects page contains LLM Workbench, Dungeon Friends, and Spotify,
  but not AI Agents Presentation.
- The current branch contains S-009's AI Agents Presentation source plus the
  S-002 artifact checkpoint and is remotely recoverable.
- `origin/main` remains at `4ef63f7`; the live deployment was uploaded through
  the Vercel CLI and is not identified by a source SHA in `vercel inspect`.

## Desired Behavior

- A read-only command reports local HEAD, upstream HEAD, approved release
  commit, Vercel deployment ID/status/date, route status, and expected content
  markers.
- Release planning names the exact commit before any production action.
- Git publication and Vercel deployment are separate, explicit owner gates.
- Production smoke verifies all public routes, the resume PDF, project identity
  and order, retired redirects, responsive rendering, keyboard navigation, and
  console health.
- Recovery proof shows the exact released commit can be fetched from the
  canonical GitHub repository.

## Decisions And Contracts

- Vercel project `kayden-clark` and alias `kayden-clark.vercel.app` remain the
  canonical production target.
- `docs/` remains the complete deployable output; there is no build step.
- HTTP 200 is necessary but insufficient; expected content markers and source
  identity are part of release health.
- S-010 privacy acceptance must pass before a deployment that includes new or
  changed assets.
- Agents may prepare and verify a release, but GitHub main publication and
  production deployment remain owner-authorized actions.

## Non-Goals

- Changing credentials, domains, billing, Vercel account ownership, or project
  linkage.
- Deploying from this planning task.
- Introducing a framework, backend, analytics, or build pipeline.
- Treating preview deployments as production acceptance.

## Dependencies And Blockers

- S-010 must provide the approved privacy manifest for release content.
- S-012 must settle the project identities and public copy included in the
  candidate release.
- Owner authorization is required for GitHub main publication and Vercel
  production deployment.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Add a read-only release-drift report that compares local/upstream Git state, Vercel deployment metadata, live route status, and expected public markers | ready | none | pending |
| TK-002 | Produce an exact candidate release commit and clean-clone proof after S-010 privacy and S-012 project-identity gates pass | ready | TK-001, S-010, S-012 | pending |
| TK-003 | Publish the approved release commit to the owner-selected Git branch and deploy that exact content to Vercel production | blocked | TK-002 and explicit owner Git/deployment authorization | pending |
| TK-004 | Run desktop/mobile live smoke, verify recovery from the canonical remote, and record deployment ID plus exact released commit | ready | TK-003 | pending |

### Ticket Done Criteria And Required Proof

- **TK-001:** Done when one read-only command reports local/upstream/release
  SHAs, Vercel ID/status/date, route statuses, and expected content-marker
  differences. Proof must include a failing freshness result against the
  current production page and green fixtures for aligned content.
- **TK-002:** Done when the candidate release names one exact SHA, passes S-010
  and S-012, and reproduces from a clean clone. Proof is the SHA, clean-clone
  commands, privacy/project handoffs, and full verification output.
- **TK-003:** Done only after explicit owner Git and production-deploy approval,
  when the approved SHA is remotely recoverable and its exact `docs/` content
  is deployed to production. Proof is approval, remote ref, deployment ID, and
  Vercel Ready output.
- **TK-004:** Done when desktop/mobile browser smoke and route/content checks
  pass against production and the exact release SHA fetches from the canonical
  remote. Proof is screenshots or a short recording, route report, console
  result, remote fetch, and recorded deployment-to-SHA mapping.

## Acceptance Criteria

- [ ] One command reports source, remote, deployment, route, and content-marker
      drift without mutating Git or Vercel.
- [ ] The candidate release is identified by an exact remotely recoverable SHA.
- [ ] Privacy and project-identity gates pass before publication.
- [ ] Owner authorization for Git publication and production deployment is
      recorded.
- [ ] Vercel production serves the exact approved content and all expected
      routes and assets pass live smoke.
- [ ] The released commit can be fetched from
      `KaydenClark/resume-portfolio`.

## Testing Seams

- Prove the drift report detects the current missing AI Agents Presentation
  marker on production.
- Run the local verifier and JavaScript syntax check before any candidate is
  named.
- Compare live route bodies, not only status codes.
- Use desktop and approximately 390px browser checks for the final smoke.

## Verification Procedure

```bash
node tools/verify-site.mjs
node --check docs/assets/main.js
node tools/spec-workbench.mjs doctor
npx --yes vercel inspect https://kayden-clark.vercel.app
```

TK-001 adds the canonical non-mutating drift command; TK-004 records the exact
live browser and remote-recovery proof.

## Documentation Impact

- This spec owns release requirements, decisions, and proof.
- `RUNBOOK.md` owns exact drift, candidate, deploy, smoke, and recovery commands.
- `README.md` changes only when the public route or deployment contract changes.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-17 | spec | Portfolio coverage harvest | Four canonical URLs returned 200; Vercel inspect reported deployment `dpl_2Kebzhxj9ukfCSAxSnvaN16wrgDj` Ready; body comparison proved the live Projects page omits AI Agents Presentation | S-011 created; Blueprint and Runbook corrected to distinguish availability from freshness | TK-001 through TK-004 remain |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- A custom domain is not part of current settled direction.

## Supersession

- Supersedes: S-001's delivery contract and S-007's one-time deployment proof
- Superseded by: none
