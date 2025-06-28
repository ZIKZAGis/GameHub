"use client";

import Image from "next/image";
import { useGameList } from "@/hooks/useGameList";
import GamesListSkeleton from "./GamesListSkeleton"
import { useState } from "react";
import CustomSuspense from "@/app/ui/CustomSuspense/CustomSuspense";

export default function GameList() {
    const [page, setPage] = useState(1)
    const {games, loading, error} = useGameList('', page)

    return (
        <CustomSuspense loading={loading} error={error} skeleton={<GamesListSkeleton/>}>
            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {games.map((game) => (
                        <div key={game.id} className="border rounded-1g p-4">
                            <Image 
                                src={game.background_image}
                                alt={game.name} 
                                width={320}
                                height={180}
                                className="w-full h-auto object-cover"
                                priority={false}
                                onError={(e) => {e.currentTarget.src = '/default-game-image.jpg'}}
                            />
                            <h3 className="mt-2 text-lg font-semibold">{game.name}</h3>
                            <p className="text-gray-600">Рейтинг: {game.rating}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 gap-2">
                    <button className="cursor-pointer" onClick={() => setPage(p => Math.max(1, p-1))}>Назад</button>
                    <span className="mx-4">Страница {page}</span>
                    <button className="cursor-pointer" onClick={() => setPage(p => p+1)}>Вперед</button>
                </div>
            </div>
        </CustomSuspense>
    )
}