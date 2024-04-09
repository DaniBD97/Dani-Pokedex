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
      toast.error('eliminaste un pokemon de favoritos', { autoClose: 2000 });
    } else {
      if (Favorites.length === 10) {
        toast.error('No puedes agregar más favoritos', { autoClose: 2000 });
        alert("No puedes agregar más favoritos");
        return;
      } else {
        toast.success('Pokémon agregado a favoritos', { autoClose: 2000 });
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

      <article className='relative  bg-[]'>

        <Link
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          to={`/pokemon/${pokemon.id}`}
          className={`h-[170px] text-center bg-[#ffffff] justify-center sm:rounded-[10px]
          mt-2  capitalize relative isolate shadow-lg shadow-slate-400/10 pb-2  cursor-pointer
            hover:border-black  hover:border-2 group grid gap-1 ${className} ${isHovered ? 'bounce' : ''} 
           
    `}
        >
          <button onClick={heart} className='right-0 w-10 absolute mt-[10px] z-10 mr-1 '>
           
              {isHeartFilled ? <IconHeartFilled width={50}  stroke={'black'} style={{ color: "red" }} /> : <IconHeart stroke={1} />}
            

          </button>
          <div className=''>



            <section className='flex mt-3 '>

              
              <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="Pokemon" className='mr-5 w-[150px]' />

             
             

              <section>
                <div className='flex justify-start mt-8 gap-1 w-[180px] text-[20px] mr-8'>
                  <p className='uppercase text-[20px] font-semibold '>{pokemon?.name}</p>
                  <span className='font-bold text-[16px]  '>#{formatPokemonId(pokemon?.id)}</span>

                </div>

                <ul className='flex justify-start gap-1 mt-2'>
                  {pokemon.types.map(type =>
                    <li className={`p-1 rounded-lg h-fit px-2 text-[20px] font-bold text-white ${colorByType[type.type.name]}`} key={type.type.name}>
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
