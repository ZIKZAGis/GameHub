import React, {HTMLAttributes} from 'react'
import Image, { StaticImageData } from 'next/image';

type CategoryCardProps = {
    id: string,
    image: string | StaticImageData,
    genre: string,
    description: string
    colStartEnd?: string
    onClick: () => void
} & HTMLAttributes<HTMLDivElement>

export default function CategoryCard({id, image, genre, description, onClick, ...props}: CategoryCardProps) {
  return (
    <div 
        id={id}
        className='group relative rounded-lg overflow-hidden hover:scale-102 transition-all ease-in w-full cursor-pointer p-2'
        onClick={onClick}
        {...props}
    >
        <Image
            src={image}
            alt={genre}
            fill
            className='object-cover'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"/>
        <div className="absolute bottom-0 left-0 p-4 w-full z-20">
            <h3 className="text-white font-bold text-xl transition-all duration-300 group-hover:-translate-y-6">{genre}</h3>
            <p className="text-xs text-gray-300 opacity-0 max-h-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2 overflow-hidden">{description}</p>
        </div>
    </div>
  )
}
