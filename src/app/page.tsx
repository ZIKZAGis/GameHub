import Category from "@/components/Category/Category";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import NewReleases from "@/components/NewReleases/NewReleases";
import PopularGames from "@/components/PopularGames/PopularGames";
// import GameList from "@/components/GameList/GameList";

export default function Home() {
  return (
    <div className="grid grid-rows-[68px_1fr_56px] items-center justify-items-center min-h-screen gap-8 font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PopularGames/>
        <Category/>
        <NewReleases/>
        <ComingSoon/>
        {/* <GameList/> */}
      </main>
      <Footer/>
    </div>
  );
}
