"use client";

import CustomSuspense from "@/app/ui/CustomSuspense/CustomSuspense";
import { useGame } from "@/hooks/useGame";
import Image from "next/image";
import React from "react";
import defaultGameImage from "@/app/assets/images/default-game-image.jpg";

// move to ./components/GameContent/index.ts
function GameContent({ gameId }: { gameId: number }) {
  const { game } = useGame(gameId);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl text-center">{game?.name}</h1>

      <Image
        src={game?.background_image || defaultGameImage.src}
        alt={game?.name || "Game Image"}
        width={700}
        height={390}
        className="w-[700px] h-auto m-auto"
        priority={false}
        onError={(e) => {
          e.currentTarget.src = defaultGameImage.src;
        }}
      />
      <p>{game?.description_raw}</p>
      <ul>
        {game?.genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <div>{game?.rating}</div>
    </div>
  );
}

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  return (
    <CustomSuspense
      fallback={<div>Загрузка...</div>}
      errorFallback={
        <div className="text-center text-red-500">Ошибка загрузки игры</div>
      }
    >
      <GameContent gameId={Number(id)} />
    </CustomSuspense>
  );
}
