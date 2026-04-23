# Comparer UX and Metrics (v0.2.1)

## Qué
Se mejoró la página `/compare` para resolver dos problemas de producto:
1. No existía una forma clara de cambiar los Pokémon comparados.
2. Los datos comparativos no explicaban con suficiente claridad el significado táctico.

## Cómo
- Se creó `components/CompareControls.tsx` (Client Component) con:
  - Dos inputs con `datalist` para buscar/seleccionar Pokémon.
  - Botón **Intercambiar** para invertir rápidamente el enfrentamiento.
  - Botón **Comparar** que actualiza `searchParams` (`left` y `right`) usando `router.push`.
- Se añadió `getPokemonNameList()` en `services/pokeapi.ts` para alimentar sugerencias de nombres desde PokeAPI.
- Se reorganizó `app/compare/page.tsx` en bloques definidos:
  - Selector de Pokémon.
  - Tarjetas de perfil (tipos, altura, peso, BST).
  - Tabla de estadísticas base comparadas.
  - Resumen táctico ofensivo/defensivo.
  - Matriz de daño por tipo de ataque con explicación explícita.
  - Duelo directo por tipos propios de cada Pokémon.
- Se amplió `utils/type-effectiveness.ts` con `getBattleInsights()` para encapsular métricas tácticas.

## Por qué
- Mejora de usabilidad: el usuario ya no depende de editar la URL manualmente para cambiar el matchup.
- Mejora de legibilidad estratégica: cada bloque responde una pregunta concreta del combate (quién pega más fuerte, quién resiste peor, dónde están las debilidades).
- Escalabilidad: separar controles y lógica táctica facilita futuras evoluciones (por ejemplo, ranking de picks o recomendaciones automáticas).
