import React, { useState, useEffect } from "react";
import axios from "axios";
import staticimg from "../../assets/images/static.jpg";
import { Search, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import globalBackendRoute from "../../config/Config";
import LocationContext from "../extra_component/LocationContext"; // Ensure this path is correct
import { useLocation } from "../../context/LocationContext";

const FindYourRent = () => {
  const [activeTab, setActiveTab] = useState("New");
  const [searchTerm, setSearchTerm] = useState("");
  const [carModels, setCars] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // to control visible cars
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const { setSelectedLocation } = useLocation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setCars(res.data);
        setTotalCount(res.data.length);
        console.log(res.data);
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

  const visibleCars = carModels.slice(startIndex, startIndex + 5);

  const handleNext = () => {
    if (startIndex + 5 < carModels.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleLocationSelect = (city) => {
    setSelectedLocation(city); // Update the shared location state
    setShowLocationPopup(false); // Close the popup
  };

  return (
    <div className="relative w-full h-auto">
      <div className="pt-2 px-4">
        <img src={staticimg} alt="Carousel" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 w-[850px] rounded-xl shadow-lg bg-white p-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Find Your Right Car</h2>
          <button
            className="text-sm font-semibold text-gray-700 hover:underline flex items-center gap-1"
            onClick={() => setShowLocationPopup(true)}
          >
            Select City <MapPin className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center border rounded-full px-3 py-2 mb-4 shadow-inner">
          <div className="flex space-x-2 pr-3 border-r">
            <button
              className={`px-3 py-1 text-sm rounded-full font-semibold ${
                activeTab === "New" ? "bg-green-100 text-green-700" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("New")}
            >
              New
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full font-semibold ${
                activeTab === "Used" ? "bg-green-100 text-green-700" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Used")}
            >
              Used
            </button>
          </div>
          <input
            type="text"
            placeholder="Type to select car name, e.g. Citroen Aircross"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-1 text-sm focus:outline-none"
          />
          <Search className="h-4 w-4 text-gray-500" />
        </div>

        <div className="relative flex items-center">
          {/* Left Button */}
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 bg-white border rounded-full shadow p-1 hover:shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Car Cards */}
          <div className="flex items-center overflow-x-hidden space-x-4 mx-6">
            {visibleCars.map((car, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[80px] bg-white border rounded-md p-2 hover:shadow"
              >
                <img
                  src={getImageUrl(car.car_image)}
                  alt={car.car_name}
                  className="h-16 object-contain mb-1 car_image"
                />
                <span className="text-xs text-center font-semibold">{car.car_name}</span>
              </div>
            ))}
          </div>

          {/* Right Button */}
          {startIndex + 5 < carModels.length && (
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 bg-white border rounded-full shadow p-1 hover:shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Location Popup */}
      {showLocationPopup && (
        <LocationContext
          onClose={() => setShowLocationPopup(false)}
          onLocationSelect={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default FindYourRent;
