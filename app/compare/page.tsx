import Image from "next/image";
import Link from "next/link";
import PokemonTypeBadge from "@/components/PokemonTypeBadge";
import { getPokemonByName } from "@/services/pokeapi";
import { comparePokemonTypes } from "@/utils/type-effectiveness";

interface ComparePageProps {
  searchParams: Promise<{ left?: string; right?: string }>;
}

function getMultiplierClass(multiplier: number): string {
  if (multiplier === 0) return "text-slate-400";
  if (multiplier > 1) return "text-green-600";
  if (multiplier < 1) return "text-red-600";
  return "text-slate-700";
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { left = "pikachu", right = "charizard" } = await searchParams;
  const [leftPokemon, rightPokemon] = await Promise.all([getPokemonByName(left), getPokemonByName(right)]);
  const outcomes = comparePokemonTypes(leftPokemon.types, rightPokemon.types);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 md:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900">Comparador Estratégico</h1>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
          ← Volver
        </Link>
      </div>

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
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Matriz de multiplicadores por tipo de ataque</h2>
        <div className="space-y-2">
          {outcomes.map((outcome) => (
            <div key={outcome.attackType} className="grid grid-cols-[120px_1fr_1fr] items-center gap-4 rounded-lg bg-slate-50 p-3 text-sm">
              <PokemonTypeBadge type={outcome.attackType} />
              <p className={`font-semibold ${getMultiplierClass(outcome.multiplierAgainstLeft)}`}>
                vs {leftPokemon.name}: x{outcome.multiplierAgainstLeft}
              </p>
              <p className={`font-semibold ${getMultiplierClass(outcome.multiplierAgainstRight)}`}>
                vs {rightPokemon.name}: x{outcome.multiplierAgainstRight}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
