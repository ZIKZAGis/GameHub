import Link from "next/link";

export default function Header () {
    return (
        <div className="w-full bg-blue-400">
            <div className="flex justify-between w-full max-w-7xl items-center justify-items-center m-auto p-4">
                <Link href="/">
                    Лого
                </Link>
                <input type="text" className="border-2 border-gray-700 px-2 py-1" placeholder="Поиск..."/>
                <Link href="/games_list">
                    Список игр
                </Link>
                <Link href="/auth_page">
                    Icon
                </Link>
            </div>
        </div>
    )
}