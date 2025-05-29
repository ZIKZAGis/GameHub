"use client";

import { Game } from "@/types/game";
import { useEffect, useState } from "react";

export const useGames = (query: string = '', page: number = 1, page_size = 21) => {
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
        setState((prev) => ({...prev, loading: true}))
        fetch(`/api/games?search=${query}&page=${page}&page_size=${page_size}`)
            .then((res) => res.json())
            .then((games) => setState({games, loading: false, error: null}))
            .catch((err) => setState({games: [], loading: false, error: err.message}))
    }, [query, page, page_size])

    return state
}