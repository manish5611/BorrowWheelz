import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const BrandCarsPage = () => {
  const { brandId } = useParams(); // Get brandId from the URL
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cars for the selected brand
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/cars/brand/${brandId}`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [brandId]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Cars under {location.state?.brandName || "Selected Brand"}
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="flex flex-col items-start bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={car.image || "/placeholder.png"}
                alt={car.name}
                className="w-full h-32 object-cover mb-3 rounded-md"
              />
              <h4 className="text-lg font-bold text-gray-800">{car.name}</h4>
              <p className="text-sm text-gray-600">Location: {car.location}</p>
              <p className="text-sm text-gray-600">Price: ₹{car.pricePerDay}/day</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BrandCarsPage;