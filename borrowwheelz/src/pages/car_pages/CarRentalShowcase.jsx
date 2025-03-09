import React from "react";
import carcollection from "../../assets/images/car_collection.jpg"

const CarRentalShowcase = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[450px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50" 
          style={{ backgroundImage: `url(${carcollection})` }} 
        ></div>

        {/* Content Section */}
        <div className="relative z-10 max-w-3xl px-8">
          <h4 className="text-yellow-500 uppercase font-semibold tracking-wide">
            Exclusive Rides
          </h4>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">
            Rent a Car with Comfort & Safety
          </h2>
          <p className="text-gray-300 mt-4">
            Choose from our wide range of vehicles for your next trip. Whether it's a city ride or an off-road adventure, we ensure the best driving experience.
          </p>

          {/* Call to Action */}
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
            View All Cars
          </button>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <button className="w-16 h-16 bg-white text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
            ▶
          </button>
        </div>
      </div>

      {/* Car Brands Section */}
      <div className="py-8 ">
        <div className="flex justify-center space-x-40 my-5">
          <span className="text-lg font-bold text-gray-300 fs-4">Tata</span>
          <span className="text-lg font-bold text-gray-300 fs-4">Mahindra</span>
          <span className="text-lg font-bold text-gray-300 fs-4">Maruti Suzuki</span>
          <span className="text-lg font-bold text-gray-300 fs-4">Hyundai</span>
          <span className="text-lg font-bold text-gray-300 fs-4">Toyota</span>
        </div>
      </div>
    </div>
  );
};

export default CarRentalShowcase;
