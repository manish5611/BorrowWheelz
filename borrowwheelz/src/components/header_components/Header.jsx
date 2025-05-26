import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, User, Heart } from "lucide-react";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import rent from "../../assets/images/rent.png";
import premium from "../../assets/images/premium.png";
import car from "../../assets/images/car.png";
import "../../styles/carousel.css";
import LocationContext from "../extra_component/LocationContext"; // Ensure this path is correct
import { useLocation } from "../../context/LocationContext";
import { AuthContext } from "../auth_components/AuthManager";
import globalBackendRoute from "../../config/Config";

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const { selectedLocation, setSelectedLocation } = useLocation();
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setAllCars(res.data);
      } catch (err) {
        console.error("Failed to fetch cars:", err.message);
      }
    };

    fetchCars();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults(allCars.slice(0, 4)); // Show initial suggestions
      return;
    }

    const filteredCars = allCars
      .filter((car) =>
        car.car_name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 4); // Limit to 4 results
    setSearchResults(filteredCars);
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
    setSearchResults(allCars.slice(0, 4)); // Show initial suggestions
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200); // Delay to allow click on suggestions
  };

  const handleLocationSelect = (city) => {
    setSelectedLocation(city); // Update the shared location state
    setShowLocationPopup(false); // Close the popup
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-2 shadow-sm border-b bg-white">
      <div className="flex items-center space-x-8">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img src={logo} alt="CarWale Logo" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span
              className="text-lg font-extrabold text-gray-800"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Borrow
            </span>
            <span
              className="text-sm text-gray-500 ml-5 mt-[-9px]"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Wheelz
            </span>
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
          
          <a href="/reviews" className="hover:text-blue-600 transition-colors">
            REVIEWS & NEWS
          </a>
        </nav>
      </div>

      <div className="flex items-center space-x-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search For Cars"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="pl-3 pr-10 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-60 bg-gray-50"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          {showSuggestions && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50">
              {searchResults.map((car) => (
                <div
                  key={car._id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/singlerent/${car.slug}`)}
                >
                  <img
                    src={`${globalBackendRoute}/${car.car_image}`}
                    alt={car.car_name}
                    className="h-10 w-10 object-cover rounded-full mr-3"
                  />
                  <span className="text-sm text-gray-700">{car.car_name}</span>
                </div>
              ))}
            </div>
          )}
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
        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
        <div className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <User
            className="h-5 w-5 text-gray-600 hover:text-blue-500 cursor-pointer transition-colors"
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-0 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
              {isLoggedIn ? (
                <div className="p-4 space-y-2">
                  <p className="text-sm">Hello, {user.name}</p>
                  <button
                    className="w-full text-left text-sm text-teal-600 hover:underline"
                    onClick={() => {
                      if (user.role === "superadmin") {
                        navigate(`/superadmin-dashboard`);
                      } else {
                        navigate(`/dashboard`);
                      }
                    }}
                  >
                    Dashboard
                  </button>
                  <button
                    className="w-full text-left text-sm text-red-600 hover:underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  <button
                    className="w-full text-left text-sm text-teal-600 hover:underline"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="w-full text-left text-sm text-blue-600 hover:underline"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
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
