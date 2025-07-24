"use client";

import useSWR from 'swr';
import { IGame, IGamePreview } from "@/types/game";
import { fetchData } from "@/lib/typedFetch";

interface DetailedPopularGamesResult {
  games: IGamePreview[];
  detailedGames: IGame[];
  isLoading: boolean;
  selectedGameId: number | null;
}

export const useDetailedPopularGames = (
  query: string = '',
  pageSize = 8,
  initialSelectedId: number | null = null
): DetailedPopularGamesResult => {
  const { data: popularGames, isLoading: isLoadingList } = useSWR<IGamePreview[]>(
    `/api/popular_games?search=${encodeURIComponent(query)}&page_size=${pageSize}`,
    { suspense: true }
  );

  const gameIds = popularGames?.map(game => game.id) || [];
  
  const detailsKey = gameIds.length > 0 ? 
    `/api/games/details?ids=${gameIds.join(',')}` : null;

  const fetchGameDetails = async (url: string): Promise<IGame[]> => {
    const ids = new URL(url, window.location.origin).searchParams.get('ids')?.split(',');
    if (!ids) return [];
    
    const promises = ids.map(id => fetchData<IGame>(`/api/game/${id}`));
    return Promise.all(promises);
  };

  const { data: detailedGames, isLoading: isLoadingDetails } = useSWR<IGame[]>(
    detailsKey,
    fetchGameDetails,
    { 
      suspense: false,
      revalidateOnFocus: false,
      dedupingInterval: 60000
    }
  );

  let selectedGameId = initialSelectedId;
  if (!selectedGameId && gameIds.length > 0) {
    selectedGameId = gameIds[0];
  }

  return {
    games: popularGames || [],
    detailedGames: detailedGames || [],
    isLoading: isLoadingList || isLoadingDetails,
    selectedGameId
  };
};