import React, { useState, useEffect } from 'react';

const Carousel = ({ images = [], interval = 3000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(slide);
  }, [images.length, interval]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-md">
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)`, width: `${images.length * 100}%` }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-64 object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-100 rounded-full p-2"
        onClick={goToPrevious}
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-100 rounded-full p-2"
        onClick={goToNext}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
