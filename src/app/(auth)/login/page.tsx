"use client"

import {FormEvent, Suspense, useState} from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setErr(null)
        setLoading(true)

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl,
        })

        setLoading(false)

        if (res?.error) {
            setErr("Invalid email or password")
            return
        }

        router.push(res?.url || callbackUrl)
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="max-w-sm mx-auto mt-12">
                <h1 className="text-2xl font-semibold mb-4">Вход</h1>
                <form onSubmit={onSubmit} className="space-y-3">
                    <input 
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {err && <p className="text-red-600 text-sm">{err}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full border rounded px-3 py-2"
                    >
                        {loading ? "Входим.." : "Войти"}
                    </button>
                </form>

                <p className="text-sm mt-3">
                    Нет аккаунта? <a href="/register" className="underline">Зарегистрируйтесь</a>
                </p>
            </div>
        </Suspense>
    )
}