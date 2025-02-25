import React from 'react';
import logo from "../../assets/images/logo.jpeg"
import { MdOutlineTwoWheeler } from "react-icons/md";

const Header = () => {
  return (
    <header className="bg-dark text-white py-3 shadow w-100 position-absolute top-0 start-0 px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        
        {/* Logo and Title */}
        <MdOutlineTwoWheeler className='w-10 h-10'/> 
        <h1 className="fs-2 fw-bold text-uppercase tracking-wide m-0">
          <span className="text-primary">Borrow </span>
          <span className="text-light">Wheel<span className="text-danger">Z</span></span>
        </h1>

        {/* Navbar */}
        <nav>
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/contact-us">Contact Us</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/login">Login</a></li>
                <li><a className="dropdown-item" href="#">Sign Up</a></li>
              
              </ul>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
};

export default Header;
