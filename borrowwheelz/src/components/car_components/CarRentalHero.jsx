import React from "react";
import carRentalImage from "../../assets/images/car_rental.jfif"; // Replace with actual car image path

const CarRentalHero = () => {
  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Left: Car Image */}
        <div className="md:w-1/2">
          <img src={carRentalImage} alt="Luxury Car Rental" className="rounded-lg shadow-lg" />
        </div>

        {/* Right: Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-500 text-xl font-semibold">
            <span className="border border-yellow-500 rounded-full px-3 py-1">25+</span>
            <span>Years of Excellence</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            Premium Cars for Every Journey
          </h2>
          <p className="text-gray-300 mt-4">
            Drive in style and comfort with our top-rated car rental services. Choose from luxury sedans, SUVs, or economy cars to match your travel needs.
          </p>
          <button className="mt-6 bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
            Rent Your Car Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarRentalHero;
