import React, { useState } from "react";
import axios from "axios";
import backendGlobalRoute from "../../config/config";

export default function AddBrand() {
  const [brandName, setBrandName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand_name", brandName);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${backendGlobalRoute}/api/add-brand`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Brand added successfully!");
      setBrandName("");
      setImage(null);
      alert("Brand added successfully!");
    } catch (error) {
      console.error("Error adding brand:", error);
      setMessage("Error adding brand. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Brand</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brandName">
            Brand Name
          </label>
          <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brandImage">
            Brand Image
          </label>
          <input
            id="brandImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Add Brand
          </button>
        </div>
      </form>
    </div>
  );
}
