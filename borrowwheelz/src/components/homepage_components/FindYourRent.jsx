import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import staticimg from "../../assets/images/static.jpg";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import globalBackendRoute from "../../config/Config";

const FindYourRent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [carModels, setCars] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startIndex, setStartIndex] = useState(0); // to control visible cars
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setCars(res.data);
        setSearchResults(res.data.slice(0, 5)); // Show initial suggestions
      } catch (error) {
        console.error("Error fetching cars:", error.message);
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

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === "") {
      setSearchResults(carModels.slice(0, 5)); // Show initial suggestions
      return;
    }

    try {
      const res = await axios.get(
        `${globalBackendRoute}/api/search-cars?q=${encodeURIComponent(query)}`
      );
      setSearchResults(res.data.slice(0, 5));
    } catch (error) {
      setSearchResults([]);
    }
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
    setSearchResults(carModels.slice(0, 5)); // Show initial suggestions
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200); // Delay to allow click on suggestions
  };

  const handleCarClick = (slug) => {
    navigate(`/singlerent/${slug}`);
  };

  return (
    <div className="relative w-full h-auto">
      <div className="pt-2 px-4">
        <img
          src={staticimg}
          alt="Carousel"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-[850px] rounded-xl shadow-lg bg-white p-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Find Your Right Car</h2>
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-full px-3 py-2 mb-4 shadow-inner">
            <input
              type="text"
              placeholder="Type to select car name, e.g. Citroen Aircross"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="flex-grow px-4 py-1 text-sm focus:outline-none"
            />
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          {showSuggestions && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50">
              {searchResults.map((car) => (
                <div
                  key={car._id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCarClick(car.slug)}
                >
                  <img
                    src={getImageUrl(car.car_image)}
                    alt={car.car_name}
                    className="h-10 w-10 object-contain mr-3"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="text-sm text-gray-700 font-semibold">
                      {car.car_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {car.brand} {car.model} {car.year && `| ${car.year}`}
                    </span>
                    <span className="text-xs text-green-700 font-bold">
                      ₹{car.rental_price_per_day} /day
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex items-center">
          {/* Left Button */}
          {startIndex > 0 && (
            <button
              onClick={() => setStartIndex(startIndex - 1)}
              className="absolute left-0 z-10 bg-white border rounded-full shadow p-1 hover:shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Car Cards */}
          <div className="flex items-center overflow-x-hidden space-x-4 mx-6">
            {searchResults.map((car, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[80px] bg-white border rounded-md p-2 hover:shadow cursor-pointer"
                onClick={() => handleCarClick(car.slug)}
              >
                <img
                  src={getImageUrl(car.car_image)}
                  alt={car.car_name}
                  className="h-16 object-contain mb-1 car_image"
                />
                <span className="text-xs text-center font-semibold">
                  {car.car_name}
                </span>
              </div>
            ))}
          </div>

          {/* Right Button */}
          {startIndex + 5 < carModels.length && (
            <button
              onClick={() => setStartIndex(startIndex + 1)}
              className="absolute right-0 z-10 bg-white border rounded-full shadow p-1 hover:shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindYourRent;
