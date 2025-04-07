const express = require("express");
const {
  brandUpload,
  addBrand,
  getAllBrands,
} = require("../controllers/BrandController");

const router = express.Router();

// Add brand with image
router.post(
  "/add-brand",
  brandUpload.fields([{ name: "image", maxCount: 1 }]),
  addBrand
);

// Get all brands
router.get("/brands", getAllBrands);

module.exports = router;
