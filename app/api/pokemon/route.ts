import { NextResponse } from "next/server";
import { getPokemonList } from "@/services/pokeapi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 20);

  const list = await getPokemonList(offset, limit);
  return NextResponse.json(list);
}
