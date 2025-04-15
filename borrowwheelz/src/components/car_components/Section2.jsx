import React, { useState } from 'react';

const bodyTypes = ["SUV", "Hatchback", "Sedan", "MUV", "Luxury"];

const carData = [
  {
    name: "Mahindra Scorpio N",
    price: "₹ 13.99 - 24.89 Lakh*",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/144165/scorpio-n-exterior-right-front-three-quarter-2.jpeg",
  },
  {
    name: "Mahindra Thar ROXX",
    price: "₹ 12.99 - 23.09 Lakh*",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/144383/thar-roxx-exterior-right-front-three-quarter.jpeg",
  },
  {
    name: "Mahindra XUV700",
    price: "₹ 13.99 - 25.74 Lakh*",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/143411/xuv700-exterior-right-front-three-quarter-2.jpeg",
  },
  {
    name: "Hyundai Creta",
    price: "₹ 11.11 - 20.50 Lakh*",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/137597/creta-exterior-right-front-three-quarter.jpeg",
  },
];

const Vehicles2 = () => {
  const [activeType, setActiveType] = useState("SUV");

  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Explore Rental Cars by Type
        </h2>

        {/* Body Type Tabs */}
        <div className="flex flex-wrap items-center gap-4 border-b mb-6 overflow-x-auto">
          {bodyTypes.map((type) => (
            <button
              key={type}
              className={`text-sm font-medium px-2 py-2 border-b-2 whitespace-nowrap ${
                activeType === type
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-orange-500"
              } transition-all`}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Car Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {carData.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-36 sm:h-40 object-cover rounded-t-xl"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900">{car.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{car.price}</p>
                <button className="mt-3 w-full border border-orange-500 text-orange-500 py-1.5 text-sm rounded hover:bg-orange-50 transition-all">
                  View April Offers
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles2;
