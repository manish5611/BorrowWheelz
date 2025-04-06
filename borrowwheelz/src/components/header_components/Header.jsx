import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white ">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-wide">
          <span className="text-black">BORROW</span>
          <span className="text-green-600">WHEELZ</span>
        </a>

        {/* Navigation Links (Centered) */}
        <nav className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-8 text-gray-600">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium ${isActive ? "text-black" : "hover:text-black"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vehicles"
                className={({ isActive }) =>
                  `${isActive ? "text-black font-medium" : "hover:text-black"}`
                }
              >
                Vehicles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `${isActive ? "text-black font-medium" : "hover:text-black"}`
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  `${isActive ? "text-black font-medium" : "hover:text-black"}`
                }
              >
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Profile Icon (Right) */}
        <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0  w-32 bg-white border rounded-lg shadow-lg">
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Login
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
