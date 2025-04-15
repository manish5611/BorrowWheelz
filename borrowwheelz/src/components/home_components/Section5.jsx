import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

// Reusable component for a product grid section
const ProductSection = ({ title, endpoint }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/products/section/${endpoint}`);
      setProducts(res.data);
    } catch (error) {
      console.error(`Error fetching products for ${endpoint}:`, error);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return ""; // fallback
    return image.startsWith("http") ? image : `http://localhost:3001/${image.replace(/\\/g, "/")}`;
  };

  return (
    <div className="mb-12">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No products found in {title}.</p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 relative"
            >
              {/* Discount Badge */}
              {product.discountPercent > 0 && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discountPercent}%
                </span>
              )}

              {/* Product Image */}
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-36 object-contain mb-4"
              />

              {/* Rating */}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${
                      i < (product.rating || 0) ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Name */}
              <h4 className="text-sm font-semibold truncate mb-1">
                {product.name}
              </h4>

              {/* Price */}
              <div className="text-sm font-bold text-blue-600">
                ₹{product.price}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Parent section that renders all product blocks
const Section5 = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <ProductSection title="Latest Products" endpoint="latest_products" />
      <ProductSection title="Top Sellers" endpoint="top_sellers" />
      <ProductSection title="Recent Purchases" endpoint="recent_purchase" />
      <ProductSection title="Featured" endpoint="featured" />
    </div>
  );
};

export default Section5;
