# Proust visual concept: The Living Atlas

Status: design direction based on the Explore screen mockup, October 8, 2026. The mockup demonstrates composition and interaction with illustrative figures; its values are not product data. This document guides implementation and can be refined through accessibility and usability testing.

## Character

Proust should feel like a living atlas: inviting geography, editorial typography, and precise data graphics. The interface should make country discovery enjoyable while giving comparisons enough structure to be trustworthy. Use visual interest to draw people toward questions and use restraint around the data itself.

The reference Explore composition has four parts: a quiet navigation bar, a large invitation to explore, a map with a selected-country summary beside it, and a visible comparison tray below. The world map occupies most of the workspace. The selected country receives the clearest accent, while comparison countries have distinct, stable colours. Search, map clicks, and tray actions update one shared selection model.

## Design language

| Element | Direction | Purpose |
| --- | --- | --- |
| Background | Warm paper, approximately `#F6F3EB` in the concept | Gives the app an editorial character without reducing text contrast |
| Primary text | Deep ink, approximately `#252B27` | Clear reading and strong hierarchy |
| Map surface | Very pale green, approximately `#EEF0E7` | Lets geography sit apart from the page without a heavy container |
| Land and boundaries | Quiet sage land, fine low-contrast borders | Keeps the map legible and leaves emphasis for selection |
| Main accent | Terracotta, approximately `#BF5A3D` | Selected country, key emphasis, and restrained interactive cues |
| Comparison colours | A small distinct palette assigned consistently per view | Supports tracing countries across map, tray, charts, and tables |
| Display typography | Expressive serif for page and country titles | Gives each page a recognisable editorial voice |
| Interface typography | Clear sans serif for controls, measures, and annotations | Keeps data and actions easy to scan |

These are starting tokens, not a final accessible palette. Check contrast in every actual context, including muted labels, map selections, charts, focus rings, and dark or high-contrast system settings. Use country names and other visual cues alongside colour.

Use space, alignment, thin rules, and type hierarchy before introducing cards. The selected-country panel can be a distinct opaque surface; the map and page should remain open and calm. Charts need restrained grids, readable units, direct labels where they fit, and visible breaks for missing observations. Decorative effects must not obscure values.

## Explore screen

The heading "A world in motion" and short supporting line frame the purpose of the page. Place the country search at the same visual level as the introduction, before the map. The search must expose a readable result list, support keyboard selection, and remain the reliable route to small or unmapped countries.

The map is the dominant visual. Hover previews a country; selecting it highlights the geometry, keeps a visible label, and updates the country summary. Zoom controls include World view and Zoom to selection. Fit a selected country into the available map area without hiding it under the summary panel. Motion is brief and respects reduced-motion settings. Panning and zooming never change selection.

The summary presents the country and region first, followed by a few curated measures with units, observation years, source context, and a clear profile action. The mockup uses sample figures, so implementation must replace them with verified observations or an explicit unavailable state. Add to comparison updates the persistent tray, which shows each selected country by name and colour, offers removal, and communicates the five-country limit.

On narrow screens, search stays near the top, the map remains useful, and the country summary moves below it. The comparison tray follows as a wrapping group of named controls. Essential values and actions cannot rely on hover. Map controls and tray removal targets must work comfortably with touch.

## Language across the app

Country profiles should read like chapters: a large country heading and geographic context lead to one important trend, then curated topic sections. Make observation years visible on headline measures. Use asymmetry and open space for emphasis while keeping the reading order clear.

Comparison pages should become more structured. Align charts on shared periods; keep country colours and labels stable; allow one year to be inspected across charts; and provide exact values in a table. Preserve clear source, unit, coverage, and estimate or forecast labels. On mobile, stack charts and keep a labelled table accessible.

Personal dashboards should feel like collected findings. Saved charts, short notes, and shared filters can use a flexible layout, but every chart must show whether it follows shared selections or has its own. In the frontend phase, clearly label saving as local to this browser. Add a publication preview when the backend supports public snapshots.

## Motion and states

Use motion to explain a change in focus: map navigation, chart transitions between selected periods, and a small confirmation when a chart is saved. Avoid continuous animation, excessive parallax, or movement that delays reading. Reduced-motion users receive the same information immediately.

Design loading, missing data, stale data, errors, and recovery within the same composition. Reserve chart and panel space during loading to prevent jumps. Never replace missing observations with zero. A source failure should leave the last valid information visible when appropriate, with its status and retrieval date clear.

## Design validation

Review the Explore, country profile, and three-country comparison together on desktop and mobile before broadening the design system. Verify keyboard search and map alternatives, focus order, touch targets, contrast, chart/table agreement, reduced motion, and layouts with long country names or missing data. Test visual decisions with actual World Bank observations once the first adapter exists.
