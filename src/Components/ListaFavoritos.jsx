import React, { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../Context/PokemonContext';
import { Link } from 'react-router-dom';
import { colorByType, imgByType } from '../Constants/ColorType';


export const ListaFavoritos = () => {
    const { Favorites, setFavorites } = useContext(PokemonContext);

    console.log(Favorites);

    return (
        <article className='bg-[#232323] h-screen text-center'>

            <h1 className='text-white text-[20px] p-5'>Hello Trainer Master, you were lucky? when catching your favorite pokemon?</h1>

            <div className={`max-w-[1450px] mt-10 mx-auto flex-auto  gap-5 grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] `}>
                {Favorites.map(pokemon => (
                    <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                        <div className='w-[430px]  flex  capitalize'>

                            <div className='text-center flex-2  bg-white  rounded-l-full '>
                                {/* Generar un número aleatorio para decidir qué imagen mostrar */}

                                {pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default !== null && pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny !== null ? (
                                    // Si los sprites de la Generación 5 no son null, mostrarlos
                                    <>
                                        {Math.random() > 0.5 ? (
                                            <img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt="Pokemon" className='z-10 mx-auto mt-5 pixelated w-[150px] h-[150px]' />
                                        ) : (
                                            <img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny} alt="Pokemon Shiny" className='z-10 mt-5  mx-auto pixelated w-[150px] h-[150px]' />
                                        )}
                                    </>
                                ) : (
                                    // Si ambos sprites de la Generación 5 son null, mostrar el sprite de la Generación 8
                                    <img src={pokemon.sprites.front_default} alt="Pokemon" className='z-10 mx-auto pixelated w-[150px] h-[150px] mt-5 ' />
                                )}


                            </div>

                            <div className='flex-1' >

                                {pokemon?.types?.slice(0, 1).map((type, index) => (
                                    <div key={index}>
                                        <li className={`  items-center flex rounded-tr-full h-fit p-[10px] text-[12px] font-bold text-white ${colorByType[type.type.name]}`} >
                                            <span className='font-bold text-2xl '>{pokemon?.name}</span>

                                            <img className='w-[50px]' src={imgByType[type.type.name]} alt="" />

                                        </li>
                                    </div>
                                ))}

                                <div className=' bg-white rounded-br-[89px]'>
                                    <ul className='flex flex-col  '>

                                        <h1 className='text-[20px] font-bold underline'>Lucky Moves</h1>

                                        {pokemon?.moves && (
                                            <div className='rounded-br-full'  >
                                                {/* Generar hasta 3 índices aleatorios dentro del rango de movimientos */}
                                                {Array.from({ length: Math.min(3, pokemon.moves.length) }).map((_, index) => {
                                                    const randomIndex = Math.floor(Math.random() * pokemon.moves.length);
                                                    const move = pokemon.moves[randomIndex];
                                                    return (
                                                        <div  key={index}>
                                                            <li className="   flex  text-[20px] font-semibold text-black">{move.move.name}</li>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                 <div className='bg-black flex justify-end mt-5 p-4 w-fit  text-white'>
                <Link to={"/ListaPokemon"}>Back To Pokedex</Link>
            </div>
            </div>

           
        </article>
    );
};
