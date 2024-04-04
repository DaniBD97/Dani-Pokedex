import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { PokemonContext } from './PokemonContext';
import axios from 'axios';
import { formatAbilities, formatStats, formatTypes, getDescription, getEvolutions, getImagePokemon } from '../Helpers/pokemon';
import { useParams } from 'react-router-dom';


export const PokemonProvider = ({ children }) => {


  const [isOpen, setisOpen] = useState(false)

  const [ModalFav, setModalFav] = useState(false)

  const [AllPokemons, setAllPokemons] = useState([])
  const [PokeInfo, setPokeInfo] = useState([])
  const [Active, setActive] = useState(false)

  const [filteredPokemons, setfilteredPokemons] = useState([])


  const [Favorites, setFavorites] = useState([])





  const [topPokemon, setTopPokemon] = useState([]);



  useEffect(() => {

    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1080");
        const pokemons = response.data.results;

        // Hacer la solicitud para obtener detalles de cada Pokémon dentro del mismo useEffect
        const detailedPokemons = await Promise.all(
          pokemons.map(async (pokemon) => {
            const detailedResponse = await axios.get(pokemon.url);
            return detailedResponse.data;
          })
        );

        // Actualizar el estado con los detalles de los Pokémon
        setAllPokemons(detailedPokemons);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemons();
  }, []);



  const calculateTotalStats = (stats) => {
    return stats.reduce((total, stat) => total + stat.base_stat, 0);
  };


  useEffect(() => {
    function TopPokemons() {
      // Filtra los Pokémon que tienen un total de estadísticas superior a 550
      const filteredPokemonList = AllPokemons.filter((pokemon) =>
        calculateTotalStats(pokemon.stats) > 600
      );

      // Ordena los Pokémon por total de estadísticas de forma descendente
      const sortedPokemonList = filteredPokemonList.sort(
        (a, b) => calculateTotalStats(b.stats) - calculateTotalStats(a.stats)
      );

      // Toma solo los primeros 10 Pokémon
      const top10Pokemon = sortedPokemonList.slice(0, 24);

      setTopPokemon(top10Pokemon);
    }
    TopPokemons()
  }, [AllPokemons]); // Agregar AllPokemons como dependencia

  console.log(topPokemon);


  // La función FavoritesPokemon(pokemon) que proporcionaste
  function FavoritesPokemon(pokemon, action) {
    // Verificar si el Pokémon ya está en la lista de favoritos
    const isFavorite = Favorites.some(favPokemon => favPokemon.id === pokemon.id);
  
    if (action === 'add') {
      if (isFavorite) {
        console.log('El Pokémon ya está en la lista de favoritos.');
        return;
      }
      // Clonamos la lista de favoritos y agregamos el nuevo Pokémon
      const updatedFavorites = [...Favorites, pokemon].slice(-10);// Limitamos a 10 elementos
  
      // Actualizamos el estado de los favoritos en tu aplicación
      setFavorites(updatedFavorites);
  
      // Almacenar los favoritos actualizados en el Local Storage
      localStorage.setItem('favoritesPoke', JSON.stringify(updatedFavorites));
    } else if (action === 'remove') {
      if (!isFavorite) {
        console.log('El Pokémon no está en la lista de favoritos.');
        return;
      }
      // Filtramos el Pokémon de la lista de favoritos
      const updatedFavorites = Favorites.filter(favPokemon => favPokemon.id !== pokemon.id);
  
      // Actualizamos el estado de los favoritos en tu aplicación
      setFavorites(updatedFavorites);
  
      // Almacenar los favoritos actualizados en el Local Storage
      localStorage.setItem('favoritesPoke', JSON.stringify(updatedFavorites));
    }
  }
  


  const formatPokemonId = (id) => {
    //sin esta validacion esta constante no sabia como reaccionar 
    //ante los valores nulos del array
    // Verificar si id es undefined o nulo
    if (id == undefined || id == null) {

      return '';
    }

    // Convertir a cadena solo si id es un número
    if (typeof id !== 'number') {
      console.error('El ID no es un número.');
      return '';
    }

    let formattedId = id.toString();

    if (formattedId.length === 1) {
      formattedId = "00" + formattedId;
    } else if (formattedId.length === 2) {
      formattedId = "0" + formattedId;
    }

    return formattedId;
  };

  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;

    if (name === 'all') {
      const updatedSelection = Object.fromEntries(
        Object.entries(typeSelected).map(([key]) => [key, key === 'all' ? checked : false])
      );

      setTypeSelected(updatedSelection);
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox !== e.target && checkbox.name !== 'all') {
          checkbox.checked = false;
        }
      });

      if (checked) {
        // Cuando se marca 'Todos', simplemente mostramos todos los pokemons.
        setfilteredPokemons([]);
      }
    } else {
      const updatedSelection = { ...typeSelected, [name]: checked };

      if (checked) {
        // Si se marca cualquier otro tipo, desmarcar el tipo 'Todos'.
        updatedSelection['all'] = false;
        const allCheckbox = document.getElementById('all');
        if (allCheckbox) {
          allCheckbox.checked = false;
        }
      }

      setTypeSelected(updatedSelection);

      const updatedTypes = Object.keys(updatedSelection).filter((key) => updatedSelection[key]);
      if (updatedTypes.includes('all')) {
        // Si 'Todos' está marcado, mostramos todos los pokemons.

        setfilteredPokemons([...AllPokemons]);
      } else {
        // Filtramos los pokemons según los tipos seleccionados.
        const filteredResults = AllPokemons.filter((pokemon) =>
          updatedTypes.some((type) => pokemon.types.map((t) => t.type.name).includes(type))
        );
        setfilteredPokemons([...filteredResults]);
      }
    }
  };

  const sortPokemonList = ({ value }) => {
    let sortedList;

    if (filteredPokemons.length === 0) {
      // Aquí ordenamos por AllPokemon si filteredPokemons es null
      sortedList = [...AllPokemons].sort((a, b) => {
        if (value === 'asc') {
          return a.name.localeCompare(b.name);
        } else if (value === 'desc') {
          return b.name.localeCompare(a.name);
        } else if (value === 'ascN') {
          return a.id - b.id;
        } else if (value === 'descN') {
          return b.id - a.id;
        }
        return 0;
      });
    } else {
      // Aquí ordenamos por filteredPokemons si no es null
      sortedList = [...AllPokemons].sort((a, b) => {
        if (value === 'asc') {
          return a.name.localeCompare(b.name);
        } else if (value === 'desc') {
          return b.name.localeCompare(a.name);
        } else if (value === 'ascN') {
          return a.id - b.id;
        } else if (value === 'descN') {
          return b.id - a.id;
        }


        return 0;
      });
    }

    if (value === 'Fav' && Favorites) {
      sortedList = sortedList.filter(pokemon => Favorites.some(favPokemon => favPokemon.id === pokemon.id));
    }



    setfilteredPokemons(sortedList);
  };








  const navigate = (direction) => {
    if (direction === 'prev') {
      const prevId = currentId - 1;
      if (prevId > 0) {
        return `/pokemon/${prevId}`;
      }
    } else if (direction === 'next') {
      const nextId = currentId + 1;
      return `/pokemon/${nextId}`;
    }
  };




  return (
    <PokemonContext.Provider value={{
      AllPokemons,
      isOpen,
      setisOpen,
      ModalFav,
      topPokemon,
      setModalFav,
      setAllPokemons,
      formatPokemonId,
      PokeInfo,
      navigate,
      setPokeInfo,
      FavoritesPokemon,
      handleCheckbox, Favorites, setFavorites,
      setfilteredPokemons,
      filteredPokemons,
      Active, setActive,
      sortPokemonList,



    }}>
      {children}
    </PokemonContext.Provider>
  )
}

