import Category from "@/components/Category/Category";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import NewReleases from "@/components/NewReleases/NewReleases";
import PopularGames from "@/components/PopularGames/PopularGames";

export default function Home() {
  return (
    <div className="flex flex-col gap-[32px] w-full">
      <PopularGames/>
      <Category/>
      <NewReleases/>
      <ComingSoon/>
    </div>
  );
}
