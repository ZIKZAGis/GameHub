"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePopularGames } from "@/hooks/usePopularGames";
import CustomSuspense from "@/app/ui/CustomSuspense/CustomSuspense";
import { useGame } from "@/hooks/useGame";
import { useNavigation } from "@/lib/navigation";
import defaultGameImage from '@/app/assets/images/default-game-image.jpg';

export default function PopularGames() {
    const { games, loading, error } = usePopularGames('', 8)
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null)
    const {game: selectedGame, loading: gameLoading, error: gameError} = useGame(selectedGameId)
    const {navigateToGameDetails} = useNavigation()

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
            <div className="w-full p-4">
                <h2 className="font-extrabold text-2xl mb-5 text-[#60258A]">Популярные игры</h2>

                <div className="grid grid-cols-[0.4fr_1fr] gap-6">

                    <div>
                        {selectedGame && (
                            <ul className="text-center">
                                <li className="font-bold text-xl mb-2">{selectedGame.name}</li>
                                <li className="text-gray-500 mb-3">
                                    {selectedGame.description_raw.length > 400
                                        ? `${selectedGame.description_raw.substring(0, 400)}...`
                                        : selectedGame.description_raw    
                                    }
                                </li>
                                <li className="mb-2">
                                    {`Рейтинг: ${selectedGame.rating} | Дата выхода: ${selectedGame.released} | Жанр: ${selectedGame.genres[0]?.name}`}
                                </li>
                                <li className="mb-4">
                                    Платформы: {selectedGame.platforms?.map((pl) => pl.platform.name).join(" | ")}
                                </li>
                                <li>
                                    <button 
                                        className="bg-[#ff5338] text-white px-4 py-2 rounded-xl transition-all ease-linear hover:bg-[#ED2809] cursor-pointer mb-3" 
                                        onClick={() => navigateToGameDetails(selectedGameId ?? 0)}
                                    >
                                        Подробнее
                                    </button>
                                </li>
                                <li>
                                    <button className="bg-[#ff5338] text-white px-4 py-2 rounded-xl transition-all ease-linear hover:bg-[#ED2809] cursor-pointer">
                                        Добавить в избранное
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {games.map((game) => (
                            <div 
                                key={game.id} 
                                className={`
                                    relative 
                                    rounded-xl 
                                    overflow-hidden 
                                    h-[250px] 
                                    cursor-pointer 
                                    transition-all 
                                    ${selectedGameId === game.id ? 'ring-2 ring-[#ff5338] scale-103' : 'hover:scale-102'}
                                    bg-[#10011F]
                                `}
                                onClick={() => handleGameClick(game.id)}
                            >
                                <Image
                                    src={game.background_image}
                                    alt={game.name}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full object-contain object-center"
                                    priority={true}
                                    onError={(e) => { 
                                        e.currentTarget.src = defaultGameImage.src
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