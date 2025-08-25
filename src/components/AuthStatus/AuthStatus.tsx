"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AuthStatus() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") return <span>...</span>

  if (!session?.user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="px-3 py-1 rounded border"
      >
        Войти
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span 
        onClick={() => router.push("profile")}
        className="cursor-pointer"
      >
        {session.user.name ?? session.user.email}
      </span>
      <button
        onClick={() => signOut()}
        className="px-3 py-1 rounded border cursor-pointer"
      >
        Выйти
      </button>
    </div>
  )
}
