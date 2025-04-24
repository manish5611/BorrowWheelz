import React from 'react';
import { FaTimes } from 'react-icons/fa';

const WishlistSidebar = ({ isOpen, onClose }) => {
  // Dummy wishlist data
  const dummyWishlistItems = [
    {
      id: 1,
      name: "Tesla Model X",
      price: 5500,
      image: "https://via.placeholder.com/100x60", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "BMW X5",
      price: 5000,
      image: "https://via.placeholder.com/100x60",
    },
  ];

  return (
    <>
      {/* Slide-in Wishlist Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Wishlist</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-100px)]">
          {dummyWishlistItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-14 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-blue-600 font-medium">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Footer */}
        <div className="p-4 border-t flex justify-between items-center">
          <span className="font-bold">Total Value:</span>
          <span className="text-lg font-semibold text-blue-600">
            ₹
            {dummyWishlistItems.reduce((total, item) => total + item.price, 0)}
          </span>
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;
