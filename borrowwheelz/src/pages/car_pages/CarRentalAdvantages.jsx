import React from "react";
import { FaCar, FaClock, FaShieldAlt, FaDollarSign } from "react-icons/fa";

const CarRentalAdvantages = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-6">
      {/* Section Title */}
      <div className="text-center">
        <h4 className="text-yellow-500 uppercase font-semibold tracking-wide">
          Our Advantages
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Why Choose Our Car Rental Service?
        </h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 max-w-6xl mx-auto text-center">
        {/* 1. Wide Range of Vehicles */}
        <div>
          <div className="flex justify-center mb-4">
            <FaCar className="text-5xl text-yellow-500" />
          </div>
          <h3 className="text-lg font-semibold">Wide Range of Vehicles</h3>
          <p className="text-gray-400 mt-2">
            Choose from economy cars to luxury SUVs to fit your needs.
          </p>
        </div>

        {/* 2. 24/7 Customer Support */}
        <div>
          <div className="flex justify-center mb-4">
            <FaClock className="text-5xl text-yellow-500" />
          </div>
          <h3 className="text-lg font-semibold">24/7 Customer Support</h3>
          <p className="text-gray-400 mt-2">
            Our team is always available to assist you anytime, anywhere.
          </p>
        </div>

        {/* 3. Safe & Secure Rentals */}
        <div>
          <div className="flex justify-center mb-4">
            <FaShieldAlt className="text-5xl text-yellow-500" />
          </div>
          <h3 className="text-lg font-semibold">Safe & Secure Rentals</h3>
          <p className="text-gray-400 mt-2">
            We ensure all our vehicles are well-maintained and insured.
          </p>
        </div>

        {/* 4. Best Price Guarantee */}
        <div>
          <div className="flex justify-center mb-4">
            <FaDollarSign className="text-5xl text-yellow-500" />
          </div>
          <h3 className="text-lg font-semibold">Best Price Guarantee</h3>
          <p className="text-gray-400 mt-2">
            Enjoy competitive prices with no hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarRentalAdvantages;
