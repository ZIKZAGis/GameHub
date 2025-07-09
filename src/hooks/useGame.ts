"use client";

import { fetchData } from "@/lib/typedFetch";
import { IGame } from "@/types/game";
import { use, useEffect, useRef } from "react";

const promiseCache = new Map<string, Promise<IGame>>();

export const useGame = (gameId: number | null) => {
    const promiseRef = useRef<Promise<IGame> | null>(null);
    const cacheKey = gameId ? `game-${gameId}` : null;

    useEffect(() => {
        return () => {
            if (promiseRef.current && cacheKey) {
                promiseCache.delete(cacheKey);
            }
        };
    }, [cacheKey]);

    if (!gameId) {
        return { game: null };
    }

    if (!promiseCache.has(cacheKey!)) {
        const promise = fetchData<IGame>(`/api/game/${gameId}`);
        promiseCache.set(cacheKey!, promise);
        promiseRef.current = promise;
    }

    const cachedPromise = promiseCache.get(cacheKey!)!;
    const game = use(cachedPromise);

    return { game };
}