# S-010 - Publication Privacy

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-010-publication-privacy/SPEC.md`; never move between status folders.

**Spec ID:** S-010
**Status:** active
**Priority:** 1
**Owner:** unassigned
**Updated:** 2026-07-17
**Catalog description:** Make every deployable portfolio asset pass an explicit privacy and provenance gate before it can reach the public site.
**Blockers:** Owner visual review is required for raster, PDF, and artifact content before a production deployment containing new or changed files.
**Latest event:** Portfolio harvest captured the implemented text leak scan and the remaining binary, provenance, and human-review gaps.
**Next gate:** Claim TK-001 and make the verifier reject unclassified deployable file types.

## Outcome

Every file under the deployable `docs/` tree has a known privacy treatment,
source/provenance record when needed, and an automated or explicit human review
gate appropriate to its format. Real work examples remain reference-only and
cannot silently cross into the public surface.

## Why It Matters

Privacy is a product capability, not only a writing convention. The current
text scan protects HTML, CSS, JavaScript, Markdown, SVG, TXT, and CSV, but the
deployable tree also contains PDF and raster assets that are outside that scan.
A public recruiter site must fail closed when a new file type or unreviewed
artifact appears.

## Current Verified State

- `tools/verify-site.mjs` recursively scans text-bearing publishable files for
  forbidden identifying terms and validates internal links and placeholders.
- `real-examples/` is ignored, reference-only, and outside `docs/`.
- Five synthetic artifacts exist under `docs/artifacts/`; S-002 owns their
  content and publication disposition.
- `docs/assets/` includes a resume PDF, a headshot, and a logo that are
  deployable but not content-scanned by the current verifier.
- The repository whitelist `.gitignore` is the publish boundary and requires
  owner review before it can be widened.

## Desired Behavior

- Verification inventories every deployable file and rejects an unknown or
  unclassified format.
- Text formats receive recursive leak scanning; PDF and raster formats receive
  an explicit metadata/content review path with durable evidence.
- Synthetic artifacts carry enough provenance to show that no raw client or
  employee data was copied into them.
- A production release cannot close until the owner has visually reviewed each
  new or changed non-text asset that automation cannot prove safe.
- The verifier continues to protect specs and root controls because the public
  repository makes those files publishable even when Vercel does not serve them.

## Decisions And Contracts

- `real-examples/` remains readable reference material but never a publishable
  source, screenshot source, linked route, or commit target.
- The verifier must fail closed on a new deployable extension rather than
  silently skipping it.
- Hashes may identify reviewed binary versions; hashes do not replace content
  review.
- S-010 owns the cross-cutting privacy gate. S-002 owns artifact content and
  disposition; S-011 owns release/deployment sequencing.
- Changing `.gitignore`, publishing new metrics, or approving a visual artifact
  remains an owner gate under `AGENTS.md`.

## Non-Goals

- Redacting or editing `real-examples/`.
- Publishing raw spreadsheets, client screenshots, private databases, or
  credential-bearing files.
- Choosing whether the five S-002 artifacts should be linked publicly.
- Deploying the site or changing Vercel credentials.

## Dependencies And Blockers

- S-002 supplies artifact-specific evidence and the owner disposition gate.
- S-011 consumes the completed privacy verdict before any production release.
- Owner review blocks final acceptance for binaries and visual artifacts that
  automation cannot establish as safe.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Inventory every file under `docs/`, classify its privacy treatment, and make verification fail for an unknown deployable extension | ready | none | pending |
| TK-002 | Add repeatable PDF/raster metadata and text-extraction checks, record hashes and provenance for the current resume, headshot, logo, and five synthetic artifacts | ready | TK-001 | pending |
| TK-003 | Complete the owner visual privacy review for every current non-text asset and record an approve, replace, or remove verdict | blocked | TK-002 and owner visual review | pending |
| TK-004 | Prove the privacy gate from a clean clone and hand the approved asset manifest to the release-alignment spec | ready | TK-003 | pending |

### Ticket Done Criteria And Required Proof

- **TK-001:** Done when every `docs/` file appears in a deterministic inventory
  with one privacy treatment and an unknown extension makes verification fail.
  Proof is the expected red failure, the green inventory output, and the full
  verifier.
- **TK-002:** Done when the current PDF, raster, SVG, and CSV assets have
  repeatable metadata/text checks, hashes, source/provenance notes, and explicit
  automation limits. Proof is command output plus the checked-in manifest and
  targeted verifier tests.
- **TK-003:** Done only when Kayden records approve, replace, or remove for each
  non-text asset presented in the bounded review manifest. Proof is the dated
  owner verdict; automation cannot substitute for this gate.
- **TK-004:** Done when a clean clone reproduces the approved inventory and all
  privacy gates, then exposes the exact manifest to S-011. Proof is clone SHA,
  commands/output, manifest hash, and full project verification.

## Acceptance Criteria

- [ ] Every file under `docs/` is classified and no extension is silently
      omitted from verification.
- [ ] Text-bearing files remain recursively leak-scanned.
- [ ] PDF and raster checks are repeatable and their limitations are explicit.
- [ ] Current binary and synthetic assets have provenance, hashes, and an owner
      privacy verdict.
- [ ] A clean-clone run fails for an unclassified deployable asset and passes
      for the approved current tree.
- [ ] No real example, client identifier, employee identifier, raw account
      export, secret, or credential is published.

## Testing Seams

- Add a temporary unknown extension under a disposable test fixture and confirm
  the verifier fails for the expected reason before implementing classification.
- Exercise PDF text extraction and metadata inspection without persisting
  extracted private content.
- Compare the inventory to `find docs -type f` from a clean clone.
- Use an owner-checkable asset manifest for the visual review rather than an
  unbounded folder walk.

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

Plus the new asset-inventory command introduced by TK-001 and the clean-clone
proof introduced by TK-004.

## Documentation Impact

- This spec owns privacy requirements, decisions, and proof.
- `RUNBOOK.md` gains the exact binary/provenance review commands when TK-002
  defines them.
- `AGENTS.md` and `.gitignore` change only if an owner-approved safety boundary
  changes.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-17 | spec | Portfolio coverage harvest | Source inspection confirmed recursive text scanning, five synthetic artifacts, and unscanned deployable PDF/raster formats | S-010 created; Blueprint matrix records privacy ownership | TK-001 through TK-004 remain |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Privacy approval does not decide whether an otherwise safe artifact belongs
  in the public narrative; S-002 owns that disposition.

## Supersession

- Supersedes: none
- Superseded by: none
