"use client"

import Image from "next/image";
import actionImage from "@/app/assets/images/genre/action.webp";
import adventureImage from "@/app/assets/images/genre/adventure.webp";
import rpgImage from "@/app/assets/images/genre/rpg.webp";
import strategyImage from "@/app/assets/images/genre/strategy.webp";
import simulationImage from "@/app/assets/images/genre/simulation.webp";
import racingImage from "@/app/assets/images/genre/racing.webp";

export default function Category() {
  return (
    <div className='w-full p-4'>
      <h2 className='font-extrabold text-2xl mb-5 text-[#60258A]'>Category</h2>

      <ul className='grid grid-cols-4 grid-rows-[200px_200px] gap-4 text-center'>
        <li 
          id="4"
          className='group col-start-1 col-end-3 relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2'
        >
          <Image
            src={actionImage}
            alt='Action'
            fill
            className='object-cover'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full z-20">
            <h3 className="text-white font-bold text-xl transition-all duration-300 group-hover:-translate-y-6">Action</h3>
            <p className="text-xs text-gray-300 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2 overflow-hidden">Fast-paced games that focus on combat, reflexes, and high energy. Expect intense battles, explosive visuals, and adrenaline-fueled gameplay.</p>
          </div>
        </li>
        <li 
          id="3"
          className='group relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2'
        >
          <Image
            src={adventureImage}
            alt='Adventure'
            fill
            className='object-cover'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full z-20">
            <h3 className="text-white font-bold text-xl transition-all duration-300 group-hover:-translate-y-6">Adventure</h3>
            <p className="text-xs text-gray-300 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2 overflow-hidden">Narrative-rich games with exploration, storytelling, and puzzle-solving. Often cinematic, these games take you on emotional or mysterious journeys.</p>
          </div>
        </li>
        <li 
          id="10"
          className='group relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2'
        >
          <Image
            src={strategyImage}
            alt='Strategy'
            fill
            className='object-cover'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full z-20">
            <h3 className="text-white font-bold text-xl transition-all duration-300 group-hover:-translate-y-6">Strategy</h3>
            <p className="text-xs text-gray-300 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2 overflow-hidden">Tactical games that challenge your planning and decision-making skills. Whether real-time or turn-based, you manage units, resources, and long-term goals.</p>
          </div>
        </li>

        <li 
          id="14"
          className='group relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2'
        >
          <Image
            src={simulationImage}
            alt='Simulation'
            fill
            className='object-cover'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full z-20">
            <h3 className="text-white font-bold text-xl transition-all duration-300 group-hover:-translate-y-6">Simulation</h3>
            <p className="text-xs text-gray-300 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2 overflow-hidden">Realistic experiences that replicate real-life activities or systems. From flying planes to managing a farm or building a city — these games let you take control.</p>
          </div>
        </li>
        <li 
          id="1"
          className='group relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2'
        >
          <Image
            src={racingImage}
            alt='Racing'
            fill
            className='object-cover'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full z-20">
            <h3 className="text-white font-bold text-xl transition-all duration-300 group-hover:-translate-y-6">Racing</h3>
            <p className="text-xs text-gray-300 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2 overflow-hidden">High-speed games that test your driving skills. Whether hyper-realistic or arcade-style, racing games are all about precision, speed, and thrill.</p>
          </div>
        </li>
        <li 
          id="5"
          className='group col-start-3 col-end-5 relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2'
        >
          <Image
            src={rpgImage}
            alt='RPG'
            fill
            className='object-cover'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full z-20">
            <h3 className="text-white font-bold text-xl transition-all duration-300 group-hover:-translate-y-6">RPG</h3>
            <p className="text-xs text-gray-300 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2 overflow-hidden">Games centered around character development, story-driven choices, and immersive worlds. Players level up, customize abilities, and shape the narrative.</p>
          </div>
        </li>
      </ul>
    </div>
  )
}
