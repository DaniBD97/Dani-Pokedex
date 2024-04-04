import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PokemonContext } from '../Context/PokemonContext';
import { colorByType } from '../Constants/ColorType';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const CardPokemon = ({ pokemon, onClick, className }) => {
  const { formatPokemonId, FavoritesPokemon, setFavoritesPokemon, Favorites } = useContext(PokemonContext)
  const [isHovered, setIsHovered] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  useEffect(() => {
    setIsHeartFilled(Favorites.some(favPokemon => favPokemon.id === pokemon.id));
  }, [Favorites, pokemon.id]);

  

  const heart = (e) => {
    e.preventDefault();

    // Verificar si el Pokémon ya está en la lista de favoritos
    const isFavorite = Favorites.some(favPokemon => favPokemon.id === pokemon.id);

    // Si es un favorito, quitarlo de la lista; de lo contrario, agregarlo
    if (isFavorite) {
      FavoritesPokemon(pokemon, 'remove');
      toast.error('eliminaste un pokemon de favoritos', {autoClose: 2000});
    } else {
      if(Favorites.length === 10)
      {
        toast.error('No puedes agregar más favoritos', {autoClose: 2000});
        alert("No puedes agregar más favoritos");
        return;
      }else{
        toast.success('Pokémon agregado a favoritos', {autoClose: 2000});
        FavoritesPokemon(pokemon, 'add');
      }
      
    }

    // Actualizar el estado del corazón
    setIsHeartFilled(prev => !prev);
  };


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  return (
    <>

      <article className='relative bg-[]'>

        <Link
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          to={`/pokemon/${pokemon.id}`}
          className={` text-center bg-[#f3f3f3] justify-center sm:rounded-[10px]
          mt-2  capitalize relative isolate shadow-lg shadow-slate-400/10 pb-2  cursor-pointer
            hover:border-black  hover:border-2 group grid gap-1 ${className} ${isHovered ? 'bounce' : ''} 
           
    `}
        >
          <button onClick={heart} className='right-0 absolute mt-[10px] z-10 mr-1 '>
            <div>
              {isHeartFilled ? <IconHeartFilled stroke={'black'} style={{ color: "red" }} /> : <IconHeart stroke={1} />}
            </div>

          </button>
          <div className='w-[200px]'>

            <p className='absolute text-[#4a4a4a] justify-start flex font-extrabold z-[-1] text-[20px] '>#{formatPokemonId(pokemon?.id)}</p>

            <section className='flex mt-6 '>
              <span  >

                <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="Pokemon" className='z-[1]  m-auto w-20' />
              </span>

              <section>
                <p className='uppercase text-[17px] border-b-2 border-gray-400 font-semibold'>{pokemon?.name}</p>


                <ul className='flex justify-center gap-1 mt-2'>
                  {pokemon.types.map(type =>
                    <li className={`p-1 rounded-lg h-fit px-2 text-[13px] font-bold text-white ${colorByType[type.type.name]}`} key={type.type.name}>
                      {type.type.name}
                    </li>
                  )}
                </ul>
              </section>
            </section>
          </div>
        </Link>

      </article>


    </>

  )
}
