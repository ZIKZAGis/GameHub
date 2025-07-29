"use client";

import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { IGamePreview } from "@/types/game";

interface GameListResult {
  games: IGamePreview[];
  hasNextPage: boolean;
  currentPage: number;
  isLoading: boolean;
}

export const useGameList = (
  defaultPageSize: number = 21,
  useSuspense: boolean = true
): GameListResult => {
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get("page") || '1');
  const page_size = Number(searchParams.get("page_size") || String(defaultPageSize));
  const search = searchParams.get("search");
  const genres = searchParams.get("genres");
  const platforms = searchParams.get("platforms");
  const ordering = searchParams.get("ordering");

  const queryParams = new URLSearchParams({
    page: String(page),
    page_size: String(page_size),
  })

  if (search) queryParams.set("search", search);
  if (genres) queryParams.set("genres", genres);
  if (platforms) queryParams.set("platforms", platforms);
  if (ordering) queryParams.set("ordering", ordering);

  const key = `/api/game_list?${queryParams.toString()}`;
  
  const { data, isLoading } = useSWR<IGamePreview[]>(
    key,
    {
      suspense: useSuspense,
      fallbackData: []
    }
  );

  const games = data ?? [];

  return {
    games,
    hasNextPage: games.length === Number(page_size),
    currentPage: Number(page),
    isLoading
  };
};
