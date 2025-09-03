import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useFavorites() {
  const { data, error, mutate } = useSWR("/api/favorites", fetcher)

  const addFavorite = async (gameId: string) => {
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId }),
    })
    mutate()
  }

  const removeFavorite = async (gameId: string) => {
    await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId }),
    })
    mutate()
  }

  return {
    favorites: data || [],
    isLoading: !error && !data,
    isError: error,
    addFavorite,
    removeFavorite,
  }
}