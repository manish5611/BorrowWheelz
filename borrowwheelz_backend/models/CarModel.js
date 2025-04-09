const mongoose = require("mongoose");
const slugify = require("slugify"); // For auto-generating slug if needed

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // Reference to brand
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },

  location: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  seats: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },

  availability: { type: Boolean, default: true }, // fixed: was String, should be Boolean

  features: [{ type: String }],

  image: { type: String }, // main image
  allImages: [{ type: String }],

  slug: { type: String, required: true, unique: true },
  viewCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// 🛠️ Auto-generate slug from name if not provided
carSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Update `updatedAt` timestamp
carSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
