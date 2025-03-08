import React from "react";
import carImage from "../../assets/images/car_feature.jfif"; // Replace with actual car image

const CarRentalFeature = () => {
  return (
    <div className="bg-gray-900 text-white flex flex-col md:flex-row items-center">
      {/* Left Content Section */}
      <div className="md:w-1/2 p-10">
        <h4 className="text-yellow-500 uppercase font-semibold tracking-wide">
          Exclusive Rides
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Drive in Style & Comfort
        </h2>
        <p className="text-gray-300 mt-4">
          Discover our premium collection of rental cars designed for comfort, style, and efficiency. Whether it's a luxury sedan or a rugged SUV, we have the perfect ride for your journey.
        </p>
        <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-md">
          Explore Our Fleet →
        </button>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2">
        <img src={carImage} alt="Luxury Car" className="w-full h-auto rounded-l-md" />
      </div>

    </div>
  );
};

export default CarRentalFeature;
