import React, { useState } from "react";

const AllCars = () => {
  const [filters, setFilters] = useState({
    priceRange: [],
    vehicleCategory: "SUV",
  });

  const handleCheckboxChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange.includes(value)
        ? prev.priceRange.filter((item) => item !== value)
        : [...prev.priceRange, value],
    }));
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      vehicleCategory: category,
    }));
  };

  return (
    <div className="bg-gray-900 text-white w-72 p-6 min-h-screen mt-20 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filter</h2>
        <button className="text-gray-400 text-sm hover:underline">CLEAR ALL FILTERS</button>
      </div>
<hr />
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-gray-400 uppercase text-sm mb-2 mt-4">Price Range</h3>
        {["€0 - €50", "€50 - €100", "€100 - €150", "€150 - €200", "€200+"].map((range) => (
          <label key={range} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 accent-gray-600"
              checked={filters.priceRange.includes(range)}
              onChange={() => handleCheckboxChange(range)}
            />
            <span>{range}</span>
          </label>
        ))}
      </div>

      {/* Vehicle Category */}
      <div className="mb-6">
        <h3 className="text-gray-400 uppercase text-sm mb-2">Vehicle Category</h3>
        {["Limousine", "SUV", "Coupe", "Cabriolet", "Family Car", "Electric Vehicle"].map((category) => (
          <label key={category} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
            <input
              type="radio"
              className="w-4 h-4 accent-gray-600"
              checked={filters.vehicleCategory === category}
              onChange={() => handleCategoryChange(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Expandable Sections (Gear Shift, Fuel Type) */}
      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-gray-400 uppercase text-sm mb-2 cursor-pointer">Gear Shift</h3>
      </div>
      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-gray-400 uppercase text-sm mb-2 cursor-pointer">Fuel Type</h3>
      </div>
    </div>
  );
};

export default AllCars;
