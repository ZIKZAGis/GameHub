"use client";

import CustomSuspense from "@/app/ui/CustomSuspense/CustomSuspense";
import React from "react";
import GameContent from "@/components/GameContent/GameContent";

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
