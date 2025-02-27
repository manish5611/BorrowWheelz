import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-3 shadow w-100  left-0 px-4">
      <div className="container d-flex justify-content-evenly text-center flex-wrap">
        
        {/* Column 1 */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white fw-bold" href="#">About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Our Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Testimonials</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted disabled" aria-disabled="true">Careers</a>
          </li>
        </ul>

        {/* Column 2 */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white fw-bold" href="#">Support</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">FAQs</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Help Center</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Contact Us</a>
          </li>
        </ul>

        {/* Column 3 */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white fw-bold" href="#">Quick Links</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Rent a Car</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Bike Rentals</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Offers</a>
          </li>
        </ul>

        {/* Column 4 */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link text-white fw-bold" href="#">Follow Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Facebook</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Instagram</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Twitter</a>
          </li>
        </ul>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-3 border-top pt-3 ">
        <p className="m-0 ">&copy; {new Date().getFullYear()} Borrow Wheelz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
