import { useState } from "react";
import { FaSearch, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";


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
      "Find New Cars",
      "New Launches",
      "Find Dealer",
      "Videos",
      "Upcoming Cars",
      "Electric Cars",
      "Images",
      "Popular Brands",
    ],
    used: [
      "Find Used Cars",
      "Certified Cars",
      "Sell Your Car",
      "Used Car Loan",
      "Compare Used Cars",
      "Used Car Dealers",
      "Car Valuation",
      "Customer Reviews",
    ],
    reviews: [
      "Expert Reviews",
      "User Reviews",
      "Car Comparisons",
      "News & Updates",
      "Tips & Advice",
      "Car Maintenance",
      "Upcoming Car Reviews",
      "Trending in Auto World",
    ],
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-900 flex items-center">
          <span className="text-orange-500 mr-1">&#9632;</span> BorrowWheelz
        </a>

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
                <div className="absolute left-1/2 transform -translate-x-1/2  w-[750px] bg-white shadow-lg p-4 grid grid-cols-2 gap-3 border rounded-md z-50">
                  {dropdownOptions[section].map((option, index) => (
                    <p key={index} className="hover:text-blue-500 cursor-pointer whitespace-nowrap">
                      {option}
                    </p>
                  ))}
                  {section === "new" && (
                    <div className="col-span-2 flex items-center mt-4 border-t pt-4">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="New Car"
                        className="w-20 h-14 rounded-md mr-4"
                      />
                      <div>
                        <p className="text-sm font-semibold">Volvo XC90</p>
                        <p className="text-blue-500 text-xs cursor-pointer">Know More</p>
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
