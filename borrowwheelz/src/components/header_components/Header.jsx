import { useState } from "react";
import { FaSearch, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { Link } from "react-router-dom"; // Import for React Router
import car from "../../assets/images/car2.png"

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseEnter = (section) => {
    setOpenDropdown(section);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const dropdownOptions = {
    new: [
      { name: "Find New Cars", path: "/all-cars" },
      { name: "New Launches", path: "/new-launches" },
      { name: "Find Dealer", path: "/find-dealer" },
      { name: "Videos", path: "/videos" },
      { name: "Upcoming Cars", path: "/upcoming-cars" },
      { name: "Electric Cars", path: "/electric-cars" },
      { name: "Images", path: "/car-images" },
      { name: "Popular Brands", path: "/popular-brands" },
    ],
    used: [
      { name: "Find Used Cars", path: "/used-cars" },
      { name: "Certified Cars", path: "/certified-cars" },
      { name: "Sell Your Car", path: "/sell-car" },
      { name: "Used Car Loan", path: "/used-car-loan" },
      { name: "Compare Used Cars", path: "/compare-used-cars" },
      { name: "Used Car Dealers", path: "/used-car-dealers" },
      { name: "Car Valuation", path: "/car-valuation" },
      { name: "Customer Reviews", path: "/customer-reviews" },
    ],
    reviews: [
      { name: "About Us", path: "/about-us" },
      { name: "Contact Us", path: "/contact-us" },
      { name: "Car Comparisons", path: "/car-comparisons" },
      { name: "News & Updates", path: "/news-updates" },
      { name: "Tips & Advice", path: "/tips-advice" },
      { name: "Car Maintenance", path: "/car-maintenance" },
      { name: "Upcoming Car Reviews", path: "/upcoming-reviews" },
      { name: "Trending in Auto World", path: "/trending-auto" },
    ],
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-900 flex items-center">
          <span className="text-orange-500 mr-1">&#9632;</span> BorrowWheelz
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8 relative">
          {[
            { label: "RENT CARS", section: "new" },
            { label: "RENT BIKES", section: "used" },
            { label: "REVIEWS & NEWS", section: "reviews" },
          ].map(({ label, section }) => (
            <div
              key={section}
              className="relative"
              onMouseEnter={() => handleMouseEnter(section)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="font-semibold text-gray-700 hover:text-blue-500">
                {label}
              </button>
              {openDropdown === section && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-[750px] bg-white shadow-lg p-4 grid grid-cols-2 gap-3 border rounded-md z-50">
                  {dropdownOptions[section].map((option, index) => (
                    <Link
                      key={index}
                      to={option.path}
                      className="hover:text-blue-500 cursor-pointer whitespace-nowrap"
                    >
                      {option.name}
                    </Link>
                  ))}
                  {section === "new" && (
                    <div className="col-span-2 flex items-center mt-4 border-t pt-4">
                      <img
                        src={car}
                        alt="New Car"
                        className="w-20 h-14 rounded-md mr-4"
                      />
                      <div>
                        <p className="text-sm font-semibold">Volvo XC90</p>
                        <Link to="/volvo-xc90" className="text-blue-500 text-xs cursor-pointer">
                          Know More
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search Bar & Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute right-2 top-2 text-gray-500 cursor-pointer" />
          </div>
          <FaMapMarkerAlt className="text-gray-700 cursor-pointer" />
          <IoLanguage className="text-gray-700 cursor-pointer" />
          <FaUser className="text-gray-700 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
