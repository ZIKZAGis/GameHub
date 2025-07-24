"use client";

import useSWR from 'swr';
import { IGamePreview } from "@/types/game";

interface GameListResult {
  games: IGamePreview[];
  hasNextPage: boolean;
  currentPage: number;
  isLoading: boolean;
}

export const useGameList = (
  query: string = '',
  page: number = 1,
  pageSize: number = 21,
  useSuspense: boolean = true
): GameListResult => {
  const key = `/api/game_list?search=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`;
  
  const { data, isLoading } = useSWR<IGamePreview[]>(
    key,
    {
      suspense: useSuspense,
      fallbackData: []
    }
  );

  const games = data as IGamePreview[];

  return {
    games,
    hasNextPage: games.length === pageSize,
    currentPage: page,
    isLoading
  };
};
