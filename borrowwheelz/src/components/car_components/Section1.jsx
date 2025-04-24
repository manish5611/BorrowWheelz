import React, { useState, useEffect } from 'react';
import axios from 'axios';

const priceTabs = [
  "500 - 3,000",
  "3,000 - 7,000",
  "7,000 - 12,000",
  "12,000 - 20,000",
];

const Vehicles = () => {
  const [activeTab, setActiveTab] = useState("500 - 3,000");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filterCarsByPrice = (range) => {
    const priceRanges = {
      "500 - 3,000": [500, 3000],
      "3,000 - 7,000": [3000, 7000],
      "7,000 - 12,000": [7000, 12000],
      "12,000 - 20,000": [12000, 20000],
    };

    const [minPrice, maxPrice] = priceRanges[range] || [0, 20000];

    return cars.filter((car) => {
      const carPrice = parseInt(car.pricePerDay); // use pricePerDay instead of price
      return !isNaN(carPrice) && carPrice >= minPrice && carPrice <= maxPrice;
    });
  };

  const filteredCars = filterCarsByPrice(activeTab);

  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Explore Rentals by Price Range
        </h2>

        <div className="flex flex-wrap items-center gap-4 border-b mb-6 overflow-x-auto">
          {priceTabs.map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium px-2 py-2 border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-orange-500"
              } transition-all`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading cars...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCars.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No cars found in this price range.
              </div>
            ) : (
              filteredCars.map((car, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-36 sm:h-40 object-cover rounded-t-xl"
                    onError={(e) =>
                      (e.target.src = 'https://via.placeholder.com/150?text=No+Image')
                    }
                  />
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900">{car.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      ₹{car.pricePerDay ?? 'N/A'} / day
                    </p>
                    <button className="mt-3 w-full border border-orange-500 text-orange-500 py-1.5 text-sm rounded hover:bg-orange-50 transition-all">
                      CheckOut
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
