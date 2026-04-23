# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
