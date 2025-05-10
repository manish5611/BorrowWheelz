import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarsByFuelType = () => {
  const [activeTab, setActiveTab] = useState("Petrol Cars");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const scrollRef = useRef(null);

  const tabs = ["Petrol Cars", "Diesel Cars", "Electric Cars", "Hybrid Cars", "CNG Cars"];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error.message);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const fuelTypeMap = {
      "Petrol Cars": "Petrol",
      "Diesel Cars": "Diesel",
      "Electric Cars": "Electric",
      "Hybrid Cars": "Hybrid",
      "CNG Cars": "CNG",
    };
    const filtered = cars.filter((car) => car.fuel_type === fuelTypeMap[activeTab]);
    setFilteredCars(filtered);
  }, [activeTab, cars]);

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/cars/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cars by Fuel Type</h2>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium whitespace-nowrap ${
              activeTab === tab
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable car cards (max 4) */}
      <div className="relative">
        {filteredCars.length > 4 && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 px-6"
        >
          {filteredCars.length > 0 ? (
            filteredCars.slice(0, 4).map((car, index) => (
              <div
                key={index}
                className="min-w-[208px] bg-white border rounded-lg p-4 text-center shadow-sm hover:shadow transition duration-200"
              >
                <img
                  src={getImageUrl(car.car_image)}
                  alt={car.car_name}
                  className="h-32 mx-auto object-contain mb-2"
                />
                <h3 className="font-medium">{car.car_name}</h3>
                <p className="text-sm text-gray-700">
                  ₹{car.rental_price_per_day} / day
                </p>
                <a href="#" className="text-blue-600 text-sm mt-1 inline-block">
                  View Price Breakup
                </a>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic">No cars listed for {activeTab}</div>
          )}
        </div>

        {filteredCars.length > 4 && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-600 mt-6">
        Showing Avg. Ex-Showroom Price,&nbsp;
        <a href="#" className="text-blue-600 underline">
          Select City
        </a>
      </div>

      <div className="mt-2 text-sm text-blue-600 cursor-pointer">
        All {activeTab} &gt;
      </div>
    </div>
  );
};

export default CarsByFuelType;
