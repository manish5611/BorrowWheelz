import React from "react";
import hyundai from "../../assets/brand_logo/hyundailogo.png"

const brands = [
  { name: "Maruti Suzuki", logo: "path/to/maruti.png" },
  { name: "Mahindra", logo: "path/to/mahindra.png" },
  { name: "Tata", logo: "path/to/tata.png" },
  { name: "Hyundai", logo: hyundai },
  { name: "Toyota", logo: "path/to/toyota.png" },
  { name: "Kia", logo: "path/to/kia.png" },
  { name: "Skoda", logo: "path/to/skoda.png" },
  { name: "BMW", logo: "path/to/bmw.png" },
  { name: "Mercedes-Benz", logo: "path/to/mercedes.png" },
  { name: "Honda", logo: "path/to/honda.png" },
  { name: "MG", logo: "path/to/mg.png" },
  { name: "Land Rover", logo: "path/to/landrover.png" },
];

const CarBrandsGrid = () => {
  return (
    <div className="p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">All Brands</h2>
      <div className="grid grid-cols-6 gap-6 items-center">
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center border p-3">
            <img src={brand.logo} alt={brand.name} className="h-10 mb-2" />
            <span className="text-sm">{brand.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:underline text-sm">
          View More Brands
        </button>
      </div>
    </div>
  );
};

export default CarBrandsGrid;
