# Data sources and statistical contracts

Status: source shortlist and integration requirements, October 8, 2026. The frontend phase uses small, checked-in, verified and attributed provider fixtures behind a typed repository interface. Documentation was consulted during product discovery; no live endpoint has been integrated or load-tested in this repository. Verify current access, quotas, terms, and representative responses before implementing a provider. Free access does not imply unlimited usage or unrestricted redistribution.

## Provider roles

| Provider | Intended role | Access evidence and integration notes |
| --- | --- | --- |
| [World Bank Indicators](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392) | Verified fixtures for initial profiles and comparisons; live integration later | Documentation states no API key is required. Curate indicators rather than exposing the full catalogue. [Query structure](https://datahelpdesk.worldbank.org/knowledgebase/articles/898581) supports country and date selection. |
| [IMF World Economic Outlook](https://data.imf.org/Datasets/WEO) | Economic outlook, fiscal measures, estimates and forecasts | [API documentation](https://data.imf.org/en/Resource-Pages/IMF-API) describes SDMX access and sign-in for its API explorer. Verify actual endpoint authentication and terms. Preserve release and observation-status metadata. |
| [UN Comtrade](https://comtrade.un.org/) | Trade by reporter, partner, product, flow, and period | Offers free access and additional subscription features. Verify account/key requirements, query/record limits, licensing, and classification versions for selected endpoints. |
| [WHO GHO](https://www.who.int/data/gho/info/gho-odata-api) | Later health detail and demographic breakdowns | Published OData interface. Preserve dimensions such as sex and age, estimate ranges, and period definitions. Verify current service availability and reuse terms. |
| [Eurostat](https://ec.europa.eu/eurostat/web/user-guides/data-browser/api-data-access/api-introduction) | Later European and regional detail | Explicitly free API access. Provider documentation says its database exposes latest dataset versions; retain our retrieved releases for reproducible published views. |
| [UN SDG](https://unstats.un.org/SDGAPI/swagger/) | Later development-goal exploration | Published official series API. Check dimensions, custodial sources, coverage, and reuse terms; indicators may overlap other providers. |

The planned sequence is verified World Bank fixtures for the frontend → live World Bank integration in the backend phase → IMF → Comtrade. Health, European regional, and SDG expansions are later. Provider order can change for a demonstrated access or coverage problem; record the reason and preserve the country-comparison journey.

## Frontend fixture rules

Use a small, documented sample of real observations and metadata that supports discovery, multi-country comparison, missing values, and source attribution. Record the source URL and retrieval date with each fixture set; preserve observed status and units. Keep fixtures within applicable reuse terms and avoid invented values in working charts. The typed repository interface should return asynchronous, bounded results so a later server implementation can replace the fixtures without changing map, chart, or table components. No live provider credentials or scheduled refresh are required in the frontend phase.

## Later integration readiness checklist

Before a provider powers a user-facing feature:

- Record documentation URLs, verification date, endpoint/version, authentication, quotas, attribution, and applicable reuse/publication terms. Keep secrets on the server.
- Retrieve representative actual data: several countries, multiple periods, a missing observation, and relevant dimensions or forecast statuses. Check coverage before choosing default indicators.
- Establish bounded pagination, timeouts, retries/backoff, cache lifetime, and refresh behavior appropriate to the release cadence. Do not hard-code unsupported rate-limit assumptions.
- Save small, permitted fixtures for deterministic adapter and domain tests. Normal CI must not depend on live upstream services.
- Document provider-specific errors and a useful stale-data/unavailable UI. Preserve the last valid release if a refresh fails or validates incompletely.
- Verify one rendered chart and table against known source values, units, periods, and statuses.

## Canonical data model

Country identity: internal stable ID, source-specific codes, display name/aliases, region, entity kind (country/territory/aggregate), and optional geometry ID. ISO codes are useful mappings, not proof that every provider entity has a one-to-one equivalent. Do not match countries by display name. Distinguish regional/income aggregates from countries.

Indicator identity: internal stable ID, provider, provider series code, dataset/version, definition, unit and scale, frequency, population/universe, dimensions, applicable transformations, and attribution. Multiple measures with similar labels remain distinct unless an explicit compatibility mapping is reviewed.

Observation: country/entity ID, series ID, dimension values, period/frequency, numeric value or missing status, source observation status (observed/estimated/projected as supplied), optional uncertainty bounds, source release/version, and retrieval timestamp. Preserve source raw codes when needed for interpretation; retrieval time is not the observation date.

Trade observations additionally identify reporter, partner, flow, product classification/version/code, value unit, and any total/aggregate codes. Prevent double-counting totals with component products or partners. Re-exports and mirror trade reports require explicit treatment.

Source release: provider/dataset identity, available provider release metadata, retrieval time, validation status, attribution/terms reference, and a reproducible reference to included observations. Where no provider release ID exists, use an internal ingestion ID; do not invent a provider version.

## Comparison and calculation rules

- Join compatible series on country identity, period, and all meaningful dimensions. Never silently combine annual and monthly observations, current and constant prices, PPP and market exchange rates, or different demographic groups.
- Default cross-country rankings to one selected common period. Show excluded countries and coverage. A latest-available view must label each observation's year and must not imply a common-year ranking.
- Keep gaps in trends unless an explicit, labelled transformation is supported. Missing is not zero. Invalid upstream values produce diagnostics rather than silent coercion.
- Absolute change is end minus start. Percentage point change is the difference between percentages expressed on the same scale. Relative percentage change requires a valid, meaningful nonzero baseline; suppress it for unsupported series or baselines. A missing endpoint yields unavailable change, not an inferred replacement year.
- Base-100 indexing, when added, needs a common valid base period and appropriate nonzero base values. Preserve the original series and transformation metadata.
- Estimates and forecasts retain their status. Use provider-consistent historical and forecast series; do not silently splice providers. Store the forecast release so later revisions are intelligible.
- Prefer compatible provider-published aggregates for benchmarks. Custom weighted measures need a documented formula and compatible weights; no casual average of national percentages.
- Calculated descriptions state their period and comparison set. Rank movements require a consistent cohort and coverage. Relationships do not establish causation.

## Later serving, refreshing, and publishing

Use provider adapters behind server-side endpoints and a curated catalogue. Next.js Route Handlers are the initial candidate; confirm the backend design when that phase begins. Fetch bounded slices for selected countries, indicators, and periods; deduplicate/cache shared requests. Validate query parameters and cap fan-out rather than exposing an arbitrary upstream proxy.

Begin with explicit ingestion/refresh commands or bounded server refreshes and stored last-good data. Add scheduled jobs only when needed; cadence follows source publication, not a live-market assumption. Promote validated source releases atomically so one view does not accidentally combine a half-finished refresh.

Exploration can use newer validated releases and communicates retrieval/observation dates. Published dashboards freeze included observations and metadata with their chart definitions; refreshing a cache never rewrites a publication. Public rendering and local viewer filters must operate entirely within the frozen included data.

## Map data

Statistical APIs do not settle the geometry choice. Select a licensed, appropriately simplified boundary dataset during the map spike and record its version, attribution, boundary policy, and mapping to canonical entities. Test islands, multipart geometry, antimeridian bounds, territories, unmatched entities, and aggregates. Avoid tile services or geocoders unless the feature needs them and their allowances are verified.
