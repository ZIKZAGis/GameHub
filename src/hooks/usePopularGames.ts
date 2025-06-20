"use client";

import { Game } from "@/types/game";
import { useEffect, useState } from "react";

export const usePopularGames = (query: string = '', page_size = 8) => {
    const [state, setState] = useState<{
        games: Game[],
        loading: boolean,
        error: string | null
    }>({
        games: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        setState(prev => ({...prev, loading: true, error: null}));
        
        fetch(`/api/popular_games?page_size=${page_size}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(games => setState({games, loading: false, error: null}))
            .catch(err => setState({games: [], loading: false, error: err.message}));
    }, [query, page_size]);

    return state;
}