import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 mt-10">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 - About */}
        <div>
          <h4 className="text-lg font-bold text-lime-600 mb-4">About Us</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            We’re your trusted rental and accessories hub. From cars to event essentials — we’ve got it all.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-lime-600 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-lime-600 transition">Home</a></li>
            <li><a href="/products" className="hover:text-lime-600 transition">Products</a></li>
            <li><a href="/rentals" className="hover:text-lime-600 transition">Rentals</a></li>
            <li><a href="/contact" className="hover:text-lime-600 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div>
          <h4 className="text-lg font-bold text-lime-600 mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-lime-600 transition">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-lime-600 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-lime-600 transition">Terms & Conditions</a></li>
            <li><a href="/help" className="hover:text-lime-600 transition">Help Center</a></li>
          </ul>
        </div>

        {/* Column 4 - Social & Contact */}
        <div>
          <h4 className="text-lg font-bold text-lime-600 mb-4">Connect With Us</h4>
          <div className="flex space-x-4 text-xl text-gray-500">
            <a href="#"><FaFacebook className="hover:text-lime-600 transition" /></a>
            <a href="#"><FaTwitter className="hover:text-lime-600 transition" /></a>
            <a href="#"><FaInstagram className="hover:text-lime-600 transition" /></a>
            <a href="#"><FaLinkedin className="hover:text-lime-600 transition" /></a>
          </div>
          <p className="text-sm mt-4">Email: support@yourdomain.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-lime-600 text-white text-center text-sm py-3">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
