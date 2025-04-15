const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountPercent: { type: Number, default: 0 },
    image: { type: String, required: true },
    allImages: [{ type: String }],
    rating: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    slug: { type: String, unique: true },
    SKU: { type: String, required: true, unique: true },
    section_to_appear: {
      type: String,
      enum: [
        "hero_section",
        "top_sellers",
        "recent_purchase",
        "frequently_bought",
        "recommended",
        "product_section",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
