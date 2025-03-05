import React, { useState, useEffect } from "react";
import car1 from "../../assets/images/car1.png";
import "./Homepage.css";

const Homepage = () => {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);
  }, []);

  return (
    <div className="text-gray-900 min-h-screen bg-blue-50">
      {/* Hero Section */}
      <div className="">
      <div className="text-center pt-16 pb-12 relative">
        <h2 className="text-4xl font-bold">Rent The Best Cars</h2>
     
        <div className="mt-6 flex items-center justify-center w-5/6 md:w-3/4 lg:w-2/3 mx-auto bg-white p-2 rounded-full shadow-md">
          <input
            type="text"
            placeholder="Pickup Location"
            className="p-2 outline-none border-none text-gray-700 flex-1 bg-transparent"
          />
          <input
            type="date"
            className="p-2 outline-none border-none text-gray-700 flex-1 bg-transparent"
            value={todayDate}
            readOnly
          />
          <input
            type="date"
            className="p-2 outline-none border-none text-gray-700 flex-1 bg-transparent"
          />
          <button className="bg-blue-500 text-white p-3 rounded-full ml-2">
            🔍
          </button>
        </div>
        <img src={car1} alt="Car" className="w-2/3 mx-auto mt-6 drop-shadow-lg" />
      </div>
      </div>
     

      {/* Browse by Type */}
      <div className="py-10 text-center">
        <h3 className="text-2xl font-semibold">Browse by Type</h3>
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4 px-6">
          {["SUV", "Sedan", "Hatchback", "Coupe", "Hybrid", "Convertible"].map((type, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow hover:bg-blue-500 hover:text-white transition">
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-6 px-6 max-w-5xl mx-auto">
        <div className="bg-blue-100 p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Are You Looking For a Car?</h3>
          <p className="mt-2 text-gray-600">Find the best deals on top-quality vehicles.</p>
          <button className="mt-4 bg-blue-500 text-white px-5 py-2 rounded">Get Started</button>
        </div>
        <div className="bg-pink-100 p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Do You Want to Rent Out Your Car?</h3>
          <p className="mt-2 text-gray-600">List your car and connect with renters today.</p>
          <button className="mt-4 bg-pink-500 text-white px-5 py-2 rounded">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
