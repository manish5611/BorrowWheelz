const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const slugify = require("slugify");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer config
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/products";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const productUpload = multer({ storage: productStorage }).fields([
  { name: "image", maxCount: 1 },
  { name: "allImages", maxCount: 10 },
]);

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, category, description, price, SKU, section_to_appear } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const image = req.files?.image?.[0]?.path || null;
    const allImages = req.files?.allImages?.map((file) => file.path) || [];

    if (!image) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    const finalSKU = SKU || `SKU-${Date.now()}`;

    const product = new Product({
      name,
      category,
      description,
      price,
      SKU: finalSKU,
      image,
      allImages,
      slug,
      section_to_appear,
    });

    await product.save();

    // Add product to the selected category
    await Category.findByIdAndUpdate(category, {
      $addToSet: { products: product._id },
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ error: "Failed to add product" });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "category_name")
      .lean();

    const modifiedProducts = products.map((product) => {
      if (product.image) {
        product.image = `${req.protocol}://${req.get("host")}/${product.image}`;
      }
      if (product.allImages?.length) {
        product.allImages = product.allImages.map((img) =>
          `${req.protocol}://${req.get("host")}/${img}`
        );
      }
      return product;
    });

    res.status(200).json(modifiedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error while fetching products" });
  }
};

// ✅ Get Products by Section
const getProductsBySection = async (req, res) => {
  try {
    const section = req.params.section;
    const products = await Product.find({ section_to_appear: section })
      .populate("category", "category_name")
      .lean();

    const modifiedProducts = products.map((product) => {
      if (product.image) {
        product.image = `${req.protocol}://${req.get("host")}/${product.image}`;
      }
      if (product.allImages?.length) {
        product.allImages = product.allImages.map((img) =>
          `${req.protocol}://${req.get("host")}/${img}`
        );
      }
      return product;
    });

    res.status(200).json(modifiedProducts);
  } catch (error) {
    console.error("Error filtering by section:", error);
    res.status(500).json({ error: "Failed to fetch section products" });
  }
};

module.exports = {
  productUpload,
  addProduct,
  getAllProducts,
  getProductsBySection,
};
