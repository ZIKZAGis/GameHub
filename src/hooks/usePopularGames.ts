"use client";

import { fetchData } from "@/lib/typedFetch";
import { Game, IGetGameList } from "@/types/game";
import { useEffect, useState } from "react";

export const usePopularGames = (query: string = '', page_size = 8) => {
    const [state, setState] = useState<IGetGameList>({
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