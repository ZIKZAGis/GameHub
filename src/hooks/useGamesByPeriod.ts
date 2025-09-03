import useSWR from 'swr';
import { IGamePreview } from "@/types/game";

export const useGamesByPeriod = (period: "past" | "future", pageSize = 12) => {
  const { data } = useSWR<IGamePreview[]>(
    `/api/games_by_period?period=${period}&page_size=${pageSize}`,
    { suspense: true, fallbackData: [] }
  );

  return { games: data as IGamePreview[] };
};
