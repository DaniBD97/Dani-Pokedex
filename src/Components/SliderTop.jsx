import React, { useContext, useEffect, useRef, useState } from 'react';
import { PokemonContext } from '../Context/PokemonContext';
import SwiperCore, { EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import { colorByType } from '../Constants/ColorType';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function SliderTop() {
    const { topPokemon } = useContext(PokemonContext);
    const handleClick = () => {
        // Redirecciona a la ruta '/ListaPokemon'
        window.scrollTo(0, 0); // Desplaza hacia arriba al cargar la nueva página
    };
    const swiperRef = useRef(null);
    const [Active, setActive] = useState(false)

    useEffect(() => {
        const swiperInstance = swiperRef.current.swiper;
        if (swiperInstance) {
            swiperInstance.slideTo(0); // Move to the first slide when topPokemon changes
        }
    }, [topPokemon]);


    return (

        <div className='pb-6 '>
            <div className='flex w-[200px] h-[50px] items-center gap-2 rounded-t-md text-center justify-center bg-black text-white p-2 ml-[300px]'>
                <img src="./src/assets/poke.svg" alt="" /> <h1>Top Pokemon</h1>
            </div>


            <Swiper

                modules={[EffectCoverflow]}
                loop={true}
                effect={'coverflow'}
                ref={swiperRef}

                // slidesPerView={5}
                navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 20,
                    depth: 100,
                    modifier: 2.5,
                }}
                breakpoints={{
                    300: {
                        slidesPerView: 1,

                    },
                    500: {
                        slidesPerView: 3,
                        effect: "coverflow",
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 20,
                            depth: 100,
                            modifier: 1.8,
                        }
                    },
                    800: {
                        slidesPerView: 3,

                    },
                    1024: {
                        slidesPerView: 5,
                        effect: "coverflow",
                        coverflowEffect: {
                            rotate: 0,
                            stretch: 10,
                            depth: 100,
                            modifier: 2.8,
                        }
                    },

                }

                }
                centeredSlides={true} // Centra las diapositivas en el contenedor
                centeredSlidesBounds={true}
            >
                {topPokemon.map((pokemon, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <div className={`border-black border-[2px]  duration-500 swiper-slide items-center   flex flex-col ${isActive ? 'w-[310px] relative bg-[#313131]  justify-center mx-auto z-10 ' : 'z-0 opacity-90  bg-[#313131] '}`}>
                                <div className={`text-center`}>
                                <strong className={`${isActive ? 'text-[140px]' : 'text-[130px] text-gray-500 '} absolute  text-white opacity-45 mt-[50px] left-[0]`}>#{pokemon?.id}</strong>
                                    <img className={`  ${isActive ? ' transition-all duration-500 scale-110  opacity-[0px]' : 'opacity-100'}`} src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                                </div>

                                {/* INICIO del bloque info del Pokemon */}
                                <div className={`w-full pt-4 text-center bg-[#232323]  text-white ${isActive ? ' transition-all duration-700 #313131' : '#313131'}`}>
                                    <strong className={`mr-3 ml-3  text-xl capitalize justify-between flex`}>{pokemon?.name}<span> #{pokemon?.id}</span></strong>
                                    <ul className={`flex justify-start gap-1 mt-2 ml-3 mr-3  ${isActive ? 'h-9' : 'h-2'} `} >
                                        {pokemon.types.map((type, index) =>


                                            <li className={`h-fit rounded-sm p-[1px] w-[100px]  ${isActive ? '' : ' hidden'} text-white ${colorByType[type.type.name]}`} key={index}>
                                                {type.type.name}
                                            </li>


                                        )}
                                    </ul>
                                </div>
                                {/* Fin del bloque info del Pokemon */}
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='flex justify-end '>
                <Link
                    className='p-4 bg-black text-white mr-5 rounded-md '
                    to='/ListaPokemon'
                    onClick={handleClick} // Llama a handleClick al hacer clic en el enlace
                >
                    Pokedex
                </Link>


            </div>
        </div>


    );
}
