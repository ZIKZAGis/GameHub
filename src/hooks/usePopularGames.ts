"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/typedFetch";
import { IGamePreview } from "@/types/game";

const cache = new Map<string, IGamePreview[]>();

export const usePopularGames = (query: string = '', pageSize = 8) => {
  const [games, setGames] = useState<IGamePreview[]>([]);
  const [loading, setLoading] = useState(true);

  const cacheKey = `popular-${query}-${pageSize}`;

  useEffect(() => {
    const loadGames = async () => {
      if (cache.has(cacheKey)) {
        setGames(cache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchData<IGamePreview[]>(
          `/api/popular_games?page_size=${pageSize}`
        );

        cache.set(cacheKey, data);
        setGames(data);
      } catch (err) {
        console.error("Failed to fetch popular games", err);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [cacheKey, pageSize]);

  return { games, loading };
};
