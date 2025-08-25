import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login?callbackUrl=/profile")
  }

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-2xl font-semibold mb-4">Профиль</h1>
      <pre className="p-3 border rounded bg-gray-50 overflow-x-auto">
        {JSON.stringify(session.user, null, 2)}
      </pre>
    </div>
  )
}