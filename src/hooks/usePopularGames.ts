"use client";

import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/lib/typedFetch";
import { IGame, IGamePreview } from "@/types/game";
import { getGameById } from "@/lib/api";

const cache = new Map<string, IGamePreview[]>();

export const usePopularGames = (query: string = '', pageSize = 8) => {
  const [games, setGames] = useState<IGamePreview[]>([]);
  const [detailedGames, setDetailedGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null)
  const previousIdsRef = useRef<number[]>([])
  
  const cacheKey = `popular-${query}-${pageSize}`;

  useEffect(() => {
    const loadGames = async () => {
      if (cache.has(cacheKey)) {
        setGames(cache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      try {
        setLoading(true)
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

  useEffect(() => {
    if (games.length > 0) {
      const ids = games.map((game) => game.id)
      const prevIds = previousIdsRef.current
      const isSame = ids.length === prevIds.length && ids.every((id, i) => id === prevIds[i])

      if (!isSame) {
        previousIdsRef.current = ids
        setSelectedGameId((prev) => prev ?? ids[0])
        setLoadingDetails(true)

        Promise.all(ids.map(getGameById))
          .then(setDetailedGames)
          .finally(() => setLoadingDetails(false))
      }
    }
  }, [games])

  const handleGameClick = (gameId: number) => {
    setSelectedGameId(gameId)
  }

  const selectedGame = detailedGames.find((game) => game.id === selectedGameId)

  return {
    games,
    loading,
    loadingDetails,
    selectedGameId,
    selectedGame,
    handleGameClick
  };
};
