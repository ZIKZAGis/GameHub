"use client";

import { fetchData } from "@/lib/typedFetch";
import { IGamePreview } from "@/types/game";
import { use, useEffect } from "react";

interface GameListResult {
  games: IGamePreview[];
  hasNextPage: boolean;
  currentPage: number;
}

const gameListCache = new Map<string, Promise<GameListResult>>();

export const useGameList = (query: string = '', page: number = 1, page_size = 21): GameListResult => {
    const cacheKey = `${query}-${page}-${page_size}`;
    
    useEffect(() => {
        return () => {
            gameListCache.clear();
        };
    }, []);
    
    if (!gameListCache.has(cacheKey)) {
        const promise = fetchData<IGamePreview[]>(
            `/api/game_list?search=${encodeURIComponent(query)}&page=${page}&page_size=${page_size}`
        ).then(games => ({
            games,
            hasNextPage: games.length === page_size,
            currentPage: page
        }));
        gameListCache.set(cacheKey, promise);
    }
    
    const result = use(gameListCache.get(cacheKey)!);
    return result;
};
