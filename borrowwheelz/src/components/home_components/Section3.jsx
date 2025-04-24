import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaCar } from "react-icons/fa";

const CarFleet = () => {
  const [cars, setCars] = useState([]);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (cars.length <= 6) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    intervalRef.current = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: 1, behavior: "smooth" });
        scrollAmount += 1;

        // Reset scroll to start when reaching end
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
          scrollAmount = 0;
        }
      }
    }, 30); // adjust speed by tweaking interval or scroll amount

    return () => clearInterval(intervalRef.current);
  }, [cars]);

  // Pause scrolling on hover
  const handleMouseEnter = () => clearInterval(intervalRef.current);
  const handleMouseLeave = () => {
    if (cars.length <= 6) return;

    const scrollContainer = scrollRef.current;
    intervalRef.current = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: 1, behavior: "smooth" });
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 30);
  };

  return (
    <div className="container mx-auto my-10 px-4">
      {/* Heading */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-4 lg:mb-0 flex gap-3 items-center">
          <FaCar className="text-blue-600" /> Our Fleet
        </h2>
        <p className="text-gray-600 max-w-xl text-sm lg:text-base">
          Browse through our premium fleet of rental cars.
        </p>
      </div>

      {/* Horizontal Scrollable Car Cards */}
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex overflow-x-auto space-x-6 pb-2 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car._id}
              className="min-w-[270px] bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-44 object-cover rounded-t-xl transition-transform duration-300"
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
    </div>
  );
};

export default CarFleet;
