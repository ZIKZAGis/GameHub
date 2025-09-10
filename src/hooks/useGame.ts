import useSWR from 'swr';
import { IGame } from "@/types/game";

export const useGame = (gameId: number | null) => {
    const { data } = useSWR<IGame>(
        gameId ? `/api/game/${gameId}` : null,
        // { suspense: true, fallbackData: undefined }
    );

    return { game: gameId ? data as IGame : null };
}