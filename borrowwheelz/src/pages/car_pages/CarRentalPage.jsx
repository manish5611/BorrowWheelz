import React, { useState } from "react";
import { FaUser, FaBolt } from "react-icons/fa";
import baleno from "../../assets/images/rentcars/baleno.png";
import brezza from "../../assets/images/rentcars/brezza.png";
import ertiga from "../../assets/images/rentcars/ertiga.png";
import fronx from "../../assets/images/rentcars/fronx.png";
import HondaCityHybrideHEV from "../../assets/images/rentcars/HondaCityHybrideHEV.png";
import TataNexon from "../../assets/images/rentcars/TataNexon.png";

const CarRentalPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCapacities, setSelectedCapacities] = useState([]);

  const cars = [
    { id: 1, name: "BALENO", category: "Hatchback", price: "124.00", image: baleno, fuelType: "Petrol", seats: 5, mileage: "200 Km", tag: "Special Deal" },
    { id: 2, name: "BREZZA", category: "SUV", price: "129.00", image: brezza, fuelType: "petrol smart hybrid", seats: 5, mileage: "250 Km" },
    { id: 3, name: "ERTIGA", category: "Standard", price: "136.00", image: ertiga, fuelType: "Petrol", seats: 7, mileage: "200 Km" },
    { id: 4, name: "FRONX", category: "Hatchback", price: "150.00", image: fronx, fuelType: "petrol", seats: 5, mileage: "200 Km" },
    { id: 5, name: "Honda City", category: "Sedan", price: "136.00", image: HondaCityHybrideHEV, fuelType: "Petrol", seats: 7, mileage: "200 Km" },
    { id: 6, name: "NEXON", category: "SUV", price: "136.00", image: TataNexon, fuelType: "Petrol", seats: 5, mileage: "200 Km" },
  ];

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Function to handle capacity selection
  const handleCapacityChange = (capacity) => {
    setSelectedCapacities((prev) =>
      prev.includes(capacity) ? prev.filter((c) => c !== capacity) : [...prev, capacity]
    );
  };

  // Filter cars based on selected filters
  const filteredCars = cars.filter((car) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(car.category);
    const capacityMatch = selectedCapacities.length === 0 || selectedCapacities.includes(car.seats);
    return categoryMatch && capacityMatch;
  });

  return (
    <div className="bg-white min-h-screen p-10 flex">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-5 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Filter by</h2>

        {/* Car Type Filter */}
        <div>
          <h3 className="text-md font-semibold mb-2">Car Type</h3>
          <ul className="text-gray-600">
            {["Hatchback", "Sedan", "SUV", "Standard"].map((category) => (
              <li key={category}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                /> 
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Capacity Filter */}
        <div className="mt-5">
          <h3 className="text-md font-semibold mb-2">Capacity</h3>
          <ul className="text-gray-600">
            {[5, 7].map((capacity) => (
              <li key={capacity}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCapacities.includes(capacity)}
                  onChange={() => handleCapacityChange(capacity)}
                />
                {capacity} Seater
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Car Listings */}
      <div className="w-3/4 p-5">
        <div className="grid md:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="bg-gray-100 rounded-xl shadow p-5 relative flex flex-col items-center">
                <div className="w-full h-40 flex justify-center items-center overflow-hidden rounded-lg">
                  <img
                    src={car.image}
                    alt={car.name}
                    className={`${car.name === "Honda City" ? "w-[90%]" : "w-full"} h-full object-contain`}
                  />
                </div>
                <h3 className="text-md font-semibold text-gray-900 mt-3 text-center">{car.category}</h3>
                <div className="text-sm text-gray-600 text-center">{car.name}</div>
                {car.tag && <span className="text-green-600 text-xs font-bold mt-1">{car.tag}</span>}
                <div className="flex items-center mt-2 text-gray-600 text-sm">
                  <FaUser className="mr-1" /> {car.seats} 
                  <FaBolt className="ml-4 mr-1" /> {car.fuelType} 
                </div>
                <div className="text-sm text-gray-600 mt-1 text-center">{car.mileage}</div>
                <div className="flex justify-between items-center mt-4 w-full px-5">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{car.price} <span className="text-sm font-light">per day</span>
                  </span>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 text-lg">No cars found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarRentalPage;
