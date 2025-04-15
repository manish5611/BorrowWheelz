import React, { useState } from 'react';

const priceTabs = [
  "1 - 5 Lakh",
  "5 - 10 Lakh",
  "10 - 15 Lakh",
  "15 - 20 Lakh",
  "20 - 35 Lakh",
  "35 - 50 Lakh",
  "50 Lakh - 1 Crore",
  "Above 1 Crore",
];

const carData = [
  {
    name: "Tata Tiago",
    price: "₹ 5 - 8.45 Lakh*",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41103/tata-tiago-exterior-right-front-three-quarter-3.jpeg",
  },
  {
    name: "Maruti Alto K10",
    price: "₹ 4.23 - 6.21 Lakh*",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/127281/maruti-suzuki-alto-k10-right-front-three-quarter0.jpeg",
  },
  {
    name: "Renault KWID",
    price: "₹ 4.70 - 6.45 Lakh*",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/108237/kwid-exterior-right-front-three-quarter-3.jpeg",
  },
  {
    name: "Maruti S-Presso",
    price: "₹ 4.26 - 6.12 Lakh*",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/143211/s-presso-exterior-right-front-three-quarter-2.jpeg",
  },
];

const Vehicles = () => {
  const [activeTab, setActiveTab] = useState("1 - 5 Lakh");

  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Explore Rentals by Price Range
        </h2>

        {/* Price Tabs */}
        <div className="flex flex-wrap items-center gap-4 border-b mb-6 overflow-x-auto">
          {priceTabs.map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium px-2 py-2 border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-orange-500"
              } transition-all`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
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
                  Get On-Road Price
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
