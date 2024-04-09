import React, { useEffect, useState } from 'react';

import SliderTop from '../Components/SliderTop';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [imageSrc, setImageSrc] = useState('');



  // Function to set the image source based on window width
  const setImageBasedOnWindowSize = () => {
    const width = window.innerWidth;
    let src = '';

    if (width <= 600) {
      src = './src/assets/suic.jpg';
    } else {
      src = './src/assets/Logo2.png';
    }

    setImageSrc(src);
  };

  useEffect(() => {
    // Set initial image based on window width
    setImageBasedOnWindowSize();

    // Update image when window resizes
    window.addEventListener('resize', setImageBasedOnWindowSize);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('resize', setImageBasedOnWindowSize);
    };
  }, [])


  return (
    <>
      <div className='z-[999] overflow-y-scroll no-scrollbar  bg-[#0D0D0D]  overflow-hidden  '>

        <section className='z-[10] bg-[#ffffff] relative max-w-[1500px] mx-auto'>
          <div>
            <img
              className='sm:w-[100%] object-contain md:object-contain md:h-[100%] md:mb-4 sm:object-cover sm:h-[600px]'
              src={imageSrc}
              alt=""
            />
          </div>
          <article className={` max-w-[1300px] mx-auto  `} >

            {/* Galeria de imagenes inicio */}
            <div className=' mx-auto flex '>
              <img src="./src/assets/Web.jpg" alt="" />
              <img src="./src/assets/Web.jpg" alt="" />
              <img src="./src/assets/Web.jpg" alt="" />

            </div>
            <br />
            <div className=' mx-auto flex flex-row-reverse'>
              <img src="./src/assets/Web.jpg" alt="" />
              <img src="./src/assets/Web.jpg" alt="" />
              <img src="./src/assets/Web.jpg" alt="" />

            </div>
            <div className='flex justify-end'>
              <Link className='flex p-4 mt-2 font-bold text-xl bg-black text-white rounded-md' to={"/Gallery"}>Gallery</Link>
              
            </div>

            {/* fin */}

          </article>
          <article className='z-[1] h-[600px] '>
            <SliderTop />
          </article>

        </section>



      </div>
      <div className='bg-black flex justify-center '>
       
        
        <Footer />
      
        
       
      </div>






    </>
  );
};
