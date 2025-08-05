'use client'

import { useGameSearch } from "@/hooks/useGameSearch"
import { useState, useRef, useEffect } from "react"
import { useNavigation } from "@/lib/navigation";
import useDebounce from "@/hooks/useDebounce";
import { useClickOutside } from "@/hooks/useClickOutside";

type Props = {
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
  standalone?: boolean;
}

export default function GameSearchInput({ searchQuery, setSearchQuery, standalone = false }: Props) {
  const [localQuery, setLocalQuery] = useState('');
  const isControlled = !standalone && typeof searchQuery === 'string' && typeof setSearchQuery === 'function';

  const query = isControlled ? searchQuery! : localQuery;
  const setQuery = isControlled ? setSearchQuery! : setLocalQuery;

  const debouncedQuery = useDebounce(query, 300);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { games, isLoading } = useGameSearch(debouncedQuery, 5);
  const { navigateToGameDetails } = useNavigation();

  useEffect(() => {
    setIsDropdownOpen(debouncedQuery.length > 0);
  }, [debouncedQuery]);

  useClickOutside(searchRef, () => setIsDropdownOpen(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleGameClick = (id: number) => {
    setQuery('');
    setIsDropdownOpen(false);
    navigateToGameDetails(id);
  };

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => query.length > 0 && setIsDropdownOpen(true)}
        placeholder="Search games..."
        className="w-full px-4 py-2 border-2 border-[#60258A] rounded-md focus:outline-none focus:border-[#ff5338] transition-all ease-in"
      />

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#60258A] overflow-hidden rounded-md shadow-lg">
          {isLoading ? (
            <div className="px-4 py-2 text-gray-300">Searching...</div>
          ) : games.length > 0 ? (
            <ul>
              {games.map((game) => (
                <li
                  key={game.id}
                  className="px-4 py-2 hover:bg-[#ff5338] cursor-pointer transition-all ease-in"
                  onClick={() => handleGameClick(game.id)}
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