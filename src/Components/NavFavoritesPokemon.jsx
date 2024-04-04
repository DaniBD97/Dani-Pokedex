import React, { useContext, useEffect } from 'react';
import { PokemonContext } from '../Context/PokemonContext';
import { Link } from 'react-router-dom';

export const NavFavoritesPokemon = () => {
    // Usamos el hook useContext para acceder al contexto de Pokemon
    const { Favorites, setFavorites, ModalFav, formatPokemonId } = useContext(PokemonContext);

    // Este efecto se ejecuta solo una vez cuando el componente se monta
    useEffect(() => {
        // Obtenemos los favoritos del localStorage y los establecemos en el estado
        const storedFavorites1 = JSON.parse(localStorage.getItem('favoritesPoke')) || [];
        setFavorites(storedFavorites1);

    }, []);

    // Este efecto se ejecuta cada vez que cambian los favoritos
    useEffect(() => {
        // Guardamos los favoritos en el localStorage
        localStorage.setItem('favoritesPoke', JSON.stringify(Favorites));
    }, [Favorites]);

    return (
        <>
            {/* Este div se muestra como un contenedor de la lista de favoritos */}
            <div className={`container-favorites bg-black overflow-hidden  ${ModalFav ? 'active2' : ''}`}>


                <Link className='text-white' to={'/favoritos'}>Ver</Link>

                {Favorites.map(pokemon => (
                    <div key={pokemon.id} className='bg-white rounded-full z-30' >
                        <div className=''>
                            <img className='absolute -z-[999] w-[100%]' src="./src/assets/Pokeball.png" alt="" />
                        </div>
                        <img className=' mx-auto z-[1] w-[150px]  ' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
                    </div>
                ))}
            </div>
        </>
    );
};
