"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useRatings(gameId: string) {
  const { data, error, mutate } = useSWR(
    gameId ? `/api/ratings?gameId=${gameId}` : null,
    fetcher
  );

  const addOrUpdateRating = async (score: number, review?: string) => {
    const res = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, score, review }),
    });

    if (!res.ok) throw new Error("Failed to save rating");

    mutate();
  };

  const deleteRating = async () => {
    const res = await fetch("/api/ratings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId }),
    });

    if (!res.ok) throw new Error("Failed to delete rating");

    mutate();
  };

  return {
    ratings: data || [],
    isLoading: !data && !error,
    isError: error,
    addOrUpdateRating,
    deleteRating,
  };
}
