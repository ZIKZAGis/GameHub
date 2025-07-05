"use client";

import { useGameList } from "@/hooks/useGameList";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "@/lib/navigation";

export default function GameSearchInput() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { games, loading, error } = useGameList(searchQuery, 1, 5);
  const { navigateToGameDetails } = useNavigation();

  // TODO refactor into custom hook
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={() => searchQuery.length > 0 && setIsDropdownOpen(true)}
        placeholder="Search games..."
        className="w-full px-4 py-2 border-2 border-[#60258A] rounded-md focus:outline-none focus:border-[#ff5338] transition-all ease-in"
      />

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#60258A] overflow-hidden rounded-md shadow-lg">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="px-4 py-2 text-red-500">{error}</div>
          ) : games.length > 0 ? (
            <ul>
              {games.map((game) => (
                <li
                  key={game.id}
                  className="px-4 py-2 hover:bg-[#ff5338] cursor-pointer transition-all ease-in"
                  onClick={() => {
                    setSearchQuery("");
                    setDebouncedQuery(game.name);
                    navigateToGameDetails(game.id);
                  }}
                >
                  {game.name}
                </li>
              ))}
            </ul>
          ) : debouncedQuery ? (
            <div className="px-4 py-2 text-gray-500">Game not found</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
