import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const tabs = ["Trending", "Popular", "Upcoming"];

const FeaturedCars = () => {
  const [activeTab, setActiveTab] = useState("Trending");
  const [cars, setCars] = useState([]);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
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

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/cars/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.offsetWidth < container.scrollWidth);
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCarClick = (slug) => {
    navigate(`/singlerent/${slug}`);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

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

      {/* Scrollable Car Cards */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-start space-x-6 overflow-x-auto scrollbar-hide pb-2"
        >
          {filteredCars.length === 0 ? (
            <div className="text-gray-500 text-sm">No cars available for {activeTab}.</div>
          ) : (
            filteredCars.map((car, idx) => (
              <div
                key={idx}
                className="min-w-[260px] bg-white rounded-xl border p-4 hover:shadow transition-all duration-200 cursor-pointer"
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
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedCars;
