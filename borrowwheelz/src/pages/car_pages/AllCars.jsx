import React from "react";
import car1 from "../../assets/images/car1.png";
import car2 from "../../assets/images/car2.png";
import car3 from "../../assets/images/car3.png";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const cars = [
  {
    name: "Tesla Model S",
    subname: "Tesla Model 3",
    image: car1,
    price: "$124",
    seats: "5 Seats",
    fuel: "Electric",
    mileage: "Unlimited mileage",
    tag: "SPECIAL DEAL",
  },
  {
    name: "Tesla Model 3",
    subname: "Tesla Model",
    image: car2,
    price: "$112",
    seats: "5 Seats",
    fuel: "Electric",
    mileage: "Unlimited mileage",
    tag: "HOT NOW!",
  },
  {
    name: "Tesla Model X",
    subname: "Tesla Model X",
    image: car3,
    price: "$149",
    seats: "5 Seats",
    fuel: "Electric",
    mileage: "Unlimited mileage",
  },
  {
    name: "Tesla Model S",
    subname: "Tesla Model Y",
    image: car1,
    price: "$138",
    seats: "5 Seats",
    fuel: "Electric",
    mileage: "Unlimited mileage",
  },
  {
    name: "Tesla Model Y",
    subname: "Tesla Model Y",
    image: car2,
    price: "$113",
    seats: "5 Seats",
    fuel: "Electric",
    mileage: "Unlimited mileage",
  },
  {
    name: "Tesla Model X",
    subname: "Tesla Model Y",
    image: car3,
    price: "$149",
    seats: "5 Seats",
    fuel: "Electric",
    mileage: "Unlimited mileage",
  },
];

const AllCars = () => {
  return (
    <div className="min-h-screen bg-white text-black px-4 sm:px-10 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Info Header */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Location + Dates */}
            <div className="flex items-center gap-6 flex-wrap text-gray-700 text-sm">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-lime-500" /> Location:{" "}
                <strong>Bangalore</strong>
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-lime-500" /> 7th March → 9th
                March
              </span>
            </div>

            {/* Sort Option */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sort by:</label>
              <select className="text-sm px-3 py-1 border rounded border-gray-300 focus:ring-lime-500 focus:outline-none">
                <option>Best match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Title + Results */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Available Cars</h2>
            <p className="text-gray-500 text-sm">{cars.length} results</p>
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            <div className="flex items-center gap-4 flex-wrap">
              {["Mini", "SUV", "Standard", "Van"].map((type, idx) => (
                <label key={idx} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-lime-500"
                    defaultChecked={type === "Standard"}
                  />
                  {type}
                </label>
              ))}
            </div>
            <div>
              <label className="text-sm font-medium">Capacity</label>
              <div className="mt-1">
                <select className="text-sm px-3 py-1 border rounded border-gray-300 focus:ring-lime-500 focus:outline-none w-full">
                  <option>2–5 passengers</option>
                  <option selected>6 or more</option>
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Daily Price</label>
              <div className="flex items-center space-x-4 mt-1">
                <input
                  type="range"
                  min="0"
                  max="180"
                  className="w-full accent-lime-500"
                />
                <span className="text-sm text-gray-600">$180</span>
              </div>
            </div>
          </div>
        </div>

        {/* Car Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white overflow-hidden"
            >
              <div className="relative">
                {car.tag && (
                  <span className="absolute top-2 left-2 bg-lime-100 text-lime-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    {car.tag}
                  </span>
                )}
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 object-contain"
                />
              </div>
              <div className="p-4 space-y-2">
                <h4 className="text-lg font-semibold">{car.name}</h4>
                <p className="text-sm text-gray-600">{car.subname}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{car.seats}</p>
                  <p>⚡ {car.fuel}</p>
                  <p>{car.mileage}</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-lg font-bold">
                    {car.price}{" "}
                    <span className="text-sm text-gray-500">/day</span>
                  </p>
                  <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded text-sm">
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCars;
