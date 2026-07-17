# S-003 - External Project Link Integrity

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-003-github-repo-hygiene/SPEC.md`; never move between status folders.

**Spec ID:** S-003
**Status:** active
**Priority:** 3
**Owner:** unassigned
**Updated:** 2026-07-17
**Catalog description:** Keep every public project destination reachable, identity-correct, and free of stale archive or activity claims.
**Blockers:** Adding a new external link remains an owner gate; private projects need an approved public source or an on-site writeup.
**Latest event:** Stale plans to archive DnDWebApp, dndAPI, and dndclient were retired after current direction and live GitHub metadata confirmed all three are active and unarchived.
**Next gate:** Claim TK-002 and build the reusable external-destination verifier.

## Outcome

Every external project destination published by the portfolio resolves to the
intended current product and carries no portfolio-authored lifecycle claim that
contradicts the owning repository. The active DnDWebApp, dndAPI, and dndclient
histories remain intact and are never treated as archive candidates by this
project.

## Why It Matters

The site sends recruiters to evidence outside the repository. A link that is
dead, private, mislabeled, or paired with a stale status claim weakens the whole
portfolio. The prior S-003 direction would also have instructed the owner to
archive three repositories that current portfolio canon explicitly keeps
active.

## Current Verified State

- The current public site links to GitHub, LinkedIn, LLM Workbench, and AI
  Agents Presentation destinations; the local source also links to the live AI
  Agents Presentation demo.
- `tools/verify-site.mjs` validates internal links but does not perform a
  repeatable external-destination health or identity check.
- Read-only GitHub metadata on 2026-07-17 reported:
  - `KaydenClark/DnDWebApp`: public, unarchived, default branch `main`, pushed
    2026-07-17;
  - `KaydenClark/dndAPI`: public, unarchived, default branch `master`, pushed
    2026-06-16;
  - `KaydenClark/dndclient`: public, unarchived, default branch `master`, pushed
    2026-06-16.
- Current owner direction makes DnDWebApp the canonical active
  history-preserving campaign-platform owner; it does not authorize repository
  deletion, retirement, or archive flags.
- OpenBrain is private and absent from the current public navigation.

## Desired Behavior

- A deterministic checker inventories every external URL in publishable HTML,
  follows redirects safely, reports status, and confirms expected host/project
  identity.
- Checks distinguish a transient network failure from a confirmed broken or
  private destination without silently passing either.
- Portfolio canon contains no claim that DnDWebApp, dndAPI, or dndclient is
  archived, paused, retired, or inactive.
- New external destinations are added only after owner approval and a verified
  public evidence path.
- Private projects use an owner-approved on-site narrative or remain unlinked;
  the portfolio never promises a public repository that does not exist.

## Decisions And Contracts

- This stable path is reused because S-003 already owned external repository
  hygiene; its obsolete archive plan is replaced, not duplicated.
- The portfolio may describe what a project demonstrates, but lifecycle truth
  comes from the owning repository and current owner direction.
- No task in this spec edits, archives, consolidates, deletes, or changes
  settings in an external repository.
- Link checks are read-only and must not require storing credentials in this
  repository.
- S-012 owns selected-project copy and placement. S-003 owns reusable
  destination health and status-accuracy safeguards.

## Non-Goals

- Archiving DnDWebApp, dndAPI, dndclient, or any other repository.
- Creating an OpenBrain template repository without a separate owner decision
  in the OpenBrain project.
- Publishing every active GPT_OS project.
- Editing README files or GitHub settings in external repositories.

## Dependencies And Blockers

- S-012 supplies the owner-approved destination set for selected projects.
- New external links require owner approval under `AGENTS.md`.
- Network checks must fail clearly when GitHub, LinkedIn, or a project host is
  unavailable.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Replace stale archive canon with verified active/unarchived DnD-suite status and preserve all three repository histories | done | none | Owner direction plus `gh repo view` on 2026-07-17 confirmed all three repositories unarchived; Blueprint and S-003 corrected |
| TK-002 | Add a read-only external-destination inventory and verifier with explicit timeout, redirect, status, and expected-identity reporting | ready | none | pending |
| TK-003 | Run the verifier against every current public destination and correct any broken or mislabeled existing link without adding a new destination | ready | TK-002 | pending |
| TK-004 | Validate each owner-approved new project link from S-012 and capture final external-link proof for the release candidate | blocked | TK-003, S-012, and owner approval for each new external link | pending |

### Ticket Done Criteria And Required Proof

- **TK-001:** Done when all canonical portfolio controls describe the DnD
  repository suite as active/history-preserved and contain no archive action.
  Proof is the owner direction, read-only GitHub metadata for all three
  repositories, stale-text search, render, and doctor.
- **TK-002:** Done when one documented command discovers external URLs from
  publishable HTML and returns explicit timeout, redirect, HTTP status, and
  expected-identity results. Proof is red/green fixture output for good,
  redirect, 404, timeout, and identity-mismatch cases.
- **TK-003:** Done when every currently published destination has a recorded
  pass or a precise blocker and any existing mislabel is corrected. Proof is
  the command output, targeted content assertions, and full local verification.
- **TK-004:** Done when every owner-approved new S-012 destination passes the
  same health/identity gate and its approval is recorded. Proof is the approval
  reference, external check output, browser navigation, and release handoff.

## Acceptance Criteria

- [x] Portfolio canon no longer directs anyone to archive DnDWebApp, dndAPI, or
      dndclient.
- [ ] Every external URL in publishable HTML appears in one generated or
      repeatable inventory.
- [ ] Each current destination passes reachability and expected-identity checks
      or has a precise recorded blocker.
- [ ] No external check requires committed credentials or mutates another
      service.
- [ ] New external links have explicit owner approval and verified public
      destinations.
- [ ] The release candidate carries no stale archive/inactive framing for the
      DnD repository suite.

## Testing Seams

- Test the checker with a known-good URL, redirect, 404, timeout, and
  identity-mismatch fixture.
- Parse every publishable HTML file rather than maintaining a hand-copied URL
  list.
- Confirm GitHub repository identity through read-only public metadata.
- Keep the static local verifier deterministic; network checks run as an
  explicit release gate with clear failure output.

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

TK-002 adds the exact external-destination command to `RUNBOOK.md`.

## Documentation Impact

- This spec records repository-status and external-destination proof.
- `BLUEPRINT.md` owns the rule that project status must follow current owning
  canon.
- `RUNBOOK.md` gains the exact external-link verification command.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-17 | TK-001 | Stale archive direction superseded | Owner's portfolio direction identifies the DnD program as active; read-only GitHub metadata confirmed DnDWebApp, dndAPI, and dndclient are public and unarchived | S-003 outcome, contracts, tickets, and Blueprint canon rewritten in place | TK-002 through TK-004 remain |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Project-specific README quality belongs to each owning repository, not this
  portfolio.

## Supersession

- Supersedes: S-003's 2026-07-13 archive-status plan
- Superseded by: none
