import React from 'react'
import Image from "next/image";
import { IGame } from '@/types/game'

export default function GameCard({
    id, 
    name, 
    released, 
    platforms, 
    background_image, 
    rating, 
    genres
}: IGame) {
  return (
    <div key={id} className='relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-48'>
        <Image
            src={background_image}
            alt={name}
            fill
            className='object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'/>
        <div className='absolute bottom-0 left-0 p-4 w-full'>
            <h3 className='text-white font-bold text-xl truncate'>{name}</h3>
            <div className='flex justify-between items-center text-sm text-gray-300 mt-1'>
                <span>{new Date(released).toLocaleDateString()}</span>
                <span>{platforms.join('| ')}</span>
                <span>{rating}</span>
                <span>{genres.join('| ')}</span>
            </div>
        </div>
    </div>
  )
}
