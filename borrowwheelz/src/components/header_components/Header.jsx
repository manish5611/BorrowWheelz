import React, { useEffect, useState } from "react";
import { Search, MapPin, User, Languages } from "lucide-react";
import logo from "../../assets/images/logo.png";
import rent from "../../assets/images/rent.png";
import premium from "../../assets/images/premium.png";
import car from "../../assets/images/car.png";
import "../../styles/carousel.css";
import LocationContext from "../extra_component/LocationContext"; // Ensure this path is correct
import { useLocation } from "../../context/LocationContext";

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const { selectedLocation, setSelectedLocation } = useLocation();

  const images = [rent, premium, car];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // remove animation class briefly
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setAnimate(true); // re-add animation class
      }, 50); // brief delay to reset animation
    }, 4000); // total cycle per image

    return () => clearInterval(interval);
  }, []);

  const handleLocationSelect = (city) => {
    setSelectedLocation(city); // Update the shared location state
    setShowLocationPopup(false); // Close the popup
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-2 shadow-sm border-b bg-white">
      <div className="flex items-center space-x-8">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img src={logo} alt="CarWale Logo" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Borrow</span>
            <span className="text-sm text-gray-500 ml-5 mt-[-9px]" style={{ fontFamily: 'Roboto, sans-serif' }}>Wheelz</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel-container">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex}`}
            className={`carousel-image ${animate ? "slide-bounce" : ""}`}
          />
        </div>

        <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
          <a href="/rent" className="hover:text-blue-600 transition-colors">
            RENT CARS
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            BUY OUR PRODUCTS
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            REVIEWS & NEWS
          </a>
        </nav>
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-3 pr-10 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-60 bg-gray-50"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        <div className="relative">
          <MapPin
            className="h-5 w-5 text-gray-600 hover:text-blue-500 cursor-pointer transition-colors"
            onClick={() => setShowLocationPopup(true)}
          />
          {selectedLocation && (
            <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></div>
          )}
        </div>
        <Languages className="h-5 w-5 text-gray-600 hover:text-blue-500 cursor-pointer transition-colors" />
        <User className="h-5 w-5 text-gray-600 hover:text-blue-500 cursor-pointer transition-colors" />
      </div>

      {/* Location Popup */}
      {showLocationPopup && (
        <LocationContext
          onClose={() => setShowLocationPopup(false)}
          onLocationSelect={handleLocationSelect}
        />
      )}
    </header>
  );
};

export default Header;
