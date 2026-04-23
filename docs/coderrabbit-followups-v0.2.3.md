# CodeRabbit Follow-ups (v0.2.3)

## Qué
Se aplicaron los ajustes finales de la revisión:
- Claves únicas en el bloque de duelo directo del comparador.
- Resincronización del estado local de `CompareControls` con props iniciales.
- Estado visual activo para filtros de tipo en `PokedexExplorer`.

## Cómo
- En `app/compare/page.tsx`, las keys de los mapas de tipos directos ahora usan prefijos por lado (`left-` y `right-`).
- En `components/CompareControls.tsx`, se agregó `useEffect` observando `initialLeft` y `initialRight` para mantener `leftValue/rightValue` sincronizados tras navegación.
- En `components/PokedexExplorer.tsx`, se volvieron condicionales los estilos de botones de tipo, resaltando `selectedType` para "Todos" y cada tipo individual.

## Por qué
- Evita warnings/colisiones de React en listas cuando ambos Pokémon comparten el mismo tipo.
- Evita incoherencia visual entre URL/props y campos del formulario en el comparador.
- Mejora claridad UX al mostrar explícitamente qué filtro está activo.
