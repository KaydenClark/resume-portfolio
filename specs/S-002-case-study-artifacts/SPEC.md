# S-002 - Case Study Artifacts

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-002-case-study-artifacts/SPEC.md`; never move between status folders.

**Spec ID:** S-002
**Status:** blocked
**Priority:** 1
**Owner:** Captain-Luna-Engineer
**Updated:** 2026-07-17
**Catalog description:** Anonymized synthetic artifacts prepared under `docs/artifacts/`; public-surface linking remains owner-gated.
**Blockers:** Owner decision: keep the five deployable artifacts unlinked but directly reachable if deployed; explicitly approve their removal from `docs/`; or authorize a new public-surface spec, link mapping, and pre-publication eyeball review.
**Latest event:** TK-003 blocked: its required case-page links conflict with the S-007 retired-route contract.
**Next gate:** Owner chooses unlinked deployment, approved removal, or a new reviewed linking surface.

## Outcome

The five synthetic files under `docs/artifacts/` have an explicit owner-approved
publication disposition. Any future linking surface preserves the four retired
case-study redirects, maps reviewed evidence deliberately, and makes claims
verifiable without exposing identifying data.

## Why It Matters

The four current case-study routes are redirects and contain no artifact
sections. The five files under `docs/artifacts/` are already part of the
deployable tree and would be directly reachable by URL if this branch were
deployed, even though no current page links to them.

## Current Verified State

- Five synthetic publishable artifacts now exist in `docs/artifacts/`: the
  roster CSV plus control-panel, QA, rollup, and GPM SVG evidence.
- All four legacy case-study routes are S-007 retired redirects to
  `projects.html`; they have no artifact sections.
- Because `docs/` is the deployable root, the artifact files remain directly
  reachable by URL in any deployment containing them, whether or not a page
  links to them.

## Desired Behavior

- The owner chooses one explicit disposition for `docs/artifacts/`: keep the
  files deployed but unlinked; separately approve removing them from the
  deployable tree; or authorize a new public-surface spec that names the
  destination and artifact-to-page link mapping.
- No retired case-study redirect may be repurposed to expose artifacts.
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

- S-007's retired-route contract blocks the original case-page linking design.
- Owner disposition and the required artifact eyeball review block publication
  or linking; S-001 deployment is not otherwise a dependency.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Create anonymized roster template with synthetic employees (triple-validation structure visible) | done | none | Red: verifier failed for missing roster template; green: verify-site passed with CSV contract. |
| TK-002 | Screenshot set from anonymized workbooks: control panel, QA checks, rollup views, GPM heatmap; synthetic data only | done | none | Red: verifier failed for four missing screenshot assets; green: all four synthetic SVG screenshots passed XML validation and verify-site. |
| TK-003 | Resolve the five existing artifacts across all four retired case-study routes, then implement the owner-approved disposition and re-run full verification | blocked | Owner chooses unlinked deployment, approved removal, or a new reviewed linking surface; artifact eyeball review remains required before publication | pending |

## Acceptance Criteria

- [ ] Owner selects one disposition: keep the five files deployed but unlinked;
      approve removing them from `docs/`; or authorize a new public linking
      surface and exact artifact-to-page mapping.
- [ ] The selected disposition preserves all four S-007 retired redirects.
- [ ] `node tools/verify-site.mjs` passes with the selected file and link scope.
- [ ] Owner eyeballs each screenshot and artifact for identifying data before
      any deployment containing them (mechanical scan + human gate).

## Testing Seams

- Leak scan covers `docs/` recursively, including new artifact filenames and
  any text-bearing formats.
- The link check proves any future owner-approved artifact href resolves; the
  current retired routes intentionally contain no artifact hrefs.

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- This blocked checkpoint updates the SPEC, generated TASKBOARD, and catalog;
  no retired public page was changed.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-15 | TK-001 | Ticket closed | Red: verifier failed for missing roster template; green: verify-site passed with CSV contract. | SPEC evidence updated; TASKBOARD rendered. | TK-002 screenshot set and TK-003 case-page links remain. |
| 2026-07-15 | TK-002 | Ticket closed | Red: verifier failed for four missing screenshot assets; green: all four synthetic SVG screenshots passed XML validation and verify-site. | SPEC evidence updated; TASKBOARD rendered. | TK-003 must link the completed artifacts from the future public surface; owner must eyeball artifacts before a publishing commit. |
| 2026-07-17 | TK-003 | Ticket blocked | Baseline `node tools/verify-site.mjs` passed (30 publishable files); route inspection confirmed all four legacy case-study pages are S-007 retired redirects. No link change made because it would violate the verified public-surface contract. | SPEC blocker updated; TASKBOARD and catalog rendered. | Owner must choose unlinked deployment, approved removal, or a new reviewed linking surface, then eyeball artifacts before any deployment containing them. |
| 2026-07-17 | TK-003 | Evidence correction after audit | The original 2026-07-15 TK-002 evidence row remains verbatim. Current inspection clarifies that five files already exist in deployable `docs/artifacts/`, all four case-study routes are redirects with no artifact sections, and direct artifact URLs would resolve if this branch were deployed. | SPEC contradictions corrected; generated TASKBOARD and catalog refreshed. | Owner disposition and pre-publication eyeball review remain. |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Interactive artifact viewers would be a new spec.

## Supersession

- Supersedes: none
- Superseded by: none
