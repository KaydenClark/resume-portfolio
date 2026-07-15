# kayden clark — portfolio

Static multipage portfolio site. Published from `docs/` through Vercel at
[`kayden-clark.vercel.app`](https://kayden-clark.vercel.app).

Public routes:

- `docs/index.html` — minimal identity landing page
- `docs/resume.html` — complete resume content in one page
- `docs/projects.html` — LLM Workbench plus selected AI Agents Presentation, Dungeon Friends, and Spotify projects

The previous case-study and OpenBrain routes are retired redirects and are not
part of the current public navigation.

## Structure

- `docs/` — the site. Plain HTML/CSS/JS, no build step, no dependencies.
- Everything else in this repo directory is **ignored by git** (whitelist `.gitignore`) — working files never publish.

## Local preview

Open `docs/index.html` in a browser, or:

```
cd docs && python -m http.server 8000
```

## Deploy

Production is the Vercel project `kayden-clark`. Deployment is owner-controlled;
see `RUNBOOK.md` for the verified link, deploy, and inspection commands.

## Editing rules

- No client names, employee names, or real financials anywhere in `docs/`.
- Screenshots use synthetic data only.
- Every link gets clicked before pushing. Broken links are the one unforgivable bug on a portfolio.
