import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const tabs = ["Trending", "Popular", "Upcoming"];
const CAR_CARDS_PER_VIEW = 4;

const FeaturedCars = () => {
  const [activeTab, setActiveTab] = useState("Trending");
  const [cars, setCars] = useState([]);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const navigate = useNavigate();

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
    setVisibleStartIndex(0); // Reset view when tab changes
  }, [activeTab]);

  const filteredCars = cars.filter((car) => {
    if (activeTab === "Trending") {
      return car.tags?.toLowerCase().includes("trending");
    } else if (activeTab === "Popular") {
      return car.tags?.toLowerCase().includes("popular");
    } else if (activeTab === "Upcoming") {
      return car.tags?.toLowerCase().includes("upcoming");
    }
    return false;
  });

  const visibleCars = filteredCars.slice(
    visibleStartIndex,
    visibleStartIndex + CAR_CARDS_PER_VIEW
  );

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/cars/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const handleNext = () => {
    if (visibleStartIndex + CAR_CARDS_PER_VIEW < filteredCars.length) {
      setVisibleStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (visibleStartIndex > 0) {
      setVisibleStartIndex((prev) => prev - 1);
    }
  };

  const handleCarClick = (slug) => {
    navigate(`/singlerent/${slug}`);
  };

  // Calculate container width based on number of visible cars (shrink if less than 4)
  const containerWidth = `${Math.min(visibleCars.length, CAR_CARDS_PER_VIEW) * 270}px`;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Featured Cars</h2>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Car Cards + Arrows */}
      <div className="relative flex items-center">
        {/* Left Arrow */}
        {visibleStartIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 min-w-[40px] h-10 flex items-center justify-center rounded-full shadow bg-white border z-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div
          className="flex space-x-6 overflow-hidden pb-2 w-full"
          style={{ minHeight: 220, width: containerWidth, transition: "width 0.3s" }}
        >
          {visibleCars.length === 0 ? (
            <div className="text-gray-500 text-sm">No cars available for {activeTab}.</div>
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

        {/* Right Arrow */}
        {visibleStartIndex + CAR_CARDS_PER_VIEW < filteredCars.length && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 min-w-[40px] h-10 flex items-center justify-center rounded-full shadow bg-white border z-10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
      {/* Hide scrollbar for all browsers */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FeaturedCars;
