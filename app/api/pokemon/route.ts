import { NextResponse } from "next/server";
import { getPokemonList } from "@/services/pokeapi";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parsedOffset = Number.parseInt(searchParams.get("offset") ?? `${DEFAULT_OFFSET}`, 10);
  const parsedLimit = Number.parseInt(searchParams.get("limit") ?? `${DEFAULT_LIMIT}`, 10);

  const offset = Number.isNaN(parsedOffset) ? DEFAULT_OFFSET : Math.max(0, parsedOffset);
  const limit = Number.isNaN(parsedLimit) ? DEFAULT_LIMIT : Math.min(Math.max(1, parsedLimit), MAX_LIMIT);

  const list = await getPokemonList(offset, limit);
  return NextResponse.json(list);
}
