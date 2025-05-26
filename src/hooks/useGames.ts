import { Game } from "@/types/game";
import { useState, useEffect } from "react";

export const useGame = (query: string = '', page: number = 1) => {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const apiKey = process.env.RAWG_API_KEY;
                const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page=${page}`;
                // С серверными роутами
                // если ключ спрятан в API Routes - как спрятать ключ?
                // const url = `/api/games?search=${query}&page=${page}`;
                const response = await fetch(url)
                const data = await response.json()
                setGames(data.results);
            } catch (err) {
                setError(`Ошибка ${err}`)
            } finally {
                setLoading(false)
            }
        };

        fetchGames()
    }, [query, page])

    return {games, loading, error}
}