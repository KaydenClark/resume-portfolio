# S-008 - Compact Portfolio Navigation

> Stable path `specs/S-008-compact-portfolio-navigation/SPEC.md`; never move between status folders.

**Spec ID:** S-008
**Status:** complete
**Priority:** 0
**Owner:** Codex
**Updated:** 2026-08-16
**Catalog description:** Restore the compact, card-led public portfolio and frame Kayden as a Business Process Analyst.
**Blockers:** none
**Latest event:** Spec completed and removed from the hot board.
**Next gate:** none

## Outcome

The public site opens on a compact identity card with Kayden's headshot, name,
Business Process Analyst positioning, summary, and contact links. Separate
Résumé and Projects tabs keep the public surface easy to scan and leave room
for later sections without rebuilding the landing page.

## Why It Matters

The prior CV-first single-page structure is visually and structurally heavier
than the owner's preferred site. The live-site pattern is a better fit: one
clear introduction, then intentional destinations.

## Decisions And Contracts

- Use the live Vercel site's compact three-page navigation pattern as the
  structural reference: Home, Résumé, and Projects.
- Keep the current shared card-led visual system, local assets, accessibility
  affordances, and no-build static architecture.
- Public-facing role framing is **Business Process Analyst**. Do not publish
  new metrics, employers, clients, or unconfirmed claims.
- Preserve the existing case-study files and synthetic dashboard work; this
  slice removes them from the homepage rather than deleting them.

## Non-Goals

- No deployment, push, new external links, or resume-file replacement.
- No deletion of retained case-study or dashboard assets.

## Vertical Implementation Slices

| Ticket | Slice | Status | Blockers | Proof |
|---|---|---|---|---|
| TK-001 | Restore compact landing page; add Résumé and Projects routes; update role framing and static verification | done | none | verify-site passed; main.js syntax clean; Edge desktop plus 390px Home, Resume, and Projects renders inspected; compact navigation and Business Process Analyst regression gate passed |

## Acceptance Criteria

- [x] Home opens on an accessible identity card containing the headshot, name,
      Business Process Analyst framing, summary, and external/profile links.
- [x] Header navigation exposes separate Résumé and Projects pages, and all
      local navigation targets resolve.
- [x] The compact pages retain usable desktop and approximately 390px mobile
      layouts, visible keyboard focus, and reduced-motion support.
- [x] Static leak, link, placeholder, JavaScript syntax, and spec-doctor gates
      pass.

## Testing Seams

- `tools/verify-site.mjs` asserts the compact navigation and Business Process
  Analyst framing, then checks every local link.
- Browser smoke test verifies the landing card, navigation, mobile viewport,
  and theme control.

## Verification Procedure

```bash
node tools/verify-site.mjs
node --check docs/assets/main.js
node tools/spec-workbench.mjs doctor
```

## Documentation Impact

- This spec owns the structure and framing decision.
- `BLUEPRINT.md` and `TASKBOARD.md` are generated from this spec.

## Append-Only Evidence And Execution Log

| Date | Ticket | Event | Verification | Docs | Remaining gap |
|---|---|---|---|---|---|
| 2026-08-16 | TK-001 | Ticket closed | verify-site passed; main.js syntax clean; Edge desktop plus 390px Home, Resume, and Projects renders inspected; compact navigation and Business Process Analyst regression gate passed | S-008 records the compact navigation decision; Blueprint and Taskboard rendered | none |
| 2026-08-16 | spec | Spec completed | Acceptance gates satisfied | Documentation impact recorded above | none |

## Completion Result

The homepage is once again a focused introduction card, with the expanded
professional content moved to a dedicated Résumé page and current personal
work on a dedicated Projects page. The public role framing is Business Process
Analyst, and retained case-study links now resolve to the new compact routes.

## Supersession

- Supersedes: S-006's CV-first homepage structure only; its shared visual and
  accessibility work remains in force.
- Superseded by: none
