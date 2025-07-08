"use client";

import { fetchData } from "@/lib/typedFetch";
import { IGamePreview } from "@/types/game";
import { use, useEffect, useRef } from "react";

const promiseCache = new Map<string, Promise<IGamePreview[]>>();

export const useNewReleases = (query: string = '', page_size = 12) => {
    const cacheKey = `new-releases-${query}-${page_size}`;
    const promiseRef = useRef<Promise<IGamePreview[]> | null>(null);

    if (!promiseCache.has(cacheKey)) {
        const promise = fetchData<IGamePreview[]>(`/api/new_releases?page_size=${page_size}`);
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