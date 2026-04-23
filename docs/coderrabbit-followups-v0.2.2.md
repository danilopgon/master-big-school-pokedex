# CodeRabbit Follow-ups (v0.2.2)

## Qué
Se implementaron correcciones de robustez, accesibilidad y seguridad señaladas por la revisión automática:
- Sanitización de paginación en API route.
- Manejo de errores y normalización de `searchParams` en páginas dinámicas.
- Ajustes de accesibilidad en loading/search.
- Protección contra bucles de paginación y claves duplicadas en React.
- Endurecimiento de configuración de imágenes remotas.
- Tipos de Pokémon unificados como fuente única de verdad.

## Cómo
- `/api/pokemon` ahora parsea/normaliza `offset` y `limit` con defaults, mínimos y `MAX_LIMIT`.
- `/compare` ahora soporta `string | string[]`, toma el primer valor válido y usa `Promise.allSettled` + `notFound()` para inputs inválidos.
- `/pokemon/[name]` usa `try/catch` y `notFound()` para resolver lookups inexistentes con 404.
- `PokedexExplorer` incorpora `hasMore`, manejo de `response.ok` y detiene observer cuando no hay más datos o falla la petición.
- `StatBar` clampa porcentajes negativos a `0%`.
- `types/pokemon.ts` exporta `POKEMON_TYPE_NAMES` y la unión `PokemonTypeName` se deriva de ese tuple.
- `services/pokeapi.ts` usa esa constante para filtrar tipos y propaga `artwork: string | null`.
- Componentes visuales muestran placeholder cuando falta artwork para evitar pasar `""` a `next/image`.

## Por qué
- Evita errores en runtime por parámetros inválidos o entidades inexistentes.
- Mejora la experiencia accesible para usuarios de lector de pantalla.
- Evita tráfico innecesario y ciclos de carga infinitos en infinite scroll.
- Reduce superficie de configuración remota a mínimo necesario (least privilege).
- Elimina duplicación entre runtime y tipos, reduciendo drift futuro en lista de tipos Pokémon.
