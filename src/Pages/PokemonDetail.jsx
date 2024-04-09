import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../Context/PokemonContext'

import { Link, useParams } from 'react-router-dom'

import { Loader } from '../Components/Loader'
import { ColorbyStat, colorByType, imgByType } from '../Constants/ColorType'
import { StatGroup } from '../Components/StatGroup'
import { IconArrowBadgeDown, IconArrowBadgeUp, IconHome, IconSquareRoundedArrowLeftFilled, IconSquareRoundedArrowRightFilled } from '@tabler/icons-react'

import usePokemonData from '../hooks/usePokemonId'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Breadcrumb } from 'flowbite-react'




SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

export const PokemonDetail = () => {

  const { formatPokemonId } = useContext(PokemonContext)
  const { id } = useParams();

  const { PokemonInfo, loading, nextPokemon, previousPokemon, setLoading } = usePokemonData(id);
  const [isModal, setisModal] = useState(false)





  const toggleModal = () => {

    setisModal(!isModal)

  }

  const [currentId, setCurrentId] = useState(null);

  const navigate = (direction) => {
  
    if (direction === 'prev') {
      const prevId = currentId - 1;
      if (prevId > 0) {
        setCurrentId(prevId);
         // Actualizar el estado currentId
      }
    } else if (direction === 'next') {
      const nextId = currentId + 1;
      setCurrentId(nextId); 
     // Actualizar el estado currentId
    }
  };


  useEffect(() => {
    setCurrentId(parseInt(id));
  }, [id]);



  return (


    <article className='  bg-[#232323] h-[100%]  mx-auto  flex justify-center '>

      {loading ? (
        <div className='mt-[250px] h-screen '><Loader /></div>
      ) : (
        <article className='flex flex-col '>
          <Breadcrumb className='items-center mt-9 !text-slate-200 flex' >
            <Breadcrumb.Item href="/"  >
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/ListaPokemon">Pokedex</Breadcrumb.Item>
            <Breadcrumb.Item  ><span className='!text-white'>{PokemonInfo?.name}</span></Breadcrumb.Item>
          </Breadcrumb>
          <section className=' max-w-[1024px] rounded-[10px] p-2 bg-slate-100 mt-10 mb-10'>
            <div className="flex items-center mt-4 justify-between mr-[2rem] ml-[3.5rem] mb-5  mx-auto text-center">
              {currentId > 1 && (
                <>
                  <Link to={`/pokemon/${currentId - 1}`} className="flex w-[100%] gap-2  h-[50px] bg-black  hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                    <IconSquareRoundedArrowLeftFilled width={30} height={30} /> <span className='text-xl uppercase'>{previousPokemon}</span> <span> #{formatPokemonId(currentId - 1)}</span>
                  </Link>

                </>

              )}

              <Link to={`/pokemon/${currentId + 1}`} className="flex gap-2 justify-end items-center w-[100%] h-[50px]  bg-black  hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                <span>#{formatPokemonId(currentId + 1)}</span><span className='text-xl uppercase'> {nextPokemon}</span>  <IconSquareRoundedArrowRightFilled width={30} height={30} />
              </Link>

            </div>
            <div className='flex flex-col sm:flex-row lg:flex-row xl:flex-row gap-2'>


              <section className='sd:w-[400px] lg:w-[400px] xl:w-[400px] flex items-center flex-col '>

                <div className=''></div>


                <div className='capitalize  font-bold text-[40px]'>
                  {PokemonInfo?.name} <span className='font-bold text-[20px]'>#{formatPokemonId(PokemonInfo?.id)}</span>

                </div>

                <Swiper
                  className='swiper2'
                  navigation
                  pagination={{ clickable: true }}


                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop={true}


                >
                  {[PokemonInfo?.image, PokemonInfo?.image2].map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className='bg-slate-200 border-blue-200 max-w-[300px] rounded-[40px] mt-2 mb-2'>
                        <img loading='lazy' className='w-[300px]' src={image} alt="" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>






                <section className={`mx-auto flex-col  border-[2px] border-slate-300  w-[280px] h-[180px]  ${colorByType[PokemonInfo?.types[0]]}   rounded-[10px] text-center  p-3 flex  `}>
                  <div className='flex  justify-between '>
                    <div className='flex flex-col justify-start'>
                      <h4 className='text-[20px] text-[#ffffff] border-b-2 font-bold capitalize'>height:</h4>
                      <span className='flex text-white  font-semibold text-[15px]'>{PokemonInfo?.height}m</span>
                    </div>
                    <div>
                      <h4 className='text-[20px] text-[#ffffff]  border-b-2 font-bold  capitalize'>weight:</h4>
                      <span className='flex text-white  font-semibold text-[15px]'>{PokemonInfo?.weight}kg</span>
                    </div>
                  </div>
                  <div className=' '>
                    <h4 className='text-[20px] mx-auto flex  border-b-2 text-[#ffffff] justify-center  capitalize font-bold '>Abilities:</h4>
                    <div className='flex justify-between  '>
                      {
                        PokemonInfo?.abilities.map((ability) => (
                          <div className='flex capitalize' key={ability}>
                            <p className=' text-white font-semibold'>{ability}</p>

                          </div>
                        ))
                      }

                    </div>
                  </div>



                </section>


              </section>
              <section className=' sd:w-[400px] lg:w-[400px] xl:w-[400px] mt-[10px] justify-center'>
                <div className='mt-10'>
                  <h4 className='description'>Description:</h4>
                  {
                    PokemonInfo?.description !== null ?
                      (
                        <span className='text-start  description text-[15px]'>{PokemonInfo?.description}</span>
                      ) :
                      (
                        <span className='text-start  description text-[15px]'>No description</span>
                      )
                  }

                </div>



                <section className='justify-center mt-3' >
                  <h4 className=' '>Stat</h4>
                  <div className='flex mx-auto justify-center text-center items-center  sm:justify-start md:justify-start lg:justify-start xl:justify-start '>
                    <ul className='flex  justify-center gap-1 mr-0 flex-wrap'>
                      {
                        PokemonInfo?.stats.map((stat) => (

                          <li className={`bg-slate-100 p-1 rounded-full ${ColorbyStat[stat.name]}`} key={stat.name}>
                            <div className='bg-red-500  rounded-full w-[30px] aspect-square grid place-content-center' >
                              <span className='text-xs text-white font-semibold'> {stat.name}</span>
                            </div>
                            <span>{stat.base_stat}</span>

                          </li>





                        ))
                      }
                    </ul>
                    <button onClick={toggleModal}>{isModal ? <IconArrowBadgeUp /> : <IconArrowBadgeDown />} </button>
                  </div>


                </section>
                {isModal && (
                  <ul className='absolute w-[400px] h-[200px]  p-2 justify-center bg-slate-50 flex mt-2 mx-auto sm:justify-start md:justify-start lg:justify-start xl:justify-start   '>
                    {PokemonInfo?.stats && (
                      <div className=' flex gap-[10px] ml-[30px] sm:ml-[0] md:ml-[0] lg:ml-[0] xl:ml-[0] h-fit    '>
                        <StatGroup statName="HP" statValue={PokemonInfo.stats[0].base_stat} />
                        <StatGroup statName="ATK" statValue={PokemonInfo.stats[1].base_stat} />
                        <StatGroup statName="DEF" statValue={PokemonInfo.stats[2].base_stat} />
                        <StatGroup statName="SPA" statValue={PokemonInfo.stats[3].base_stat} />
                        <StatGroup statName="SPD" statValue={PokemonInfo.stats[4].base_stat} />
                        <StatGroup statName="SPED" statValue={PokemonInfo.stats[5].base_stat} />
                        <StatGroup statName="TOT" statValue={PokemonInfo.stats[6].base_stat} />

                      </div>
                    )}
                  </ul>

                )}


                <div className='mt-5'>
                  <h4>Types:</h4>
                  <ul className='flex justify-start gap-3' >
                    {
                      PokemonInfo?.types?.map(type =>
                        <li className={` capitalize text-center p-1 rounded-[5px]  px-2 w-[90px]  font-semibold text-white ${colorByType[type]}`}

                          key={type}
                        >
                          <img className='w-[500px]' src={imgByType[type]} alt="" />
                          {type}
                        </li>)
                    }

                  </ul>
                  <div className='mt-5'>
                    <h4 className=' capitalize'>Weakness</h4>
                    <ul className='flex flex-wrap justify-start gap-2'>

                      {
                        PokemonInfo?.weak.map((weak) => (

                          <li key={weak.name} className={`capitalize text-center p-1 w-[90px] font-semibold items-center rounded-md px-2 text-white ${colorByType[weak.name]}`}>{weak.name}</li>



                        ))
                      }
                    </ul>
                  </div>
                  <div className='mt-5'>
                    <h4 className='capitalize'>Stronger</h4>
                    {
                      PokemonInfo?.stronger ? (
                        <ul className='flex flex-wrap justify-start gap-2'>
                          {PokemonInfo.stronger.map((strong) => (
                            <li key={strong.name} className={`capitalize h-fit text-center p-1 w-[90px] font-semibold items-center rounded-md px-2 text-white ${colorByType[strong.name]}`}>
                              {strong.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Description not available</p>
                      )
                    }

                  </div>
                  {
                    PokemonInfo?.location?.[0]?.location_area.name?.length > 0 ?
                      (
                        <div className='mt-3'>
                          <h1>First version Location</h1>
                          <li className='list-none'>{PokemonInfo.location[0].location_area.name}</li>
                        </div>
                      ) :
                      (
                        <div className='mt-3'>
                          <h1>First version Location</h1>
                          <p>It can only be obtained by evolving the initial pokemon</p>
                        </div>
                      )
                  }




                </div>

              </section>


            </div>
            <section className='mx-auto mt-10 bg-slate-300 rounded-sm shadow-sm shadow-slate-600 '>
              <h1 className='text-center font-bold p-2'>Evolutions</h1>
              <div className='flex justify-center items-center gap-8 flex-wrap'>
                {PokemonInfo?.evolutions.map((evo, i) => (
                  <div className='flex justify-center gap-4  items-center' key={evo.name}>

                    {i !== 0 && (
                      <div className=' rounded-full justify-center font-bold'>
                        <span className='text-center'>Lv. {evo.min_level}</span>
                      </div>
                    )}

                    <div className='flex flex-col text-center capitalize justify-center'>
                      <Link className=' ' to={`/pokemon/${evo?.pokemonInfo?.id}`} >
                        <div className='rounded-full bg-[#232323] justify-center'>

                          <img className=' w-[100px] scale-110 mx-auto' src={evo.image} alt="" />
                        </div>




                      </Link>
                      <span>{evo.name}</span>
                    </div>


                  </div>
                ))}
              </div>



            </section>

            <div className='flex justify-center'>
              <Link className='flex w-[400px] bg-black text-center justify-center text-white rounded-md p-1 mt-4 hover:bg-white hover:text-black hover:border-black hover:border-[1px] ' to={"/ListaPokemon"}>Pokedex</Link>
            </div>
          </section>

        </article>



      )}

    </article>






  )
}
