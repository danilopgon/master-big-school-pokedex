import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PokemonTypeBadge from "@/components/PokemonTypeBadge";
import StatBar from "@/components/StatBar";
import { getEvolutionChain, getPokemonByName } from "@/services/pokeapi";

interface PokemonDetailPageProps {
  params: Promise<{ name: string }>;
}

function PokemonArtwork({ artwork, name, size }: { artwork: string | null; name: string; size: string }) {
  if (!artwork) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
        Sin imagen
      </div>
    );
  }

  return <Image src={artwork} alt={name} fill className="object-contain" sizes={size} priority />;
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { name } = await params;

  let pokemon;
  let evolutions;

  try {
    [pokemon, evolutions] = await Promise.all([getPokemonByName(name), getEvolutionChain(name)]);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8 md:px-6">
      <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
        ← Volver a la Pokédex
      </Link>

      <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div>
          <div className="relative mx-auto h-72 w-72">
            <PokemonArtwork artwork={pokemon.artwork} name={pokemon.name} size="288px" />
          </div>
          <h1 className="text-3xl font-extrabold capitalize text-slate-900">{pokemon.name}</h1>
          <p className="text-slate-500">#{String(pokemon.id).padStart(4, "0")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <PokemonTypeBadge key={type} type={type} />
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Altura: <span className="font-semibold">{(pokemon.height / 10).toFixed(1)}m</span> · Peso:{" "}
            <span className="font-semibold">{(pokemon.weight / 10).toFixed(1)}kg</span>
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Stats Base</h2>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} label={stat.name} value={stat.baseStat} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Cadena Evolutiva</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {evolutions.map((evolution) => (
            <Link
              key={evolution.name}
              href={`/pokemon/${evolution.name}`}
              className="rounded-xl border border-slate-200 p-4 text-center transition hover:shadow"
            >
              <div className="relative mx-auto h-24 w-24">
                {evolution.artwork ? (
                  <Image src={evolution.artwork} alt={evolution.name} fill className="object-contain" sizes="96px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-500">
                    Sin imagen
                  </div>
                )}
              </div>
              <p className="mt-2 font-semibold capitalize text-slate-800">{evolution.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
