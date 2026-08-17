# S-001 - Static Portfolio Site

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-001-static-portfolio-site/SPEC.md`; never move between status folders.

**Spec ID:** S-001
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-08-17
**Catalog description:** Recruiter-facing Business Process Analyst site with resume and project pages, shipped on GitHub Pages.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

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
  CSS/JS and the resume PDF. Static verification and live desktop/mobile browser
  checks passed on 2026-08-17.
- GitHub Pages serves `docs/` from protected `main` over HTTPS at
  `https://kaydenclark.github.io/resume-portfolio/`.
- Public `main` and `integration` were normalized to the approved clean history;
  the retired work branches are no longer public.

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

- None.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Build core site: index, 3 case pages, OpenBrain page, assets, resume PDF | done | none | verify-site + HTML parse + live external-link fetch, 2026-07-13 |
| TK-002 | Back up refs, protect local-only artifacts, remove retired tools, normalize public history, publish verified `integration` to `main`, and confirm GitHub Pages | done | none | Verified backups and SHA-256 checks; main/integration rewritten atomically to clean one-commit history b5df867; eight stale remote branches deleted; retired plaintext denylist scan returned zero public hits; Pages built from main/docs over HTTPS. |
| TK-003 | Post-deploy smoke test on live URL: every page, every link, PDF, mobile viewport, dark/light | done | TK-002 | Live Edge/Playwright: index, resume, projects, and OpenBrain returned 200 at 1440x1000 and 390x844; PDF returned 200 application/pdf; no horizontal overflow; theme persisted; skip link focused and landed at #main; console had zero warnings/errors; screenshots visually reviewed. |

## Acceptance Criteria

- [x] Site reachable at the GitHub Pages URL.
- [x] `node tools/verify-site.mjs` passes on the deployed commit.
- [x] Manual live check: all pages render, all links resolve, resume PDF
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
| 2026-08-17 | TK-002 | Ticket closed | Verified backups and SHA-256 checks; main/integration rewritten atomically to clean one-commit history b5df867; eight stale remote branches deleted; retired plaintext denylist scan returned zero public hits; Pages built from main/docs over HTTPS. | RUNBOOK release procedure and S-001 decisions were updated; TASKBOARD rendered by Workbench. | TK-003 live URL smoke test and completion gates. |
| 2026-08-17 | TK-003 | Ticket closed | Live Edge/Playwright: index, resume, projects, and OpenBrain returned 200 at 1440x1000 and 390x844; PDF returned 200 application/pdf; no horizontal overflow; theme persisted; skip link focused and landed at #main; console had zero warnings/errors; screenshots visually reviewed. | S-001 verification and completion state updated; no public usage change needed beyond the existing README. | Acceptance checkboxes, completion result, final verifier/doctor, and protected-main proof publication. |
| 2026-08-17 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |

## Completion Result

The recruiter-facing portfolio is live on GitHub Pages from protected `main`.
Its four HTML pages and resume PDF passed static verification plus live Edge
desktop/mobile, theme, keyboard, link, overflow, and console checks. Public Git
history was normalized to the approved clean release, stale public work branches
were removed, and local recovery bundles preserve the pre-cleanup state.

## Remaining Limitations Or Follow-Up Specs

- Case-study artifact downloads/screenshots land via S-002.
- Linked-repo hygiene (archive statuses) lands via S-003.

## Supersession

- Supersedes: none
- Superseded by: none
