# Resume Portfolio - Blueprint

> Generated from LLM Workbench v2.3.

**Last reviewed:** 2026-07-17
**Status:** active
**Source root:** `/Users/kayden/GPT_OS/Projects/resume-portfolio`
**Remote:** `github.com/KaydenClark/resume-portfolio`

## Product Map

A public, recruiter-facing portfolio site for Kayden Clark, positioned as an
operations systems builder. AI-assisted workflows and personal projects are
supporting evidence, not the primary professional identity. The current public
surface is intentionally focused: a minimal identity landing page, one complete
CV-aligned resume page, a curated project showcase, and a one-click resume PDF.
The site itself doubles as the UI/UX work sample: hand-built static
HTML/CSS/JavaScript, accessible, fast, and framework-free.

Core promise:

> A recruiter on a phone reaches a working, polished site in under two seconds,
> understands what Kayden does in under ten, and can verify the public narrative
> through the resume, a current project destination, or an owner-approved
> artifact - with zero broken links and zero client-identifying information.

## Goals And Pillars

- **Resume narrative first:** the complete CV-aligned resume and focused
  operations-systems positioning carry the professional argument.
- **Curated current projects:** selected active projects demonstrate the
  systems behind the work without turning the site into an automatic mirror of
  every GPT_OS repository.
- **The site is the work sample:** quality/UX craft is demonstrated in the
  artifact itself - light/dark theme, keyboard navigation, responsive layout,
  reduced-motion support, and no gimmicks.
- **Anonymized and reviewable:** public claims, screenshots, downloads, and
  artifacts use synthetic or owner-approved content; client names, employee
  names, and raw workbooks never publish.
- **Zero maintenance burden:** static files on Vercel; nothing to keep
  fresh, patch, or pay for. Live-data features are explicitly deferred.

## Cross-Cutting Architecture And Invariants

| Layer / concern | Choice | Invariant / source |
|---|---|---|
| Runtime | Static HTML/CSS/JS, no build step | `docs/` is the entire deployable; opens from the filesystem |
| Product surface | Multi-page site: identity landing + complete resume + curated projects; legacy case-study and OpenBrain routes are retired redirects | one shared stylesheet and script; progressive enhancement, works with JS off |
| Data/storage | None (static) | live widgets/backends are out of scope for v1 by owner decision |
| Testing | `node tools/verify-site.mjs` plus spec doctor and capability-specific browser/release checks | must pass before any push |
| Deployment | Vercel project `kayden-clark`, serving the static `docs/` output at `kayden-clark.vercel.app` | production deployment is owner-authorized; availability and source freshness are separate gates |
| Recovery | Canonical GitHub remote `KaydenClark/resume-portfolio` | every release must name an exact remotely recoverable commit |

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
- **Current project identity wins.** Product names and lifecycle claims follow
  the owning repository and current owner direction. DnDWebApp, dndAPI, and
  dndclient are active, history-preserved repositories; this portfolio must not
  direct anyone to archive or retire them.
- **Whitelist `.gitignore` is a safety control:** everything is ignored except
  explicitly allowed paths. Widening the allowlist requires owner review.
- **Ready is not fresh.** Vercel status and HTTP 200 prove availability, not
  that production matches the approved source commit.

Source and tests remain implementation truth. Capability-specific requirements
live in each spec.

## Non-Goals

- No CIC dashboard, live "now playing" widgets, or any backend in v1
  (revisit only after v1 is live, as its own spec).
- No blog, no skills-percentage bars, no client-identifying testimonials.
- No frameworks, build pipelines, or CDN dependencies for the site itself.
- Not a game-dev portfolio; game and campaign projects appear only when they
  strengthen the curated systems-building narrative.
- No automatic publication of every active GPT_OS project.

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
- Superseded on 2026-07-17: the earlier archive framing for DnDWebApp, dndAPI,
  and dndclient is no longer current. All three histories remain active and
  unarchived; DnDWebApp owns the campaign-platform consolidation.
- Genesis ran against an existing scaffold (site built 2026-07-12 in this
  conversation thread) rather than greenfield; scaffold was treated as the
  Phase 3 artifact and verified rather than rebuilt - agent decision.

## Blueprint-To-Spec Coverage Matrix

Classification reflects verified source/runtime and current owner direction on
2026-07-17. “Covered” means one stable spec owns the capability even when an
acceptance or owner gate remains open.

| Capability | Verified state or direction | Classification | Stable owner | Remaining gate |
|---|---|---|---|---|
| Static, framework-free public runtime | `docs/` is the complete HTML/CSS/JavaScript deployable | covered by a current stable spec | S-007; release ownership moves to S-011 | none for architecture |
| Minimal landing, complete resume, curated Projects routes | Implemented locally; legacy case-study and OpenBrain routes redirect | covered by a current stable spec | S-007 | production freshness in S-011 |
| CV-aligned operations-systems narrative | Implemented on `resume.html` and the identity landing | covered by a current stable spec | S-006 and S-007 | future claim changes require owner confirmation |
| Accessible royal light/dark visual system | Implemented with keyboard theme control, persistence, mobile proof, and shared assets | covered by a current stable spec | S-006 | none |
| LLM Workbench presentation | Implemented as the unnumbered system behind the work | covered by a current stable spec | S-008 | external-link health moves through S-003 |
| AI Agents Presentation project | Implemented locally with demo and source links; absent from current production | covered by a current stable spec | S-009 for content; S-011 for release | owner-authorized release |
| Dungeon Friends presentation | Implemented as an active game-project summary | covered by a current stable spec | S-007 and S-012 | owner approval for any new public destination |
| Spotify Atlas presentation | Source still says “Spotify Listening” although current product identity is Spotify Atlas | contradicted by live source | S-012 | TK-001 is agent-ready |
| DnDWebApp/dndAPI/dndclient lifecycle truth | Older portfolio canon proposed archive actions; current direction and GitHub metadata show all three active and unarchived | contradicted by live source | S-003 and S-012 | canon corrected; public inclusion remains owner editorial choice |
| Curated-project expansion policy | Current public surface is deliberately selected rather than portfolio-wide | unresolved owner decision | S-012 | owner chooses whether the DnD campaign platform joins the public showcase |
| Synthetic roster and screenshot artifacts | Five deployable synthetic artifacts implemented under `docs/artifacts/` | covered by a current stable spec | S-002 | owner disposition and visual privacy review |
| Artifact public placement | Retired case-study routes cannot own links without violating S-007 | unresolved owner decision | S-002 | keep unlinked, approve removal, or authorize a new linking surface |
| Publishable-source privacy boundary | Text leak scan and whitelist boundary exist, but PDF/raster formats lack a durable capability spec and complete review path | implemented but missing a durable capability spec | S-010 created in this harvest | TK-001 and TK-002 agent-ready; TK-003 owner review |
| Binary, provenance, and unknown-file privacy handling | Required by the absolute anonymization invariant but not yet implemented | settled but not implemented and missing a spec | S-010 created in this harvest | dependency-aware TK-001 through TK-004 |
| Internal links, placeholders, and static surface verification | Implemented in `tools/verify-site.mjs` | covered by a current stable spec | S-007 and S-010 | extend for new privacy/project identities |
| External destination health and identity | Existing links are partly verified ad hoc; no reusable network/identity gate | settled but not implemented and missing a spec | S-003 materially updated in this harvest | TK-002 is agent-ready |
| Vercel production availability | Canonical routes and PDF return 200; deployment is Ready | covered by a current stable spec | S-007 evidence; ongoing ownership moves to S-011 | none for availability |
| Source-to-production alignment | Production deployment `dpl_2Kebzhxj9ukfCSAxSnvaN16wrgDj` omits S-009 content and exposes no source SHA | contradicted by live runtime | S-011 created in this harvest | TK-001 agent-ready; deploy owner-gated |
| Remotely recoverable release proof | Current feature checkpoint is pushed, but no release contract ties exact Git SHA to Vercel content | settled but not implemented and missing a spec | S-011 created in this harvest | TK-001 through TK-004 |
| Public operational case studies and OpenBrain writeup | Retired by S-007 after the later multipage direction | superseded | S-001 and S-007 preserve history | any revival requires a new owner-approved spec |

**Coverage result:** 20 meaningful Blueprint capabilities classified; 0
settled capabilities lack stable spec ownership. One project-inclusion choice
and one artifact-disposition choice remain explicitly owner-gated in S-002 and
S-012 rather than hidden as unscoped work; link, asset, and release approvals
remain execution gates in their owning specs.

## Spec Catalog

<!-- spec-catalog:start -->
| Spec | Description | Status |
|---|---|---|
| [S-001 - Static Portfolio Site](specs/S-001-static-portfolio-site/SPEC.md) | Original static portfolio capability and retired GitHub Pages publication plan, superseded by the Vercel-backed public surface in S-007. | superseded |
| [S-002 - Case Study Artifacts](specs/S-002-case-study-artifacts/SPEC.md) | Anonymized synthetic artifacts prepared under `docs/artifacts/`; public-surface linking remains owner-gated. | blocked |
| [S-003 - External Project Link Integrity](specs/S-003-github-repo-hygiene/SPEC.md) | Keep every public project destination reachable, identity-correct, and free of stale archive or activity claims. | active |
| [S-004 - Brand Template Alignment](specs/S-004-brand-template-alignment/SPEC.md) | Apply the supplied SLK brand template to the static portfolio without changing its verified content architecture. | complete |
| [S-005 - Light-Only Brand Template](specs/S-005-light-only-template/SPEC.md) | Lock the portfolio to the supplied light Brand Template and remove dark-theme overrides. | complete |
| [S-006 - CV-First Royal Theme](specs/S-006-cv-first-royal-theme/SPEC.md) | Reframe the portfolio around the current CV with an accessible royal light/dark theme and refined rainbow geometry. | complete |
| [S-007 - Multipage Public Surface](specs/S-007-multipage-public-surface/SPEC.md) | Split the feedback site into a minimal landing page, one complete resume page, and a focused projects page while retiring unfinished public work. | complete |
| [S-008 - Workbench Projects Feature](specs/S-008-workbench-projects-feature/SPEC.md) | Feature LLM Workbench as the system behind the work above the unchanged personal-projects heading. | complete |
| [S-009 - AI Agents Presentation Project](specs/S-009-ai-agents-presentation/SPEC.md) | Add AI Agents Presentation immediately after LLM Workbench and before the existing personal projects. | complete |
| [S-010 - Publication Privacy](specs/S-010-publication-privacy/SPEC.md) | Make every deployable portfolio asset pass an explicit privacy and provenance gate before it can reach the public site. | active |
| [S-011 - Release Alignment](specs/S-011-release-alignment/SPEC.md) | Make the approved source checkpoint, public Git recovery point, and Vercel production alias describe the same verified portfolio release. | active |
| [S-012 - Current Project Showcase](specs/S-012-current-project-showcase/SPEC.md) | Keep the selected-project showcase aligned to current product identities, evidence destinations, and truthful active-status framing. | active |
<!-- spec-catalog:end -->

## Cross-Cutting Health

- `node tools/verify-site.mjs` passes (leak scan, internal links, placeholders);
- `node tools/spec-workbench.mjs doctor` reports no lifecycle, link, or
  projection drift;
- the site renders end to end from `docs/index.html` with no console errors;
- secrets and private data stay out of committed output (whitelist gitignore);
- every external link on the site resolves.
