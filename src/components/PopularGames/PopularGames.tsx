"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePopularGames } from "@/hooks/usePopularGames";
import CustomSuspense from "@/app/ui/CustomSuspense/CustomSuspense";
import { useGame } from "@/hooks/useGame";

export default function PopularGames() {
    const { games, loading, error } = usePopularGames('', 8)
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null)
    const {game: selectedGame, loading: gameLoading, error: gameError} = useGame(selectedGameId)

    useEffect(() => {
        if (games.length > 0 && selectedGameId === null) {
            setSelectedGameId(games[0].id)
        }
    }, [games, selectedGameId])

    const handleGameClick = (gameId: number) => {
        setSelectedGameId(gameId)
    }

    return (
        <CustomSuspense 
            loading={loading || gameLoading} 
            error={error || gameError} 
            skeleton={<div>Загрузка...</div>}
        >
            <div className="bg-blue-100 w-full p-4">
                <h2 className="font-extrabold text-2xl mb-5">Популярные игры</h2>

                <div className="grid grid-cols-[0.4fr_1fr] gap-6">

                    <div>
                        {selectedGame && (
                            <ul className="text-center">
                                <li className="font-bold text-xl mb-2">{selectedGame.name}</li>
                                <li className="text-gray-600 mb-3">краткое описание</li>
                                <li className="mb-2">
                                    {`Рейтинг: ${selectedGame.rating} | Дата выхода: ${selectedGame.released} | Жанр: ${selectedGame.genres[0]?.name}`}
                                </li>
                                <li className="mb-4">
                                    Платформы: {selectedGame.platforms?.map((pl) => pl.platform.name).join("/ ")}
                                </li>
                                <li>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer mb-3">
                                        Подробнее
                                    </button>
                                </li>
                                <li>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                                        Добавить в избранное
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {games.map((game) => (
                            <div 
                                key={game.id} 
                                className={`relative border rounded-1g overflow-hidden h-[250px] cursor-pointer transition-all ${selectedGameId === game.id ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-102'}`}
                                onClick={() => handleGameClick(game.id)}
                            >
                                <Image
                                    src={game.background_image}
                                    alt={game.name}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full object-cover object-center"
                                    priority={true}
                                    onError={(e) => { 
                                        e.currentTarget.src = '/default-game-image.jpg'
                                        e.currentTarget.onerror = null
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                    <p className="text-white font-medium truncate">{game.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CustomSuspense>
    )
}