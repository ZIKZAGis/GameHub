"use client";

import { useEffect, useState } from "react";
import { IGamePreview } from "@/types/game";
import { fetchData } from "@/lib/typedFetch";

interface GameListResult {
  games: IGamePreview[];
  hasNextPage: boolean;
  currentPage: number;
}

const gameListCache = new Map<string, GameListResult>();

export const useGameList = (
  query: string = '',
  page: number = 1,
  pageSize: number = 21
): GameListResult => {
  const [result, setResult] = useState<GameListResult>({
    games: [],
    hasNextPage: false,
    currentPage: page,
  });

  const cacheKey = `${query}-${page}-${pageSize}`;

  useEffect(() => {
    const loadData = async () => {
      if (gameListCache.has(cacheKey)) {
        setResult(gameListCache.get(cacheKey)!);
        return;
      }

      try {
        const games = await fetchData<IGamePreview[]>(
          `/api/game_list?search=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`
        );

        const data: GameListResult = {
          games,
          hasNextPage: games.length === pageSize,
          currentPage: page,
        };

        gameListCache.set(cacheKey, data);
        setResult(data);
      } catch (error) {
        console.error("Failed to fetch game list:", error);
      }
    };

    loadData();

  }, [query, page, pageSize, cacheKey]);

  return result;
};
