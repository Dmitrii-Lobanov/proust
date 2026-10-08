# Proust project guidance

Proust is a country exploration and comparison workspace. Users discover countries through a searchable list or interactive map, explore indicators from public statistical sources, compare countries, and collect charts and notes into personal dashboards. This direction replaces the earlier generic CSV dashboard builder.

Read [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) for user journeys and interaction requirements, [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for release scope and acceptance criteria, [docs/DESIGN_CONCEPT.md](docs/DESIGN_CONCEPT.md) for visual and interaction design, and [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md) when working with providers or statistical semantics. Read only the parts relevant to the task.

## Working with the project owner

The owner is implementing the project personally and wants instructions, code, and feedback. When asked how to build a feature, explain the next small, testable slice: what to build, why it matters, which existing files or interfaces are involved, how to verify it, and what could go wrong. Provide ready-to-use code for that slice, with the intended file path, how it fits the current code, and the commands or checks the owner should run. Inspect existing code before prescribing an approach; if a file does not exist yet, label its path and interface as proposed. Distinguish first-release requirements from later ideas. Answer focused questions directly without repeating the roadmap.

Giving code in a response does not authorize editing the repository. Do not edit project code, install dependencies, create external resources, or deploy merely because the owner asks for guidance, code examples, or review. When explicitly asked to implement, fix, or edit files, carry out that request and verify the result.

Treat tests as part of features. For the frontend phase, favor observable behavior: validated fixture data, comparison calculations, and browser journeys spanning list/map selection, comparison, and local saving. Add API ownership, caching, and persistence tests when the backend phase begins. Avoid tests that restate component internals.

## Product invariants

- Exploration works without sign-in. The frontend phase saves prototype dashboards only in the current browser; accounts and durable personal dashboards belong to a later backend phase.
- Country selection from the list, map, profile, and comparison tray uses one canonical identity model. Geographic selection, hover, and map viewport are separate states.
- Initial comparison supports two to five countries. A country's colour remains consistent within the active workspace and its saved views; labels and symbols supplement colour.
- Sources, indicators, series dimensions, units, observation periods, and data releases remain identifiable. Display-label changes never break saved charts.
- Never silently merge similarly named series, mix incompatible units or population groups, or join historical data to a differently defined forecast.
- Missing values are distinct from zero. Missing years, excluded countries, estimates, and forecasts are visible. Rankings use an explicit common period by default.
- Charts, tables, maps, and derived statistics use the same selected context and calculation rules. Country aggregates are distinct from countries and excluded from country rankings.
- The searchable list and accessible controls provide alternatives to map, hover, drag, and colour-only interactions. Core exploration and comparison work on mobile.
- Saved dashboard document state and transient exploration state remain separate. Local browser storage uses a versioned document and handles unavailable or corrupt data. When server persistence is added, source cache and public viewer state also remain separate, and autosave cannot overwrite a newer edit silently.
- Shareable exploration URLs describe a view of the available data. Browser-local dashboards must be labelled as local and cannot be called published. Later public dashboards freeze their definition and included observations until republished or revoked.
- In the later backend phase, private routes enforce ownership on the server. Public views cannot mutate private drafts or reveal private notes beyond what the owner publishes.

## Architecture and scope

Use Next.js App Router with React and strict TypeScript for the frontend. Start as one application with Tailwind CSS, shadcn/ui, D3 Geo for the flat map, Apache ECharts for charts, Zustand for interactive state, Zod for data validation, and verified checked-in fixtures behind a typed data interface. Use Vitest and Playwright for the main checks. Backend, authentication, database, hosting, and live provider integration are deferred; the implementation plan separates these decisions from the frontend release.

World Bank supplies the initial verified fixture data. Live World Bank integration, then IMF and UN Comtrade for economic outlook and trade, belong to the backend phase and depend on verified access, reuse terms, and coverage. WHO, Eurostat, and UN SDG data are later candidates. Organize the interface by topic and user question, with source attribution available on every chart.

Prioritize a polished flat map, country profiles, comparisons, and reusable dashboards. An optional globe follows the accessible flat-map experience. Do not reintroduce CSV import, a generic connector marketplace, arbitrary formulas, or streaming market data as first-release requirements.

Keep the frontend phase independent of hosted services. Record actual provider limits and licensing evidence before live integration; target free service allowances for modest traffic in the later backend phase without promising zero infrastructure cost. Reassess a library only for a concrete compatibility or product reason and explain the tradeoff. Do not add hour estimates unless requested.

## Project skills

- Use `.agents/skills/proust-feature-guide/SKILL.md` for step-by-step implementation guidance on a Proust feature or milestone.
- Use `.agents/skills/proust-frontend-review/SKILL.md` for reviews of Proust's interface, interactions, accessibility, analytical clarity, or client performance.

The owner's current request takes precedence over skill advice.
