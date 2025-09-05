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
    <div className="mx-auto space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <ProfileHeader user={user} />
      <FavoriteList favorites={user.favorites} />
      <RatingList ratings={user.ratings} />
    </div>
  )
}
