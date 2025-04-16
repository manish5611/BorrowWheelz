import React, { useState } from "react";
import car from "../../assets/images/bgo.jpg";

const Section1 = () => {
  const [selectedTab, setSelectedTab] = useState("Distance");

  return (
    <div className="">
      <div
        className="bg-cover bg-center rounded-xl overflow-hidden h-[780px] container"
        style={{ backgroundImage: `url(${car})` }}
      >
        <div className="items-center mb-6">
          <h1 className="text-white text-center text-7xl font-bold mt-5">
            Find Your Perfect Drive!
          </h1>
          <p className="mt-2 text-lg text-center text-white">
            We offer professional car rental & limousine services <br />
            in our range of high-end vehicles
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-white ml-[600px]">
            Open Fleet
          </button>
        </div>

        <div className=" bg-white p-6 rounded-xl shadow-lg w-96 ml-[850px] mb-10">
          {/* Tabs */}
          <div className="flex justify-between bg-gray-100 p-2 rounded-lg mb-4">
            <button className="px-4 py-2 bg-green-200 text-green-700 rounded-lg">
              Distance
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-black">
              Hourly
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-black">
              Flat Rate
            </button>
          </div>

          {/* Form Inputs */}
          <input
            type="text"
            placeholder="Pick Up Address"
            className="w-full mb-2 p-2 border rounded bg-gray-300 "
          />
          <input
            type="text"
            placeholder="Drop Off Address"
            className="w-full mb-2 p-2 border rounded bg-gray-300"
          />
          <input
            type="text"
            placeholder="One Way"
            className="w-full mb-2 p-2 border rounded bg-gray-300"
          />
          <input
            type="date"
            className="w-full mb-2 p-2 border rounded bg-gray-300"
          />

          {/* Time Selection */}
          <div className="flex space-x-2">
            <select className="w-1/2 p-3 border rounded">
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="w-1/2 p-3 border rounded">
              <option>00</option>
              <option>30</option>
            </select>
          </div>

          {/* Reserve Button */}
          <button className="mt-4 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section1;
