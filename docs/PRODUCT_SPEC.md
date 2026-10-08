# Proust product specification

Status: planning baseline from the October 8, 2026 product discussion. These are intended behaviors, not claims of implemented functionality. This specification supersedes the generic CSV builder direction.

## Purpose and audience

Help people understand how countries change, compare them fairly, and save or share their findings. Initial audiences are curious readers, students, journalists, and researchers. Exploration is the primary entry point; dashboards grow out of useful investigations.

Frontend journey: search for Ecuador or select it on the map → inspect a country profile → compare Colombia and Peru → choose indicators and a period → share the exploration URL or save charts and notes in this browser. Account saving and public dashboard publishing come later.

## Information architecture

| Area | User purpose | Initial behavior |
| --- | --- | --- |
| Explore | Find a starting question | Curated questions, topic entry points, searchable country list, flat world map |
| Countries | Understand one country | Overview plus curated topic views, headline measures, trends, peer comparison actions |
| Compare | Investigate differences | Two to five countries, shared period and topic, coordinated charts and exact-value table |
| Indicators | Investigate one measure | Definition, unit, source, coverage, trend/ranking/table views; map colouring follows later |
| My dashboards | Keep and organise findings | Locally saved charts, shared filters, notes, and layout in the frontend phase; account storage and publishing later |

Initial topics are Economy, People, and Trade. Health, Education, and Environment expand as suitable curated indicators and specialist sources are integrated. Do not create empty navigation destinations just to imply breadth.

## Country selection and map

- A searchable list and the map control the same selected country. Search supports canonical names and curated aliases; search and keyboard selection remain usable without the map.
- Hover previews a name and boundary without changing selection. Click or keyboard selection highlights a country, updates the list, and opens its summary panel.
- The summary shows a small set of measures with their individual observation years, plus Open country profile and Add to comparison actions.
- Fit the selected geometry into the visible map area, accounting for the summary panel. Provide World view, Zoom to selection, zoom buttons, pan, and touch gestures. Avoid trapping normal page scrolling.
- Handle small islands, multipart countries, and geometries crossing the antimeridian. Offer list selection and deliberate small-country hit targets. A country without mapped geometry remains selectable.
- Active country, comparison membership, hover, and the viewport are distinct. Panning does not change a user's countries; adding a comparison country does not clear the others.
- Maintain a visible comparison tray, with named chips, removal controls, a count, and a clear explanation at the five-country limit. Country focus alone does not imply comparison membership.
- Boundaries need a licensed geometry source and an explicit country/territory mapping. Boundary presentation is a cartographic choice, not an assertion about sovereignty.

Later: an optional globe shares selection with the list and flat map, rotates a selected country into view, and uses restrained transitions. No automatic spinning during reading. Respect reduced motion and provide a flat-map fallback when rendering is unavailable or too costly.

## Country profiles

Start with a curated overview and trend charts. Every headline measure identifies its unit and observation year; an overview may contain different latest years, but must make that visible. Country pages offer topic navigation, indicator definitions, and comparison actions without requiring an account.

Keep a user's selected countries and time range when moving into comparison. Preserve context on browser Back and Forward. Selecting an indicator opens its detail view with the relevant country context.

## Comparison workspace

Support two to five countries initially. One selected country is a useful preparation state with an invitation to add another. Removing countries never causes a blank or broken page.

- Overview: values, units, periods, and missing observations side by side.
- Trends: coordinated line charts and shared time-range controls. Hovering a year reveals values together without filling missing years implicitly; provide an accessible table alternative.
- Topics: curated sets of compatible measures; switching topics retains country selection and period where supported.
- Table: exact values, source and status information, useful sorting, and clear missing-value presentation.
- Give countries stable colours in a workspace and its saved/shared representation. Supplement colours with names, line patterns, or markers.
- Default rankings to a common observation year. If unavailable, show exclusions and let the user change the year. Do not silently compare each country's latest observation.
- Offer levels and change from a common starting period only for appropriate measures. Define percentage change, percentage point change, and indexed views separately. Reference-country differences and relationship plots are later enhancements.
- Mobile supports stacked charts, reachable controls, and a labelled horizontally scrollable comparison table. Desktop hover is never the sole way to retrieve values.

## Indicators and analytical views

Curate a small catalogue with understandable names, definitions, units, source attribution, available periods, and important qualifications. Search by plain-language topic or name. A saved chart references stable series IDs and dimensions, not display text.

Initial analytics: values, common-year rankings, endpoint differences, percentage change where mathematically meaningful, and percentage point changes for rates. Any generated summary must be reproducible from visible observations and show the compared periods. Do not infer causes from relationships.

Later views: indicator-coloured map with year control and missing-data legend; scatterplot with explicit matched periods; indexed trends; benchmarks using compatible published aggregates. Avoid averaging country percentages to fabricate regional statistics.

Trade expansion: exports/imports by partner and product, ranked lists, composition treemaps, and historical trends. A shared reporter, flow, period, partner, and product context coordinates these views. Flow maps follow when they help users trace a relationship.

Economic outlook: show source-defined estimates and forecasts distinctly, with release date and a legend. Preserve the provider's historical/forecast continuity and disclose any source changes.

## Personal dashboards and sharing

Every eligible chart has Add to dashboard. In the frontend phase, users can assemble and save a collection in the current browser. Explain that browser data can be cleared and does not sync across devices. Durable account saving and optional transfer of the local collection come with the later backend phase.

A local dashboard contains a title, saved charts, short plain-text notes, shared countries/time defaults, and an arrangable layout. Each chart visibly either follows shared filters or overrides them. Provide keyboard alternatives and a clear local save/restore state. Undo/redo may be added with layout editing. Revision-aware autosave and concurrent-edit conflict recovery belong to server persistence.

Sharing develops in two stages. The frontend phase supports only the first behavior:

1. Exploration URL: encodes countries, topic/indicator, period, and supported display options. Resolves against available source releases; values may change as providers revise data. Contains no private notes or credentials.
2. Later published dashboard: immutable definition and included observations, with source release/retrieval metadata, until republished or revoked. Visitors may change local viewing controls only within included data. Private draft changes and provider refreshes do not alter it.

In the later backend phase, publishing previews the charts, observations, and notes that become public. Source reuse rights must allow the intended publication. Render notes safely; do not accept executable content.

## Visual and interaction quality

Use the Living Atlas direction in [DESIGN_CONCEPT.md](DESIGN_CONCEPT.md): warm paper, deep ink, a quiet sage map, restrained terracotta emphasis, expressive serif headings, and clear sans serif data text. Treat the documented colours as starting tokens pending contrast and usability checks.

Each page has a clear starting question and primary action. Progressive detail keeps source explanations available without overwhelming first use. Charts prioritise readable axes, units, legends, and comparisons over decorative effects.

Specify loading, empty, partial-coverage, stale-data, error, and recovery states. Prevent layout jumps. Keep previous valid data visible during appropriate refetches, with its status evident. Respect reduced motion, accessible contrast, keyboard focus, and touch targets. Measure real performance with representative data and map geometry.

## Scope boundaries

The frontend release uses a flat map and curated, verified World Bank fixtures; a globe is later. Integrate live World Bank data, then IMF and Comtrade as separate backend slices. These are planned providers, not verified integrations. Specialist health, European regional, and SDG views follow demonstrated user needs.

Generic CSV import, arbitrary data joins/formulas, a connector marketplace, live financial trading views, AI explanations, collaboration, and custom map editing are outside the first release. More dashboards should come from meaningful questions and reusable views, not duplicated screens.
