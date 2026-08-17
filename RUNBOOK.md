# Resume Portfolio - Runbook

> Generated from LLM Workbench v2.3. See Upgrading The Harness below.

**Last reviewed:** 2026-08-16
**Runtime owner:** Kayden (owner); agents operate under `AGENTS.md`
**Environment:** local (Windows, `E:\GPT_OS\Projects\resume-portfolio`) → GitHub Pages (production)

This file explains how to operate, verify, recover, and evaluate the project. It
should be boring, exact, and executable.

## Prerequisites

Required tools:

- Node.js 18+ (verified on v22) - runs the verifier and spec tooling
- Git - version control and deploy (push to `main` publishes)
- Python 3 (optional) - local preview server
- Any modern browser - manual render checks

Required accounts/services:

- GitHub account with access to `github.com/KaydenClark/resume-portfolio`
- GitHub Pages enabled: Settings → Pages → Deploy from branch → `main` / `docs/`

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

Option A - open directly: double-click `docs\index.html` (the navigation and
theme toggle work from the filesystem).

Option B - local server (matches Pages path behavior):

```bash
cd docs
python -m http.server 8000
```

Open:

- http://localhost:8000

Expected result:

- Index, resume, projects, and OpenBrain pages render; internal navigation and
  the theme toggle work; the layout remains readable at desktop and mobile
  widths; no console errors.

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

No databases, seeds, or migrations. One portfolio-data safety rule:

- Case-study inputs and artifacts must be anonymized or synthetic before they
  enter a publishable path, and they must pass the leak scan.

## Deployment Or Startup

Deploy = fast-forward the verified `integration` release to `main`. GitHub
Pages serves `docs/` from `main` directly.

Release procedure (owner, PowerShell; both pushes require explicit approval):

```powershell
cd E:\GPT_OS\Projects\resume-portfolio
git status --short --branch
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
git fetch origin
git merge-base --is-ancestor origin/main integration
if ($LASTEXITCODE -ne 0) { throw "integration is not a fast-forward of origin/main" }
git push origin integration
git switch main
git pull --ff-only origin main
git merge --ff-only integration
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
git push origin main
git switch integration
```

GitHub Pages must be configured once at Settings → Pages → Deploy from branch
→ `main` / `docs/`.

Expected healthy state:

- site reachable at the Pages URL within ~1 minute of push;
- every navigation link, project link, and the resume PDF resolve on the live
  URL.

### Approved Clean-History Release

Use this only with explicit owner approval. Before changing refs, create both a
local Git bundle and local backup refs for every public branch tip. Build the
clean public root from the verified release tree, update `main` and
`integration` with explicit `--force-with-lease` expectations, then delete only
the owner-approved stale remote work branches. Finish by fetching with
`--prune`, confirming the remote heads, rerunning the full verification suite,
and checking the deployed site. Keep the local bundle until the owner confirms
it is no longer needed.

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
| Pages shows 404 | Pages not set to `main`/`docs`, or push didn't include `docs/` | repo Settings → Pages; `git ls-files docs` | fix setting or commit the missing files |
| Unexpected file staged | `.gitignore` allowlist widened or bypassed | `git status`, `.gitignore` | unstage; restore the allowlist; ask owner before changing it |

## Recovery And Rollback

If a change fails:

1. Identify the touched files and failing command.
2. Revert only the smallest change needed, preserving user work.
3. Rerun the failing verification command.
4. Update the owning spec with the result and remaining gap, then render.

A bad deploy is rolled back with `git revert` of the offending commit and a
push. Do not delete data, reset databases, rewrite history, or rotate secrets
unless the owner explicitly approves that action.

## Operational Proof

If a command changed durable project state, append evidence to the owning spec.
For routine read-only runs, a final response note is enough.
