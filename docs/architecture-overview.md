# Architecture Overview

## Qué
Este documento describe la estructura base del proyecto **Pokedex Estratégica** construido con **Next.js 16+ (App Router)**, TypeScript estricto y Tailwind CSS.

## Cómo
La organización de carpetas sigue el estándar definido en `AGENTS.md`:

- `app/`
  - Contiene rutas, layouts globales y estados de carga/error.
  - Prioriza Server Components como enfoque por defecto.
- `components/`
  - Aloja componentes UI atómicos y reutilizables.
  - Deben permanecer desacoplados de lógica de fetching compleja.
- `services/`
  - Encapsula acceso a datos externos (por ejemplo, PokeAPI).
  - Centraliza funciones `async/await` para facilitar mantenimiento y testeo.
- `types/`
  - Define interfaces y tipos de dominio para evitar `any`.
  - Comparte contratos entre UI, servicios y utilidades.
- `utils/`
  - Incluye helpers puros, transformaciones y cálculos estratégicos (por ejemplo, efectividad de tipos).
- `docs/`
  - Registra decisiones técnicas, cambios de implementación y rationale de arquitectura.

## Por qué
Esta estructura separa responsabilidades y acelera la escalabilidad del MVP por fases:

1. **Mantenibilidad**: UI, datos y lógica de dominio quedan claramente separados.
2. **Escalabilidad**: Facilita agregar nuevas features (buscador, filtros, detalle y comparador estratégico).
3. **Consistencia**: Estandariza dónde vive cada pieza del sistema para todo el equipo.
4. **Server-first performance**: Permite aprovechar el modelo de Server Components de Next.js 16+ y caching de fetch en capas de servicios.
