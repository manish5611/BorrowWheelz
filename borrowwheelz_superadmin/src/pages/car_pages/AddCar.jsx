import globalBackendRoute from "../../config/Config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModernTextInput from "../../components/common_components/MordernTextInput";
import {
  FaCar,
  FaTag,
  FaMoneyBillWave,
  FaList,
  FaPalette,
  FaGasPump,
  FaCogs,
  FaTachometerAlt,
  FaUsers,
  FaCamera,
  FaUserTie,
  FaLayerGroup,
  FaBoxes,
  FaFileImage,
  FaCheckCircle,
  FaExclamationCircle,
  FaRegCalendarAlt,
} from "react-icons/fa";

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
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
      setSuccess(false);
      return;
    }

    if (!carData.rental_price_per_day || isNaN(carData.rental_price_per_day)) {
      setMessage("Rental price per day is required and must be a valid number.");
      setSuccess(false);
      return;
    }

    if (!carData.vendor) {
      setMessage("Vendor is required.");
      setSuccess(false);
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
        setSuccess(true);
        setMessage("Car added successfully!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/all-added-cars");
        }, 5000);
      } else {
        throw new Error("Car not created");
      }
    } catch (error) {
      setSuccess(false);
      setShowToast(false);
      console.error("Error adding car:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to add car. Try again.";
      setMessage(errorMsg);
    }
  };

  // Animation helpers
  const fadeIn = "animate-fadein";
  const bounce = "animate-bounce";
  const pulse = "animate-pulse";

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 mt-20 relative">
      {/* Toast for success */}
      {showToast && success && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadein">
          <FaCheckCircle className="text-white" />
          <span>{message}</span>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaCar className="text-indigo-500 animate-caricon" /> Add New Car
      </h2>
      {/* Only show error message inline */}
      {message && !success && (
        <div
          className={`flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-lg text-center bg-red-100 text-red-700 ${fadeIn}`}
        >
          <FaExclamationCircle className="text-red-500" />
          <span>{message}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded-2xl shadow-xl p-8 animate-fadein"
        encType="multipart/form-data"
      >
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaCar className="text-indigo-400" /> Car Name *
            </span>
          }
          name="car_name"
          placeholder="Enter car name"
          value={carData.car_name}
          onChange={handleChange}
        />

        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaList className="text-indigo-400" /> Description *
            </span>
          }
          name="description"
          placeholder="Enter full description of the car"
          value={carData.description}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaTag className="text-indigo-400" /> Slug (URL-friendly) *
            </span>
          }
          name="slug"
          placeholder="example-car-slug"
          value={carData.slug}
          onChange={handleChange}
        />

        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-400" /> Rental Price Per Day *
            </span>
          }
          name="rental_price_per_day"
          type="number"
          placeholder="Enter rental price per day"
          value={carData.rental_price_per_day}
          onChange={handleChange}
        />

        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaTag className="text-indigo-400" /> Brand *
            </span>
          }
          name="brand"
          placeholder="e.g., Toyota, Honda"
          value={carData.brand}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaTag className="text-indigo-400" /> Model *
            </span>
          }
          name="model"
          placeholder="e.g., Corolla, Civic"
          value={carData.model}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-indigo-400" /> Year *
            </span>
          }
          name="year"
          type="number"
          placeholder="Enter manufacturing year"
          value={carData.year}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaPalette className="text-indigo-400" /> Color
            </span>
          }
          name="color"
          placeholder="e.g., Black, Red, Silver"
          value={carData.color}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaGasPump className="text-indigo-400" /> Fuel Type *
            </span>
          }
          name="fuel_type"
          placeholder="e.g., Petrol, Diesel"
          value={carData.fuel_type}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaCogs className="text-indigo-400" /> Transmission *
            </span>
          }
          name="transmission"
          placeholder="e.g., Manual, Automatic"
          value={carData.transmission}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaTachometerAlt className="text-indigo-400" /> Mileage (km) *
            </span>
          }
          name="mileage"
          type="number"
          placeholder="Enter mileage"
          value={carData.mileage}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaUsers className="text-indigo-400" /> Seating Capacity *
            </span>
          }
          name="seating_capacity"
          type="number"
          placeholder="Enter seating capacity"
          value={carData.seating_capacity}
          onChange={handleChange}
        />
        <ModernTextInput
          label={
            <span className="flex items-center gap-2">
              <FaTag className="text-indigo-400" /> Tags (comma separated)
            </span>
          }
          name="tags"
          placeholder="e.g., new, trending, top deals"
          value={carData.tags}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaUserTie className="text-indigo-400" /> Select Vendor *
          </label>
          <select
            name="vendor"
            value={carData.vendor}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
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
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaLayerGroup className="text-indigo-400" /> Select Category
          </label>
          <select
            name="category"
            value={carData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
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
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaBoxes className="text-indigo-400" /> Select Subcategory
          </label>
          <select
            name="sub_category"
            value={carData.sub_category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 transition"
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
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaFileImage className="text-indigo-400" /> Main Car Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCarImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300"
          />
          {carImage && (
            <div className="mt-2 flex items-center gap-2 animate-fadein">
              <FaCamera className="text-indigo-400" />
              <span className="text-xs text-gray-600">{carImage.name}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaFileImage className="text-indigo-400" /> Gallery Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryImages([...e.target.files])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300"
          />
          {galleryImages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2 animate-fadein">
              {Array.from(galleryImages).map((file, idx) => (
                <span key={idx} className="flex items-center gap-1 text-xs bg-indigo-50 px-2 py-1 rounded">
                  <FaCamera className="text-indigo-400" />
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 animate-fadein"
        >
          <FaCheckCircle className="text-white animate-bounce" /> Add Car
        </button>
      </form>
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadein {
            animation: fadein 0.7s;
          }
          @keyframes caricon {
            0% { transform: translateY(0);}
            50% { transform: translateY(-6px);}
            100% { transform: translateY(0);}
          }
          .animate-caricon {
            animation: caricon 1.2s infinite;
          }
          .animate-bounce {
            animation: bounce 1.2s infinite alternate;
          }
          @keyframes bounce {
            0% { transform: translateY(0);}
            100% { transform: translateY(-8px);}
          }
          .animate-pulse {
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1;}
            50% { opacity: 0.6;}
          }
        `}
      </style>
    </div>
  );
}
