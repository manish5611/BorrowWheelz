const Car = require("../models/CarModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify"); // for manual slug generation if needed

// Multer config
const carStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/cars";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const carUpload = multer({ storage: carStorage });

// Add Car Controller
const addCar = async (req, res) => {
  try {
    const {
      name,
      brandId, // correct key name
      location,
      pricePerDay,
      seats,
      fuelType,
      transmission,
      availability,
      features,
    } = req.body;

    // Required fields validation
    if (!name || !brandId || !location || !pricePerDay || !seats || !fuelType || !transmission) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Handle image uploads
    const image = req.files?.["image"]?.[0]?.path.replace(/\\/g, "/") || "";
    const allImages = req.files?.["allImages"]?.map((file) =>
      file.path.replace(/\\/g, "/")
    ) || [];

    const newCar = new Car({
      name,
      brandId,
      location,
      pricePerDay,
      seats,
      fuelType,
      transmission,
      availability: availability === "true" || availability === true, // ensures boolean
      features: features ? features.split(",") : [],
      image,
      allImages,
      // manually generating slug (model will auto-generate if this is missing)
      slug: slugify(name, { lower: true }),
    });

    await newCar.save();

    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate("brandId").lean();

    const modifiedCars = cars.map((car) => {
      if (car.image) {
        car.image = `${req.protocol}://${req.get("host")}/${car.image}`;
      }
      if (car.allImages && car.allImages.length > 0) {
        car.allImages = car.allImages.map((img) => `${req.protocol}://${req.get("host")}/${img}`);
      }
      return car;
    });

    res.status(200).json(modifiedCars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  carUpload,
  addCar,
  getAllCars,
};
