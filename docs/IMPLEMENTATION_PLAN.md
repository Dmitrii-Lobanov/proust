# Proust — frontend-first implementation plan

Status: planning baseline, October 8, 2026. The repository currently contains planning documents and project skills; milestones below are not yet marked complete. This plan replaces the generic CSV dashboard-builder MVP and defers backend development.

## Objective and constraints

Build a polished, usable Next.js frontend for discovering countries, comparing their development, and arranging findings into local dashboards. See [PRODUCT_SPEC.md](PRODUCT_SPEC.md) for the full product vision, [DESIGN_CONCEPT.md](DESIGN_CONCEPT.md) for visual direction, and [DATA_SOURCES.md](DATA_SOURCES.md) for statistical contracts.

First working journey: select Ecuador from search or the map → inspect a country profile → compare Colombia and Peru → inspect indicators and exact values → save charts in this browser.

- Public exploration requires no sign-in in the frontend phase.
- Use small, checked-in, source-attributed fixtures that represent real provider observations. Validate values and metadata before including them. Do not present invented figures as actual statistics.
- Keep the data interface independent of React components so a later server data source can replace fixtures without rebuilding screens.
- Tests accompany each feature and check observable behavior and statistical correctness.
- Keep the initial build usable on desktop and mobile, with list and keyboard alternatives to map interactions.
- Treat persistent accounts, live provider integration, server caching, and published snapshots as a separate backend phase. Browser storage is local and may be cleared by the user or browser.

## Frontend release scope

- Explore entry page with curated questions, searchable country list, and interactive flat world map.
- Shared country focus, country summary, fit/reset zoom controls, mobile layout, and accessible list/keyboard paths.
- Country profiles and a small curated indicator catalogue backed by verified World Bank fixtures. Choose initial measures after coverage checks.
- Compare two to five countries through overview figures, line/bar/metric views, topic and period controls, and an exact-value table.
- Show indicator definitions, units, sources, observation years, missing values, and estimates where present in the fixture.
- Calculate supported differences, percentage point changes, relative changes, and common-year rankings with documented rules.
- Shareable exploration URLs whose selections can be restored in the frontend. The URL does not preserve a copy of the underlying data.
- Local dashboard prototype: add charts, title, short notes, shared selections and explicit chart overrides; arrange charts with keyboard alternatives; persist locally in the browser and provide clear save/restore/reset states.
- Designed loading, empty, missing-data, error, focus, reduced-motion, and recovery states throughout.

The local dashboard is a prototype. It has no account, cross-device sync, ownership, or public publishing. Do not call a browser-local view a published snapshot.

## Later backend phase

- Integrate verified World Bank responses, then IMF and UN Comtrade as separate vertical slices, with provider validation, bounded queries, source releases, server caching, and last-good data.
- Add accounts and durable dashboard persistence with ownership, revision-aware autosave, and conflict recovery.
- Add immutable published dashboards, preview, republish/revoke, and a responsive public viewer with frozen included observations.
- Choose hosting and database details at that phase. Neon PostgreSQL and Prisma remain candidates; no separate NestJS service or AWS Lambda is committed. Next.js Route Handlers are the default starting point for server endpoints if they fit measured requirements.

Later product enhancements include an indicator-coloured map, relationship views, trade composition, specialist health/European/SDG topics, and an optional globe. Generic CSV import, arbitrary formulas/joins, live financial trading views, and AI explanations are outside the current product scope.

## Stack decisions

| Concern | Decision |
| --- | --- |
| Framework | Next.js App Router with React and strict TypeScript |
| Package manager | pnpm; begin with one application rather than a workspace split |
| Styling | Tailwind CSS, project design tokens, and shadcn/ui for accessible controls |
| Flat map | D3 Geo with a licensed, simplified country geometry dataset; prototype projection, hit targets, pan/zoom, and mobile performance before finalising the map implementation |
| Globe | Deferred; evaluate MapLibre GL JS only when the globe or richer geographic layers need it |
| Charts | Apache ECharts behind a shared chart view-model/renderer boundary |
| Tables | TanStack Table for exact values; add virtualization only if measured row counts require it |
| State | URL for shareable exploration context; Zustand for interactive comparison and local dashboard document/undo; component state for hover, focus, and open panels |
| Data | Curated, checked-in provider fixtures behind a typed repository interface; pure normalization and comparison functions |
| Validation | Zod for fixture parsing, URL state, local dashboard documents, and later server boundaries |
| Local persistence | Browser storage for a versioned dashboard prototype, clearly labelled as local to this browser |
| Tests | Vitest for domain logic; React Testing Library for critical interactions; Playwright for map/list selection, comparison, local saving, and responsive journeys |
| Deployment | Defer the hosting decision; Next.js can be previewed locally during the frontend phase |

Do not install a backend, database, auth library, queue, source-refresh service, or network client merely to scaffold the frontend. Add TanStack Query when remote client fetching is needed. Add a dashboard grid library only when the editor interaction is being built and its keyboard behavior has been checked. Keep React Server Components for appropriate page shells and Client Components for maps, charts, and editing interactions.

## Frontend contracts

### Data repository

Define a narrow, asynchronous interface for fetching the curated country catalogue, indicator metadata, and bounded observations by country, indicator, and period. The fixture implementation returns typed results with source/retrieval information; later provider-backed implementations keep the same UI contract. The UI must not depend on World Bank response shapes.

Use canonical country IDs and stable series IDs. Preserve country/aggregate distinction, unit, frequency, dimensions, status, observation period, and source attribution. Missing is distinct from zero. Rankings default to a common period and disclose excluded countries. See DATA_SOURCES.md for transformation rules.

### Navigation and state

The list, map, profile, and comparison tray share canonical country IDs. Keep focused country, hover, comparison membership, and viewport distinct. Encode suitable selections in the URL and validate malformed links. Keep browser-local dashboard documents separate from temporary exploration state. Completed layout changes should form coherent undo entries if undo is offered.

Browser storage is a convenience for the prototype, not a durability guarantee. Use a versioned format; handle invalid, stale, or unavailable saved chart references without crashing. Explain local-only storage in the dashboard interface. Future server persistence needs revision checks and ownership enforcement.

### Visual consistency

Follow the Living Atlas direction in DESIGN_CONCEPT.md. Keep chart and table values in agreement, maintain stable country colours with non-colour cues, show exact values without hover, and preserve usable map/list selection on mobile. Mockups may use illustrative numbers; the working app must use verified source fixtures or explicit placeholders.

## Frontend milestones

### M0. Product, data, and visual specification

- Refine the Living Atlas tokens and Explore composition with contrast, mobile, and reduced-motion checks.
- Select a licensed, simplified boundary dataset and record attribution, version, and country mapping.
- Verify candidate World Bank indicator definitions, coverage, and sample observations; create a small documented fixture set.
- Define the country/series/observation model and calculation rules before building charts.

Exit: coherent Explore, profile, and comparison designs; verified sample data; map and identity decisions recorded. No placeholder metric is presented as real data.

### M1. Next.js foundation and data contract

- Create one Next.js App Router application with strict TypeScript, Tailwind, design tokens, linting, Vitest, and Playwright.
- Implement Zod-validated fixtures and an asynchronous data repository interface.
- Render one page with a known country and indicator, source, unit, period, and missing-value treatment.

Tests: fixture validation, one hand-checked observation, page smoke test, build and typecheck.

Exit: a reproducible local app can render trustworthy fixture data without an external service.

### M2. Country discovery and flat map

- Build country search/list, selected-country summary, and flat map against the same canonical IDs.
- Implement map hover, click, fit/reset zoom, list fallback, touch behavior, and a visible comparison tray.
- Support adding/removing up to five distinct countries without conflating focus and membership.

Tests: list → map and map → summary consistency, duplicate/limit/removal cases, islands/unmapped countries, keyboard alternative, mobile pan/scroll, and reduced motion.

Exit: a visitor can discover a country through list or map and prepare a comparison reliably.

### M3. Profiles, indicators, and comparison

- Add country profile pages, a curated indicator catalogue, and shared metric/line/bar/table renderers.
- Build two-to-five-country comparisons with topic, period, and exact-value views.
- Use pure calculations for supported change and ranking views. Restore selection from URLs and browser navigation.

Tests: known fixtures with hand-calculated results, missing/common-year exclusions, chart/table agreement, topic switching, malformed URL, Back/Forward, keyboard and mobile journeys.

Exit: a visitor compares Ecuador, Colombia, and Peru, understands gaps and sources, and reopens the same exploration from a link.

### M4. Local dashboard prototype

- Add a chart from exploration to a local dashboard; edit title/notes and shared selections.
- Arrange charts with a keyboard path. Distinguish shared selections from chart overrides.
- Save a versioned local document, restore on reload, and handle storage failure or schema mismatch explicitly.

Tests: add/edit/remove and reload; filter inheritance; keyboard layout; corrupted local data; unavailable indicator reference; storage denied or full.

Exit: the browser can restore a useful personal collection and clearly communicates its local-only nature.

### M5. Frontend release verification

- Review accessibility, touch and narrow-screen layouts, chart clarity, focus, and all loading/empty/error states.
- Profile a documented browser/device with five selected countries and representative map geometry; improve measured bottlenecks.
- Run typecheck, lint, domain/component tests, Playwright journeys, and a production build. Document actual dataset and browser-storage limits.
- Add setup instructions and screenshots after the app exists.

Exit: the frontend journey is coherent, tested, and ready for a later backend phase.

## Backend handoff criteria

Begin backend design only after the frontend data contract and core journeys have been exercised. At that point verify provider access and reuse rights, decide refresh/caching and hosting from measured needs, then add persistence and publishing with ownership and snapshot tests. Replace the fixture repository behind its interface rather than changing chart or map semantics.

For each feature, state acceptance criteria and important failure cases, implement a small end-to-end slice, add meaningful tests, check relevant empty/error/keyboard/mobile states, and record actual completion. If scope shrinks, defer extra indicators, layout complexity, and advanced chart types first; preserve country discovery, two-to-five-country comparison, correct statistical semantics, and accessible alternatives.
