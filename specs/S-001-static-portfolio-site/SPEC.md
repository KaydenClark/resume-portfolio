# S-001 - Static Portfolio Site

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-001-static-portfolio-site/SPEC.md`; never move between status folders.

**Spec ID:** S-001
**Status:** active
**Priority:** 0
**Owner:** Kayden
**Updated:** 2026-07-13
**Catalog description:** Recruiter-facing static site with three case studies, shipped on GitHub Pages.
**Blockers:** none
**Latest event:** Core site built and verified; harness bootstrapped around it.
**Next gate:** Owner runs first-time git setup and enables GitHub Pages (TK-002).

## Outcome

A live, public portfolio site at the GitHub Pages URL: index page (hero, three
case-study cards, How I Work, Off the Clock, resume links), three case-study
pages with interactive SVG architecture diagrams, and an OpenBrain architecture
writeup - fast, accessible, mobile-correct, and free of client-identifying
information.

## Why It Matters

This is the product. Recruiters spend under two minutes; the site must survive
a phone, a skim, and a skeptical engineer clicking every link.

## Current Verified State

- `docs/` contains index, three case pages, OpenBrain page, shared CSS/JS, and
  the resume PDF (verified 2026-07-13: leak scan clean, all internal links
  resolve, HTML parses with no unclosed tags, external GitHub links fetched
  live).
- Not yet under version control (stale empty `.git` dir blocks sandbox init;
  owner action required) and not yet deployed.

## Desired Behavior

- Site is live on GitHub Pages, serving `docs/` from `main`.
- All external links resolve on the live URL; resume PDF downloads.
- Case-study copy matches owner-confirmed facts (metrics recorded in
  `website/drafts/05-open-questions.md` decision table).

## Decisions And Contracts

- Plain static HTML/CSS/JS, no frameworks, no build step, no CDN dependencies.
- Anonymization contract: generic client descriptors only; employer is "a
  multi-client BPO" in copy; the resume PDF may name employers.
- Private repos (OpenBrain) get on-site writeups, never dead links.
- Push to `main` = deploy; verification suite must pass first.

## Non-Goals

- Live data widgets, backends, blogs, analytics (v2 discussions at the
  earliest; new spec if pursued).

## Dependencies And Blockers

- TK-002 requires the owner (git credentials, GitHub settings).

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Build core site: index, 3 case pages, OpenBrain page, assets, resume PDF | done | none | verify-site + HTML parse + live external-link fetch, 2026-07-13 |
| TK-002 | Owner: first-time git init/commit/push + enable GitHub Pages (RUNBOOK → Deployment) | ready | none | pending |
| TK-003 | Post-deploy smoke test on live URL: every page, every link, PDF, mobile viewport, dark/light | ready | TK-002 | pending |

## Acceptance Criteria

- [ ] Site reachable at the GitHub Pages URL.
- [ ] `node tools/verify-site.mjs` passes on the deployed commit.
- [ ] Manual live check: all pages render, all links resolve, resume PDF
      downloads, diagrams respond to hover/keyboard, theme toggle works,
      readable on a ~380px viewport.

## Testing Seams

- `tools/verify-site.mjs` gates leaks, links, and placeholders pre-push.
- Live-URL smoke test is the post-deploy manual seam (record what was clicked).

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- `RUNBOOK.md` Deployment section is the operative procedure for TK-002.
- `README.md` already documents structure and deploy; update if the Pages URL
  gets a custom domain.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-13 | TK-001 | Core site built (5 HTML pages, shared CSS/JS, resume PDF); Genesis bootstrap ran against this scaffold as the Phase 3 artifact | verify-site passed (leak scan / links / placeholders); HTML parse clean; LLM_Workbench and DnDWebApp links fetched live | Blueprint, Agents, Runbook, Taskboard created and stamped v2.3 | TK-002 deploy + TK-003 live smoke test |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Case-study artifact downloads/screenshots land via S-002.
- Linked-repo hygiene (archive statuses) lands via S-003.

## Supersession

- Supersedes: none
- Superseded by: none
