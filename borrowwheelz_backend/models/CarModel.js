const mongoose = require("mongoose");
const slugify = require("slugify");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    modelYear: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rentalPricePerDay: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    carImage: {
      type: String, // Store image path or URL
      required: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to generate slug from car name before saving
carSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
