# Resume Portfolio - Runbook

> Generated from LLM Workbench v2.3. See Upgrading The Harness below.

**Last reviewed:** 2026-07-13
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

Option A - open directly: double-click `docs\index.html` (everything works
from the filesystem, including theme toggle and diagrams).

Option B - local server (matches Pages path behavior):

```bash
cd docs
python -m http.server 8000
```

Open:

- http://localhost:8000

Expected result:

- Index page renders with hero, three case-study cards, How I Work, Off the
  Clock; theme toggle works; case-study diagrams respond to hover and
  keyboard focus; no console errors.

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

Deploy = push to `main`. GitHub Pages serves `docs/` from `main` directly.

First-time setup (owner, PowerShell):

```powershell
cd E:\GPT_OS\Projects\resume-portfolio
Remove-Item -Recurse -Force .git   # stale empty .git dir from before init
git init -b main
git add .
git status                          # gate: ONLY allowlisted paths staged
git commit -m "Portfolio site v1 + LLM Workbench v2.3 harness"
git remote add origin https://github.com/KaydenClark/resume-portfolio.git
git push -u origin main
```

Then: GitHub → Settings → Pages → Deploy from branch → `main` / `docs/`.

Expected healthy state:

- site reachable at the Pages URL within ~1 minute of push;
- every nav link, case-study link, and the resume PDF resolve on the live URL.

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
