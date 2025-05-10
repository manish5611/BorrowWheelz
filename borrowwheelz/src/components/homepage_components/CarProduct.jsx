import React, { useEffect, useState } from "react";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const CarProducts = () => {
  const [carProducts, setCarProducts] = useState([]);

  useEffect(() => {
    const fetchCarProducts = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-products`);
        const filteredProducts = res.data.filter(
          (product) =>
            product.category?.category_name?.toLowerCase() === "products" &&
            product.subcategory?.subcategory_name?.toLowerCase() === "car essentials"
        );
        setCarProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching car products:", error.message);
      }
    };
    fetchCarProducts();
  }, []);

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/products/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Car Accessories & Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {carProducts.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No car products available.
          </p>
        ) : (
          carProducts.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={getImageUrl(product.product_image)}
                alt={product.product_name}
                className="h-28 mx-auto mb-3 object-contain"
              />
              <h3 className="font-medium text-gray-800">{product.product_name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                ₹{product.selling_price}
              </p>
              <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarProducts;
