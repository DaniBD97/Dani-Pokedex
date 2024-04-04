import React, { useContext } from 'react';
import Select from 'react-select';
import { PokemonContext } from '../Context/PokemonContext';

export const SortPokemon = () => {
    const { sortPokemonList } = useContext(PokemonContext);

    const suppliers = [
        { label: 'Ordena Por:', value: '' },
        { label: 'Ordenar de La A-Z', value: 'asc' },
        { label: 'Ordenar de La Z-A', value: 'desc' },
        { label: 'Ordenar del 1 al 100', value: 'ascN' },
        { label: 'Ordenar del 100 al 1', value: 'descN' },
        { label: 'Favoritos', value: 'Fav' },
    ];

    const handleSortChange = (selectedOption) => {
        sortPokemonList(selectedOption); // Llama a la función para ordenar
    };

    return (
        <div className='z-20'>
            <Select
                className='select-options'
                defaultValue={suppliers[0]}
                options={suppliers}
                onChange={handleSortChange} // Usa la función de manejo de cambio
            />
        </div>
    );
};
