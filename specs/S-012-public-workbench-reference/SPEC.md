# S-012 - Public Workbench Reference

**Spec ID:** S-012
**Status:** needs-review
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-10-17
**Catalog description:** Point the portfolio Workbench presentation at the public Workbench Template.
**Blockers:** none
**Latest event:** Local Task, assembled candidate and pre-PR QA passed; delivery route awaits parent resolution.
**Next gate:** Resolve documented direct-fast-forward procedure versus main PR requirement before delivery.

## Outcome

The Projects and Resume Workbench entries identify and link to the public
Workbench Template, while preserving the existing portfolio layout and claims.

## Decisions And Contracts

- Owner explicitly requested the public Template link and profile pin replacement.
- Change only the two Workbench entries and directly adjacent copy in the site.
- Preserve CSS, assets, metrics, other projects, historical source provenance,
  and repository/security settings.
- Run task checks and independent Task/Spec review plus pre-PR QA before a PR.
- This repository publishes GitHub Pages from main. RUNBOOK prescribes
  integration-to-main fast-forward direct pushes, while the active main
  ruleset requires a PR. Integration is five commits behind main. Report this
  delivery conflict to the parent; do not bypass the ruleset, invent a new
  workflow or claim deployed verification.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Update both public Workbench entries and verify the presentation | done | none | verify-site, doctor, diff check and 1440/390px page QA pass; independent Task and local pre-PR QA PASS at dc92726 |

## Acceptance Criteria

- [x] Both Workbench entries identify and link to KaydenClark/Workbench_Template.
- [x] The two entries contain no LLM_Workbench destination or private-producer open-source claim.
- [x] Static site checks, doctor, diff review and focused page QA pass.
- [x] Independent Task and Spec review and pre-PR QA pass for the candidate.

## Verification Procedure

Run `node tools/verify-site.mjs`, `node tools/spec-workbench.mjs doctor`,
`git diff --check`, and inspect both Workbench entries and their exact links.
Review the immutable candidate independently before PR creation. Delivery and
live verification remain separate from local acceptance.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-10-17 | spec | Owner selected this bounded update | Current producer visibility private; public Template identity confirmed; pristine clone starts from remote main | This Spec owns the new presentation change; S-011 remains unchanged historical deployment evidence | Implementation, review and delivery |
| 2026-10-17 | TK-001 | Ticket closed | verify-site, doctor, diff check and 1440/390px page QA pass; independent Task and local pre-PR QA PASS at dc92726 | S-012 records bounded presentation update and actual release gate conflict | Final assembled review; parent resolution of direct-FF Runbook versus main PR rule; live verification |

| 2026-10-17 | TK-001 | Local candidate reviewed; delivery conflict corrected | dc92726 Task PASS and local pre-PR QA PASS; assembled reviewer required correcting the release-workflow statement; current Runbook and ruleset evidence establish the conflict | Corrected only the workflow statement; HTML unchanged | Final assembled delta review; parent delivery-route resolution; deployed verification |

| 2026-10-17 | spec | Corrected candidate independently reviewed | 45149f3 Task PASS, assembled candidate PASS and local pre-PR QA PASS; 1440px and 390px screenshots, exact-link click checks, no overflow or console errors | Acceptance reflects local preparation only; delivery is not complete | Parent resolution of documented direct-FF procedure versus main PR rule; then authorized delivery and live verification |

## Completion Result

Both Workbench entries are implemented locally and pass the configured checks
and focused desktop/mobile QA. Independent Task, assembled candidate and local
pre-PR QA review passed at 45149f3. This bookkeeping update records those
verdicts; the reviewed HTML is unchanged. No PR, push, main promotion or
deployment has occurred. Delivery and live verification remain open.
