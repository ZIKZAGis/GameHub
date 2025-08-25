"use client"

import {FormEvent, useState} from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setErr(null)
        setLoading(true)
        
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, password})
        })

        if (!res.ok) {
            const data = await res.json().catch(() => ({}))
            setErr(data.error || "Ошибка регистрации")
            setLoading(false)
            return
        }

        const loginRes = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (loginRes?.error) {
            router.push("/login")
            return
        }

        router.push("/")
    }

    return (
        <div className="max-w-sm mx-auto mt-12">
            <h1 className="text-2xl font-semibold mb-4">Регистрация</h1>
            <form onSubmit={onSubmit} className="space-y-3">
                <input 
                    type="text"
                    placeholder="Name"
                    className="w-full border rounded px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                    {loading ? "Создаем" : "Зарегистрироваться"}
                </button>
            </form>
            <p className="text-sm mt-3">
                Уже есть аккаунт? <a href="/login" className="underline">Войдите</a>
            </p>
        </div>
    )
}