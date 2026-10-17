# S-012 - Public Workbench Reference

**Spec ID:** S-012
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-10-17
**Catalog description:** Point the portfolio Workbench presentation at the public Workbench Template.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

The Projects and Resume Workbench entries identify and link to the public
Workbench Template, while preserving the existing portfolio layout and claims.

## Decisions And Contracts

- Owner explicitly requested the public Template link and profile pin replacement.
- Change only the two Workbench entries and directly adjacent copy in the site.
- Preserve CSS, assets, metrics, other projects, historical source provenance,
  and repository/security settings.
- Run task checks and independent Task/Spec review plus pre-PR QA before a PR.
- The owner authorized normal PR requirements to take precedence over the stale
  direct-push recipe. Integration was fast-forwarded to the existing main
  baseline; reviewed feature PR 6 merged into integration, then promotion PR 7
  merged through the enforced main PR gate. No protection bypass was used.
- Vercel production is the canonical portfolio; GitHub Pages remains a fallback.
  Verify actual deployed content and commit separately from local acceptance.

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

| 2026-10-17 | spec | Delivered through protected main and verified canonical production | PR 6 integration 047501a and PR 7 main 3316a07 contain reviewed candidate with identical tree; main verifier and doctor pass; Vercel production dpl_FsTzRKztPKpZB8CH3CtWEBvHiBbY READY; projects and resume HTTP 200 with correct Template links and exact source hashes | Owner authorized normal PR path; no direct protected-main push or settings change; local acceptance evidence retained | Secondary Pages propagation checked separately |
| 2026-10-17 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |

## Completion Result

The two public Workbench entries now identify and link to Workbench Template.
Reviewed candidate 29b2c03 was delivered through PR 6 at integration 047501a and
PR 7 at main 3316a07. Main contains the exact reviewed tree; its site verifier
and doctor pass. Vercel production deployment dpl_FsTzRKztPKpZB8CH3CtWEBvHiBbY is
READY for 3316a07. Both canonical live pages return HTTP 200 with Template links
and no producer destination; response hashes match the committed HTML.
