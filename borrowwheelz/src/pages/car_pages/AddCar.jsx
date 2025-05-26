import globalBackendRoute from "../../config/Config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModernTextInput from "../../components/common_components/MordernTextInput";

export default function AddCar() {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    car_name: "",
    slug: "",
    description: "",
    rental_price_per_day: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    fuel_type: "",
    transmission: "",
    mileage: "",
    seating_capacity: "",
    tags: "",
    vendor: "",
    sub_category: "",
    category: "",
  });
  const [carImage, setCarImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [subcategoriesAll, setSubcategoriesAll] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const venRes = await axios.get(`${globalBackendRoute}/api/all-vendors`);
        setVendors(venRes.data);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-categories`);
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-subcategories`);
        setSubcategoriesAll(res.data);
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      }
    };
    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (carData.category) {
      const filtered = subcategoriesAll.filter(
        (sub) =>
          String(sub.category?._id || sub.category) === String(carData.category)
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [carData.category, subcategoriesAll]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "car_name") {
      const trimmed = value.trimStart();
      setCarData({ ...carData, [name]: trimmed });
    } else {
      setCarData({ ...carData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carData.car_name?.trim()) {
      setMessage("Car name is required.");
      return;
    }

    if (!carData.rental_price_per_day || isNaN(carData.rental_price_per_day)) {
      setMessage("Rental price per day is required and must be a valid number.");
      return;
    }

    if (!carData.vendor) {
      setMessage("Vendor is required.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(carData).forEach(([key, val]) => {
        formData.append(key, val);
      });

      if (carImage) formData.append("car_image", carImage);
      galleryImages.forEach((file) =>
        formData.append("all_car_images", file)
      );

      const res = await axios.post(
        `${globalBackendRoute}/api/add-car`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 201) {
        alert("Car added successfully!");
        navigate("/all-added-cars");
      } else {
        throw new Error("Car not created");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to add car. Try again.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Add New Car</h2>
      {message && <p className="text-red-500 text-center">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <ModernTextInput
          label="Car Name *"
          name="car_name"
          placeholder="Enter car name"
          value={carData.car_name}
          onChange={handleChange}
        />

        <ModernTextInput
          label="Description *"
          name="description"
          placeholder="Enter full description of the car"
          value={carData.description}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Slug (URL-friendly) *"
          name="slug"
          placeholder="example-car-slug"
          value={carData.slug}
          onChange={handleChange}
        />

        <ModernTextInput
          label="Rental Price Per Day *"
          name="rental_price_per_day"
          type="number"
          placeholder="Enter rental price per day"
          value={carData.rental_price_per_day}
          onChange={handleChange}
        />

        <ModernTextInput
          label="Brand *"
          name="brand"
          placeholder="e.g., Toyota, Honda"
          value={carData.brand}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Model *"
          name="model"
          placeholder="e.g., Corolla, Civic"
          value={carData.model}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Year *"
          name="year"
          type="number"
          placeholder="Enter manufacturing year"
          value={carData.year}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Color"
          name="color"
          placeholder="e.g., Black, Red, Silver"
          value={carData.color}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Fuel Type *"
          name="fuel_type"
          placeholder="e.g., Petrol, Diesel"
          value={carData.fuel_type}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Transmission *"
          name="transmission"
          placeholder="e.g., Manual, Automatic"
          value={carData.transmission}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Mileage (km) *"
          name="mileage"
          type="number"
          placeholder="Enter mileage"
          value={carData.mileage}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Seating Capacity *"
          name="seating_capacity"
          type="number"
          placeholder="Enter seating capacity"
          value={carData.seating_capacity}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Tags (comma separated)"
          name="tags"
          placeholder="e.g., new, trending, top deals"
          value={carData.tags}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Vendor *
          </label>
          <select
            name="vendor"
            value={carData.vendor}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Vendor --</option>
            {vendors.map((ven) => (
              <option key={ven._id} value={ven._id}>
                {ven.vendor_name || ven.name || ven.email || `Vendor ${ven._id}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Category
          </label>
          <select
            name="category"
            value={carData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Subcategory
          </label>
          <select
            name="sub_category"
            value={carData.sub_category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Subcategory --</option>
            {filteredSubcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.subcategory_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Car Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCarImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gallery Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryImages([...e.target.files])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:opacity-90"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}
