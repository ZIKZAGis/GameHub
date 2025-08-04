'use client'

import GameSearchInput from "@/components/GameSearchInput/GameSearchInput"
import { useState } from "react"

export default function GameFilterPanel() {
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [onlyRated, setOnlyRated] = useState(false)
  const [multiplayerOnly, setMultiplayerOnly] = useState(false)

  return (
    <div className="p-4 bg-[#1e1e2f] rounded-xl shadow-lg space-y-4">

      <GameSearchInput />

      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#60258A] text-white"
        >
          <option value="">All genres</option>
          <option value="action">Action</option>
          <option value="rpg">RPG</option>
          <option value="strategy">Strategy</option>
        </select>

        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#60258A] text-white"
        >
          <option value="">All platforms</option>
          <option value="pc">PC</option>
          <option value="xbox">Xbox</option>
          <option value="playstation">PlayStation</option>
        </select>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={onlyRated}
            onChange={() => setOnlyRated(!onlyRated)}
          />
          Only with rating
        </label>

        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={multiplayerOnly}
            onChange={() => setMultiplayerOnly(!multiplayerOnly)}
          />
          Multiplayer only
        </label>
      </div>
    </div>
  )
}
