import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {motion} from "framer-motion"
const images = [
  {
    src : '/assets/ai_plant/cute.avif',
    title : 'AI-driven diagnostics'
  },
  {
    src : '/assets/ai_plant/red.avif',
    title : 'Remote Monitoring'
  },
  {
    src : '/assets/ai_plant/g.avif',
    title : 'satellite-based deforestation monitoring'
  },
  {
    src : '/assets/ai_plant/patta.avif',
    title : 'Remote Monitoring'
  },
  {
    src : '/assets/ai_plant/pila.avif',
    title : 'Remote Monitoring'
  },
  {
    src : '/assets/ai_plant/ptta.avif',
    title : 'Remote Monitoring'
  },
];

export const Carousell = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center relative">
        <span className="w-full text-center font-bold text-3xl">Future Cases</span>
        <div className="flex justify-center items-center gap-2 my-10">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-96 w-28 rounded-lg hover:w-96 overflow-hidden transition-all cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {hoveredIndex === index && (
                <div 
                className="w-full flex justify-center items-center absolute bottom-0 z-20 bg-gray-800 bg-opacity-75 text-white p-2">
                  <span>{image.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};