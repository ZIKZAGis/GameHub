"use client"

import Link from "next/link";
import GameSearchInput from "../GameSearchInput/GameSearchInput";
import { usePathname } from "next/navigation";
import AuthStatus from "../AuthStatus/AuthStatus";

export default function Header() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <div className="flex justify-between w-full max-w-7xl items-center justify-items-center m-auto p-4 border-b-2 border-b-[#ff5338]">
        <Link href="/">Logo</Link>

        {pathname !== '/games_list' && <GameSearchInput />}

        <Link href="/games_list">Game list</Link>
        <AuthStatus/>
      </div>
    </div>
  );
}
