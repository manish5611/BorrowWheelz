const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },

  location: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  seats: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  availability: { type: String, default: true },
  features: [{ type: String }],
  image: { type: String }, // main image
  allImages: [{ type: String }],
  slug: { type: String, required: true, unique: true },
  viewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

carSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
