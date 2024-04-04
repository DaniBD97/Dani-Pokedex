import React, { useContext, useEffect, useRef, useState } from 'react';
import { PokemonContext } from '../Context/PokemonContext';
import { CardPokemon } from '../Components/CardPokemon';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FilterBar } from '../Components/FilterBar';
import { SortPokemon } from '../Components/SortPokemon';
import { IconList, IconMist } from '@tabler/icons-react';


const INITIAL_LIMIT = 50

export const PokemonList = () => {


  const { AllPokemons, filteredPokemons, Active, setActive, } = useContext(PokemonContext);

  const [OffSet, setOffSet] = useState(INITIAL_LIMIT);
  const targetObserver = useRef(null)
  const entry = useIntersectionObserver(targetObserver, [])
  const isVisible = !!entry?.isIntersecting
  const [search, setSearch] = useState('');




  useEffect(() => {
    const maxPokemon = AllPokemons.length
    if (isVisible && maxPokemon !== 0) {

      const newOffSet = OffSet + 15
      newOffSet > maxPokemon ? setOffSet(maxPokemon) : setOffSet(newOffSet)

    } else {

    }


  }, [isVisible])

  useEffect(() => {
    setOffSet(INITIAL_LIMIT)


  }, [search])

  let PokemonSearch;
  let SearchPokemon;

  if (filteredPokemons.length === 0) {
    PokemonSearch = [...AllPokemons].filter((pokemon) => {
      const lowercaseSearch = search.toLowerCase();

      return (
        pokemon.name.toLowerCase().includes(lowercaseSearch) ||
        String(pokemon.id) === lowercaseSearch
      );
    });
  } else {
 
    
    SearchPokemon = filteredPokemons.filter((pokemon) => {
      const lowercaseSearch = search.toLowerCase();

      return (
        pokemon.name.toLowerCase().includes(lowercaseSearch) ||
        String(pokemon.id) === lowercaseSearch
      );
    });
  }


  const handleChangeSearch = (e) => {
    setSearch(e.target.value.toLowerCase());

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.pokemonName.value.toLowerCase());
    e.target.pokemonName.value = '';
  };




  return (
    <div className='bg-[#232323] p-4 py-5 ' >
      <div className='flex justify-between ml-36 '>
        {/* barra de busqueda */}
        <form onSubmit={handleSubmit}>
          <div className='  flex  text-lg w-[300px]'>

            <input
              className='outline-none flex-1 rounded-md'
              type='search'
              name='pokemonName'
              onChange={handleChangeSearch}
              placeholder='Search Pokemon'
              
            />
       

          </div>

        </form>
      
        
        {/* FIN barra de busqueda */}
        {/* ICONO FILTRO */}
        <div className={`block cursor-pointer sm:hidden md:hidden lg:hidden xl:hidden`}>
          <div className='icon-filter' onClick={() => setActive(!Active)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1'
              stroke='currentColor'
              className='icon'
              width={'20px'}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
              />
            </svg>
            <span>Filtrar</span>
          </div>

        </div>
        <SortPokemon />
        <button><IconList color='white'/></button>
        <button><IconMist color='white'/></button>
        
        
        {/* FIN ICONO FILTRO */}
      </div>
      {/* CONTENEDOR BARRA FILTRO Y GRILLA POKEMONS */}
      <div className='flex'>
    
        <FilterBar />

        <article className={`flex-auto h-fit pt-4 gap-2 grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] `}>

          {filteredPokemons.length === 0 ? (
            <>
              {PokemonSearch.slice(0, OffSet).map((pokemon) => (
                <CardPokemon key={pokemon.id} pokemon={pokemon}  />
              ))}
              <span ref={targetObserver}></span>
            </>
          ) :

            (

              <>
                {SearchPokemon.slice(0, OffSet).map((pokemon) => (
                  <CardPokemon key={pokemon.id} pokemon={pokemon}  />
                ))}
                <span ref={targetObserver}></span>
              </>
            )}


        </article>

      </div>
      {/* FIN CONTAINER */}



    </div>
  );
};
