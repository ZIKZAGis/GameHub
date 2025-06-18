import React from 'react'

export default function Category() {
  return (
    <div className='bg-blue-200 w-full p-4'>
        <h2 className='font-extrabold text-2xl mb-5'>Категории</h2>

        <div className='grid grid-cols-4 grid-rows-[100px_100px] gap-4 text-center'>
            <div className='col-start-1 col-end-3 bg-amber-400'>Жанр</div>
            <div className='bg-emerald-500'>Жанр</div>
            <div className='bg-emerald-500'>Жанр</div>

            <div className='bg-emerald-500'>Жанр</div>
            <div className='bg-emerald-500'>Жанр</div>
            <div className='col-start-3 col-end-5 bg-amber-400'>Жанр</div>
        </div>
    </div>
  )
}
