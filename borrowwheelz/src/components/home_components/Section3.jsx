import React, { useEffect, useState } from "react";
import axios from "axios";

const CarFleet = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/cars");
        setCars(response.data);
        setFilteredCars(response.data.slice(0, 10)); // Default: show all
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/brands");
        setBrands(response.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching Brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleBrandClick = (brandName) => {
    setSelectedBrand(brandName);
    if (brandName === "All") {
      setFilteredCars(cars.slice(0, 10));
    } else {
      const filtered = cars.filter((car) => car.brand === brandName);
      setFilteredCars(filtered);
    }
  };

  return (
    <div className="container mx-auto my-24 px-4">
      <div className="flex justify-center mb-12">
        <h2 className="text-6xl font-bold font-serif mr-20">Our Fleet</h2>
        <p className="p-2 w-96 font-semibold">
          We offer an extensive fleet of vehicles including Hyundai, Mahindra,
          Kia and Tata
        </p>
      </div>

      {/* Brand filter buttons with "All" option */}
      <div className="flex flex-wrap justify-center mb-10 space-x-4">
        {[{ brand_name: "All" }, ...brands].map((brand, index, arr) => (
          <div key={brand.brand_name} className="flex items-center space-x-4">
            <button
              onClick={() => handleBrandClick(brand.brand_name)}
              className={`cursor-pointer text-sm font-medium hover:text-blue-700 transition ${
                selectedBrand === brand.brand_name
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
              }`}
            >
              {brand.brand_name}
            </button>

            {/* Divider line (skip after last item) */}
            {index < arr.length - 1 && (
              <span className="text-gray-300 text-xl select-none">|</span>
            )}
          </div>
        ))}
      </div>

      {/* Car display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{car.brand}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span>🚗 {car.seats} Seats</span>
                  <span>⛽ {car.fuelType}</span>
                  <span>⚙️ {car.transmission}</span>
                </div>
                <div className="mt-4 font-semibold text-blue-600">
                  ₹{car.pricePerDay} / day
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {car.availability ? "Available" : "Not Available"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No cars available for this brand.
          </p>
        )}
      </div>
    </div>
  );
};

export default CarFleet;
