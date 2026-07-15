# S-007 - Multipage Public Surface

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-007-multipage-public-surface/SPEC.md`; never move between status folders.

**Spec ID:** S-007
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-07-14
**Catalog description:** Split the feedback site into a minimal landing page, one complete resume page, and a focused projects page while retiring unfinished public work.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

The public site opens on the existing identity card, keeps all resume content on
one dedicated page, and presents only Dungeon Friends and Spotify on a separate
projects page. Unfinished case studies and OpenBrain do not render on public
routes.

## Why It Matters

The current single page exposes unfinished portfolio material too early. A
smaller public surface lets the owner iterate safely while keeping the polished
resume and selected personal projects easy to navigate.

## Current Verified State

- S-006 made the homepage CV-first and applied the approved royal theme.
- The Vercel feedback deployment currently exposes case studies and OpenBrain.
- The GitHub `main` branch also contains those static files.

## Desired Behavior

- `/` contains the identity card and clear routes to the resume and projects.
- `resume.html` contains the complete resume hierarchy in one page.
- `projects.html` shows Dungeon Friends (working title) and the Spotify
  listening-taste website, without unfinished detail pages.
- Legacy case-study and OpenBrain URLs retire to the projects page and do not
  render their former content.
- Shared navigation and the light/dark theme remain accessible and consistent.
- First-time visitors start in light mode; an explicit theme choice persists.

## Decisions And Contracts

- Preserve plain static HTML/CSS/JS and the existing visual system.
- Do not add external links in this slice.
- Keep resume claims unchanged; this is an information-architecture change.
- Retire legacy URLs with lightweight redirects instead of deleting source
  paths, so old links fail safely and history remains recoverable.

## Non-Goals

- Writing full Dungeon Friends or Spotify case studies.
- Publishing private data, screenshots, listening history, or unfinished work.
- Adding a framework, build system, or external dependency.
- Pushing Git changes without the owner's explicit approval.

## Dependencies And Blockers

- Extends S-001 and supersedes the single-page contract introduced by S-006.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Build and verify the minimal landing, complete resume, focused projects page, and retired legacy routes | done | none | verify-site passed; main.js syntax clean; in-app Browser at 1440x1000, 1280 desktop, and 390x844 mobile; light default and theme persistence verified; no overflow or console errors; retired case-study and OpenBrain routes redirected without former content |

## Acceptance Criteria

- [x] The landing page renders only the identity card as its primary content.
- [x] All resume sections remain together on `resume.html`.
- [x] `projects.html` contains only Dungeon Friends and Spotify project cards.
- [x] No public navigation exposes case studies or OpenBrain.
- [x] Legacy case-study and OpenBrain routes do not render unfinished content.
- [x] Desktop and mobile routes have no relevant console errors or overflow.
- [x] Theme, leak, link, placeholder, JavaScript, and spec-doctor gates pass.
- [x] Light mode is the default when no explicit theme choice is stored.

## Testing Seams

- Extend `tools/verify-site.mjs` first with multipage route and retirement
  assertions.
- Exercise landing-to-resume and landing-to-projects navigation in the in-app
  browser, including theme state and a mobile viewport.
- Check legacy URLs directly to prove their former content cannot render.

## Verification Procedure

```bash
node tools/verify-site.mjs
node --check docs/assets/main.js
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- This spec owns the new public-surface contract and verification proof.
- Update README for the new route structure.
- RUNBOOK changes only if preview or deployment commands change.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-14 | TK-001 | Ticket closed | verify-site passed; main.js syntax clean; in-app Browser at 1440x1000, 1280 desktop, and 390x844 mobile; light default and theme persistence verified; no overflow or console errors; retired case-study and OpenBrain routes redirected without former content | S-007 and README updated; RUNBOOK checked, no command change needed | Owner review, Vercel redeploy, and any GitHub main publication |
| 2026-07-14 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |
| 2026-07-14 | deployment | Verified multipage site deployed to Vercel production as `dpl_HzWHbL9AyuVRcmcMWoiXPwKmAPa5`; `/`, resume, projects, both assets, and retired routes returned 200; live Browser navigation and redirects passed with no console errors | Deployment proof recorded here; temporary Vercel link metadata removed after deploy | GitHub `main` publication remains owner-gated |

## Completion Result

The feedback site now has three intentional public surfaces: a minimal identity
landing page, one complete resume page, and a projects page limited to Dungeon
Friends and Spotify Listening. The former case-study and OpenBrain URLs are
`noindex` redirects that cannot render their previous content. Light mode is the
first-visit default, explicit light/dark choices persist, and desktop/mobile
browser checks are green with no overflow or console errors.

## Remaining Limitations Or Follow-Up Specs

- Individual project detail pages remain owner-guided future work.
- GitHub `main` publication still requires explicit owner approval.

## Supersession

- Supersedes: S-006
- Superseded by: none
