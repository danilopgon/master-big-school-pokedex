import type { PokemonTypeName } from "@/types/pokemon";
import { POKEMON_TYPE_COLORS } from "@/utils/pokemon-type-colors";

interface PokemonTypeBadgeProps {
  type: PokemonTypeName;
}

export default function PokemonTypeBadge({ type }: PokemonTypeBadgeProps) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${POKEMON_TYPE_COLORS[type]}`}>
      {type}
    </span>
  );
}
