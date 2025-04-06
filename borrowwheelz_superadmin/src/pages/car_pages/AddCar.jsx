import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendGlobalRoute from "../../config/config";

export default function AddCar() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [seats, setSeats] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [availability, setAvailability] = useState("");
  const [features, setFeatures] = useState("");
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

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
    formData.append("brand", brand);
    formData.append("location", location);
    formData.append("pricePerDay", pricePerDay);
    formData.append("seats", seats);
    formData.append("fuelType", fuelType);
    formData.append("transmission", transmission);
    formData.append("availability", availability);
    formData.append("features", features);
    if (image) {
      formData.append("image", image);
    }
    if (allImages && allImages.length > 0) {
      allImages.forEach((file) => formData.append("allImages", file));
    }

    try {
      const response = await axios.post(
        `${backendGlobalRoute}/api/add-car`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Car added successfully!");
      setName("");
      setBrand("");
      setLocation("");
      setPricePerDay("");
      setSeats("");
      setFuelType("");
      setTransmission("");
      setAvailability("");
      setFeatures("");
      setImage(null);
      setAllImages([]);
      alert("New Car added successfully.");
    } catch (error) {
      console.error("There was an error adding the Car!", error);
      setMessage("Error adding Car. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Car</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {[
          { label: "Name", value: name, setter: setName, type: "text" },
          { label: "Brand", value: brand, setter: setBrand, type: "text" },
          { label: "Location", value: location, setter: setLocation, type: "text" },
          { label: "Price Per Day", value: pricePerDay, setter: setPricePerDay, type: "number" },
          { label: "Seats", value: seats, setter: setSeats, type: "number" },
          { label: "Fuel Type", value: fuelType, setter: setFuelType, type: "text" },
          { label: "Transmission", value: transmission, setter: setTransmission, type: "text" },
          { label: "Availability", value: availability, setter: setAvailability, type: "text" },
          { label: "Features (comma-separated)", value: features, setter: setFeatures, type: "text" },
        ].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.label}
            >
              {field.label}
            </label>
            <input
              id={field.label}
              type={field.type}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              required={field.label !== "Features (comma-separated)"}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Featured Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="allImages"
          >
            Additional Images
          </label>
          <input
            id="allImages"
            type="file"
            multiple
            accept="image/*"
            onChange={handleAllImagesChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

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
