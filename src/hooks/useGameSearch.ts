"use client";

import useSWR from 'swr';
import { IGamePreview } from "@/types/game";
import { fetchData } from '@/lib/typedFetch';

interface GameSearchResult {
  games: IGamePreview[];
  isLoading: boolean;
}

export const useGameSearch = (
  query: string = '',
  limit: number = 5
): GameSearchResult => {
  const key = query ? `/api/game_list?search=${encodeURIComponent(query)}&page=1&page_size=${limit}` : null;
  
  const gameSearchFetcher = (url: string): Promise<IGamePreview[]> => {
    return fetchData<IGamePreview[]>(url);
  };
  
  const { data, isLoading } = useSWR<IGamePreview[]>(
    key,
    gameSearchFetcher,
    {
      suspense: false,
      fallbackData: [],
      dedupingInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const games = data as IGamePreview[];

  return {
    games,
    isLoading
  };
};