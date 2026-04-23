# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2] - 2026-04-23

### Added
- Added stricter query validation in `/api/pokemon` with bounded pagination defaults and max page size limits.
- Added graceful image placeholders in compare, detail, and card views when artwork is unavailable.
- Added explicit SR-only loading announcement in `app/loading.tsx` for route transition accessibility.
- Added `POKEMON_TYPE_NAMES` as a single source of truth for Pokémon type runtime values and TS union derivation.
- Added implementation notes in `docs/coderrabbit-followups-v0.2.2.md`.

### Changed
- Hardened `/compare` search param normalization to support `string | string[]`, plus lookup failure handling with `notFound()`.
- Updated compare card keys to include side identifiers and avoid duplicate React keys in mirror matchups.
- Updated Pokédex infinite scroll to stop re-request loops after empty/error pages by introducing `hasMore` gating.
- Tightened `next.config.ts` image remote pattern with least-privilege pathname restriction for PokeAPI sprite origin.
- Bumped project version from `0.2.1` to `0.2.2`.

### Deprecated
- No changes in this release.

### Removed
- No changes in this release.

### Fixed
- Fixed detail route behavior to return 404 via `notFound()` on invalid Pokémon names instead of bubbling fetch errors.
- Fixed negative stat bar widths by clamping rendered percentages to the 0–100 range.
- Fixed missing accessible name for the main search field in `PokedexExplorer`.

### Security
- Reduced image allowlist scope by constraining remote asset pathname in Next.js image config.

## [0.2.1] - 2026-04-23

### Added
- Added interactive comparer controls with searchable inputs, swap action, and direct query param updates to change Pokémon clearly.
- Added `getPokemonNameList` service helper to populate comparer suggestions.
- Added tactical summary blocks in comparer view to surface offensive ceiling and defensive risk.
- Added implementation notes in `docs/comparer-ux-and-metrics-v0.2.1.md`.

### Changed
- Redesigned `/compare` to include explicit comparative sections: base stats, tactical summary, type-damage matrix, and direct duel output.
- Clarified multiplier color semantics so weaknesses and resistances are easier to interpret.
- Bumped project version from `0.2.0` to `0.2.1`.

### Deprecated
- No changes in this release.

### Removed
- No changes in this release.

### Fixed
- Fixed unclear comparer interaction by providing an on-page mechanism to switch both Pokémon without manual URL edits.
- Fixed ambiguous comparative output by labeling each metric with clear battle meaning.

### Security
- No changes in this release.

## [0.2.0] - 2026-04-23

### Added
- Implemented PokeAPI service layer with `getPokemonList`, `getPokemonDetails`, `getPokemonByName`, `getEvolutionChain` and type listing.
- Added typed domain models under `types/pokemon.ts`.
- Built responsive Pokémon card grid with dynamic type badges and route links.
- Added infinite scroll loading (20 by 20), client-side search with 300ms debounce, and type filters.
- Created dynamic detail route `/pokemon/[name]` with base stats bars and full evolution chain visualization.
- Implemented strategic comparison route `/compare` with side-by-side Pokémon analysis.
- Added `utils/type-effectiveness.ts` to calculate offensive multipliers (`x2`, `x0.5`, `x0`) by matchup.
- Added skeleton loading UI in `app/loading.tsx`.
- Added implementation documentation `docs/mvp-phases-implementation-v0.2.0.md`.

### Changed
- Updated root homepage into a strategic Pokedex dashboard experience.
- Updated metadata and language defaults in the root layout.
- Bumped project version from `0.1.0` to `0.2.0`.

### Deprecated
- No changes in this release.

### Removed
- Removed default Next.js starter home content.

### Fixed
- No changes in this release.

### Security
- No changes in this release.

## [0.1.0] - 2026-04-23

### Added
- Initial Project Setup.
- Created project changelog following Keep a Changelog format.
- Added architectural documentation in `docs/architecture-overview.md`.
- Enabled Next.js external image loading for `raw.githubusercontent.com`.

### Changed
- No changes in this release.

### Deprecated
- No changes in this release.

### Removed
- No changes in this release.

### Fixed
- No changes in this release.

### Security
- No changes in this release.
