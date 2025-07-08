"use client";

import { fetchData } from "@/lib/typedFetch";
import { IGamePreview } from "@/types/game";
import { use, useEffect, useRef } from "react";

const promiseCache = new Map<string, Promise<IGamePreview[]>>();

export const usePopularGames = (query: string = '', page_size = 8) => {
    const cacheKey = `popular-games-${query}-${page_size}`;
    const promiseRef = useRef<Promise<IGamePreview[]> | null>(null);

    if (!promiseCache.has(cacheKey)) {
        const promise = fetchData<IGamePreview[]>(`/api/popular_games?page_size=${page_size}`);
        promiseCache.set(cacheKey, promise);
        promiseRef.current = promise;
    }

    const cachedPromise = promiseCache.get(cacheKey)!;
    const games = use(cachedPromise);

    useEffect(() => {
        return () => {
            if (promiseRef.current) {
                promiseCache.delete(cacheKey);
            }
        };
    }, [cacheKey]);

    return { games };
}