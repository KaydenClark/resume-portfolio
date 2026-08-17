# S-001 - Static Portfolio Site

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-001-static-portfolio-site/SPEC.md`; never move between status folders.

**Spec ID:** S-001
**Status:** active
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-08-17
**Catalog description:** Recruiter-facing Business Process Analyst site with resume and project pages, shipped on GitHub Pages.
**Blockers:** none
**Latest event:** TK-002 claimed by Codex.
**Next gate:** Close TK-002 with verification and documentation proof.

## Outcome

A live, public portfolio site at the GitHub Pages URL: compact landing page,
evidence-led resume page, focused projects page, direct-link OpenBrain writeup,
and downloadable resume PDF - fast, accessible, mobile-correct, and free of
client-identifying information.

## Why It Matters

This is the product. Recruiters spend under two minutes; the site must survive
a phone, a skim, and a skeptical engineer clicking every link.

## Current Verified State

- `docs/` contains index, resume, projects, and OpenBrain pages plus shared
  CSS/JS and the resume PDF (verified 2026-08-16: leak scan and internal links
  clean; local desktop/mobile browser checks and external-link checks passed).
- The current release candidate is on `integration`; public `main` remains at
  `4ef63f7`. The planned GitHub Pages release remains an owner gate.

## Desired Behavior

- Site is live on GitHub Pages, serving `docs/` from `main`.
- All external links resolve on the live URL; resume PDF downloads.
- Portfolio claims match owner-confirmed facts and title/scope boundaries.

## Decisions And Contracts

- Plain static HTML/CSS/JS, no frameworks, no build step, no CDN dependencies.
- Anonymization contract: generic client descriptors only; employer is "a
  multi-client BPO" in copy; the resume PDF may name employers.
- Private repos (OpenBrain) get on-site writeups, never dead links.
- Push to `main` = deploy; verification suite must pass first.
- The approved clean-history release preserves every public branch tip in a
  local bundle and backup refs, publishes only clean `main` and `integration`
  histories, and removes the eight stale remote work branches.
- Local resume build artifacts remain local-only; the two owner-deleted one-off
  tools are removed from the public release.

## Non-Goals

- Live data widgets, backends, blogs, analytics (v2 discussions at the
  earliest; new spec if pursued).

## Dependencies And Blockers

- TK-002 requires the owner (history rewrite approval, git credentials, and
  GitHub settings).

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Build core site: index, 3 case pages, OpenBrain page, assets, resume PDF | done | none | verify-site + HTML parse + live external-link fetch, 2026-07-13 |
| TK-002 | Back up refs, protect local-only artifacts, remove retired tools, normalize public history, publish verified `integration` to `main`, and confirm GitHub Pages | in-progress | none | pending |
| TK-003 | Post-deploy smoke test on live URL: every page, every link, PDF, mobile viewport, dark/light | ready | TK-002 | pending |

## Acceptance Criteria

- [ ] Site reachable at the GitHub Pages URL.
- [ ] `node tools/verify-site.mjs` passes on the deployed commit.
- [ ] Manual live check: all pages render, all links resolve, resume PDF
      downloads, theme toggle and keyboard navigation work, and content remains
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
| 2026-07-13 | ad-hoc | Interim feedback draft deployed to Vercel production at `https://kayden-clark.vercel.app` (deployment `dpl_4SnjGanW2aRYiqwohNqL9kLxvsaL`) | Vercel READY; all 6 HTML routes, CSS, JS, and resume PDF returned 200; desktop and 390px screenshots visually checked; no runtime errors in the first hour | Spec updated; no Taskboard change because TK-002 GitHub Pages gate remains open | Owner feedback and planned GitHub Pages deployment remain |
| 2026-08-16 | ad-hoc | Removed private-source inventory language from public controls/specs and replaced plaintext leak-denylist terms with fingerprints | verify-site + doctor passed; Edge/Playwright desktop/mobile light/dark review and keyboard/theme/navigation checks passed with zero local console warnings/errors; published one-page PDF rendered cleanly, extracted cleanly, and hash-matched its source; four external links resolved in Edge | AGENTS, Blueprint, Lexicon, Runbook, Taskboard, README, and active specs checked/updated | Owner-gated remote history normalization and `main` release remain |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Case-study artifact downloads/screenshots land via S-002.
- Linked-repo hygiene (archive statuses) lands via S-003.

## Supersession

- Supersedes: none
- Superseded by: none
