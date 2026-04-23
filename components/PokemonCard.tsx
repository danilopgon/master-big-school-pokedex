import Image from "next/image";
import Link from "next/link";
import type { PokemonSummary } from "@/types/pokemon";
import PokemonTypeBadge from "@/components/PokemonTypeBadge";

interface PokemonCardProps {
  pokemon: PokemonSummary;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative mx-auto h-36 w-36">
        <Image src={pokemon.artwork} alt={pokemon.name} fill className="object-contain" sizes="144px" />
      </div>
      <p className="text-sm text-slate-500">#{String(pokemon.id).padStart(4, "0")}</p>
      <h2 className="text-lg font-bold capitalize text-slate-900">{pokemon.name}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {pokemon.types.map((type) => (
          <PokemonTypeBadge key={type} type={type} />
        ))}
      </div>
    </Link>
  );
}
