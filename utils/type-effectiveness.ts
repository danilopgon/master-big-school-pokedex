import type { ComparisonOutcome, PokemonTypeName } from "@/types/pokemon";

const TYPE_EFFECTIVENESS: Record<PokemonTypeName, Partial<Record<PokemonTypeName, number>>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ground: 2, flying: 2, dragon: 2, steel: 0.5, ice: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};

const ALL_TYPES = Object.keys(TYPE_EFFECTIVENESS) as PokemonTypeName[];

export function calculateTypeMultiplier(attackType: PokemonTypeName, defendTypes: PokemonTypeName[]): number {
  return defendTypes.reduce((multiplier, defendType) => {
    const current = TYPE_EFFECTIVENESS[attackType][defendType] ?? 1;
    return multiplier * current;
  }, 1);
}

export function comparePokemonTypes(leftTypes: PokemonTypeName[], rightTypes: PokemonTypeName[]): ComparisonOutcome[] {
  return ALL_TYPES.map((attackType) => ({
    attackType,
    multiplierAgainstLeft: calculateTypeMultiplier(attackType, leftTypes),
    multiplierAgainstRight: calculateTypeMultiplier(attackType, rightTypes),
  }));
}


export interface BattleInsights {
  bestOffensiveMultiplier: number;
  worstDefensiveMultiplier: number;
}

export function getBattleInsights(attackerTypes: PokemonTypeName[], defenderTypes: PokemonTypeName[]): BattleInsights {
  const offensiveMultipliers = attackerTypes.map((attackType) => calculateTypeMultiplier(attackType, defenderTypes));
  const bestOffensiveMultiplier = offensiveMultipliers.length > 0 ? Math.max(...offensiveMultipliers) : 1;

  const incomingMultipliers = ALL_TYPES.map((attackType) => calculateTypeMultiplier(attackType, attackerTypes));
  const worstDefensiveMultiplier = incomingMultipliers.length > 0 ? Math.max(...incomingMultipliers) : 1;

  return {
    bestOffensiveMultiplier,
    worstDefensiveMultiplier,
  };
}
