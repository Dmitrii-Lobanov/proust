---
name: proust-feature-guide
description: Give the Proust owner small implementation steps and ready-to-use code for country exploration, comparison, maps, data, and dashboards. Use when the owner will write the code themselves; not for requests to edit repository files.
---

# Proust feature guide

Read the relevant milestone in `docs/IMPLEMENTATION_PLAN.md` and inspect existing code before giving instructions. Use `docs/PRODUCT_SPEC.md` for interaction requirements. Read `docs/DATA_SOURCES.md` when a task touches provider integration, series identity, statistical transformations, or data publication. These paths are relative to the project root.

Proust's frontend journey is country discovery through a list/map → profile → comparison of two to five countries → local dashboard or shareable exploration URL. World Bank fixtures power the first slice. Live providers, accounts, persistent publishing, and the globe are later; do not turn them into frontend prerequisites.

Give the owner small, independently verifiable steps and the code needed to carry out the current slice. Specify the intended file path for each code block, show how it connects to existing code, and include relevant commands or checks. Prefer a complete small example over fragments that leave essential wiring to guesswork. For each step, connect user-visible behavior to the typed fixture/data contract and a meaningful check. Discuss server API contracts only when working on the later backend phase. Start with the smallest end-to-end behavior and extend it. Refer to actual files once they exist; label proposed interfaces as proposals. Use representative countries and provider fixtures without inventing statistics.

Apply the relevant constraints:

- Map/list/profile/tray interactions share canonical country IDs. Keep hover, focused country, comparison membership, and viewport distinct; include a keyboard/list path and small-country handling.
- Comparisons align period, unit, frequency, and dimensions. Expose missing coverage and estimates/forecasts; use a common year for rankings. Test hand-checkable results and chart/table agreement.
- Frontend data uses verified, attributed World Bank fixtures behind an asynchronous typed repository interface. Live provider integrations in the later backend phase verify access, reuse terms, and coverage; normalize behind bounded adapters and test upstream failures.
- Dashboard changes separate browser-local document edits from transient selection. Verify filter inheritance, local save/restore and failure handling. Add server autosave, expected revisions, and public viewer overrides only in the backend phase.
- Exploration links restore selections, while local dashboards remain in one browser and are not published. Later published dashboards freeze included observations and definitions. Test the behavior the active phase promises.

Mention loading, empty, partial-data, error/recovery, mobile, and accessibility behavior as it becomes relevant. Explain non-obvious tradeoffs briefly. Finish with a short completion checklist and the next dependency. Do not prescribe optimization without a concrete performance concern or add hour estimates unless requested.

Providing code in the answer does not imply permission to edit files. If the owner explicitly asks to implement or edit the repository, follow that request and the project's authorization rules.
