import Link from "next/link";
import PokedexExplorer from "@/components/PokedexExplorer";
import { getPokemonList, getPokemonTypes } from "@/services/pokeapi";

export default async function Home() {
  const [initialPokemon, availableTypes] = await Promise.all([getPokemonList(0, 20), getPokemonTypes()]);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 md:px-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Pokedex Estratégica</p>
          <h1 className="text-3xl font-extrabold text-slate-900">Análisis competitivo Pokémon</h1>
          <p className="mt-2 text-sm text-slate-600">
            Busca, filtra y evalúa tipos para tomar mejores decisiones en combate.
          </p>
        </div>
        <Link
          href="/compare?left=pikachu&right=charizard"
          className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Abrir comparador
        </Link>
      </header>

      <PokedexExplorer initialPokemon={initialPokemon} availableTypes={availableTypes} />
    </main>
  );
}
