import React from "react";
import { useNavigate } from "react-router-dom";
import hyundai from "../../assets/brand_logo/hyundailogo.png"
import suzuki from "../../assets/brand_logo/suzukilogo.png";
import mahindra from "../../assets/brand_logo/mahindralogo.png";
import tata from "../../assets/brand_logo/tatalogo.png";
import toyota from "../../assets/brand_logo/toyotalogo.png";
import kia from "../../assets/brand_logo/kialogo.png";
import skoda from "../../assets/brand_logo/skodalogo.png";
import bmw from "../../assets/brand_logo/bmwlogo.png";
import mercedes from "../../assets/brand_logo/mercedesbenzlogo.png";
import honda from "../../assets/brand_logo/hondalogo.png";
import mg from "../../assets/brand_logo/mglogo.png";
import landrover from "../../assets/brand_logo/landroverlogo.png";



const brands = [
  { name: "Maruti Suzuki", logo: suzuki },
  { name: "Mahindra", logo: mahindra },
  { name: "Tata", logo: tata },
  { name: "Hyundai", logo: hyundai },
  { name: "Toyota", logo: toyota },
  { name: "Kia", logo: kia },
  { name: "Skoda", logo: skoda },
  { name: "BMW", logo: bmw },
  { name: "Mercedes-Benz", logo: mercedes },
  { name: "Honda", logo: honda },
  { name: "MG", logo: mg },
  { name: "Land Rover", logo: landrover },
];

const CarBrandsGrid = () => {
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
    <div className="p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">All Brands</h2>
      <div className="grid grid-cols-6 gap-6 items-center">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex flex-col items-center border p-3 cursor-pointer"
            onClick={() => handleBrandClick(brand.name)}
          >
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
