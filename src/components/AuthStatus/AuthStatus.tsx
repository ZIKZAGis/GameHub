"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthStatus() {
    const {data: session, status} = useSession()

    if (status === "loading") return <span>...</span>

    if (!session?.user) {
        return (
            <button
                onClick={() => signIn()}
                className="px-3 py-1 rounded border"
            >
                Войти
            </button>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <span>{session.user.name ?? session.user.email}</span>
            <button
                onClick={() => signOut()}
                className="px-3 py-1 rounded border"
            >
                Выйти
            </button>
        </div>
    )
}