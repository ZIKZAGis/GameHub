import { fetchData } from "./typedFetch";
import { IGame } from "@/types/game";

export async function getGameById(id: number): Promise<IGame> {
    return fetchData<IGame>(`/api/game/${id}`)
}