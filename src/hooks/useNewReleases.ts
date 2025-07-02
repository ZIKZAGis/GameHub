"use client";

import { fetchData } from "@/lib/typedFetch";
import { IGamePreview, IGetGameList } from "@/types/game";
import { useEffect, useState } from "react";

export const useNewReleases = (query: string = '', page_size = 12) => {
    const [state, setState] = useState<IGetGameList>({
        games: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        fetchData<IGamePreview[]>(`/api/new_releases?page_size=${page_size}`)
            .then(games => setState({ games, loading: false, error: null }))
            .catch(err => setState({ games: [], loading: false, error: err.message }));

    }, [query, page_size]);

    return state;
}