import React, { useState, useEffect } from "react";
import CarRentalCollection from "../../pages/car_pages/CarRentalCollection";
import CarRentalAdvantages from "../car_pages/CarRentalAdvantages";
import CarRentalShowcase from "../car_pages/CarRentalShowcase";
import CarRentalGallery from "../car_pages/CarRentalGallery";
import CarRentalHero from "../car_pages/CarRentalHero";
import CarRentalTestimonials from "../car_pages/CarRentalTestimonials";
import CarRentalFeature from "../car_pages/CarRentalFeature";
import carfoot from "../../assets/images/car_foot.jfif"

const images = ["/images/car_front.jpg", "/images/suv_car.jfif", "/images/bmw.jpg", "/images/porsche.jpg"];

const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Images */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rent Cars <br /> with the Experts
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Starting With ₹1000 per Day <br /> Rent | Drive
          </p>
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
            VISIT SHOWROOM →
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white scale-125" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-[#14161B] text-white py-16 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between">
        <div className="items-center space-x-4">
          <div className="border border-gray-600 p-6 rounded-md d-flex">
            <h2 className="text-8xl font-bold text-yellow-500 font-serif">10</h2>
            <p className="text-gray-400 text-sm d-flex mx-2 pt-4 font-medium">
              Years <br /> of reliable <br /> car rentals
            </p>
          </div>
        </div>

        <div className="text-center md:text-left max-w-lg">
          <h3 className="text-yellow-400 uppercase text-sm tracking-wider mb-2 fs-4 font-semibold font-serif">
            About Us
          </h3>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4 font-sans">
            Affordable & Reliable <br /> Car Rental Services
          </h2>
          <p className="text-gray-400 font-sans">
            We offer the best car and bike rental services with a hassle-free
            experience. Whether you're looking for a short-term ride or a
            long-term rental, our fleet has a wide range of vehicles to suit
            your needs. Book your ride today and travel with ease!
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <button className="px-6 py-3 bg-gray-700 text-white font-medium rounded-full flex items-center space-x-2 hover:bg-gray-600 transition">
            <span>Learn More</span>
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>

      <CarRentalCollection />
      <CarRentalAdvantages />
      <CarRentalShowcase />
      <hr />
      <CarRentalGallery />
      <CarRentalHero />
      <hr />
      <CarRentalTestimonials />
      <CarRentalFeature />

      {/* Footer Banner */}
      <div
        className="relative mt-5 bg-cover bg-center h-72 flex items-center pt-4 justify-center text-center text-white"
        style={{
          backgroundImage: `url(${carfoot})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 px-6">
          <p className="text-yellow-500 text-sm tracking-widest uppercase">
            Premium Car Rentals
          </p>
          <h1 className="text-3xl font-bold mt-2">
            Drive the Car You Always Dreamed Of
          </h1>

          <button className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-400 transition">
            Rent a Car Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
