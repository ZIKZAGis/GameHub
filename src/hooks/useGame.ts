"use client";

import { fetchData } from "@/lib/typedFetch";
import { IGame, IGetGame } from "@/types/game";
import { useEffect, useState } from "react";

export const useGame = (gameId: number | null) => {
    const [state, setState] = useState<IGetGame>({
        game: null,
        loading: false,
        error: null
    });

    useEffect(() => {
        if (!gameId) {
            setState({game: null, loading: false, error: null})
            return;
        }
        
        setState(prev => ({ ...prev, loading: true, error: null }));

        fetchData<IGame>(`/api/game/${gameId}`)
            .then(game => setState({game, loading: false, error: null}))
            .catch(err => setState({game: null, loading: false, error: err.message}))
            
    }, [gameId]);

    return state;
}