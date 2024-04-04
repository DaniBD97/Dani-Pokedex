import { IconHeart, IconHeartFilled, IconMenu2 } from '@tabler/icons-react';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PokemonContext } from '../Context/PokemonContext';
import { NavFavoritesPokemon } from './NavFavoritesPokemon';


export const Nav = () => {

  const { Favorites, setFavorites, isOpen, setisOpen, ModalFav, setModalFav } = useContext(PokemonContext);


  const ToggleFav = () => {
    setModalFav(!ModalFav)
  }

  const toggleMenu = () => {
    setisOpen(!isOpen)

  }

  const closeMenu = () => {
    setisOpen(false);
  };
  return (
    <>


      <article className='mx-auto flex  h-[50px] overflow-hidden  bg-[#000000] text-[#000000] font-semibold text-[20px] relative sm:justify-center items-center '>


        {/* Sección para computadoras (pantallas más grandes) */}



        <button className='mr-6 ml-2  sm:hidden md:hidden lg:hidden  ' onClick={toggleMenu}><IconMenu2 size={'50px'} color='white' /></button>



        <section className='max-w-[1280px]  mx-auto hidden sm:flex  items-center'>
          <section className='flex  items-center '>
            <button className='flex p-2 items-center mt-1 ' onClick={ToggleFav}>{Favorites.length < 1 ? (<IconHeart color='white' className={''}/> ) : (<IconHeartFilled stroke={'black'} width={20} style={{ color: "white" }} />)} <span className='text-white'>{Favorites.length}</span></button>

            <Link className=' p-4 w-[200px]  h-[50px]  text-white  hover:bg-[#F2F2F2] border-b-white border-b-4 hover:text-black  hover:border-b-white  transition-all ease-in' to="/">Home</Link>
            <Link className=' p-4 w-[200px] h-[50px]  text-white hover:bg-blue-600 border-b-blue-600 border-b-4 hover:text-white hover:border-b-white transition-all ease-in ' to="/ListaPokemon">Pokedex</Link>
            <Link className=' p-4 w-[200px] h-[50px]  text-white hover:bg-red-500 border-b-red-500 border-b-4 hover:text-white hover:border-b-white transition-all ease-in ' to={"/Favoritos"}>Favoritos</Link>
            <Link className=' p-4 w-[200px] h-[50px] text-white hover:bg-green-500 border-b-green-500 border-b-4 hover:text-white  hover:border-b-white transition-all ease-in' to="/Top">Ranking10</Link>
            <Link className=' p-4 w-[200px] h-[50px] text-white hover:bg-purple-500 border-b-purple-500 border-b-4 hover:text-white  hover:border-b-white transition-all ease-in' to="/Gallery">Gallery</Link>

          </section>
        </section>




      </article>

      <div
        className={`nav h-screen rounded-r-[20px] ${isOpen ? 'active' : ''}
  `}
      >

        <Link className='text-gray-950 hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium' to="/" onClick={closeMenu}>Home</Link>
        <Link className='text-gray-950 hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium' to="/ListaPokemon" onClick={closeMenu}>Pokedex</Link>
        <Link className='text-gray-950 hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium' to="/Favoritos" onClick={closeMenu}>Favoritos</Link>
        <Link className='text-gray-950 hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium' to="/Top" onClick={closeMenu}>Ranking10</Link>

      </div>
      <NavFavoritesPokemon />
      <Outlet />
    </>
  );
};
