import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoCarSport } from "react-icons/io5";
import { FaCar } from "react-icons/fa";

const CarFleet = () => {
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const scrollRef = useRef(null);

  // Fetch all brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Fetch cars (all cars or cars by brand)
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const url = selectedBrand
          ? `http://localhost:3001/api/cars/brand/${selectedBrand}`
          : "http://localhost:3001/api/cars";
        const response = await axios.get(url);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, [selectedBrand]);

  // Handle brand click
  const handleBrandClick = (brandId) => {
    setSelectedBrand(brandId === selectedBrand ? null : brandId); // Toggle brand selection
  };

  return (
    <div className="container mx-auto my-10 px-4 flex flex-col lg:flex-row gap-8">
      {/* Brands Section */}
      <section className="lg:w-1/4">
        <div className="flex items-center gap-2 text-xl text-[#78ff56] font-bold uppercase mb-6">
          <IoCarSport className="text-2xl" />
          <span>Brands</span>
        </div>
        <div
          className={`flex flex-col gap-4 overflow-y-auto ${
            brands.length > 3 ? "max-h-96" : ""
          }`}
        >
          {brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => handleBrandClick(brand._id)}
              className={`flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer border ${
                selectedBrand === brand._id
                  ? "border-blue-500"
                  : "border-gray-200"
              }`}
            >
              <img
                src={brand.image || "/placeholder.png"}
                alt={brand.brand_name}
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="text-sm font-medium text-gray-700 text-center">
                {brand.brand_name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Cars Section */}
      <section className="lg:w-3/4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4 lg:mb-0 flex gap-3 items-center">
            <FaCar className="text-blue-600" />{" "}
            {selectedBrand ? "Cars by Brand" : "Our Fleet"}
          </h2>
          <p className="text-gray-600 max-w-xl text-sm lg:text-base">
            {selectedBrand
              ? "Browse cars under the selected brand."
              : "Browse through our premium fleet of rental cars."}
          </p>
        </div>

        <div
          ref={scrollRef}
          className={`flex overflow-x-auto space-x-6 pb-4 scrollbar ${
            cars.length > 3 ? "max-h-96" : ""
          }`}
        >
          {cars.length > 0 ? (
            cars.map((car) => (
              <div
                key={car._id}
                className="min-w-[280px] bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
              >
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {car.availability ? (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Unavailable
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                  <p className="text-sm text-gray-500">
                    {car.brandId?.brand_name || "Unknown Brand"}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      🚗 {car.seats} Seats
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      ⛽ {car.fuelType}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      ⚙️ {car.transmission}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-semibold text-lg">
                      ₹{car.pricePerDay}{" "}
                      <span className="text-sm text-gray-500">/ day</span>
                    </span>
                    <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No cars available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CarFleet;