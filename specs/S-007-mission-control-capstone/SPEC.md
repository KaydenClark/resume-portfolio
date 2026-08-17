# S-007 - Portfolio Mission Control Capstone + Interactive Dashboards

> Generated from LLM Workbench v2.3. Stable path
> `specs/S-007-mission-control-capstone/SPEC.md`; never move between status folders.

**Spec ID:** S-007
**Status:** active
**Priority:** 2
**Owner:** Kayden
**Updated:** 2026-07-17
**Catalog description:** Capstone "Mission Control" case study plus the site's first live, synthetic interactive dashboards.
**Blockers:** none
**Latest event:** TK-001 closed with proof.
**Next gate:** Complete TK-002.

## Outcome

The site gains a capstone case study, "Portfolio Mission Control," that frames
the three per-account systems (roster, invoicing, campaign metrics roll-up) as
the building blocks of a portfolio-level single source of truth, and it gains
its first genuinely interactive proof: live, client-side dashboards a recruiter
can drive (toggle week/month, scrub periods, switch accounts) - all backed by a
single invented dataset so the whole thing reads as one operating system.

## Why It Matters

The Blueprint's core pillar is "the site is the work sample." Until now the
case studies assert interactivity and show static SVGs. A working dashboard the
reviewer operates themselves is stronger evidence than any screenshot, and the
Mission Control story - one repeatable pattern proven across up to twelve
concurrent accounts in five unrelated industries - is the owner's strongest
"systems architect" artifact. It only lands if it is demonstrated, not claimed.

## Current Verified State

- Four case-study pages exist (campaign-rollups, invoicing, roster,
  operations-systems-playbook); none carry a live interactive dashboard.
- The site's only interactivity is theme toggle + hover/focus SVG diagrams
  (`docs/assets/main.js`), both progressive-enhancement.
- The planned metrics roll-up, invoice, and QA views use only synthetic data.
- No Mission Control page and no shared synthetic dataset exist yet.

## Desired Behavior

- One shared synthetic dataset (`docs/assets/portfolio-data.js`): ~5-6 fictional
  accounts, one per vertical (health provider, sportsbook/wagering, sales org,
  support account, telephony onboarding), with weekly metric series. Threaded
  through every widget and the Mission Control grid.
- Three interactive dashboards, all client-side, synthetic, no external
  dependencies, keyboard-accessible, reduced-motion-safe, each with a working
  no-JS fallback: metrics roll-up (week/month + period), invoice, QA.
- Placement: metrics roll-up + QA on the campaign-rollups page; invoice on the
  invoicing page; a new Mission Control capstone page carries a three-layer
  interactive architecture diagram + a consolidation grid and links down to the
  widgets.
- Capstone claims lead with adoption + generalization (leadership-designated
  single source of truth, monthly-update mandate, 9 live / proven against up to
  12 concurrent, five unrelated industries). No fabricated efficiency metrics.
  Language is "consolidates the outputs of," never "pipes into" (composition,
  not automation).

## Decisions And Contracts

- All account names and data on published surfaces are invented. Client and
  employee identifiers never appear in copy, code, CSS classes, filenames, or
  commits.
- Every dashboard structure and value is generated from the synthetic dataset.
- Progressive enhancement is mandatory: each dashboard renders a usable static
  table with JS off; JS adds controls and live re-rendering.
- No frameworks, no CDN, no build step; one shared stylesheet and one shared
  script, consistent with existing invariants.
- The "9 live / max 12 concurrent / monthly mandate / five industries" claims
  rest on owner attestation (owner's own resume standard), not third-party
  verification; recorded here so the basis is explicit.

## Non-Goals

- No backend, live data, or persistence; dashboards are static + synthetic.
- No spreadsheet-file embeds or SheetJS viewers.
- Not replacing the synthetic Operations Systems Playbook page.

## Dependencies And Blockers

- none.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Shared synthetic dataset (`portfolio-data.js`) + interactive metrics roll-up widget on campaign-rollups page, with no-JS fallback; verify green | done | none | Interactive metrics roll-up live on campaign-rollups page; Playwright headless drove account switch, weekly/monthly toggle (monthly volume 9,960 = wk1-4 sum), start-period trim, trend classes; 0 console errors; no-JS fallback shows static table with controls hidden; verify-site + doctor green. |
| TK-002 | Invoice interactive dashboard on the invoicing page, wired to the shared dataset | ready | TK-001 | pending |
| TK-003 | QA interactive dashboard on the campaign-rollups page, wired to the shared dataset | ready | TK-001 | pending |
| TK-004 | Mission Control capstone page: three-layer interactive architecture diagram + consolidation grid, links down to the widgets | ready | TK-001 | pending |
| TK-005 | Wire Mission Control into index Systems section and cross-link case-study nav | ready | TK-004 | pending |

## Acceptance Criteria

- [ ] Each interactive dashboard is usable with JS disabled (static table) and
      enhanced with JS (controls + live re-render), keyboard-operable, and
      respects `prefers-reduced-motion`.
- [ ] Mission Control page leads with adoption/generalization claims and
      contains zero fabricated efficiency metrics and no "pipes into" language.
- [ ] `node tools/verify-site.mjs` passes (leak scan, internal links,
      placeholders) with all new files in scope.
- [ ] Owner eyeballs every published account name and number for invented
      status and anonymization before the publishing commit.
- [ ] `node tools/spec-workbench.mjs doctor` reports no projection/link drift.

## Testing Seams

- Leak scan covers `docs/` recursively, including `portfolio-data.js` and all
  new markup, catching any radioactive string.
- Internal link check proves the capstone's down-links and nav resolve.
- Manual: drive each widget with keyboard only; disable JS and confirm the
  fallback table; toggle reduced-motion and confirm no motion.

## Verification Procedure

```bash
node tools/verify-site.mjs
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- Blueprint spec catalog re-rendered to include S-007.
- New capstone case page + edits to campaign-rollups and invoicing pages; index
  Systems section updated when TK-005 lands.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-07-17 | TK-001 | Ticket closed | Interactive metrics roll-up live on campaign-rollups page; Playwright headless drove account switch, weekly/monthly toggle (monthly volume 9,960 = wk1-4 sum), start-period trim, trend classes; 0 console errors; no-JS fallback shows static table with controls hidden; verify-site + doctor green. | campaign-rollups.html + portfolio-data.js + main.js + style.css; SPEC evidence appended. | Invoice (TK-002) and QA (TK-003) widgets, Mission Control capstone page (TK-004), and index/nav wiring (TK-005) not yet built. |

## Completion Result

Pending.

## Remaining Limitations Or Follow-Up Specs

- Quantified efficiency outcomes remain unverified by design; a future spec
  could add real usage analytics if a defensible source ever exists.

## Supersession

- Supersedes: none
- Superseded by: none
