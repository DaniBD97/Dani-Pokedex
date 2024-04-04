import React, { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../Context/PokemonContext';
import { Link } from 'react-router-dom';
import { colorByType, imgByType } from '../Constants/ColorType';
import axios from 'axios';

export const ListaFavoritos = () => {
    const { Favorites, setFavorites } = useContext(PokemonContext);

    console.log(Favorites);

    return (
        <article className='bg-[#232323] h-screen text-center'>
            <div className={`max-w-[1240px] mx-auto flex-auto h-fit pt-4 gap-3 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] `}>
                {Favorites.map(pokemon => (
                    <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                        <div className='h-[200px] items-center capitalize'>
                            <div className='text-center absolute   bg-white h-[168px] rounded-l-full justify-center'>
                                {/* Generar un número aleatorio para decidir qué imagen mostrar */}
                                <div className='mt-6'>
                                    {pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default !== null && pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny !== null ? (
                                        // Si los sprites de la Generación 5 no son null, mostrarlos
                                        <>
                                            {Math.random() > 0.5 ? (
                                                <img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt="Pokemon" className='z-10 mx-auto pixelated w-[100px] h-[100px]' />
                                            ) : (
                                                <img src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny} alt="Pokemon Shiny" className='z-10 mx-auto pixelated w-[100px] h-[100px]' />
                                            )}
                                        </>
                                    ) : (
                                        // Si ambos sprites de la Generación 5 son null, mostrar el sprite de la Generación 8
                                        <img src={pokemon.sprites.versions["generation-viii"].icons.front_default} alt="Pokemon" className='z-10 mx-auto pixelated w-[100px] h-[100px]' />
                                    )}
                                </div>

                            </div>

                            <div className='ml-24 w-max'>
                                <ul className='flex flex-col gap-3 w-full'>
                                    {pokemon?.types?.slice(0, 1).map((type, index) => (
                                        <div className='w-full' key={index}>
                                            <li className={`p-1 gap-2 items-center flex w-full h-fit px-2 text-[12px] font-bold text-white ${colorByType[type.type.name]}`} >
                                                <span className='font-bold text-2xl flex-[2]'>{pokemon?.name}</span>

                                                <img className='w-[50px]' src={imgByType[type.type.name]} alt="" />

                                            </li>
                                        </div>
                                    ))}
                                </ul>
                                <div className='w-full bg-white'>
                                    <ul className='flex flex-col gap-3 w-full bg-white'>
                                        <h1 className='text-sm'>Lucky Moves</h1>
                                        {pokemon?.moves && (
                                            <div className='w-full'>
                                                {/* Generar hasta 3 índices aleatorios dentro del rango de movimientos */}
                                                {Array.from({ length: Math.min(3, pokemon.moves.length) }).map((_, index) => {
                                                    const randomIndex = Math.floor(Math.random() * pokemon.moves.length);
                                                    const move = pokemon.moves[randomIndex];
                                                    return (
                                                        <div className='w-full' key={index}>
                                                            <li className="p-1 items-center flex   px-2 text-[12px] font-bold text-black">{move.move.name}</li>
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
            </div>
        </article>
    );
};
