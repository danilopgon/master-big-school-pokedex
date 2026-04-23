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
- **Server First:** Todo componente es un Server Component por defecto. Solo usar `'use client'` cuando haya interactividad.
- **Estructura de Carpetas:**
    - `app/`: Rutas, layouts, loading y error states.
    - `components/`: Componentes UI atómicos.
    - `services/`: Lógica de peticiones (ej. `getPokemonList`).
    - `types/`: Interfaces de TypeScript.
    - `utils/`: Funciones auxiliares.
    - `docs/`: Documentación técnica de cada implementación.

## 3. Estándares de Código (TypeScript & Clean Code)
- **Tipado Estricto:** Prohibido el uso de `any`.
- **Componentes Funcionales:** Usar `export default function Name() { ... }`.
- **Rendimiento:** Siempre usar `Promise.all` para peticiones múltiples simultáneas.

## 4. Reglas de UI/UX (Tailwind CSS)
- **Diseño Responsivo:** Enfoque Mobile-first.
- **Colores Temáticos:** Mapeo de colores basado en tipos de Pokémon.
- **Feedback Visual:** Implementar Skeleton Screens en `loading.tsx`.

## 5. Patrones de Fetching (PokeAPI)
- **Cache:** Utilizar `next: { revalidate: 3600 }` donde sea posible.
- **Optimización de Imágenes:** Usar sprites de alta calidad ("official-artwork").

## 6. Documentación Obligatoria (Carpeta /docs)
- **Registro de Implementación:** Cualquier nueva funcionalidad, cambio de lógica o configuración debe ser documentada en un archivo Markdown dentro de la carpeta `docs/`.
- **Contenido:** Los documentos deben incluir el "qué", el "cómo" y el "porqué" de las decisiones técnicas.

## 7. Versionado y Control de Cambios
- **package.json:** En cada cambio de código o nueva funcionalidad, el asistente debe aumentar la versión (patch, minor o major según corresponda).
- **CHANGELOG.md:** Todo cambio debe verse reflejado en el archivo `CHANGELOG.md` en la raíz, siguiendo estrictamente el estándar de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).
    - Secciones: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.

## 8. Comportamiento del Asistente
- **Validación previa:** Antes de entregar código, verificar cumplimiento de todas las reglas de este archivo.
- **Proactividad en registros:** Al finalizar una tarea, el asistente debe generar automáticamente el texto para el CHANGELOG y la documentación en `/docs`.