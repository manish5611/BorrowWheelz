import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronRight, ChevronLeft } from "lucide-react";
import globalBackendRoute from "../../config/Config";

const PopularCarOffers = () => {
  const [popularCars, setPopularCars] = useState([]);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        const filteredCars = res.data.filter((car) =>
          car.tags?.toLowerCase().includes("popular")
        );
        setPopularCars(filteredCars);
      } catch (error) {
        console.error("Error fetching popular cars:", error.message);
      }
    };
    fetchPopularCars();
  }, []);

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons(); // initial check
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mb-4">Get Offers on Popular Cars</h2>
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

        {/* Scrollable Car Cards */}
        <div
          ref={scrollContainerRef}
          className="flex items-start space-x-6 overflow-x-auto scrollbar-hide pb-2"
        >
          {popularCars.length === 0 ? (
            <div className="text-gray-500 text-sm">No popular cars available.</div>
          ) : (
            popularCars.map((car, idx) => (
              <div
                key={idx}
                className="min-w-[208px] bg-white rounded-2xl border p-4 hover:shadow transition-all duration-200"
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
                <button className="text-xs text-blue-600 mt-2 font-semibold hover:underline">
                  View Price Breakup
                </button>
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

export default PopularCarOffers;
