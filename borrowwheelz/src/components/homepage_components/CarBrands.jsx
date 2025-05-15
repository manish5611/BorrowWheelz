import React from "react";
import { useNavigate } from "react-router-dom";
import Maruti from "../../assets/brand_logo/suzukilogo.png";
import Mahindra from "../../assets/brand_logo/mahindralogo.png";
import Tata from "../../assets/brand_logo/tatalogo.png";
import Hyundai from "../../assets/brand_logo/hyundailogo.png";
import Toyota from "../../assets/brand_logo/toyotalogo.png";
import Kia from "../../assets/brand_logo/kialogo.png";
import Skoda from "../../assets/brand_logo/skodalogo.png";
import Bmw from "../../assets/brand_logo/bmwlogo.png";
import Mercedes from "../../assets/brand_logo/mercedesbenzlogo.png";
import Honda from "../../assets/brand_logo/hondalogo.png";
import MG from "../../assets/brand_logo/mglogo.png";
import LandRover from "../../assets/brand_logo/landroverlogo.png";

const carBrands = [
  { name: "Maruti Suzuki", logo: Maruti },
  { name: "Mahindra", logo: Mahindra },
  { name: "Tata", logo: Tata },
  { name: "Hyundai", logo: Hyundai },
  { name: "Toyota", logo: Toyota },
  { name: "Kia", logo: Kia },
  { name: "Skoda", logo: Skoda },
  { name: "BMW", logo: Bmw },
  { name: "Mercedes-Benz", logo: Mercedes },
  { name: "Honda", logo: Honda },
  { name: "MG", logo: MG },
  { name: "Land Rover", logo: LandRover },
];

const CarBrands = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/rent`, { state: { filterBrand: brandName } });
    setTimeout(() => {
      const filterSection = document.getElementById("FilterCars");
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay to ensure navigation completes
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mb-4">All Brands</h2>
      <div className="grid grid-cols-6 gap-y-6 gap-x-4 bg-white border rounded-xl p-6">
        {carBrands.map((brand, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center space-y-2 text-center text-sm text-gray-800 cursor-pointer"
            onClick={() => handleBrandClick(brand.name)}
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
