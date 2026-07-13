# kayden clark — portfolio

Static portfolio site. Published from `docs/` via GitHub Pages.

## Structure

- `docs/` — the site. Plain HTML/CSS/JS, no build step, no dependencies.
- Everything else in this repo directory is **ignored by git** (whitelist `.gitignore`) — working files never publish.

## Local preview

Open `docs/index.html` in a browser, or:

```
cd docs && python -m http.server 8000
```

## Deploy

GitHub Pages → Settings → Pages → Deploy from branch → `main` / `docs/`.

## Editing rules

- No client names, employee names, or real financials anywhere in `docs/`.
- Screenshots use synthetic data only.
- Every link gets clicked before pushing. Broken links are the one unforgivable bug on a portfolio.
