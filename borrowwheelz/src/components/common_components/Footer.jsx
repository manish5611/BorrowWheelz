import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-2xl font-bold text-blue-400 hover:underline">
            BorrowWheelz
          </Link>
          <p className="text-gray-400 mt-2">
            Your trusted platform for renting and selling cars.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cars" className="text-gray-400 hover:text-blue-400">
                Cars
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Contact Us</h3>
          <p className="mt-4 text-gray-400">Email: Borrowwheelz@gmail.com</p>
          <p className="text-gray-400">Phone: 9611752722</p>
          <p className="text-gray-400">Location: 1st Main Road, Bagalgunte, Bangalore - 73</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © 2025 CarRent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
