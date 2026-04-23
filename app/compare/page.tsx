import Image from "next/image";
import Link from "next/link";
import CompareControls from "@/components/CompareControls";
import PokemonTypeBadge from "@/components/PokemonTypeBadge";
import { getPokemonByName, getPokemonNameList } from "@/services/pokeapi";
import { calculateTypeMultiplier, comparePokemonTypes, getBattleInsights } from "@/utils/type-effectiveness";
import type { PokemonDetails, PokemonStat } from "@/types/pokemon";

interface ComparePageProps {
  searchParams: Promise<{ left?: string; right?: string }>;
}

function getMultiplierClass(multiplier: number): string {
  if (multiplier === 0) return "text-slate-400";
  if (multiplier > 1) return "text-red-600";
  if (multiplier < 1) return "text-green-600";
  return "text-slate-700";
}

function getTotalBaseStats(pokemon: PokemonDetails): number {
  return pokemon.stats.reduce((sum, stat) => sum + stat.baseStat, 0);
}

function normalizeSearchValue(value: string | undefined, fallback: string): string {
  const normalized = value?.trim().toLowerCase();
  return normalized && normalized.length > 0 ? normalized : fallback;
}

function findStatValue(stats: PokemonStat[], name: string): number {
  return stats.find((stat) => stat.name === name)?.baseStat ?? 0;
}

const CORE_STATS = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"] as const;

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const query = await searchParams;
  const left = normalizeSearchValue(query.left, "pikachu");
  const right = normalizeSearchValue(query.right, "charizard");

  const [leftPokemon, rightPokemon, pokemonNames] = await Promise.all([
    getPokemonByName(left),
    getPokemonByName(right),
    getPokemonNameList(),
  ]);

  const outcomes = comparePokemonTypes(leftPokemon.types, rightPokemon.types);
  const leftInsights = getBattleInsights(leftPokemon.types, rightPokemon.types);
  const rightInsights = getBattleInsights(rightPokemon.types, leftPokemon.types);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 md:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900">Comparador Estratégico</h1>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Volver
        </Link>
      </div>

      <CompareControls pokemonNames={pokemonNames} initialLeft={leftPokemon.name} initialRight={rightPokemon.name} />

      <section className="grid gap-6 md:grid-cols-2">
        {[leftPokemon, rightPokemon].map((pokemon) => (
          <article key={pokemon.name} className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="relative mx-auto h-44 w-44">
              <Image src={pokemon.artwork} alt={pokemon.name} fill className="object-contain" sizes="176px" />
            </div>
            <h2 className="text-center text-2xl font-bold capitalize text-slate-900">{pokemon.name}</h2>
            <div className="mt-3 flex justify-center gap-2">
              {pokemon.types.map((type) => (
                <PokemonTypeBadge key={type} type={type} />
              ))}
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-slate-500">Altura</dt>
                <dd className="font-semibold text-slate-900">{(pokemon.height / 10).toFixed(1)} m</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-slate-500">Peso</dt>
                <dd className="font-semibold text-slate-900">{(pokemon.weight / 10).toFixed(1)} kg</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-slate-500">BST</dt>
                <dd className="font-semibold text-slate-900">{getTotalBaseStats(pokemon)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Comparativa de estadísticas base</h2>
        <div className="space-y-2">
          {CORE_STATS.map((statName) => {
            const leftStat = findStatValue(leftPokemon.stats, statName);
            const rightStat = findStatValue(rightPokemon.stats, statName);

            return (
              <div key={statName} className="grid grid-cols-[140px_1fr_1fr] items-center gap-4 rounded-lg bg-slate-50 p-3 text-sm">
                <p className="font-semibold capitalize text-slate-700">{statName.replace("-", " ")}</p>
                <p className={leftStat >= rightStat ? "font-bold text-slate-900" : "text-slate-600"}>
                  {leftPokemon.name}: {leftStat}
                </p>
                <p className={rightStat >= leftStat ? "font-bold text-slate-900" : "text-slate-600"}>
                  {rightPokemon.name}: {rightStat}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Resumen táctico: {leftPokemon.name}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Mejor cobertura ofensiva usando sus tipos: <span className="font-semibold">x{leftInsights.bestOffensiveMultiplier}</span>
          </p>
          <p className="text-sm text-slate-600">
            Mayor riesgo defensivo frente a {rightPokemon.name}: <span className="font-semibold">x{leftInsights.worstDefensiveMultiplier}</span>
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Resumen táctico: {rightPokemon.name}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Mejor cobertura ofensiva usando sus tipos: <span className="font-semibold">x{rightInsights.bestOffensiveMultiplier}</span>
          </p>
          <p className="text-sm text-slate-600">
            Mayor riesgo defensivo frente a {leftPokemon.name}: <span className="font-semibold">x{rightInsights.worstDefensiveMultiplier}</span>
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Matriz de daño por tipo de ataque</h2>
        <p className="mb-4 text-sm text-slate-600">
          Esta matriz compara cuánto daño recibe cada Pokémon ante cada tipo de ataque. Valores altos (x2, x4) indican
          debilidad; valores bajos (x0.5, x0.25) indican resistencia.
        </p>
        <div className="space-y-2">
          {outcomes.map((outcome) => (
            <div key={outcome.attackType} className="grid grid-cols-[120px_1fr_1fr] items-center gap-4 rounded-lg bg-slate-50 p-3 text-sm">
              <PokemonTypeBadge type={outcome.attackType} />
              <p className={`font-semibold ${getMultiplierClass(outcome.multiplierAgainstLeft)}`}>
                daño a {leftPokemon.name}: x{outcome.multiplierAgainstLeft}
              </p>
              <p className={`font-semibold ${getMultiplierClass(outcome.multiplierAgainstRight)}`}>
                daño a {rightPokemon.name}: x{outcome.multiplierAgainstRight}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Duelo directo entre sus tipos</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {leftPokemon.types.map((attackType) => (
            <div key={attackType} className="rounded-lg bg-slate-50 p-3 text-sm">
              <p className="font-medium text-slate-800">
                {leftPokemon.name} ({attackType}) → {rightPokemon.name}: x
                {calculateTypeMultiplier(attackType, rightPokemon.types)}
              </p>
            </div>
          ))}
          {rightPokemon.types.map((attackType) => (
            <div key={attackType} className="rounded-lg bg-slate-50 p-3 text-sm">
              <p className="font-medium text-slate-800">
                {rightPokemon.name} ({attackType}) → {leftPokemon.name}: x
                {calculateTypeMultiplier(attackType, leftPokemon.types)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
