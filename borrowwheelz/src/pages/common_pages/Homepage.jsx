import React, { useState, useEffect } from "react";
import { FiSearch, FiCalendar, FiCheck } from "react-icons/fi";
import car1 from "../../assets/images/car1.png";
import car2 from "../../assets/images/car7.png";
import suv from "../../assets/images/suv.jfif";
import toyo from "../../assets/images/toyo.jfif";
import maru from "../../assets/images/maruti.jpg";
import xlv from "../../assets/images/xlv.jpg";
import bg1 from "../../assets/images/bg1.jfif";
import LuxuryCarRental from "../content_pages/LuxuryCarRental";

import "./Homepage.css";

const Homepage = () => {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);
  }, []);

  return (
    <div className="text-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-100">
        <div className="text-center pt-16 pb-12">
          <h2 className="text-4xl font-bold">Rent The Best Cars</h2>

          {/* Search Bar */}
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

          {/* Hero Image */}
          <img
            src={car2}
            alt="Car"
            className="w-2/3 mx-auto mt-6 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Browse by Type */}
      <div className="py-10 text-center">
        <h3 className="text-2xl font-semibold">Browse by Type</h3>
        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4 px-6">
          {["SUV", "Sedan", "Hatchback", "Coupe", "Hybrid", "Convertible"].map(
            (type, index) => (
              <div
                key={index}
                className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-500 hover:text-white transition"
              >
                {type}
              </div>
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-6 px-6 max-w-5xl mx-auto">
        <div className="bg-blue-100 p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Do You Want to Rent Out Bike?</h3>
          <p className="mt-2 text-gray-600">
            Find the best deals on top-quality vehicles.
          </p>
          <button className="mt-4 bg-blue-500 text-white px-5 py-2 rounded">
            Get Started
          </button>
        </div>
        <div className="bg-pink-100 p-8 rounded-lg shadow">
          <h3 className="text-xl font-semibold">
            Do You Want to Rent Out Car?
          </h3>
          <p className="mt-2 text-gray-600">
            List your car and connect with renters today.
          </p>
          <button className="mt-4 bg-pink-500 text-white px-5 py-2 rounded">
            Get Started
          </button>
        </div>
      </div>

      {/* Most Searched Cars Section */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center">
          The Most Searched Cars
        </h2>

        {/* Tabs for filtering */}
        <div className="flex justify-center space-x-6 mt-4">
          {["In Stock", "Sedan", "SUV", "Convertible"].map(
            (category, index) => (
              <button
                key={index}
                className="text-gray-600 hover:text-blue-600 font-medium border-b-2 border-transparent hover:border-blue-600 transition"
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Car Listings */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Toyota Camry New",
              price: "$40,000",
              image: toyo,
              tag: "Great Price",
            },
            {
              name: "T-Cross - 2023",
              price: "$15,000",
              image: maru,
            },
            {
              name: "C-Class - 2023",
              price: "$150,000",
              image: suv,
            },
            {
              name: "Ford Transit - 2021",
              price: "$22,000",
              image: xlv,
              tag: "Great Price",
            },
          ].map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Car Image */}
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                {car.tag && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    {car.tag}
                  </span>
                )}
              </div>

              {/* Car Details */}
              <div className="p-4 bg-gray-900 text-white">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-sm text-gray-400">
                  4.0 DS PowerPulse Momentum 5dr AWD
                </p>

                {/* Features */}
                <div className="flex justify-between text-xs text-gray-300 mt-2">
                  <span>20 Miles</span>
                  <span>Petrol</span>
                  <span>Automatic</span>
                </div>

                {/* Price & Details */}
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xl font-semibold">{car.price}</span>
                  <button className="text-sm bg-blue-500 px-3 py-1 rounded text-white">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-blue-100">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              icon: "⚡",
              title: "Special Financing Offers",
              description:
                "Our stress-free finance department can find financial solutions to save you money.",
            },
            {
              icon: "🏆",
              title: "Trusted Car Dealership",
              description:
                "Our stress-free finance department can find financial solutions to save you money.",
            },
            {
              icon: "💰",
              title: "Transparent Pricing",
              description:
                "Our stress-free finance department can find financial solutions to save you money.",
            },
            {
              icon: "🚗",
              title: "Expert Car Service",
              description:
                "Our stress-free finance department can find financial solutions to save you money.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-md"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto text-center m-4">
        {/* Section Title */}
        <h4 className="text-gray-500 text-sm uppercase tracking-wide">
          How it Works
        </h4>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
          Follow 3 easy steps
        </h2>

        {/* Steps Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-0">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-600 text-white p-4 rounded-lg">
              <FiSearch size={32} />
            </div>
            <h3 className="font-semibold text-lg mt-4">Search for a car</h3>
            <p className="text-gray-600 text-sm mt-2">
              Know your purchase: Tools to calculate budget, financing, and
              more.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-600 text-white p-4 rounded-lg">
              <FiCalendar size={32} />
            </div>
            <h3 className="font-semibold text-lg mt-4">Select pick-up date</h3>
            <p className="text-gray-600 text-sm mt-2">
              Know before you buy: Honest reviews, rankings, and video test
              drives.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-600 text-white p-4 rounded-lg">
              <FiCheck size={32} />
            </div>
            <h3 className="font-semibold text-lg mt-4">Book your car</h3>
            <p className="text-gray-600 text-sm mt-2">
              Know your offer: Deal ratings on new and used listings near you.
            </p>
          </div>
        </div>
      </div>

      <div>
        <LuxuryCarRental />
      </div>

      {/* Our Services Section */}
      <div className="py-12 px-6  mx-auto bg-blue-100 ">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Our Services
        </h2>

        {/* Service List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            {
              title: "Car Rentals",
              description: "Find the perfect rental car for your journey.",
              icon: "🚗",
            },
            {
              title: "Luxury Cars",
              description: "Drive in style with our premium selection.",
              icon: "🌟",
            },
            {
              title: "24/7 Support",
              description: "We're here to assist you anytime, anywhere.",
              icon: "📞",
            },
            {
              title: "Easy Booking",
              description: "Quick and hassle-free car rental process.",
              icon: "✅",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <span className="text-4xl">{service.icon}</span>
              <h3 className="text-lg font-semibold mt-4">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div
      className="relative w-full h-24 md:h-32 bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bg1})`, // Replace with actual path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-orange-700 opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-sm md:text-lg font-semibold">
          Open a business account and receive $100 off your first invoice!
        </h2>
        <p className="text-xs md:text-sm">
          *To qualify as a business account and receive $100 off, the invoice must be over $1000.
        </p>
      </div>

      {/* Button */}
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 border border-white px-4 py-1 md:px-6 md:py-2 rounded-md hover:bg-white hover:text-orange-700 transition">
        Join Now
      </button>
    </div>
    </div>
  );
};

export default Homepage;
