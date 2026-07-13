# S-003 - GitHub Repo Hygiene

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-003-github-repo-hygiene/SPEC.md`; never move between status folders.

**Spec ID:** S-003
**Status:** planned
**Priority:** 2
**Owner:** Kayden
**Updated:** 2026-07-13
**Catalog description:** Archive-status READMEs on linked repos and an optional sanitized OpenBrain template.
**Blockers:** none
**Latest event:** Spec captured at Genesis.
**Next gate:** Activate when owner is ready to edit the external repos.

## Outcome

Every external repo the site links to reads as intentional: the three D&D
repos carry a short status note ("built for a live campaign; paused when the
table stopped playing; first AI-assisted build") and are marked Archived on
GitHub so the badge explains itself. Optionally, a sanitized public
`OpenBrain-template` repo (schema, edge function, setup docs, no personal
data) upgrades the OpenBrain card from writeup-only to a real link.

## Why It Matters

The site sends recruiters to GitHub. An unexplained stale repo undermines the
"documented, handoff-ready" positioning; a one-paragraph status note converts
it into a narrative with a timestamp.

## Current Verified State

- `DnDWebApp` is public with a functional README (verified by live fetch
  2026-07-13) but no status note and not marked Archived; `dndAPI` and
  `dndclient` unreviewed.
- OpenBrain repo is private; the site correctly links the on-site writeup
  instead.

## Desired Behavior

- All three D&D repos: status paragraph at the top of the README, GitHub
  Archived flag set.
- Optional: `OpenBrain-template` public repo, and the site card links to it.

## Decisions And Contracts

- Status notes are honest: archived, why, and what it represents. No
  resurrection theater.
- These are owner-account actions on external repos; agents draft text, the
  owner commits/flags.

## Non-Goals

- Reviving D&D development or building new features in those repos.

## Dependencies And Blockers

- none

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Draft status paragraphs for the three D&D repo READMEs | ready | none | pending |
| TK-002 | Owner applies READMEs and sets Archived flag on all three repos | ready | TK-001 | pending |
| TK-003 | Decide on OpenBrain-template repo; if yes, build sanitized version and swap the site card link | deferred | none | pending |

## Acceptance Criteria

- [ ] All three D&D repos show the Archived badge and status paragraph.
- [ ] Site links re-verified live after changes.

## Testing Seams

- Live fetch of each repo URL after owner applies changes.

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- If TK-003 ships, `docs/index.html` OpenBrain card and `docs/openbrain.html`
  gain the repo link.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- none known

## Supersession

- Supersedes: none
- Superseded by: none
