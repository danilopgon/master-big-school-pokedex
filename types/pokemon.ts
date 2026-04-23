export const POKEMON_TYPE_NAMES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type PokemonTypeName = (typeof POKEMON_TYPE_NAMES)[number];

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonSummary {
  id: number;
  name: string;
  types: PokemonTypeName[];
  artwork: string | null;
}

export interface PokemonDetails extends PokemonSummary {
  height: number;
  weight: number;
  abilities: string[];
  stats: PokemonStat[];
}

export interface EvolutionNode {
  name: string;
  evolvesTo: EvolutionNode[];
}

export interface EvolutionPokemon {
  name: string;
  artwork: string | null;
}

export interface ComparisonOutcome {
  attackType: PokemonTypeName;
  multiplierAgainstLeft: number;
  multiplierAgainstRight: number;
}
