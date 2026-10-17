# S-012 - Public Workbench Reference

**Spec ID:** S-012
**Status:** active
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-10-17
**Catalog description:** Point the portfolio Workbench presentation at the public Workbench Template.
**Blockers:** none
**Latest event:** TK-001 claimed by Codex.
**Next gate:** Close TK-001 with verification and documentation proof.

## Outcome

The Projects and Resume Workbench entries identify and link to the public
Workbench Template, while preserving the existing portfolio layout and claims.

## Decisions And Contracts

- Owner explicitly requested the public Template link and profile pin replacement.
- Change only the two Workbench entries and directly adjacent copy in the site.
- Preserve CSS, assets, metrics, other projects, historical source provenance,
  and repository/security settings.
- Run task checks and independent Task/Spec review plus pre-PR QA before a PR.
- This repository publishes GitHub Pages from main and has an active main PR
  ruleset. Its current controls do not define integration promotion; report
  this distinction before delivery rather than creating a new workflow.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Update both public Workbench entries and verify the presentation | in-progress | none | pending |

## Acceptance Criteria

- [ ] Both Workbench entries identify and link to KaydenClark/Workbench_Template.
- [ ] The two entries contain no LLM_Workbench destination or private-producer open-source claim.
- [ ] Static site checks, doctor, diff review and focused page QA pass.
- [ ] Independent Task and Spec review and pre-PR QA pass for the candidate.

## Verification Procedure

Run `node tools/verify-site.mjs`, `node tools/spec-workbench.mjs doctor`,
`git diff --check`, and inspect both Workbench entries and their exact links.
Review the immutable candidate independently before PR creation. Delivery and
live verification remain separate from local acceptance.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-10-17 | spec | Owner selected this bounded update | Current producer visibility private; public Template identity confirmed; pristine clone starts from remote main | This Spec owns the new presentation change; S-011 remains unchanged historical deployment evidence | Implementation, review and delivery |

## Completion Result

Pending.
