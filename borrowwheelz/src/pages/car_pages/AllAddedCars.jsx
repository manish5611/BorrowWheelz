import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaRupeeSign,
} from "react-icons/fa";
import { toast } from "react-toastify";
import globalBackendRoute from "../../config/Config";
import SearchBar from "../../components/common_components/SearchBar";
import stopwords from "../../components/common_components/stopwords";

const AllAddedCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setCars(res.data);
        setTotalCount(res.data.length);
      } catch (error) {
        console.error("Error fetching cars:", error.message);
        toast.error("Failed to fetch cars.");
      }
    };
    fetchCars();
  }, []);

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/cars/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const handleImageError = (e) => {
    if (!e.target.dataset.fallback) {
      e.target.src = "https://via.placeholder.com/150";
      e.target.dataset.fallback = "true";
    }
  };

  const handleDeleteCar = async (carId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${globalBackendRoute}/api/delete-car/${carId}`
      );
      if (res.status === 200) {
        setCars((prev) => prev.filter((c) => c._id !== carId));
        toast.success("Car deleted successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete car.");
    }
  };

  const filteredCars = searchQuery.trim()
    ? cars.filter((car) => {
        const fullText =
          `${car.car_name} ${car.brand} ${car.model}`.toLowerCase();
        const queryWords = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word && !stopwords.includes(word));
        return queryWords.some((word) => fullText.includes(word));
      })
    : cars;

  return (
    <div className="fullWidth py-10">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText">
            All Cars
            <span className="text-sm text-gray-500 ml-2">
              Showing {filteredCars.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center flex-wrap gap-4">
            <FaThList
              className={`text-xl cursor-pointer ${
                view === "list" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("list")}
            />
            <FaThLarge
              className={`text-xl cursor-pointer ${
                view === "card" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("card")}
            />
            <FaTh
              className={`text-xl cursor-pointer ${
                view === "grid" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("grid")}
            />
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cars..."
            />
          </div>
        </div>

        <div className="mt-6">
          {filteredCars.length === 0 ? (
            <p className="text-center text-gray-500">No cars found.</p>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredCars.map((car) => (
                <Link
                  key={car._id}
                  to={`/single-added-car/${car._id}`}
                  className="relative flex flex-col items-start bg-white shadow rounded-lg overflow-hidden"
                >
                  <img
                    src={getImageUrl(car.car_image)}
                    alt={car.car_name}
                    onError={handleImageError}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteCar(car._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <div className="p-3 space-y-1">
                    <h3 className="subHeadingTextMobile">{car.car_name}</h3>
                    <p className="paragraphTextMobile">{car.brand}</p>
                    <p className="paragraphTextMobile">{car.model}</p>
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <span className="font-bold text-green-600 flex items-center">
                        <FaRupeeSign /> {car.rental_price_per_day}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCars.map((car) => (
                <Link
                  key={car._id}
                  to={`/single-added-car/${car._id}`}
                  className="flex items-center space-x-4 bg-white rounded-lg shadow p-3 relative"
                >
                  <img
                    src={getImageUrl(car.car_image)}
                    alt={car.car_name}
                    onError={handleImageError}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteCar(car._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                  <div>
                    <h3 className="subHeadingTextMobile">{car.car_name}</h3>
                    <p className="paragraphTextMobile">{car.brand}</p>
                    <p className="paragraphTextMobile">{car.model}</p>
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <span className="font-bold text-green-600 flex items-center">
                        <FaRupeeSign /> {car.rental_price_per_day}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAddedCars;