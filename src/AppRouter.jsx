import React, { useContext } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom';


import { Home } from './Pages/Home'
import { Nav } from './Components/Nav'
import { PokemonDetail } from './Pages/PokemonDetail'



import { ListaFavoritos } from './Components/ListaFavoritos';
import { NavFavoritesPokemon } from './Components/NavFavoritesPokemon';
import Top from './Pages/Top';
import { Gallery } from './Pages/Gallery';
import { PokemonList } from './Pages/PokemonList';



const AppRouter = () => {


  return <Routes>
    <Route path='/' element={<Nav />}>

      {/* Ruta por defecto */}
      <Route index element={<Home />} />
      {/* Ruta para detalles de Pokemon */}

      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/ListaPokemon" element={<PokemonList />} />
      <Route path="/favoritos" element={<ListaFavoritos />} />
      <Route path="/Top" element={<Top />} />
      <Route path="/Gallery" element={<Gallery />} />


    </Route>

    {/* Redirección por defecto si no coincide con ninguna ruta */}
    <Route path='' element={<Navigate to='/' />} />
    <Route path="" element={<NavFavoritesPokemon />} />
  </Routes>

}

export default AppRouter