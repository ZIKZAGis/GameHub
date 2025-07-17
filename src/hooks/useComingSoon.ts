"use client";

import { useEffect, useState } from "react";
import { fetchData } from "@/lib/typedFetch";
import { IGamePreview } from "@/types/game";

const cache = new Map<string, IGamePreview[]>();

export const useComingSoon = (query: string = '', pageSize = 12) => {
  const [games, setGames] = useState<IGamePreview[]>([]);
  const [loading, setLoading] = useState(true);

  const cacheKey = `new-releases-${query}-${pageSize}`;

  useEffect(() => {
    const loadGames = async () => {
      if (cache.has(cacheKey)) {
        setGames(cache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchData<IGamePreview[]>(
          `/api/coming_soon?page_size=${pageSize}`
        );

        cache.set(cacheKey, data);
        setGames(data);
      } catch (error) {
        console.error("Failed to fetch new releases", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [cacheKey, pageSize]);

  return { games, loading };
};