import React, {HTMLAttributes} from 'react'
import Image from "next/image";
import { IPlatform, NamedEntity } from '@/types/game'
import defaultGameImage from "@/app/assets/images/default-game-image.jpg";

type GameCardProps = {
    name: string, 
    released?: string, 
    platforms?: IPlatform[], 
    background_image: string, 
    rating?: number, 
    genres?: NamedEntity[],
    onClick: () => void
} & HTMLAttributes<HTMLDivElement>

export default function GameCard({
    name, 
    released, 
    platforms, 
    background_image, 
    rating, 
    genres,
    onClick,
    ...props
}: GameCardProps) {
  return (
    <div 
        className='relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full h-48 cursor-pointer'
        onClick={onClick}
        {...props}
    >
        <Image
            src={background_image ? background_image : defaultGameImage}
            alt={name}
            fill
            className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'/>
        <div className='absolute bottom-0 left-0 p-4 w-full'>
            <h3 className='text-white font-bold text-xl truncate'>{name}</h3>
            <div className='grid grid-cols-2 gap-1 items-center text-xs text-gray-300 mt-1'>
                {released && <span>Release date: {new Date(released).toLocaleDateString()}</span>}
                {platforms && <span>{platforms.map((pl) => pl.platform.name).join(" | ")}</span>}
                {rating != undefined && <span>{rating > 0 ? `Rating: ${rating}` : 'No rating'}</span>}
                {genres && <span>{genres[0].name}</span>}
            </div>
        </div>
    </div>
  )
}
