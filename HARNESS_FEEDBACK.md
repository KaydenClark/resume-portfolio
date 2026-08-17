# Resume Portfolio - Harness Feedback

> Generated from LLM Workbench v2.3. See `RUNBOOK.md` -> Upgrading The Harness.

This is the return channel from this project back to the LLM Workbench harness.
When the control docs themselves (`AGENTS.md`, `BLUEPRINT.md`, `TASKBOARD.md`,
`RUNBOOK.md`, `GENESIS.md`) are unclear, wrong, missing guidance, or actively
slow the work down, record it here instead of silently working around it. The
owner carries these lessons back to LLM Workbench, where a change is validated
against `evals/` before it ships as "better".

This log is append-only. Do not edit or delete prior rows; add a new one.

## How To Log

Add a row whenever the harness (not this project's own code or docs) caused
friction or could be improved. Keep it concrete: name the doc and section, say
what happened, and propose a change if you have one.

| Date | Doc / section | What happened | Impact | Proposed change | Status |
|---|---|---|---|---|---|
| 2026-07-13 | GENESIS.md -> Green-field only | Genesis was requested for a project with an existing scaffold but no git history and no prior control docs. ADOPTION assumes prior docs/history to migrate; Genesis fit better, treating the fresh scaffold as the Phase 3 artifact. The boundary between the two protocols is fuzzy for "code exists, harness doesn't, history doesn't" repos. | low | Add a sentence to GENESIS: "A fresh scaffold with no prior control docs and no meaningful history may be treated as the Phase 3 artifact; verify it rather than rebuild it." | new |
| 2026-07-13 | templates/SPEC.md -> Status field | Placeholder scan flags `[0-9]` in the Priority line of the blank template if copied verbatim; harmless but forces editing a line Genesis doesn't call out explicitly. | low | List Priority among the placeholders GENESIS Phase 6 must fill. | new |

## What Belongs Here vs. TASKBOARD

- This project's own work, bugs, and tasks -> `TASKBOARD.md`.
- Friction caused by the harness rules/templates themselves -> here.
