'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import GameSearchInput from "@/components/GameSearchInput/GameSearchInput"

export default function GameFilterPanel() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get("genres") || "")
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get("platforms") || "")
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tags")?.replace("multiplayer", "").replace(",", "") || "")
  const [ordering, setOrdering] = useState(searchParams.get("ordering") || "")
  const [onlyRated, setOnlyRated] = useState(Boolean(searchParams.get("metacritic")))
  const [excludeDlc, setExcludeDlc] = useState(searchParams.get("exclude_additions") === "true")
  const [multiplayerOnly, setMultiplayerOnly] = useState(searchParams.get("tags")?.includes("multiplayer") || false)

  const dates = searchParams.get("dates")?.split(",") || []
  const [dateFrom, setDateFrom] = useState(dates[0] || "")
  const [dateTo, setDateTo] = useState(dates[1] || "")

  const handleApplyFilters = () => {
    const query: Record<string, string> = {}

    if (searchQuery) query.search = searchQuery
    if (selectedGenre) query.genres = selectedGenre
    if (selectedPlatform) query.platforms = selectedPlatform
    if (selectedTag || multiplayerOnly) {
      const tags = [selectedTag, multiplayerOnly ? "multiplayer" : null].filter(Boolean)
      query.tags = tags.join(",")
    }
    if (ordering) query.ordering = ordering
    if (dateFrom || dateTo) {
      query.dates = `${dateFrom || "2000-01-01"},${dateTo || new Date().toISOString().split("T")[0]}`
    }
    if (onlyRated) query.metacritic = "80,100"
    if (excludeDlc) query.exclude_additions = "true"

    query.page = "1"

    const queryString = new URLSearchParams(query).toString()
    router.push(`/games_list?${queryString}`)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedGenre("")
    setSelectedPlatform("")
    setSelectedTag("")
    setOrdering("")
    setDateFrom("")
    setDateTo("")
    setOnlyRated(false)
    setMultiplayerOnly(false)
    setExcludeDlc(false)
    router.push("/games_list")
  }

  const renderActiveFilters = () => {
    const chips = [
      selectedGenre && `Genre: ${selectedGenre}`,
      selectedPlatform && `Platform: ${selectedPlatform}`,
      selectedTag && `Tag: ${selectedTag}`,
      ordering && `Sort: ${ordering}`,
      dateFrom && `From: ${dateFrom}`,
      dateTo && `To: ${dateTo}`,
      onlyRated && `Rated 80+`,
      multiplayerOnly && `Multiplayer`,
      excludeDlc && `No DLC`,
    ].filter(Boolean)

    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, idx) => (
          <span
            key={idx}
            className="bg-[#60258A] text-white text-sm px-3 py-1 rounded-full"
          >
            {chip}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4 bg-[#2c0249] rounded-xl shadow-lg space-y-4">

      <div className="w-full">
        <GameSearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      </div>

      <div className="flex gap-4 flex-wrap">
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="filter-select">
          <option value="">All genres</option>
          <option value="action">Action</option>
          <option value="rpg">RPG</option>
          <option value="shooter">Shooter</option>
          <option value="adventure">Adventure</option>
          <option value="indie">Indie</option>
          <option value="strategy">Strategy</option>
          <option value="sports">Sports</option>
          <option value="simulation">Simulation</option>
          <option value="racing">Racing</option>
          <option value="puzzle">Puzzle</option>
          <option value="arcade">Arcade</option>
        </select>

        <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="filter-select">
          <option value="">All platforms</option>
          <option value="4">PC</option>
          <option value="18">PlayStation 4</option>
          <option value="187">PlayStation 5</option>
          <option value="1">Xbox One</option>
          <option value="186">Xbox Series S/X</option>
          <option value="7">Nintendo Switch</option>
        </select>

        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="filter-select">
          <option value="">All tags</option>
          <option value="co-op">Co-op</option>
          <option value="multiplayer">Multiplayer</option>
          <option value="singleplayer">Singleplayer</option>
          <option value="open-world">Open World</option>
          <option value="horror">Horror</option>
          <option value="sandbox">Sandbox</option>
          <option value="survival">Survival</option>
          <option value="pixel-graphics">Pixel Graphics</option>
        </select>

        <select value={ordering} onChange={(e) => setOrdering(e.target.value)} className="filter-select">
          <option value="">Default order</option>
          <option value="-added">Recently added</option>
          <option value="-released">Newest releases</option>
          <option value="released">Oldest releases</option>
          <option value="-rating">Top rated</option>
          <option value="name">Alphabetical</option>
        </select>
      </div>

      <div className="flex gap-4 flex-wrap text-white">
        <label className="flex flex-col">
          From:
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="filter-select" />
        </label>
        <label className="flex flex-col">
          To:
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="filter-select" />
        </label>
      </div>

      <div className="flex gap-6 text-white flex-wrap">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={onlyRated} onChange={() => setOnlyRated(!onlyRated)} />
          Only highly rated (80+)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={multiplayerOnly} onChange={() => setMultiplayerOnly(!multiplayerOnly)} />
          Multiplayer only
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={excludeDlc} onChange={() => setExcludeDlc(!excludeDlc)} />
          Exclude DLC / Add-ons
        </label>
      </div>

      <div className="flex gap-4">
        <button onClick={handleApplyFilters} className="bg-[#ff5338] text-white px-6 py-2 rounded-md hover:bg-[#ff3618] transition-all">
          Apply Filters
        </button>
        <button onClick={handleResetFilters} className="text-white border border-white px-6 py-2 rounded-md hover:bg-white hover:text-[#2c0249] transition-all">
          Reset Filters
        </button>
      </div>

      {renderActiveFilters()}
    </div>
  )
}

