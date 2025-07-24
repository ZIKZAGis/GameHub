import useSWR from 'swr';
import { IGamePreview } from "@/types/game";

export const useComingSoon = (query: string = '', pageSize = 12) => {
  const { data } = useSWR<IGamePreview[]>(
    `/api/coming_soon?page_size=${pageSize}`,
    { suspense: true, fallbackData: [] }
  );

  return { games: data as IGamePreview[] };
};