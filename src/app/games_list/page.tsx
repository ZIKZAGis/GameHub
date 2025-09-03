import CustomSuspense from "@/app/ui/CustomSuspense/CustomSuspense";
import GamesListSkeleton from "./components/GamesListSkeleton";
import GameListContent from "./components/GameListContent";

export default function GameList() {
  return (
    <CustomSuspense
      fallback={<GamesListSkeleton />}
      errorFallback={
        <div className="text-center text-red-500">
          Ошибка загрузки списка игр
        </div>
      }
    >
      <GameListContent />
    </CustomSuspense>
  );
}
