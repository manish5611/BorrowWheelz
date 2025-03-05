import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import user icon

const Header = () => {
  return (
    <header className="bg-blue-100 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-800">
          Borrow<span className="text-black">Wheelz</span>
        </a>

        {/* Navigation - Centered */}
        <nav className="mx-auto">
          <ul className="flex space-x-8 font-bold">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/car-rent" className="text-gray-700 hover:text-blue-500">
                Cars
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-blue-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile Icon - Right */}
        <Link to="/account" className="text-gray-700 hover:text-blue-500">
          <FaUserCircle className="text-2xl" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
