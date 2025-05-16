import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const TopCarsIndia = () => {
  const [topCars, setTopCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        const filteredCars = res.data.filter((car) =>
          car.tags?.toLowerCase().includes("top")
        );
        setTopCars(filteredCars);
      } catch (error) {
        console.error("Error fetching top cars:", error.message);
      }
    };
    fetchTopCars();
  }, []);

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/cars/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const handleCarClick = (slug) => {
    navigate(`/singlerent/${slug}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-lg font-semibold mb-4">Top Cars In India</h2>
      <div className="flex items-start space-x-6 overflow-x-auto scrollbar-hide pb-2">
        {topCars.length === 0 ? (
          <div className="text-gray-500 text-sm">No top cars available.</div>
        ) : (
          topCars.map((car, index) => (
            <div
              key={index}
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
    </div>
  );
};

export default TopCarsIndia;
