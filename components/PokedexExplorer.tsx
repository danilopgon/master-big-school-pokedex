"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import PokemonTypeBadge from "@/components/PokemonTypeBadge";
import type { PokemonSummary, PokemonTypeName } from "@/types/pokemon";

interface PokedexExplorerProps {
  initialPokemon: PokemonSummary[];
  availableTypes: PokemonTypeName[];
}

const PAGE_SIZE = 20;

export default function PokedexExplorer({ initialPokemon, availableTypes }: PokedexExplorerProps) {
  const [allPokemon, setAllPokemon] = useState<PokemonSummary[]>(initialPokemon);
  const [offset, setOffset] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonTypeName | "all">("all");
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(searchInput.toLowerCase().trim());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || isLoading) {
          return;
        }

        setIsLoading(true);
        void fetch(`/api/pokemon?offset=${offset}&limit=${PAGE_SIZE}`)
          .then((response) => response.json() as Promise<PokemonSummary[]>)
          .then((nextPage) => {
            if (nextPage.length > 0) {
              setAllPokemon((previous) => [...previous, ...nextPage]);
              setOffset((previous) => previous + PAGE_SIZE);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
      { threshold: 1 },
    );

    observer.observe(currentTarget);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, offset]);

  const filteredPokemon = useMemo(() => {
    return allPokemon.filter((pokemon) => {
      const matchesSearch = debouncedSearch.length === 0 || pokemon.name.includes(debouncedSearch);
      const matchesType = selectedType === "all" || pokemon.types.includes(selectedType);

      return matchesSearch && matchesType;
    });
  }, [allPokemon, debouncedSearch, selectedType]);

  return (
    <section className="space-y-6">
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
        <input
          type="search"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
          placeholder="Buscar Pokémon..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase text-slate-700"
            onClick={() => setSelectedType("all")}
          >
            Todos
          </button>
          {availableTypes.map((type) => (
            <button key={type} type="button" onClick={() => setSelectedType(type)}>
              <PokemonTypeBadge type={type} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={`${pokemon.id}-${pokemon.name}`} pokemon={pokemon} />
        ))}
      </div>

      <div ref={observerTarget} className="h-10" />
      {isLoading && <p className="text-center text-sm text-slate-500">Cargando más Pokémon...</p>}
    </section>
  );
}
