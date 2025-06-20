"use client";

import Image from "next/image";
import { usePopularGames } from "@/hooks/usePopularGames"
import { useEffect, useState } from "react";
import { Game } from "@/types/game";

export default function PopularGames () {
    const {games, loading, error} = usePopularGames('', 8)
    const [selectedGame, setSelectedGame] = useState<Game | null>(null)
    
    useEffect(() => {
        if (games.length > 0) {
            setSelectedGame(games[0])
        }
    }, [games])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
    
    return (
        <div className="bg-blue-100 w-full p-4">
            <h2 className="font-extrabold text-2xl mb-5">Популярные игры</h2>

            <div className="grid grid-cols-[0.4fr_1fr] gap-6">

                <div>
                    <ul>
                        <li>{selectedGame?.name}</li>
                        <li>Краткое описание</li>
                        <li>{`${selectedGame?.rating} / ${selectedGame?.released} / ${selectedGame?.genres[0].name}`}</li>
                        <li>{`${selectedGame?.platforms.map((pl) => pl.platform.name)}`}</li>
                        <li>добавить в избранное</li>
                    </ul>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {games.map((game) => (
                        <div key={game.id} className="border rounded-1g overflow-hidden h-[250px]">
                            <Image 
                                src={game.background_image}
                                alt={game.name} 
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover object-center"
                                priority={true}
                                onError={(e) => {e.currentTarget.src = '@/default-game-image.jpg'}}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}