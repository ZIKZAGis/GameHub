"use client"

import CategoryCard from "../CategoryCard/CategoryCard";
import actionImage from "@/app/assets/images/genre/action.webp";
import adventureImage from "@/app/assets/images/genre/adventure.webp";
import rpgImage from "@/app/assets/images/genre/rpg.webp";
import strategyImage from "@/app/assets/images/genre/strategy.webp";
import simulationImage from "@/app/assets/images/genre/simulation.webp";
import racingImage from "@/app/assets/images/genre/racing.webp";
import { useRouter } from "next/navigation";

export default function Category() {
  const router = useRouter()

  return (
    <div className='w-full p-4'>
      <h2 className='font-extrabold text-2xl mb-5 text-[#60258A]'>Category</h2>
      <div className='grid grid-cols-4 grid-rows-[200px_200px] gap-4 text-center'>
        <CategoryCard 
          id='4'
          image={actionImage} 
          genre='Action' 
          description='Fast-paced games that focus on combat, reflexes, and high energy. Expect intense battles, explosive visuals, and adrenaline-fueled gameplay.' 
          onClick={() => router.push(`/games_list?genres=action`)}
          className="col-start-1 col-end-3 group relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2"
        />
        <CategoryCard 
          id='3'
          image={adventureImage} 
          genre='Adventure' 
          description='Narrative-rich games with exploration, storytelling, and puzzle-solving. Often cinematic, these games take you on emotional or mysterious journeys.' 
          onClick={() => router.push(`/games_list?genres=adventure`)}
        />
        <CategoryCard 
          id='10'
          image={strategyImage} 
          genre='Strategy' 
          description='Tactical games that challenge your planning and decision-making skills. Whether real-time or turn-based, you manage units, resources, and long-term goals.' 
          onClick={() => router.push(`/games_list?genres=strategy`)}
        />
        <CategoryCard 
          id='14'
          image={simulationImage} 
          genre='Simulation' 
          description='Realistic experiences that replicate real-life activities or systems. From flying planes to managing a farm or building a city — these games let you take control.' 
          onClick={() => router.push(`/games_list?genres=simulation`)}
        />
        <CategoryCard 
          id='1'
          image={racingImage} 
          genre='Racing' 
          description='High-speed games that test your driving skills. Whether hyper-realistic or arcade-style, racing games are all about precision, speed, and thrill.' 
          onClick={() => router.push(`/games_list?genres=racing`)}
        />
        <CategoryCard 
          id='5'
          image={rpgImage} 
          genre='RPG' 
          description='Games centered around character development, story-driven choices, and immersive worlds. Players level up, customize abilities, and shape the narrative.' 
          onClick={() => router.push(`/games_list?genres=role-playing-games-rpg`)}
          className="col-start-3 col-end-5 group relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2"
        />
      </div>
    </div>
  )
}
