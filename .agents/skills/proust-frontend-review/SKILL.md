---
name: proust-frontend-review
description: Review Proust's country discovery, map, comparison charts, indicator views, dashboards, and sharing for usability, analytical clarity, accessibility, state consistency, and performance. Use for frontend review requests; not ordinary implementation guidance.
---

# Proust frontend review

Inspect the actual UI or code and the relevant acceptance criteria in `docs/IMPLEMENTATION_PLAN.md` and `docs/PRODUCT_SPEC.md`. For statistical or source questions, consult `docs/DATA_SOURCES.md`. Paths are relative to the project root. Distinguish inspected behavior from design intent and anything unverified.

Trace the requested user journey and prioritize wrong analysis, lost work, inaccessible interactions, or broken navigation over cosmetic preferences. Apply only the checks relevant to the surface under review:

- Discovery/map: search and map selection agree; hover, focus, comparison membership, and viewport do not overwrite each other; small/unmapped countries remain reachable; fit/reset controls, keyboard/list alternatives, touch scrolling, and reduced motion work.
- Comparison: two-to-five-country membership is visible and consistent across entry points; colours remain stable and have non-colour cues; chart/table selections agree; topic changes and browser navigation preserve expected context.
- Analytical clarity: units, periods, sources, dimensions, gaps, and estimate/forecast status are understandable. Rankings do not mix latest years silently, forecasts are not presented as observations, aggregates do not enter country rankings, and transformations expose their baselines.
- Charts and mobile: axes/legends remain readable, exact values are available without hover, focus is visible, and narrow-screen controls/tables remain usable. Evaluate hierarchy and interaction clarity alongside visual consistency.
- Dashboards: shared filters and chart overrides are explicit; layout changes have keyboard paths; browser-local saving and recovery are clear. Review concurrent-edit recovery when server persistence exists.
- Sharing: frontend exploration URLs restore selections and browser-local dashboards are labelled as local. When publishing exists, verify frozen observations, private draft isolation, and revoked/missing views.

Trace loading, empty, partial-coverage, stale-data, and error/recovery states where applicable. Measure client performance using representative observations, five-country comparisons, and realistic geometry before recommending optimization; label hypotheses as such. Review the globe only if it exists or is explicitly in scope.

Report actionable findings with reproduction steps or precise code references, user impact, and a practical fix. Separate blockers from polish; do not claim visual verification from code inspection alone. If no meaningful issue is found, state what was checked and what remains unverified. When asked to fix findings, implement and run relevant checks under the project's authorization rules.
