const express = require("express");
const router = express.Router();
const {
  productUpload,
  addProduct,
  getAllProducts,
  getProductsBySection,
} = require("../controllers/ProductController");

router.post("/add-product", productUpload, addProduct);
router.get("/all-products", getAllProducts);

// ✅ Route to get products by section (keep only one of these)
router.get("/products/section/:section", getProductsBySection);

module.exports = router;
