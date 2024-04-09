import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className=' overflow-hidden bg-black text-white justify-center gap-2 items-center flex h-[300px] max-h-[800px]'>


      <div className='w-[280px]'>
        <img className='rounded-full object-cover w-[200px] ' src="./src/assets/Portada.jpg" alt="" />
      </div>
      <div className='flex flex-col leading-10 '>
        <h1 className='text-2xl text border-b-2 '>Dani Company ©2024</h1>
        <p className='mx-auto text-center text-white text-3xl'> Pokémon. ©1997 - 2024 Fan Inc</p>

      </div>


    </div>
  )
}
