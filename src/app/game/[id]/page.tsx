"use client";

import CustomSuspense from '@/app/ui/CustomSuspense/CustomSuspense'
import { useGame } from '@/hooks/useGame'
import Image from "next/image";
import React from 'react';

export default function GamePage({params}: {params: Promise<{id: string}>}) {
    const resolvedParams = React.use(params)
    const {id} = resolvedParams
    const {game, loading, error} = useGame(Number(id))

    return (
        <CustomSuspense 
            loading={loading} 
            error={error} 
            skeleton={<div>Загрузка...</div>}
        >
            <div className='flex flex-col gap-4'>
              <h1 className='text-3xl text-center'>{game?.name}</h1>
              <Image 
                  src={game?.background_image ?? ''}
                  alt={game?.name ?? ''} 
                  width={320}
                  height={180}
                  className="w-[500px] h-auto m-auto"
                  priority={false}
                  onError={(e) => {e.currentTarget.src = '/default-game-image.jpg'}}
              />
              <p>{game?.description_raw}</p>
              <ul>
                {game?.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
              <div>{game?.rating}</div>
              {/* дополнить данные */}
              .......
            </div>
        </CustomSuspense>
    )
}