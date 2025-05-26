import React from "react";
import { X, MapPin } from "lucide-react";

const popularCities = [
  "Mumbai",
  "Bangalore",
  "Delhi",
  "Pune",
  "Navi Mumbai",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Chandigarh",
];

const CitySelector = ({ onClose, onLocationSelect }) => {
  const handleCitySelect = (city) => {
    if (onLocationSelect) {
      onLocationSelect(city); // Trigger the callback with the selected city
    }
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <h2 className="text-lg font-semibold mb-4">Select your City</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Type your Pincode or City"
          className="w-full border rounded-md px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Detect Location */}
        <div className="text-blue-600 flex items-center cursor-pointer mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          Detect my location
        </div>

        {/* Divider */}
        <hr className="mb-4" />

        {/* Popular Cities */}
        <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Cities</h3>
        <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-800">
          {popularCities.map((city, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleCitySelect(city)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 mb-2" />
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
