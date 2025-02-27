import React, { useState, useEffect } from "react";
import car1 from "../../assets/images/car1.png";
import car2 from "../../assets/images/car2.png";
import car3 from "../../assets/images/car3.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaCar, FaMapMarkerAlt, FaTruckMoving } from "react-icons/fa";

const slides = [
  { location: "Lincoln MKS Sedan", price: "$25 / Day", car: car1 },
  { location: "BMW X5", price: "$45 / Day", car: car2 },
  { location: "Audi A6", price: "$50 / Day", car: car3 },
];

const specials = [
  { name: "Range Rover Velar", price: "$1,500 / Mo", type: "SUV", image: car1 },
  { name: "Mercedes C Class", price: "$1,400 / Mo", type: "Luxury", image: car2 },
  { name: "Toyota Highlander", price: "$1,300 / Mo", type: "SUV", image: car3 },
];

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between items-center px-10 py-5 transition-all duration-300 z-50
          ${isScrolled ? "bg-gray-900 shadow-md" : "bg-transparent backdrop-blur-md"} text-white`}
      >
        <a href="/" className="text-green-400 text-2xl font-bold">Borrow Wheelz</a>
        <div className="space-x-6">
          <a href="#" className="hover:text-green-400 transition">Home</a>
          <a href="#" className="hover:text-green-400 transition">Cars</a>
          <a href="#" className="hover:text-green-400 transition">Our Services</a>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition">
          Contact Us
        </button>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-20 mt-20">
        <h2 className="text-5xl font-bold">Rent the best cars</h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-400">
          We want you to have a stress-free rental experience, so we make it easy to hire a car by providing simple search tools, customer reviews, and plenty of pick-up locations across the city.
        </p>
      </div>

      {/* Car Image Section */}
      <div className="relative w-full max-w-5xl mt-5 overflow-hidden">
        <div className="relative w-full flex justify-center">
          <img
            src={slides[currentSlide].car}
            alt="Car Rental"
            className="w-full max-w-3xl object-cover"
          />
        </div>

        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10"
          onClick={prevSlide}
        >
          <FaArrowLeft className="text-white text-xl" />
        </button>

        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition z-10"
          onClick={nextSlide}
        >
          <FaArrowRight className="text-white text-xl" />
        </button>
      </div>

      {/* Open Catalog Button */}
      <button className="mt-6 bg-green-400 text-black px-6 py-3 rounded hover:bg-green-500 transition">Open Catalog</button>

      {/* Search Section */}
      <div className="bg-gray-800 text-white w-full mt-10 py-6 px-6 rounded-lg max-w-5xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <input type="text" placeholder="Choose a location" className="p-3 rounded text-black w-full" />
          <input type="date" className="p-3 rounded text-black w-full" />
          <input type="date" className="p-3 rounded text-black w-full" />
          <button className="bg-green-400 py-3 px-6 rounded hover:bg-green-500 transition w-full">Search</button>
        </div>
      </div>

      {/* Today's Specials Section */}
      <div className="mt-16 w-full max-w-6xl text-center">
        <h2 className="text-3xl font-bold">TODAY'S SPECIALS</h2>

        {/* Filter Options */}
        <div className="flex justify-center space-x-6 mt-6 text-gray-400">
          <button className="hover:text-white transition">SUV</button>
          <button className="hover:text-white transition">Luxury</button>
          <button className="hover:text-white transition">Sportscar</button>
          <button className="border border-gray-500 px-4 py-1 rounded hover:bg-gray-800 transition">
            View All Cars
          </button>
        </div>

        {/* Cars List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {specials.map((car, index) => (
            <div key={index} className="bg-gray-800 p-5 rounded-lg text-center">
              <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="mt-4 text-xl font-semibold">{car.name}</h3>
              <p className="text-gray-400">{car.type}</p>
              <p className="text-yellow-400 mt-2">{car.price}</p>
              <button className="mt-4 text-yellow-500 hover:text-yellow-300 transition">
                DRIVE NOW →
              </button>
            </div>
          ))}
        </div>
      </div>
      <section className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Car Image */}
        <div>
          <img src="" alt="Luxury Car" className="w-full rounded-lg" />
        </div>

        {/* Right Side - Luxury Branding */}
        <div className="relative flex items-center">
          <div className="absolute top-0 left-0 bg-yellow-500 px-4 py-2 text-black font-semibold">
            BOYSTOYS MIAMI
          </div>
          <div className="mt-10">
            <h2 className="text-3xl font-bold">LUXURY CAR RENTAL MIAMI</h2>
            <p className="text-gray-400 mt-4">
              Are you looking for exotic or luxury car rentals in Miami?
              <br />
              We make it easy to hire high-end vehicles with top-rated service.
              <br />
              Ride with confidence in our premium fleet.
            </p>

            {/* Service Icons */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center">
                <FaCar className="text-yellow-500 text-3xl" />
                <p className="text-gray-300 mt-2 text-sm">Mileage Unlimited</p>
              </div>
              <div className="flex flex-col items-center">
                <FaMapMarkerAlt className="text-yellow-500 text-3xl" />
                <p className="text-gray-300 mt-2 text-sm">Pick-Up Service</p>
              </div>
              <div className="flex flex-col items-center">
                <FaTruckMoving className="text-yellow-500 text-3xl" />
                <p className="text-gray-300 mt-2 text-sm">Delivery to Door</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Car Interior Image */}
      <div className="max-w-6xl mx-auto mt-8">
        <img src="" alt="Luxury Car Interior" className="w-full rounded-lg" />
      </div>
    </section>
    </div>
  );
};

export default Homepage;
