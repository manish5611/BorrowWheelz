import React from "react";
import { FaStar } from "react-icons/fa";
import wax from "../../assets/images/wax.png";
import helmet from "../../assets/images/helmet.png";

const Section6 = () => {
  const flashSales = [
    {
      name: "Premium Car Wax",
      price: 799,
      originalPrice: 999,
      image: wax,
      discountPercent: 20,
      endsIn: "01:12:45",
    },
    {
      name: "Helmet Bluetooth Kit",
      price: 1199,
      originalPrice: 1499,
      image: helmet,
      discountPercent: 25,
      endsIn: "03:50:21",
    },
  ];

  const customerReviews = [
    {
      name: "Rahul M.",
      rating: 5,
      comment: "Loved the product quality and delivery speed!",
    },
    {
      name: "Sneha R.",
      rating: 4,
      comment: "Really helpful customer support. Will shop again!",
    },
    {
      name: "Aditya K.",
      rating: 5,
      comment: "Best car rental experience ever.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Flash Sale Section */}
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">⏰ Flash Sale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
        {flashSales.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border shadow-md hover:shadow-xl transition duration-300 p-4 relative"
          >
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              -{item.discountPercent}%
            </span>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-contain mb-4"
            />
            <h4 className="text-md font-semibold text-gray-800 mb-1">{item.name}</h4>
            <div className="text-sm flex items-center gap-2">
              <span className="text-gray-400 line-through">₹{item.originalPrice}</span>
              <span className="text-blue-600 font-bold text-base">₹{item.price}</span>
            </div>
            <p className="text-xs text-red-500 mt-2 font-medium">
              Ends in: <span className="font-semibold">{item.endsIn}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Customer Reviews Section */}
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">💬 What Our Customers Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {customerReviews.map((review, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 text-sm mb-3 italic">"{review.comment}"</p>
            <p className="text-sm font-semibold text-gray-600">— {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section6;
