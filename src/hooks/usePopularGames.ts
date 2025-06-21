"use client";

import { fetchData } from "@/lib/typedFetch";
import { Game, IGetGames } from "@/types/game";
import { useEffect, useState } from "react";

// pageSize

export const usePopularGames = (query: string = '', page_size = 8) => {
    const [state, setState] = useState<IGetGames>({
        games: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        fetchData<Game[]>(`/api/popular_games?page_size=${page_size}`)
            .then(games => setState({ games, loading: false, error: null }))
            .catch(err => setState({ games: [], loading: false, error: err.message }));

    }, [query, page_size]);

    return state;
}