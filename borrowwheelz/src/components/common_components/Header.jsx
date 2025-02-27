import React from 'react';
import logo from "../../assets/images/logo.jpeg"
import { MdOutlineTwoWheeler } from "react-icons/md";

const Header = () => {
  return (
    <div className="bg-gray-800 text-white py-3 nav1">
      <div className="container-fluid d-flex justify-content-between align-items-center ">
        
        {/* Logo and Title */}
        
        <a href="/" className="fs-2 fw-bold text-uppercase tracking-wide m-0 hover:text-orange-500">
          BORROW WHEELZ
        </a>

        {/* Navbar */}
        <nav>
        <ul className="flex space-x-6 mr-5">
        <li><a href="/" className="hover:text-orange-500 head">Home</a></li>
        <li><a href="#" className="hover:text-orange-500 head">Cars</a></li>
        <li><a href="#" className="hover:text-orange-500 head">Services</a></li>
        <li><a href="/contact-us" className="hover:text-orange-500 head">Contact</a></li>
      </ul>
        </nav>

      </div>
    </div>
  );
};

export default Header;
