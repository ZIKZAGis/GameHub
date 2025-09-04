import Image from "next/image"
import { User } from "@prisma/client"

type ProfileHeaderProps = {
  user: User
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <section>
      <div className="flex items-center gap-4">
        <Image
          src={user.image ?? "/default-avatar.png"}
          alt="avatar"
          width={80}
          height={80}
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <p className="font-medium">{user.name ?? "Unknown gamer"}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
    </section>
  )
}
