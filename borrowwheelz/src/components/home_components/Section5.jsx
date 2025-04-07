import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const Section5 = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/products"); // Replace with your backend endpoint
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6">Latest Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 relative"
          >
            {/* Discount Badge */}
            {product.discount && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 object-contain mb-4"
            />

            {/* Rating */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < product.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Title */}
            <h4 className="text-sm font-medium mb-1">{product.name}</h4>

            {/* Price */}
            <div className="text-sm font-semibold">
              {product.originalPrice && (
                <span className="line-through text-gray-400 mr-2">
                  €{product.originalPrice}
                </span>
              )}
              <span>€{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section5;
