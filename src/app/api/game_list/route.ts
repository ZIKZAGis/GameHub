import { NextResponse } from "next/server";

const apiKey = process.env.RAWG_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const rawgParams = new URLSearchParams({
    key: apiKey!,
    page: searchParams.get('page') || '1',
    page_size: searchParams.get('page_size') || '21',
  });

  const filterKeys = [
    "search",
    "genres",
    "platforms",
    "ordering",
    "dates",
    "metacritic",
    "tags",
  ];

  for (const key of filterKeys) {
    const value = searchParams.get(key);
    if (value) rawgParams.set(key, value);
  }

  const url = `https://api.rawg.io/api/games?${rawgParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data.results);
  } catch (err) {
    return NextResponse.json({ error: `Ошибка ${err}` }, { status: 500 });
  }
}
