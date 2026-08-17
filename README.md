# kayden clark — portfolio

Static portfolio site. Published from `docs/` via GitHub Pages.

## Structure

- `docs/` — the site. Plain HTML/CSS/JS, no build step, no dependencies.
- `specs/`, `tools/`, and the root control docs — public project requirements,
  verification, and operating guidance.
- The whitelist `.gitignore` excludes files that are not explicitly approved
  for the public repository.

## Local preview

Open `docs/index.html` in a browser, or:

```
cd docs && python -m http.server 8000
```

## Deploy

GitHub Pages → Settings → Pages → Deploy from branch → `main` / `docs/`.

## Editing rules

- Portfolio content is anonymized; supporting artifacts and screenshots use
  synthetic data.
- Every link gets clicked before pushing. Broken links are the one unforgivable bug on a portfolio.

## Verify before pushing

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```
