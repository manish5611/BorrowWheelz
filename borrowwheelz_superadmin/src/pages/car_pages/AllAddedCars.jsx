import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaTrash,
  FaRupeeSign,
  FaCar,
  FaTags,
  FaCalendarAlt,
  FaUserTie,
  FaArrowRight,
  FaSearch,
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
    <div className="fullWidth py-10 mt-20 bg-gradient-to-br from-indigo-50 via-white to-orange-50 min-h-screen animate-fadein">
      <div className="containerWidth">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="headingText flex items-center gap-2">
            <FaCar className="text-orange-500 animate-caricon" />
            All Cars
            <span className="text-sm text-gray-500 ml-2 flex items-center gap-1">
              <FaTags className="text-indigo-400" />
              Showing {filteredCars.length} of {totalCount}
            </span>
          </h2>
          <div className="flex items-center flex-wrap gap-4">
            <span className="tooltip" title="List View">
              <FaThList
                className={`text-xl cursor-pointer transition-transform duration-200 hover:scale-125 ${
                  view === "list" ? "text-indigo-600 scale-125" : "text-gray-600"
                }`}
                onClick={() => setView("list")}
              />
            </span>
            <span className="tooltip" title="Card View">
              <FaThLarge
                className={`text-xl cursor-pointer transition-transform duration-200 hover:scale-125 ${
                  view === "card" ? "text-indigo-600 scale-125" : "text-gray-600"
                }`}
                onClick={() => setView("card")}
              />
            </span>
            <span className="tooltip" title="Grid View">
              <FaTh
                className={`text-xl cursor-pointer transition-transform duration-200 hover:scale-125 ${
                  view === "grid" ? "text-indigo-600 scale-125" : "text-gray-600"
                }`}
                onClick={() => setView("grid")}
              />
            </span>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cars..."
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          {filteredCars.length === 0 ? (
            <p className="text-center text-gray-500 animate-fadein">No cars found.</p>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {filteredCars.map((car) => (
                <Link
                  key={car._id}
                  to={`/single-added-car/${car._id}`}
                  className="relative flex flex-col items-start bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-200 hover:scale-105 animate-fadein group"
                >
                  <div className="w-full h-48 overflow-hidden relative">
                    <img
                      src={getImageUrl(car.car_image)}
                      alt={car.car_name}
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteCar(car._id);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 transition"
                      title="Delete Car"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="p-4 space-y-1 w-full">
                    <h3 className="subHeadingTextMobile flex items-center gap-2 font-semibold text-indigo-700">
                      <FaCar className="text-orange-400" /> {car.car_name}
                    </h3>
                    <p className="paragraphTextMobile flex items-center gap-2 text-gray-600">
                      <FaTags className="text-indigo-300" /> {car.brand}
                    </p>
                    <p className="paragraphTextMobile flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="text-indigo-300" /> {car.model}
                    </p>
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <span className="font-bold text-green-600 flex items-center">
                        <FaRupeeSign /> {car.rental_price_per_day}
                      </span>
                      <FaArrowRight className="ml-auto text-indigo-400 group-hover:translate-x-1 transition-transform" />
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
                  className="flex items-center space-x-4 bg-white rounded-xl shadow-lg p-4 relative border border-orange-100 hover:shadow-2xl transition-all duration-200 hover:scale-102 animate-fadein group"
                >
                  <div className="w-20 h-20 overflow-hidden rounded-lg">
                    <img
                      src={getImageUrl(car.car_image)}
                      alt={car.car_name}
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteCar(car._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 transition"
                    title="Delete Car"
                  >
                    <FaTrash />
                  </button>
                  <div>
                    <h3 className="subHeadingTextMobile flex items-center gap-2 font-semibold text-indigo-700">
                      <FaCar className="text-orange-400" /> {car.car_name}
                    </h3>
                    <p className="paragraphTextMobile flex items-center gap-2 text-gray-600">
                      <FaTags className="text-indigo-300" /> {car.brand}
                    </p>
                    <p className="paragraphTextMobile flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="text-indigo-300" /> {car.model}
                    </p>
                    <div className="flex items-center gap-2 text-sm mt-2">
                      <span className="font-bold text-green-600 flex items-center">
                        <FaRupeeSign /> {car.rental_price_per_day}
                      </span>
                      <FaArrowRight className="ml-auto text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadein { animation: fadein 0.7s; }
          @keyframes caricon {
            0% { transform: translateY(0);}
            50% { transform: translateY(-6px);}
            100% { transform: translateY(0);}
          }
          .animate-caricon { animation: caricon 1.2s infinite; }
        `}
      </style>
    </div>
  );
};

export default AllAddedCars;