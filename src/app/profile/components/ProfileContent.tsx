"use client";

import { User, Favorite, Rating } from "@prisma/client";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "./ProfileHeader";
import FavoriteList from "./FavoriteList";
import RatingList from "./RatingList";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import FavoriteListSkeleton from "./FavoriteListSkeleton";
import RatingListSkeleton from "./RatingListSkeleton";

type ProfileContentProps = {
  initialUser: User & {
    favorites: Favorite[];
    ratings: Rating[];
  };
};

export default function ProfileContent({ initialUser }: ProfileContentProps) {
  const { user, isLoading } = useProfile(initialUser);

  if (isLoading && !user) {
    return (
      <div className="mx-auto space-y-8">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <ProfileHeaderSkeleton />
        <FavoriteListSkeleton />
        <RatingListSkeleton />
      </div>
    );
  }

  if (!user) return <p className="text-center text-gray-500">Failed to load profile</p>;

  return (
    <div className="mx-auto space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <ProfileHeader user={user} />
      <FavoriteList favorites={user.favorites} />
      <RatingList ratings={user.ratings} />
    </div>
  );
}