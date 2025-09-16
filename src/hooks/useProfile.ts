import useSWR from "swr";
import { User, Favorite, Rating } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProfile(initialData?: User & { favorites: Favorite[]; ratings: Rating[] }) {
  const { data, error, isLoading, mutate } = useSWR<User & { favorites: Favorite[]; ratings: Rating[] }>(
    "/api/profile",
    fetcher,
    { fallbackData: initialData }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
