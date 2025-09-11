"use client"

import ExpandableList from "./ExpandableList";
import FavoriteCard from "./FavoriteCard";
import { Favorite } from "@prisma/client";

type FavoriteListProps = {
  favorites: Favorite[];
};

export default function FavoriteList({ favorites }: FavoriteListProps) {
  return (
    <ExpandableList
      title="Tracked games"
      items={favorites}
      emptyText="No tracked games"
      initialCount={8}
      wrapperClassName="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible"
      renderItem={(fav) => (
        <FavoriteCard key={fav.id} gameId={Number(fav.gameId)} />
      )}
    />
  );
}