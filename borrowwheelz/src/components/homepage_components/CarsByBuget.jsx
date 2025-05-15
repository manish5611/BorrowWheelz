import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronRight, ArrowRight } from "lucide-react";
import globalBackendRoute from "../../config/Config";

const tabs = ["Under 1000", "1000 - 2000", "2000 - 3000", "Luxury Cars"];
const CAR_CARDS_PER_VIEW = 4;

const CarsByBudget = () => {
  const [activeTab, setActiveTab] = useState("Under 1000");
  const [allCars, setAllCars] = useState([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setAllCars(res.data);
      } catch (error) {
        console.error("Error fetching cars:", error.message);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    setVisibleStartIndex(0); // Reset view when tab changes
  }, [activeTab]);

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/cars/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const getFilteredCars = () => {
    return allCars.filter((car) => {
      const price = parseFloat(car.rental_price_per_day) || 0;
      if (activeTab === "Under 1000") return price < 1000;
      if (activeTab === "1000 - 2000") return price >= 1000 && price < 2000;
      if (activeTab === "2000 - 3000") return price >= 2000 && price < 3000;
      if (activeTab === "Luxury Cars") return price >= 3000;
      return false;
    });
  };

  const filteredCars = getFilteredCars();
  const visibleCars = filteredCars.slice(
    visibleStartIndex,
    visibleStartIndex + CAR_CARDS_PER_VIEW
  );

  const handleNext = () => {
    if (visibleStartIndex + CAR_CARDS_PER_VIEW < filteredCars.length) {
      setVisibleStartIndex((prev) => prev + 1);
    }
  };

  const handleCarClick = (slug) => {
    navigate(`/singlerent/${slug}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mb-4">Cars by Budget</h2>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-6 text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 transition-all duration-200 ${
              activeTab === tab
                ? "text-green-600 font-semibold"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Car Cards + Arrow */}
      <div className="relative flex items-center">
        <div className="flex space-x-6 overflow-hidden pb-2 w-full">
          {visibleCars.length === 0 ? (
            <div className="text-gray-500 text-sm">No cars available in this range.</div>
          ) : (
            visibleCars.map((car, idx) => (
              <div
                key={idx}
                className="min-w-[208px] bg-white rounded-2xl border p-4 hover:shadow transition-all duration-200 cursor-pointer"
                onClick={() => handleCarClick(car.slug)}
              >
                <img
                  src={getImageUrl(car.car_image)}
                  alt={car.car_name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                  className="w-full h-32 object-contain mb-3 bg-white"
                />
                <div className="text-sm font-semibold text-gray-800">{car.car_name}</div>
                <div className="text-base text-green-600 mt-1 font-medium">
                  ₹{car.rental_price_per_day} / day
                </div>
              </div>
            ))
          )}
        </div>

        {/* Arrow Button */}
        {visibleStartIndex + CAR_CARDS_PER_VIEW < filteredCars.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 min-w-[40px] h-10 flex items-center justify-center rounded-full shadow bg-white border"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Footer CTA */}
      <button className="flex items-center gap-2 mt-4 text-sm font-medium text-green-600 hover:underline">
        All Cars Under {activeTab} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CarsByBudget;
