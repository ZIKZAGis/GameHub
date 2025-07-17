import Link from "next/link";
import GameSearchInput from "../GameSearchInput/GameSearchInput";

export default function Header () {
    return (
        <div className="w-full">
            <div className="flex justify-between w-full max-w-7xl items-center justify-items-center m-auto p-4 border-b-2 border-b-[#ff5338]">
                <Link href="/">
                    Logo
                </Link>
                <GameSearchInput/>
                <Link href="/games_list">
                    Game list
                </Link>
                <Link href="/auth_page">
                    Icon
                </Link>
            </div>
        </div>
    )
}