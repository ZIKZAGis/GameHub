"use client";

import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }

  const text = await res.text();
  if (!text) return [];

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(`Invalid JSON from ${url}:`, text, e);
    throw new Error("Invalid JSON response");
  }
};

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

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Failed to save rating: ${msg}`);
    }

    mutate();
  };

  const deleteRating = async () => {
    const res = await fetch("/api/ratings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Failed to delete rating: ${msg}`);
    }

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