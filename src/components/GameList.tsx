"use client";

import { useGame } from "@/hooks/useGames";

const GameList = () => {
    const {games, loading, error} = useGame('', 1);

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game) => (
                <div key={game.id} className="border rounded-lg p-4">
                    <img src={game.background_image} alt={game.name} />
                    <h3>{game.name}</h3>
                    <p>Rating: {game.rating}</p>
                </div>
            ))}
        </div>
    )
}

export default GameList