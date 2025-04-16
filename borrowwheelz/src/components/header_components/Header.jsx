import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import CartSidebar from '../../pages/common_pages/CartSidebar'; // Ensure path is correct
import WishlistSidebar from '../../pages/common_pages/WishlistSidebar';// Ensure path is correct

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart toggle state
  const [isWishlistOpen, setIsWishlistOpen] = useState(false); // Wishlist toggle state

  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#264653]">
            Borrow<span className="text-[#58ff58]">Wheelz</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover:text-[#264653] pb-1 ${currentPath === item.path ? 'border-b-2 border-[#264653]' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-[#264653] text-lg relative">
            <FaSearch className="cursor-pointer" />
            {/* 🧡 Wishlist Icon with onClick (Triggers the wishlist sidebar) */}
            <FaHeart className="cursor-pointer" onClick={() => setIsWishlistOpen(true)} />
            {/* 🛒 Cart Icon with onClick (Triggers the cart sidebar) */}
            <FaShoppingCart className="cursor-pointer" onClick={() => setIsCartOpen(true)} />

            {/* User Profile Section */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {user ? (
                <div className="font-medium">{user.username}</div>
              ) : (
                <FaUser />
              )}

              {/* Dropdowns */}
              {!user && dropdownOpen && (
                <div className="absolute top-4 right-0 bg-white border shadow-md rounded-md w-32 text-sm text-gray-700 z-10">
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                  <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">Register</Link>
                </div>
              )}

              {user && dropdownOpen && (
                <div className="absolute top-8 right-0 bg-white border shadow-md rounded-md w-32 text-sm text-gray-700 z-10">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <button
                    onClick={() => setUser(null)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 👇 Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* 👇 Wishlist Sidebar */}
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
};

export default Header;
