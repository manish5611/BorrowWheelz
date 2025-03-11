import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backendGlobalRoute from "../../config/config";

export default function AllCars({ selectedLocation }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [activeTab, setActiveTab] = useState("HOURLY");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${backendGlobalRoute}/api/all-cars`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const filtered = cars.filter((car) => car.location === selectedLocation);
      setFilteredCars(filtered);
    }
  }, [cars, selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <h2 className="text-2xl font-bold text-center text-cyan-700 hover:text-cyan-800">
        Car Rental Tariffs in {selectedLocation || "Your City"}
      </h2>
      <p className="text-center text-gray-500 text-sm mt-2">
        *All prices are exclusive of taxes and fuel. Images used for representation purposes only, actual color may vary.
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className="border rounded-lg shadow-sm bg-white overflow-hidden p-4">
              <img src={car.image || "https://via.placeholder.com/150"} alt={car.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">{car.name}</h3>
              <div className="flex justify-center border-b mb-2">
                {['HOURLY', '7 DAYS', '15 DAYS', '30 DAYS'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-gray-700 text-sm">
                <p><strong>Mon-Thu:</strong> ₹{car.pricing[activeTab].weekday}/hr</p>
                <p><strong>Fri-Sun:</strong> ₹{car.pricing[activeTab].weekend}/hr</p>
                <p><strong>Km Limit:</strong> {car.kmLimit} km</p>
                <p><strong>Excess Km Charges:</strong> ₹{car.extraKmCharge}/km</p>
              </div>
              <button className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg font-bold">BOOK NOW</button>
            </div>
          ))
        ) : (
          <h1 className="text-center text-gray-600 mt-6">No cars available in this location.</h1>
        )}
      </div>
    </div>
  );
}