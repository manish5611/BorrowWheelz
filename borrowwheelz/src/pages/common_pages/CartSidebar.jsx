import React from "react";
import { FaTimes } from "react-icons/fa";

const CartSidebar = ({ isOpen, onClose }) => {
  // Dummy cart data
  const dummyCartItems = [
    {
      id: 1,
      name: "Tesla Model 3",
      price: 3500,
      image: "https://via.placeholder.com/100x60", // Replace with actual image URLs
      qty: 1,
    },
    {
      id: 2,
      name: "Hyundai i20",
      price: 1800,
      image: "https://via.placeholder.com/100x60",
      qty: 2,
    },
  ];

  const totalPrice = dummyCartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <>
      {/* Slide-in Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
          {dummyCartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-14 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                <p className="text-blue-600 font-medium">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Footer */}
        <div className="p-4 border-t flex justify-between items-center bg-gray-100">
          <span className="font-bold text-sm">Total:</span>
          <span className="text-lg font-semibold text-blue-600">
            ₹{totalPrice}
          </span>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm"
            onClick={() => alert("Proceeding to checkout...")} // Placeholder action for checkout
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
