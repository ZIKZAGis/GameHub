import Category from "@/components/Category/Category";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import NewReleases from "@/components/NewReleases/NewReleases";
import PopularGames from "@/components/PopularGames/PopularGames";
import CustomSuspense from "@/app/ui/CustomSuspense/CustomSuspense";

export default function Home() {
  return (
    <div className="flex flex-col gap-[32px] w-full">
      <CustomSuspense
        fallback={<div>Загрузка...</div>}
        errorFallback={
          <div className="text-center text-red-500">Ошибка загрузки</div>
        }
      >
        <PopularGames />
        <Category />
        <NewReleases />
        <ComingSoon />
      </CustomSuspense>
    </div>
  );
}
