export type PokemonTypeName =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

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
  artwork: string;
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
  artwork: string;
}

export interface ComparisonOutcome {
  attackType: PokemonTypeName;
  multiplierAgainstLeft: number;
  multiplierAgainstRight: number;
}
