<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md - Pokedex Next.js Project Rules

Este documento define las reglas de comportamiento, estándares de código y arquitectura que el Asistente de IA debe seguir estrictamente para este proyecto.

## 1. Stack Tecnológico y Contexto
- **Framework:** Next.js 15+ (App Router).
- **Lenguaje:** TypeScript (Strict Mode).
- **Estilos:** Tailwind CSS.
- **API:** PokeAPI (v2).
- **Data Fetching:** Fetch API nativa con Server Components. Priorizar `async/await`.
- **Imágenes:** Componente `next/image` con dominios configurados para `raw.githubusercontent.com`.

## 2. Reglas de Arquitectura
- **Server First:** Todo componente es un Server Component por defecto. Solo usar `'use client'` cuando haya interactividad (hooks, eventos, formularios).
- **Estructura de Carpetas:**
    - `app/`: Rutas, layouts, loading y error states.
    - `components/`: Componentes UI atómicos (PokemonCard, TypeBadge, etc.).
    - `services/`: Lógica de peticiones (ej. `getPokemonList`, `getPokemonDetails`).
    - `types/`: Interfaces de TypeScript para las respuestas de la API.
    - `utils/`: Funciones auxiliares (formateo de IDs, colores por tipo).

## 3. Estándares de Código (TypeScript & Clean Code)
- **Tipado Estricto:** Prohibido el uso de `any`. Definir interfaces precisas para los datos de la PokeAPI.
- **Componentes Funcionales:** Usar la sintaxis `export default function Name() { ... }`.
- **Naming Conventions:**
    - Componentes: `PascalCase` (`PokemonList.tsx`).
    - Funciones/Variables: `camelCase`.
    - Carpetas de rutas: `kebab-case`.
- **Rendimiento:** Siempre usar `Promise.all` al realizar múltiples peticiones en un mismo componente para evitar bloqueos de renderizado (waterfalls).

## 4. Reglas de UI/UX (Tailwind CSS)
- **Diseño Responsivo:** Enfoque Mobile-first.
- **Colores Temáticos:** Implementar un mapeo de colores basado en los tipos de Pokémon (ej. fire: `bg-orange-500`, water: `bg-blue-500`).
- **Accesibilidad:** Uso de etiquetas semánticas (`main`, `section`, `article`) y soporte para lectores de pantalla.
- **Feedback Visual:** Implementar Skeleton Screens en los archivos `loading.tsx` para mejorar la percepción de velocidad.

## 5. Patrones de Fetching (PokeAPI)
- **Cache:** Utilizar la opción `next: { revalidate: 3600 }` para datos que no cambian frecuentemente.
- **Optimización de Imágenes:** Usar los sprites de alta calidad ("official-artwork" o "home").
- **Paginación:** Implementar paginación mediante URL params (`?page=1`).

## 6. Comportamiento del Asistente
- **Concisión:** Explicaciones breves antes de bloques de código.
- **Validación:** Antes de entregar código, verificar que cumple con las reglas de este archivo.
- **Enfoque en Aprendizaje:** Explicar el "porqué" de las decisiones técnicas (especialmente sobre Server Components).