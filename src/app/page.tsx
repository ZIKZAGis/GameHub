'use client'

import Category from "@/components/Category/Category";
import PopularGames from "@/components/PopularGames/PopularGames";
import CustomSuspense from "@/app/ui/CustomSuspense/CustomSuspense";
import GameSection from "@/components/GameSection/GameSection";

// todo можно сделать не общий suspense (здесь его убрать), а в каждом компоненте со своим скелетоном
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
        <GameSection title="New Releases" period="past"/>
        <GameSection title="Coming Soon" period="future"/>
      </CustomSuspense>
    </div>
  );
}
