/**
 * Prologue Comments
 *
 * Name of code artifact: HeroHeader Component
 * Brief description: This code defines a HeroHeader component for a React application using TypeScript and Swiper.
 * Programmer's name: Thomas Nguyen & Wyatt Parsons
 * Date the code was created: 12/01/2023
 * Brief description of each revision & author:
 *     - Initial implementation. (Thomas Nguyen @ 12/01/23)
 *     - Changed content to match Rate My KU. (Wyatt Parsons @ 12/03/23)
 * Pre-conditions: 
 *     - `react`, `swiper`, and `typescript` modules must be installed.
 * Post-conditions:
 *     - Renders a HeroHeader component with specified properties.
 * Error and exception condition values: 
 *     - None. Errors would be raised by React if required props are not provided.
 * Side effects: 
 *     - Renders a HeroHeader component in the DOM.
 * Invariants: None
 * Any known faults: None
 */

import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import SimpleButton from '../components/SimpleButton';

import '../styles/swiper.css';

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface HeroHeaderProps {
    id: string;
    title: string;
    subtitle: string;
    images: string[];
    buttonText?: string; // Make buttonText prop optional
    opacity: string;
    leftTitle?: string;
    leftSubtitle?: string;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ id, title, subtitle, images, opacity, leftSubtitle = "", leftTitle = "", buttonText }) => {
    return (
        <div id={id} className="w-full lg:mx-auto text-center relative">
            <Swiper
                navigation
                pagination={{
                    clickable: true,
                }}
                className="h-[750px]"
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                speed={1000}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`Slide ${index}`} className='w-full h-full object-cover object-top' />
                        <div className={`absolute inset-0 ${opacity} z-0 bg-black`} />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center mx-auto px-4 md:px-0 gap-10">
                            <h1 className="max-w-5xl text-4xl md:text-5xl lg:text-7xl text-white font-bold z-10 font-jarkarta  pt-40">{title}</h1>
                            <p className="max-w-3xl text-gray-400 z-10 font-inter text-base">{subtitle}</p>
                            {buttonText && ( // Render the button only when buttonText prop is provided
                                <SimpleButton size="large" label={buttonText} textColor='white' bgColor="bg-gradient-[105deg] from-custom-blue from-40% to-custom-green to-130%" withArrow={true} onClick={() => {
                                    const element = document.getElementById("Sign Up");
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }} />
                            )}
                        </div>
                        <div className="absolute bottom-0 left-0 p-8 z-10 hidden sm:block">
                            <h2 className="text-left md:text-4xl text-white font-bold font-inter">{leftTitle}</h2>
                            <p className="text-left text-sm md:text-2xl text-gray-400 z-10 font-inter font-bold">{leftSubtitle}</p>
                        </div>
                        <div className="absolute bottom-0 right-0 p-8 z-10">
                            <h2 className="text-xs md:text-xl text-white font-bold font-jarkarta">Smart Course Selection.</h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
};

export default HeroHeader;
