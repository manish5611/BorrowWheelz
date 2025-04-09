import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendGlobalRoute from "../../config/config";

export default function AddCar() {
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState([]);
  const [location, setLocation] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [seats, setSeats] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [availability, setAvailability] = useState(true); // default to true
  const [features, setFeatures] = useState("");
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${backendGlobalRoute}/api/brands`);
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAllImagesChange = (e) => {
    setAllImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brandId", brandId);
    formData.append("location", location);
    formData.append("pricePerDay", pricePerDay);
    formData.append("seats", seats);
    formData.append("fuelType", fuelType);
    formData.append("transmission", transmission);
    formData.append("availability", availability);
    formData.append("features", features);
    if (image) formData.append("image", image);
    if (allImages && allImages.length > 0) {
      allImages.forEach((file) => formData.append("allImages", file));
    }

    try {
      const response = await axios.post(
        `${backendGlobalRoute}/api/add-car`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Car added successfully!");
      alert("New Car added successfully.");
      navigate("/admin/allcars"); // optional redirection
    } catch (error) {
      console.error("Error adding the Car!", error);
      setMessage("Error adding Car. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Car</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Car Name */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Car Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Brand Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Brand</label>
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Price Per Day */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Price Per Day</label>
          <input
            type="number"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Seats */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Seats</label>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Fuel Type */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Fuel Type</label>
          <input
            type="text"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Transmission */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Transmission</label>
          <input
            type="text"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Availability Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value === "true")}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        {/* Features */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Features (comma-separated)
          </label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Featured Image */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Additional Images */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Additional Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAllImagesChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}
