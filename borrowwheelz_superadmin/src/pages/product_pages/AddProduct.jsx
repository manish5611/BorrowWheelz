import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [SKU, setSKU] = useState("");
  const [sectionToAppear, setSectionToAppear] = useState("");
  const [image, setImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/all-categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAllImagesChange = (e) => {
    setAllImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("SKU", SKU);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("section_to_appear", sectionToAppear);

    if (image) {
      formData.append("image", image);
    }

    allImages.forEach((file) => {
      formData.append("allImages", file);
    });

    try {
      const res = await axios.post("http://localhost:3001/api/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Product added successfully!");
      // Reset form
      setName("");
      setCategory("");
      setDescription("");
      setSKU("");
      setPrice("");
      setQuantity("");
      setSectionToAppear("");
      setImage(null);
      setAllImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("❌ Error adding product. Please check the inputs and try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      {message && <p className="mb-4 font-medium text-center text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Section To Appear</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={sectionToAppear}
            onChange={(e) => setSectionToAppear(e.target.value)}
            required
          >
            <option value="">Select section</option>
            <option value="hero_section">Hero Section</option>
            <option value="top_sellers">Top Sellers</option>
            <option value="recent_purchase">Recent Purchase</option>
            <option value="frequently_bought">Frequently Bought</option>
            <option value="recommended">Recommended</option>
            <option value="product_section">Product Section</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">SKU</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            value={SKU}
            onChange={(e) => setSKU(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Price</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Cover Image</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Gallery Images (optional)</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAllImagesChange}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
