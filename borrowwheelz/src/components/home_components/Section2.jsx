import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCarSport } from "react-icons/io5";

const Section2 = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/brands");
        setBrands(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching Brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandClick = (brandName) => {
    setSelectedBrand(brandName);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6 text-left">
        <div className="flex items-center gap-2 text-xl text-[#78ff56] font-bold uppercase mb-2">
          <IoCarSport className="text-2xl" />
          <span>Brands</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800">Browse by Brands</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => handleBrandClick(brand.brand_name)}
            className={`flex flex-col items-center bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 cursor-pointer border ${
              selectedBrand === brand.brand_name ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img
              src={brand.image || "/placeholder.png"}
              alt={brand.brand_name}
              className="w-14 h-14 object-contain mb-3"
            />
            <span className="text-sm font-medium text-gray-700 text-center">
              {brand.brand_name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section2;
