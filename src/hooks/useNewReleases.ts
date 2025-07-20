import useSWR from 'swr';
import { IGamePreview } from "@/types/game";

export const useNewReleases = (query: string = '', pageSize = 12) => {
  const { data } = useSWR<IGamePreview[]>(
    `/api/new_releases?page_size=${pageSize}`,
    { suspense: true, fallbackData: [] }
  );

  return { games: data as IGamePreview[] };
};
