import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendGlobalRoute from "../../config/config";

export default function AddCar() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [modelYear, setModelYear] = useState("");  // Fixed field name
  const [location, setLocation] = useState("");
  const [rentalPricePerDay, setRentalPricePerDay] = useState(""); // Fixed field name
  const [availability, setAvailability] = useState(true);  // Fixed field name
  const [carImage, setCarImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle file input
  const handleImageChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("modelYear", modelYear); // Fixed field name
    formData.append("location", location);
    formData.append("rentalPricePerDay", rentalPricePerDay); // Fixed field name
    formData.append("availability", availability); // Fixed field name
    if (carImage) {
      formData.append("carImage", carImage);
    }

    try {
      await axios.post(`${backendGlobalRoute}/api/add-car`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Car added successfully!");
      
      // Reset the form
      setName("");
      setBrand("");
      setModelYear("");
      setLocation("");
      setRentalPricePerDay("");
      setAvailability(true);
      setCarImage(null);

      alert("New Car added successfully.");
    } catch (error) {
      console.error("Error adding car:", error);
      setMessage("Error adding car. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Car</h2>
      {message && <p className="text-green-500">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Car Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Model Year</label>
          <input type="number" value={modelYear} onChange={(e) => setModelYear(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rental Price Per Day</label>
          <input type="number" value={rentalPricePerDay} onChange={(e) => setRentalPricePerDay(e.target.value)} required className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input type="checkbox" checked={availability} onChange={(e) => setAvailability(e.target.checked)} className="mr-2" />
            Available
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Car Image</label>
          <input type="file" onChange={handleImageChange} className="w-full px-3 py-2 border rounded" />
        </div>

        <div className="mb-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Add Car</button>
        </div>
      </form>
    </div>
  );
}
