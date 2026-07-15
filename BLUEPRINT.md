# Resume Portfolio - Blueprint

> Generated from LLM Workbench v2.3.

**Last reviewed:** 2026-07-13
**Status:** active
**Source root:** `E:\GPT_OS\Projects\resume-portfolio`
**Remote:** `github.com/KaydenClark/resume-portfolio`

## Product Map

A public, recruiter-facing portfolio site for Kayden Clark, positioned as a
operations systems builder. AI-assisted workflows are secondary technical work,
not the primary professional identity. The site presents three production case studies of operational
systems built at a multi-client BPO, a "How I Work" statement, a hobby-projects
section for AI infrastructure built off the clock, and a one-click resume PDF.
The site itself doubles as the UI/UX work sample: hand-built static HTML/CSS/JS,
interactive SVG architecture diagrams, accessible, fast, no frameworks.

Core promise:

> A recruiter on a phone reaches a working, polished site in under two seconds,
> understands what Kayden does in under ten, and can verify every claim through
> a case study, an artifact, or the resume - with zero broken links and zero
> client-identifying information.

## Goals And Pillars

- **Case studies over feature lists:** three deep, metric-backed system
  writeups (campaign reporting, invoicing/margin engine, roster system) carry
  the argument; everything else supports them.
- **The site is the work sample:** quality/UX craft is demonstrated in the
  artifact itself - interactive diagrams, dark/light theme, keyboard
  navigation, reduced-motion support, no gimmicks.
- **Anonymized but real:** real numbers and real architectures; client names,
  employee names, and raw workbooks never publish.
- **Zero maintenance burden:** static files on GitHub Pages; nothing to keep
  fresh, patch, or pay for. Live-data features are explicitly deferred.

## Cross-Cutting Architecture And Invariants

| Layer / concern | Choice | Invariant / source |
|---|---|---|
| Runtime | Static HTML/CSS/JS, no build step | `docs/` is the entire deployable; opens from the filesystem |
| Product surface | Multi-page site: index + 3 case studies + OpenBrain writeup | one shared stylesheet and script; progressive enhancement, works with JS off |
| Data/storage | None (static) | live widgets/backends are out of scope for v1 by owner decision |
| Testing | `node tools/verify-site.mjs` (leak scan, link check, placeholder check) | must pass before any push |
| Deployment | GitHub Pages from `main` branch `/docs` folder | repo is public; the whitelist `.gitignore` is the publish boundary |

Rules that span multiple capabilities:

- **Anonymization is absolute in publishable surfaces** (`docs/`, `specs/`,
  root control docs): no client names, no employee names, no PHI, no real
  per-client financials. Generic descriptors only ("a seasonal wagering
  client"). Enforced by the verify-site leak scan.
- **`real-examples/` is source material, never output.** It holds real
  client-named workbooks for deriving case-study content. It is git-ignored,
  must never be published, linked, screenshotted, or quoted with identifying
  data.
- **No dead links, ever.** Every external link is verified live before it
  ships; private repos get on-site writeups instead of links.
- **Whitelist `.gitignore` is a safety control:** everything is ignored except
  explicitly allowed paths. Widening the allowlist requires owner review.

Source and tests remain implementation truth. Capability-specific requirements
live in each spec.

## Non-Goals

- No CIC dashboard, live "now playing" widgets, or any backend in v1
  (revisit only after v1 is live, as its own spec).
- No blog, no skills-percentage bars, no client-identifying testimonials.
- No frameworks, build pipelines, or CDN dependencies for the site itself.
- Not a game-dev portfolio; the D&D project appears only as an archived
  hobby card.

## Founding Intent (preserved verbatim)

Owner's site direction, 2026-07-12:

> "Let's drop the CIC dashboard take. and really go from the AI systems
> architect / FDE and leave out the personal side for now expect for maybe a
> 'hobby projects' something to show where I am utilizing the AI systems I am
> building outside of outwork. on things like my game. even though I am not
> going to be applying for game dev jobs. I want my website to align with the
> 3-4 case studies of systems I have implemented."

Owner's harness request, 2026-07-13:

> "Use the GENESIS protocol in
> https://github.com/KaydenClark/LLM_Workbench/tree/integration to create a
> project harness for this project."

Design decisions recorded at bootstrap (owner-confirmed unless noted):

- Plain static HTML/CSS over frameworks or templates - owner choice.
- Real numbers with anonymized clients - owner choice.
- Employer named as "a multi-client BPO" in site copy; the hosted resume PDF
  names real employers (normal for a resume) - owner choice.
- Archived D&D repos shown with honest status framing - owner choice.
- Genesis ran against an existing scaffold (site built 2026-07-12 in this
  conversation thread) rather than greenfield; scaffold was treated as the
  Phase 3 artifact and verified rather than rebuilt - agent decision.

## Spec Catalog

<!-- spec-catalog:start -->
| Spec | Description | Status |
|---|---|---|
| [S-001 - Static Portfolio Site](specs/S-001-static-portfolio-site/SPEC.md) | Recruiter-facing static site with three case studies, shipped on GitHub Pages. | active |
| [S-002 - Case Study Artifacts](specs/S-002-case-study-artifacts/SPEC.md) | Anonymized, synthetic-data artifacts and screenshots embedded in the case pages. | active |
| [S-003 - GitHub Repo Hygiene](specs/S-003-github-repo-hygiene/SPEC.md) | Archive-status READMEs on linked repos and an optional sanitized OpenBrain template. | planned |
| [S-004 - Brand Template Alignment](specs/S-004-brand-template-alignment/SPEC.md) | Apply the supplied SLK brand template to the static portfolio without changing its verified content architecture. | complete |
| [S-005 - Light-Only Brand Template](specs/S-005-light-only-template/SPEC.md) | Lock the portfolio to the supplied light Brand Template and remove dark-theme overrides. | complete |
| [S-006 - CV-First Royal Theme](specs/S-006-cv-first-royal-theme/SPEC.md) | Reframe the portfolio around the current CV with an accessible royal light/dark theme and refined rainbow geometry. | complete |
| [S-007 - Multipage Public Surface](specs/S-007-multipage-public-surface/SPEC.md) | Split the feedback site into a minimal landing page, one complete resume page, and a focused projects page while retiring unfinished public work. | complete |
<!-- spec-catalog:end -->

## Cross-Cutting Health

- `node tools/verify-site.mjs` passes (leak scan, internal links, placeholders);
- `node tools/spec-workbench.mjs doctor` reports no lifecycle, link, or
  projection drift;
- the site renders end to end from `docs/index.html` with no console errors;
- secrets and private data stay out of committed output (whitelist gitignore);
- every external link on the site resolves.
