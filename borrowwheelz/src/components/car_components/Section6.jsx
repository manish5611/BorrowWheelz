import React from 'react';

const brandOffers = [
  {
    name: "Hyundai",
    offers: "4 Rental Deals",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Hyundai-logo.png",
  },
  {
    name: "Honda",
    offers: "3 Rental Deals",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Honda-logo.png",
  },
  {
    name: "Renault",
    offers: "3 Rental Deals",
    logo: "https://1000logos.net/wp-content/uploads/2021/10/Renault-Logo-2015.png",
  },
  {
    name: "Nissan",
    offers: "1 Rental Deal",
    logo: "https://1000logos.net/wp-content/uploads/2021/04/Nissan-logo.png",
  },
  {
    name: "Volkswagen",
    offers: "2 Rental Deals",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Volkswagen-Logo.png",
  },
  {
    name: "Skoda",
    offers: "3 Rental Deals",
    logo: "https://1000logos.net/wp-content/uploads/2018/04/Skoda-logo.png",
  },
];

const Vehicles6 = () => {
  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Find Rental Deals by Top Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {brandOffers.map((brand, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain mb-2"
              />
              <p className="text-sm font-medium text-gray-700">{brand.name}</p>
              <p className="text-xs text-gray-500">{brand.offers}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles6;
