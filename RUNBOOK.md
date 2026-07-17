# Resume Portfolio - Runbook

> Generated from LLM Workbench v2.3. See Upgrading The Harness below.

**Last reviewed:** 2026-07-17
**Runtime owner:** Kayden (owner); agents operate under `AGENTS.md`
**Environment:** local (`/Users/kayden/GPT_OS/Projects/resume-portfolio`) → Vercel project `kayden-clark` (production)

This file explains how to operate, verify, recover, and evaluate the project. It
should be boring, exact, and executable.

## Prerequisites

Required tools:

- Node.js 18+ (verified on v26) - runs the verifier and spec tooling
- Git - version control
- Vercel CLI - deterministic project linking, production deploy, and inspection
- Python 3 (optional) - local preview server
- Any modern browser - manual render checks

Required accounts/services:

- GitHub account with access to `github.com/KaydenClark/resume-portfolio`
- Vercel account with access to the `kaydenclark725s-projects/kayden-clark`
  project

Required local files:

- none beyond the repo. **This project must never contain `.env`, tokens, or
  credentials.** There is no environment configuration by design.

## Install

No dependencies to install. The site and tooling are zero-dependency.

```bash
node --version
```

Expected result:

- prints v18 or higher.

## Run Locally

Option A - open directly: open `docs/index.html` (everything works
from the filesystem, including the theme toggle and internal navigation).

Option B - local server (matches the static Vercel path behavior):

```bash
cd docs
python -m http.server 8000
```

Open:

- http://localhost:8000

Expected result:

- The landing page shows the identity card and routes to the complete resume and
  curated Projects page; the theme toggle works with keyboard input; legacy
  case-study and OpenBrain routes redirect to Projects; no console errors.

## Test And Build

There is no build. Verification is the gate.

Fast check:

```bash
node tools/verify-site.mjs
```

Full verification:

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

Expected result:

- `ok — verify-site passed (...)` - leak scan, internal links, and
  placeholder checks all clean;
- `ok - spec workbench doctor passed` - no spec lifecycle, link, or
  projection drift.

### Test Coverage Policy

Treat `tools/verify-site.mjs` as the executable specification of "safe to
publish." If a new failure mode is discovered (a leaked name pattern, a new
link type, a new publishable surface), extend the verifier first so the gate
catches it, then fix the content. Checks that cannot be automated (visual
render, keyboard navigation, reduced-motion behavior) are documented manual
checks: name what you did in the spec evidence row.

Coverage rules:

- Add a failing check first when hardening the verifier (red/green).
- Keep checks that protect what recruiters or the owner depend on: no leaks,
  no dead links, no template debris.
- If behavior cannot be tested in the current harness, record the exact reason
  and use the strongest concrete manual check available.

## Evaluation And Benchmarking

This project has no executable outcome benchmark; process changes cannot be
called "better" from taste alone. If harness friction appears, log it in
`HARNESS_FEEDBACK.md` rather than silently working around it. Guardrail
minimum: the two verification commands above pass before every push.

## Data Operations

No databases, seeds, or migrations. One data safety rule:

- `real-examples/` holds real client-named workbooks (git-ignored,
  reference-only). Never publish, screenshot, or copy identifying data from
  it. Anonymized derivatives are produced as new files under `docs/` and must
  pass the leak scan.

## Deployment Or Startup

Production is the Vercel project `kayden-clark` with canonical alias
`https://kayden-clark.vercel.app`. Git push and production deploy are separate
owner-authorized actions.

Read-only availability and freshness inspection:

```bash
git status --short --branch
git rev-parse HEAD
git ls-remote --heads origin
npx --yes vercel inspect https://kayden-clark.vercel.app
for url in \
  https://kayden-clark.vercel.app/ \
  https://kayden-clark.vercel.app/resume.html \
  https://kayden-clark.vercel.app/projects.html \
  https://kayden-clark.vercel.app/assets/Kayden-Clark-Resume-2026.pdf
do
  curl -L -sS -o /dev/null -w '%{http_code} %{url_effective}\n' "$url"
done
```

HTTP 200 and Vercel `Ready` prove availability only. Compare live page content
to the expected markers in the candidate release; S-011/TK-001 owns a
deterministic drift report for that comparison.

Deterministic local setup and deploy:

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
npx --yes vercel link --yes --project kayden-clark --scope kaydenclark725s-projects
npx --yes vercel --prod --yes
npx --yes vercel inspect https://kayden-clark.vercel.app
```

The link command creates machine-local `.vercel/` metadata. It is not part of
the repository and must never be committed.

Expected healthy state:

- `https://kayden-clark.vercel.app` returns 200 and Vercel reports Ready;
- landing, resume, Projects, approved external destinations, retired redirects,
  and the resume PDF resolve;
- live content markers match the exact owner-approved release commit.

Current verified runtime snapshot, 2026-07-17:

- production deployment `dpl_2Kebzhxj9ukfCSAxSnvaN16wrgDj` is Ready;
- landing, resume, Projects, and the resume PDF return 200;
- the live Projects page does not yet include AI Agents Presentation even
  though the current source branch does. S-011 owns this release drift; do not
  report production as current until its source/content gate passes.

## Version-Control Procedures

Git authority and policy live in `AGENTS.md` → Git Rules.

```bash
git status
git add <paths>
git diff --staged --stat
git commit -m "<what and why>"
```

Expected result: staged paths are only `docs/`, `specs/`, `tools/`, root
control docs, `README.md`, `CLAUDE.md`, `.claude/`, or `.gitignore` (the
whitelist makes anything else invisible to git; if something unexpected
appears, stop).

## Upgrading The Harness

These control docs were generated from LLM Workbench v2.3 (integration
branch, 2026-07-13). To upgrade:

1. Check the LLM Workbench repo's changelog for what changed since v2.3.
2. Re-copy only the changed template sections; keep this project's filled-in
   specifics. Never let bracketed placeholders leak back into filled docs.
3. Update each doc's version stamp to the new version.
4. Re-run the full verification suite and record the upgrade in its owning
   spec.

If a downstream lesson should flow back to the harness, log it in
`HARNESS_FEEDBACK.md`.

## Troubleshooting

| Symptom | Likely cause | Check | Fix |
|---|---|---|---|
| verify-site LEAK failure | client-identifying term in a publishable file | the reported file:line | reword to a generic descriptor; never suppress the check |
| verify-site LINK failure | renamed/moved file or typo'd path | the reported href | fix the path; re-run |
| doctor reports drift | Taskboard/catalog region out of sync with specs | `node tools/spec-workbench.mjs render` | render regenerates projections; commit the result |
| Vercel alias shows 404 or stale content | wrong Vercel project linked, production deploy missing, or alias points at an older release | `npx --yes vercel inspect https://kayden-clark.vercel.app`; compare live content markers to the exact candidate commit | relink explicitly only if project identity is wrong; otherwise deploy only with owner authorization, then inspect and smoke the canonical alias |
| GitHub repository homepage is stale | repository metadata still points at an older Vercel alias | `gh repo view KaydenClark/resume-portfolio --json homepageUrl` | owner updates the homepage to `https://kayden-clark.vercel.app` |
| Unexpected file staged | `.gitignore` allowlist widened or bypassed | `git status`, `.gitignore` | unstage; restore the allowlist; ask owner before changing it |

## Recovery And Rollback

If a change fails:

1. Identify the touched files and failing command.
2. Revert only the smallest change needed, preserving user work.
3. Rerun the failing verification command.
4. Update the owning spec with the result and remaining gap, then render.

A bad production deploy is rolled back through Vercel or by deploying a
verified prior commit, both with owner authorization. Do not delete data,
rewrite history, or rotate secrets unless the owner explicitly approves it.

## Operational Proof

If a command changed durable project state, append evidence to the owning spec.
For routine read-only runs, a final response note is enough.
