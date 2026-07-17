# S-002 - Case Study Artifacts

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-002-case-study-artifacts/SPEC.md`; never move between status folders.

**Spec ID:** S-002
**Status:** blocked
**Priority:** 1
**Owner:** Captain-Luna-Engineer
**Updated:** 2026-07-17
**Catalog description:** Anonymized, synthetic-data artifacts and screenshots embedded in the case pages.
**Blockers:** Owner decision: S-007 retires every case-study route; do not re-expose artifacts without approving a new public surface and completing the required eyeball review.
**Latest event:** TK-003 blocked: its required case-page links conflict with the S-007 retired-route contract.
**Next gate:** Owner decides whether to keep artifacts offline or authorize a new reviewed public-surface spec.

## Outcome

Each case-study page's "Artifacts" section is backed by real downloadable or
viewable evidence: anonymized template workbooks, synthetic-data screenshots
(control panel, QA checks, GPM heatmap, rollup views), and the design doc -
so claims are verifiable, not just asserted.

## Why It Matters

"Artifacts" sections currently name items that are not yet linked. A skeptical
reviewer clicking an artifact that isn't there is the same failure as a dead
link. Evidence is the difference between a claim and a case study.

## Current Verified State

- Anonymized source set exists in `real-examples/Portfolio/` (design doc,
  hours-invoicing model, allocation calculator, Erlang planner, WBR deck, SOP)
  - built for exactly this purpose, but not yet copied into `docs/`, not yet
  screenshot, and the roster template with synthetic employees does not exist
  (the real roster workbook must never publish).
- Case pages list artifacts as text only; nothing is linked yet.

## Desired Behavior

- `docs/artifacts/` holds the publishable files; each case page links its own.
- Screenshots use synthetic data only and pass the leak scan.
- The roster case study gets a purpose-built anonymized template with synthetic
  employees demonstrating the triple-validation structure.

## Decisions And Contracts

- Anonymized derivatives are new files under `docs/`; `real-examples/`
  originals never move, publish, or get screenshot with real data visible.
- Every artifact added to `docs/` re-runs the full verification suite before
  commit; file-level anonymization is verified by scan, not assumed.
- Large workbooks may be trimmed for download size; note trims in a README tab.

## Non-Goals

- Interactive spreadsheet embeds or SheetJS viewers (possible later spec).
- Publishing the WBR deck with any campaign branding.

## Dependencies And Blockers

- none (S-001 deploy is not a blocker; artifacts can land before or after).

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Create anonymized roster template with synthetic employees (triple-validation structure visible) | done | none | Red: verifier failed for missing roster template; green: verify-site passed with CSV contract. |
| TK-002 | Screenshot set from anonymized workbooks: control panel, QA checks, rollup views, GPM heatmap; synthetic data only | done | none | Red: verifier failed for four missing screenshot assets; green: all four synthetic SVG screenshots passed XML validation and verify-site. |
| TK-003 | Add `docs/artifacts/`, link artifacts + screenshots from all three case pages, re-run full verification | blocked | Owner decision: this would revive S-007-retired case-study routes and needs the required artifact eyeball review | pending |

## Acceptance Criteria

- [ ] Every "Artifacts" bullet on every case page is a working link or is
      removed.
- [ ] `node tools/verify-site.mjs` passes with the new files in scope.
- [ ] Owner eyeballs each screenshot and artifact for identifying data before
      the publishing commit (mechanical scan + human gate).

## Testing Seams

- Leak scan covers `docs/` recursively, including new artifact filenames and
  any text-bearing formats.
- Link check proves every artifact href resolves.

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- Case pages' Artifacts sections updated in place; no control-doc changes
  expected beyond spec evidence.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-15 | TK-001 | Ticket closed | Red: verifier failed for missing roster template; green: verify-site passed with CSV contract. | SPEC evidence updated; TASKBOARD rendered. | TK-002 screenshot set and TK-003 case-page links remain. |
| 2026-07-15 | TK-002 | Ticket closed | Red: verifier failed for four missing screenshot assets; green: all four synthetic SVG screenshots passed XML validation and verify-site. | SPEC evidence updated; TASKBOARD rendered. | TK-003 must link the completed artifacts from the future public surface; owner must eyeball artifacts before a publishing commit. |
| 2026-07-17 | TK-003 | Ticket blocked | Baseline `node tools/verify-site.mjs` passed (30 publishable files); route inspection confirmed all four legacy case-study pages are S-007 retired redirects. No link change made because it would violate the verified public-surface contract. | SPEC blocker updated; TASKBOARD must be rendered. | Owner must choose a new public-surface spec or keep the synthetic artifacts offline, then eyeball any artifact before publication. |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Interactive artifact viewers would be a new spec.

## Supersession

- Supersedes: none
- Superseded by: none
