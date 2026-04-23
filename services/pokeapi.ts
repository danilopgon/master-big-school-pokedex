import type {
  EvolutionNode,
  EvolutionPokemon,
  PokemonDetails,
  PokemonListResult,
  PokemonSummary,
  PokemonTypeName,
} from "@/types/pokemon";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";
const DEFAULT_REVALIDATE = 3600;

interface PokeApiListResponse {
  results: PokemonListResult[];
}

interface PokeApiPokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    other?: {
      [key: string]: {
        front_default: string | null;
      };
    };
  };
}

interface PokeApiTypeListResponse {
  results: Array<{ name: string }>;
}

interface PokeApiSpeciesResponse {
  evolution_chain: {
    url: string;
  };
}

interface PokeApiEvolutionChainResponse {
  chain: EvolutionNodeApi;
}

interface EvolutionNodeApi {
  species: { name: string };
  evolves_to: EvolutionNodeApi[];
}

function toPokemonType(typeName: string): PokemonTypeName {
  return typeName as PokemonTypeName;
}

function getOfficialArtwork(response: PokeApiPokemonResponse): string {
  const artwork = response.sprites.other?.["official-artwork"]?.front_default;
  return artwork ?? "";
}

function mapPokemonDetails(response: PokeApiPokemonResponse): PokemonDetails {
  return {
    id: response.id,
    name: response.name,
    height: response.height,
    weight: response.weight,
    artwork: getOfficialArtwork(response),
    types: response.types.map((entry) => toPokemonType(entry.type.name)),
    abilities: response.abilities.map((entry) => entry.ability.name),
    stats: response.stats.map((entry) => ({
      name: entry.stat.name,
      baseStat: entry.base_stat,
    })),
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: DEFAULT_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error(`PokeAPI request failed with status ${response.status} for ${url}`);
  }

  return (await response.json()) as T;
}

export async function getPokemonDetails(nameOrId: string | number): Promise<PokemonDetails> {
  const pokemon = await fetchJson<PokeApiPokemonResponse>(`${POKE_API_BASE_URL}/pokemon/${nameOrId}`);
  return mapPokemonDetails(pokemon);
}

export async function getPokemonList(offset = 0, limit = 20): Promise<PokemonSummary[]> {
  const listResponse = await fetchJson<PokeApiListResponse>(`${POKE_API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  const details = await Promise.all(listResponse.results.map((pokemon) => getPokemonDetails(pokemon.name)));

  return details.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    artwork: pokemon.artwork,
  }));
}

export async function getPokemonByName(name: string): Promise<PokemonDetails> {
  return getPokemonDetails(name.toLowerCase());
}

function flattenEvolutionChain(node: EvolutionNode): string[] {
  const queue: EvolutionNode[] = [node];
  const names: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      continue;
    }

    names.push(current.name);
    queue.push(...current.evolvesTo);
  }

  return names;
}

function mapEvolutionNode(node: EvolutionNodeApi): EvolutionNode {
  return {
    name: node.species.name,
    evolvesTo: node.evolves_to.map(mapEvolutionNode),
  };
}

export async function getEvolutionChain(name: string): Promise<EvolutionPokemon[]> {
  const species = await fetchJson<PokeApiSpeciesResponse>(`${POKE_API_BASE_URL}/pokemon-species/${name}`);
  const chainResponse = await fetchJson<PokeApiEvolutionChainResponse>(species.evolution_chain.url);
  const root = mapEvolutionNode(chainResponse.chain);
  const names = flattenEvolutionChain(root);
  const details = await Promise.all(names.map((evolutionName) => getPokemonDetails(evolutionName)));

  return details.map((pokemon) => ({
    name: pokemon.name,
    artwork: pokemon.artwork,
  }));
}

export async function getPokemonTypes(): Promise<PokemonTypeName[]> {
  const typesResponse = await fetchJson<PokeApiTypeListResponse>(`${POKE_API_BASE_URL}/type`);
  return typesResponse.results
    .map((type) => type.name)
    .filter((name): name is PokemonTypeName =>
      [
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
      ].includes(name),
    );
}
