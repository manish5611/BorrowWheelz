import React, { useState, useEffect } from "react";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const tabs = ["Budget", "By Brand", "Fuel Type", "Transmission", "Seating Capacity"];

const tabOptions = {
  Budget: [
    "Under 1000", "Under 2000", "Under 3000", "Under 4000",
    "Under 5000", "Under 7000", "Under 10000", "Luxury Cars",
  ],
  "By Brand": ["Hyundai", "Toyota", "Honda", "Ford", "Maruti Suzuki", "Tata", "Mahindra", "Kia"],
  "Fuel Type": ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
  Transmission: ["Manual", "Automatic"],
  "Seating Capacity": ["2 Seater", "4 Seater", "5 Seater", "6 Seater", "7+ Seater"],
};

const CarFilterTabs = () => {
  const [activeTab, setActiveTab] = useState("Budget");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setCars(res.data);
        setFilteredCars(res.data); // Show all cars by default
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

  const handleFilter = (filterValue) => {
    setSelectedOption(filterValue);
    setLoading(true);

    setTimeout(() => {
      let filtered = [];

      if (activeTab === "Budget") {
        const budgetLimit = parseInt(filterValue.replace(/\D/g, ""), 10);
        filtered = cars.filter((car) => car.rental_price_per_day <= budgetLimit);
      } else if (activeTab === "By Brand") {
        filtered = cars.filter(
          (car) => car.brand?.toLowerCase() === filterValue.toLowerCase()
        );
      } else if (activeTab === "Fuel Type") {
        filtered = cars.filter(
          (car) => car.fuel_type?.toLowerCase() === filterValue.toLowerCase()
        );
      } else if (activeTab === "Transmission") {
        filtered = cars.filter(
          (car) => car.transmission?.toLowerCase() === filterValue.toLowerCase()
        );
      } else if (activeTab === "Seating Capacity") {
        const seatingCapacity = parseInt(filterValue.split(" ")[0], 10);
        filtered = cars.filter((car) => car.seating_capacity === seatingCapacity);
      }

      setFilteredCars(filtered);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 tracking-tight text-gray-800">
        Find The Cars Of Your Choice
      </h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-6 border-b border-gray-300 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedOption(null);
              setFilteredCars(cars); // Reset to default cars when switching tabs
            }}
            className={`pb-2 text-base font-medium border-b-2 transition-all duration-300 ease-in-out ${
              activeTab === tab ? "text-teal-600 border-teal-600" : "text-gray-500 border-transparent hover:text-teal-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Options */}
      <div className="bg-gray-50 border rounded-xl p-6 shadow-sm">
        <div className="flex flex-wrap gap-4">
          {tabOptions[activeTab].map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleFilter(option)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ease-in-out ${
                selectedOption === option
                  ? "bg-teal-600 text-white border-teal-600 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-teal-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Cars */}
      <div className="mt-10 min-h-[100px]">
        {loading ? (
          <div className="text-center text-gray-500 animate-pulse">Loading cars...</div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-xl border shadow hover:shadow-lg p-6 transition duration-200 ease-in-out"
              >
                <img
                  src={getImageUrl(car.car_image)}
                  alt={car.car_name}
                  className="h-48 w-full object-contain mb-4 rounded"
                />
                <h3 className="text-xl font-semibold text-gray-800 truncate">{car.car_name}</h3>
                <p className="text-teal-600 font-bold mt-2 text-lg">₹{car.rental_price_per_day} / day</p>
                <p className="text-sm text-gray-500 mt-1">Fuel Type: {car.fuel_type}</p>
                <p className="text-sm text-gray-500">Transmission: {car.transmission}</p>
                <p className="text-sm text-gray-500">Seating Capacity: {car.seating_capacity}</p>
                <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : selectedOption ? (
          <p className="text-gray-500 italic mt-4">No cars match your filter.</p>
        ) : (
          <p className="text-gray-400 italic mt-4">No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default CarFilterTabs;
