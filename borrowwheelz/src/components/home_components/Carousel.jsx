import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HeroSection = () => {
  const [cars, setCars] = useState([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/cars'); // Update backend URL if needed
        setCars(response.data);
      } catch (error) {
        console.error('Failed to fetch cars', error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prevIndex) => (prevIndex + 1) % cars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cars.length]);

  if (cars.length === 0) return null;

  const car = cars[currentCarIndex];

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${car.image})`,
      }}
    >
      <div className=" p-8 rounded-md max-w-2xl ml-8">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-950 mb-4">{car.name}</h1>
        <p className="text-lg text-slate-800 mb-4">
          Experience the road like never before.
        </p>
        <h2 className="text-2xl font-semibold text-amber-600 mb-4">
          ₹{car.pricePerDay}/day
        </h2>
        <p className="text-sm text-gray-900 mb-6">
          Affordable prices. Premium experience.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Book Now
          </button>
          <button className="text-white underline hover:text-yellow-400">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
