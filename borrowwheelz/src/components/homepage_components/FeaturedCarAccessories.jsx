import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import globalBackendRoute from "../../config/Config";

const FeaturedCarAccessories = () => {
  const [accessories, setAccessories] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-products`);
        const filteredAccessories = res.data.filter(
          (product) =>
            product.category?.category_name?.toLowerCase() === "products" &&
            product.subcategory?.subcategory_name?.toLowerCase() === "car accessories"
        );
        setAccessories(filteredAccessories);
      } catch (error) {
        console.error("Error fetching car accessories:", error.message);
      }
    };
    fetchAccessories();
  }, []);

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/products/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 relative">
      <h2 className="text-2xl font-bold mb-6">Featured Car Accessories</h2>

      {/* Conditionally render arrows if more than 8 */}
      {accessories.length > 8 && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow p-2 hover:shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide"
      >
        {accessories.length === 0 ? (
          <p className="text-gray-500 text-center w-full">No car accessories available.</p>
        ) : (
          accessories.slice(0, 8).map((item, index) => (
            <div
              key={index}
              className="min-w-[200px] max-w-[200px] border rounded-lg p-4 bg-white text-center shadow hover:shadow-lg transition-shadow "
            >
              <img
                src={getImageUrl(item.product_image)}
                alt={item.product_name}
                className="h-28 w-full object-contain mb-3"
              />
              <h3 className="text-md font-medium text-gray-800">{item.product_name}</h3>
              <p className="text-sm text-gray-600 mb-2">₹{item.selling_price}</p>
              <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                Buy Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedCarAccessories;
