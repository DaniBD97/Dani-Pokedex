import React, { useState } from 'react'


export const Gallery = () => {
    const [isHover, setIsHover] = useState(false);


    return (
        <article className=''>
            <div className={` max-w-[1240px] mx-auto Galerry  `}>
                <div className='Start  slide '>
                    <div
                        className={`Container text-center relative `}

                    >
                        <img  src="./src/img/Gallery/FotoAgua2.jpg" alt="" />
                        <span className=' title'>PooliPool</span>
                    </div>


                    <div className='Container text-center  '>
                        <img src="./src/img/Gallery/FotoAgua7.jpg" alt="" />
                        <span className='title  '>PooliPool</span>
                    </div>


                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoAgua4.jpg" alt="" />
                        <span className='title  '>PooliPool</span>
                    </div>

                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoPsico1.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>

                </div>
                <div className='End-2  slide2'>
                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoGhost2.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>
                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoAgua3.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>
                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoPsico2.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>
                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoFire3.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>
                </div>
                <div className='Start-2  slide3'>
                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoYerba3.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>

                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoAgua5.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>

                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoAgua6.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>

                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoElectrica1.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>
                </div>
                <div className='End  slide4'>
                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoFire4.jpg" alt="" />
                        <span className='title  '>PooliPool</span>
                    </div>

                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoYerba2.jpg" alt="" />
                        <span className='title '>PooliPool</span>
                    </div>
                    <div className='Container text-center '>
                    <img src="./src/img/Gallery/FotoYerba3.jpg" alt="" />
                    <span className='title '>PooliPool</span>
                    </div>

                    <div className='Container text-center '>
                        <img src="./src/img/Gallery/FotoGhot3.jpg" alt="" />
                        <span className='title'>PooliPool</span>
                    </div>

                </div>
            </div>
        </article>
    );
}
