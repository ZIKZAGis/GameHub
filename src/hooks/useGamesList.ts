"use client";

import { fetchData } from "@/lib/typedFetch";
import { Game, IGetGameList } from "@/types/game";
import { useEffect, useState } from "react";

export const useGamesList = (query: string = '', page: number = 1, page_size = 21) => {
    const [state, setState] = useState<IGetGameList>({
        games: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        fetchData<Game[]>(`/api/games?search=${encodeURIComponent(query)}&page=${page}&page_size=${page_size}`)
            .then(games => setState({games, loading: false, error: null}))
            .catch(err => setState({games: [], loading: false, error: err.message}))
            
    }, [query, page, page_size]);

    return state;
}