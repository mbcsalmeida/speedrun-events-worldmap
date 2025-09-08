import React, { useState } from 'react';
import { RegionBounds } from '../types';
import MapImage from '../assets/map.jpg';
import { useLanguage } from '../contexts/LanguageContext';



interface RegionSelectionMapProps {
    selectedRegion: string | null;
    onRegionClick: (region: string) => void;
}

export function RegionSelectionMap({ selectedRegion, onRegionClick }: RegionSelectionMapProps) {
    const { language, translations } = useLanguage();

    const currentTranslations = translations[language];

    const RegionsComponent = () => {
        if (!currentTranslations) return null;
        return <>
        {/* Region overlay */}
        <div className="absolute inset-0 z-10 grid grid-flow-col">

            <div id="left" className='col-span-2 grid grid-flow-row '>
                <div id='NA' className='flex items-center text-center text-white drop-shadow border-red-300 border-3 hover:border-5 row-span-3 bg-black/20 hover:bg-black/0 hover:text-black font-bold'>
                    <span className='m-auto'>{currentTranslations.regions.northAmerica}</span>
                </div>
                <div id='SA' className='flex items-center text-center text-white drop-shadow border-red-300 border-3 hover:border-5 row-span-3 bg-black/20 hover:bg-black/0 hover:text-black font-bold'>
                    <span className='m-auto'>{currentTranslations.regions.southAmerica}</span>
                </div>

            </div>

            <div id='right' className='col-span-3 grid grid-flow-row '>
                <div id='Europe & Asia' className='row-span-3 grid grid-flow-col'>
                    <div id='Europe' className='flex items-center text-center text-white drop-shadow  border-red-300 border-3 hover:border-5 col-span-2 bg-black/20 hover:bg-black/0 hover:text-black font-bold'>
                        <span className='m-auto'>{currentTranslations.regions.europe}</span>
                    </div>
                    <div id='Asia top' className='flex items-center text-center text-white drop-shadow  border-red-300 border-t-3 border-l-3 border-r-3 hover:border-t-5 hover:border-l-5 hover:border-r-5 col-span-4 bg-black/20 hover:bg-black/0 hover:text-black font-bold'>
                        <span className='m-auto'>{currentTranslations.regions.asia}</span>
                    </div>
                </div>
                <div id='Africa & Oceania' className='row-span-4 grid grid-flow-col'>
                    <div id='Africa & Middle Eat' className='flex items-center text-center text-white drop-shadow  border-red-300 border-3 hover:border-5 col-span-3 bg-black/20 hover:bg-black/0 hover:text-black font-bold'>
                        <span className='m-auto'>{`${currentTranslations.regions.africa} - ${currentTranslations.regions.middleEast}`}</span>
                    </div>
                    <div id='Asia bottom' className='col-span-4 grid grid-flow-row '>
                        <div id='Asia' className='flex items-center text-center text-white drop-shadow  border-red-300 border-b-3 border-l-3 border-r-3 hover:border-b-5 hover:border-l-5 hover:border-r-5 row-span-2 bg-black/20 hover:bg-black/0 hover:text-black font-bold' />
                        <div id='Oceania' className='flex items-center text-center text-white drop-shadow  border-red-300 border-3 hover:border-5 row-span-3 bg-black/20 hover:bg-black/0 hover:text-black font-bold'>
                            <span className='m-auto'>{currentTranslations.regions.oceania}</span>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    </>;
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <img src={MapImage} className='w-screen h-full object-contain' />
            <div className="text-center">
                <RegionsComponent />
            </div>
        </div>
    );
}