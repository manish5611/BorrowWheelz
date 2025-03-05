import React from "react";
import { FaUser, FaBolt } from "react-icons/fa";
import tesla_car from "../../assets/images/tesla_car.png";

const CarRentalPage = () => {
  const cars = [
    { id: 1, name: "Tesla Model S", category: "Standard", price: "124.00", image: tesla_car, electric: true, seats: 5, mileage: "Unlimited mileage", tag: "Special Deal" },
    { id: 2, name: "Tesla Model Y", category: "Standard", price: "129.00", image: "https://source.unsplash.com/400x300/?tesla", electric: true, seats: 5, mileage: "Unlimited mileage" },
    { id: 3, name: "Tesla Model X", category: "Standard", price: "136.00", image: "https://source.unsplash.com/400x300/?tesla-x", electric: true, seats: 5, mileage: "Unlimited mileage" }
  ];

  return (
    <div className="bg-white min-h-screen p-10 flex">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-5 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Filter by</h2>
        <div>
          <h3 className="text-md font-semibold mb-2">Car Type</h3>
          <ul className="text-gray-600">
            <li><input type="checkbox" className="mr-2" /> Mini (5)</li>
            <li><input type="checkbox" className="mr-2" checked /> Standard (87)</li>
            <li><input type="checkbox" className="mr-2" /> Compact (6)</li>
          </ul>
        </div>
        <div className="mt-5">
          <h3 className="text-md font-semibold mb-2">Capacity</h3>
          <ul className="text-gray-600">
            <li><input type="checkbox" className="mr-2" checked /> 2-5 passengers (28)</li>
            <li><input type="checkbox" className="mr-2" /> 6 or more passengers (12)</li>
          </ul>
        </div>
      </div>

      {/* Car Listings */}
      <div className="w-3/4 p-5">
        <div className="grid md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-gray-100 rounded-xl shadow p-5 relative flex flex-col items-center">
              <div className="w-full h-40 overflow-hidden rounded-lg">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-md font-semibold text-gray-900 mt-3 text-center">{car.category}</h3>
              <div className="text-sm text-gray-600 text-center">{car.name}</div>
              {car.tag && <span className="text-green-600 text-xs font-bold mt-1">{car.tag}</span>}
              <div className="flex items-center mt-2 text-gray-600 text-sm">
                <FaUser className="mr-1" /> {car.seats} 
                <FaBolt className="ml-4 mr-1" /> Electric 
              </div>
              <div className="text-sm text-gray-600 mt-1 text-center">{car.mileage}</div>
              <div className="flex justify-between items-center mt-4 w-full px-5">
                <span className="text-xl font-bold text-gray-900">${car.price} <span className="text-sm font-light">per day</span></span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">Reserve deal</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarRentalPage;