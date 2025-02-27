import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-10 py-5 transition-all duration-300 
        ${isScrolled ? "bg-gray-800 shadow-md" : "bg-transparent backdrop-blur-md"} text-white`}
    >
      {/* Logo */}
      <h1 className="text-green-400 text-2xl font-bold">Borrow Wheelz</h1>

      {/* Navigation Links */}
      <div className="space-x-6">
        <a href="#" className="hover:text-green-400 transition">Home</a>
        <a href="#" className="hover:text-green-400 transition">Cars</a>
        <a href="#" className="hover:text-green-400 transition">Our Services</a>
      </div>

      {/* Contact Button */}
      <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition">
        Contact Us
      </button>
    </nav>
  );
};

export default Header;
