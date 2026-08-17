# S-002 - Case Study Artifacts

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-002-case-study-artifacts/SPEC.md`; never move between status folders.

**Spec ID:** S-002
**Status:** active
**Priority:** 1
**Owner:** Kayden
**Updated:** 2026-07-13
**Catalog description:** Anonymized, synthetic-data artifacts and screenshots embedded in the case pages.
**Blockers:** none
**Latest event:** Spec captured at Genesis; synthetic artifact plan is ready.
**Next gate:** Produce the anonymized roster template (TK-001).

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

- Publishable counterparts for the design doc, hours-invoicing model,
  allocation calculator, Erlang planner, WBR deck, and SOP do not yet exist
  under `docs/`; the roster template with synthetic employees is also pending.
- Case pages list artifacts as text only; nothing is linked yet.

## Desired Behavior

- `docs/artifacts/` holds the publishable files; each case page links its own.
- Screenshots use synthetic data only and pass the leak scan.
- The roster case study gets a purpose-built anonymized template with synthetic
  employees demonstrating the triple-validation structure.

## Decisions And Contracts

- Anonymized derivatives are new files under `docs/`; only anonymized or
  synthetic inputs may enter tracked files, and screenshots use generated data.
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
| TK-001 | Create anonymized roster template with synthetic employees (triple-validation structure visible) | ready | none | pending |
| TK-002 | Screenshot set from anonymized workbooks: control panel, QA checks, rollup views, GPM heatmap; synthetic data only | ready | none | pending |
| TK-003 | Add `docs/artifacts/`, link artifacts + screenshots from all three case pages, re-run full verification | ready | TK-001, TK-002 | pending |

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

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Interactive artifact viewers would be a new spec.

## Supersession

- Supersedes: none
- Superseded by: none
