import { User, Favorite, Rating } from "@prisma/client"
import ProfileHeader from "./ProfileHeader"
import FavoriteList from "./FavoriteList"
import RatingList from "./RatingList"

type ProfileContentProps = {
  user: User & {
    favorites: Favorite[]
    ratings: Rating[]
  }
}

export default function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="max-w-2xl mx-auto mt-12 space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Профиль</h1>
      <ProfileHeader user={user} />
      <FavoriteList favorites={user.favorites} />
      <RatingList ratings={user.ratings} />
    </div>
  )
}
