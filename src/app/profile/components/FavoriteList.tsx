"use client";

import ExpandableList from "./ExpandableList";
import FavoriteCard from "./FavoriteCard";
import { Favorite } from "@prisma/client";
import { useEffect, useState } from "react";

type FavoriteListProps = {
  favorites: Favorite[];
};

export default function FavoriteList({ favorites }: FavoriteListProps) {
  const [list, setList] = useState(favorites);

  useEffect(() => {
    setList(favorites);
  }, [favorites]);

  const handleRemoveLocal = (gameId: number) => {
    setList((prev) => prev.filter((f) => Number(f.gameId) !== gameId));
  };

  return (
    <ExpandableList
      title="Tracked games"
      items={list}
      emptyText="No tracked games"
      initialCount={8}
      wrapperClassName="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible"
      renderItem={(fav) => (
        <FavoriteCard
          key={fav.id}
          gameId={Number(fav.gameId)}
          onRemove={handleRemoveLocal}
        />
      )}
    />
  );
}