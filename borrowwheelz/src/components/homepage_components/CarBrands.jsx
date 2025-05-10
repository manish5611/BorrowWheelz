import React from "react";

const carBrands = [
  { name: "Maruti Suzuki", logo: "/brands/maruti.png" },
  { name: "Mahindra", logo: "/brands/mahindra.png" },
  { name: "Tata", logo: "/brands/tata.png" },
  { name: "Hyundai", logo: "/brands/hyundai.png" },
  { name: "Toyota", logo: "/brands/toyota.png" },
  { name: "Kia", logo: "/brands/kia.png" },
  { name: "Skoda", logo: "/brands/skoda.png" },
  { name: "BMW", logo: "/brands/bmw.png" },
  { name: "Mercedes-Benz", logo: "/brands/mercedes.png" },
  { name: "Honda", logo: "/brands/honda.png" },
  { name: "MG", logo: "/brands/mg.png" },
  { name: "Land Rover", logo: "/brands/landrover.png" },
];

const CarBrands = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mb-4">All Brands</h2>
      <div className="grid grid-cols-6 gap-y-6 gap-x-4 bg-white border rounded-xl p-6">
        {carBrands.map((brand, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center space-y-2 text-center text-sm text-gray-800"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-10 h-10 object-contain"
            />
            <span>{brand.name}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="text-blue-600 text-sm font-medium hover:underline">
          View More Brands
        </button>
      </div>
    </div>
  );
};

export default CarBrands;
