import React, { useContext } from 'react';
import Select from 'react-select';
import { PokemonContext } from '../Context/PokemonContext';

export const SortPokemon = () => {
    const { sortPokemonList } = useContext(PokemonContext);

    const suppliers = [
        { label: 'Sort By All', value: '' },
        { label: 'Sort By A-Z', value: 'asc' },
        { label: 'Sort By Z-A', value: 'desc' },
        { label: 'Sort By first at last', value: 'ascN' },
        { label: 'Sort By last at first', value: 'descN' },
        { label: 'Sort By Favorites', value: 'Fav' },
    ];

    const handleSortChange = (selectedOption) => {
        sortPokemonList(selectedOption); // Llama a la función para ordenar
    };

    return (
        <div className='z-20 mr-10 text-[20px] w-[290px]'>
            <Select
                className='select-options'
                defaultValue={suppliers[0]}
                options={suppliers}
                onChange={handleSortChange} // Usa la función de manejo de cambio
            />
        </div>
    );
};
