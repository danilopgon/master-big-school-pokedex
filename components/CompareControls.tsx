"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CompareControlsProps {
  pokemonNames: string[];
  initialLeft: string;
  initialRight: string;
}

function sanitizePokemonName(value: string): string {
  return value.trim().toLowerCase();
}

export default function CompareControls({ pokemonNames, initialLeft, initialRight }: CompareControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [leftValue, setLeftValue] = useState(initialLeft);
  const [rightValue, setRightValue] = useState(initialRight);

  const submitComparison = (left: string, right: string): void => {
    const normalizedLeft = sanitizePokemonName(left);
    const normalizedRight = sanitizePokemonName(right);

    if (!normalizedLeft || !normalizedRight) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("left", normalizedLeft);
    params.set("right", normalizedRight);
    router.push(`/compare?${params.toString()}`);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900">Selecciona tus Pokémon a comparar</h2>
      <p className="mt-1 text-sm text-slate-600">
        Escribe un nombre o selecciónalo de la lista. Luego presiona <span className="font-semibold">Comparar</span>.
      </p>

      <form
        className="mt-4 grid gap-4 md:grid-cols-[1fr_auto_1fr_auto] md:items-end"
        onSubmit={(event) => {
          event.preventDefault();
          submitComparison(leftValue, rightValue);
        }}
      >
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Pokémon A
          <input
            list="pokemon-options"
            value={leftValue}
            onChange={(event) => setLeftValue(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-blue-500 focus:ring-2"
            placeholder="Ej: pikachu"
          />
        </label>

        <button
          type="button"
          onClick={() => {
            setLeftValue(rightValue);
            setRightValue(leftValue);
            submitComparison(rightValue, leftValue);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Intercambiar
        </button>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
          Pokémon B
          <input
            list="pokemon-options"
            value={rightValue}
            onChange={(event) => setRightValue(event.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-blue-500 focus:ring-2"
            placeholder="Ej: charizard"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Comparar
        </button>
      </form>

      <datalist id="pokemon-options">
        {pokemonNames.map((pokemonName) => (
          <option key={pokemonName} value={pokemonName} />
        ))}
      </datalist>
    </section>
  );
}
