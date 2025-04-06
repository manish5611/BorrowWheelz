const Car = require("../models/CarModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer storage config for car images
const carStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/cars";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const carUpload = multer({ storage: carStorage });

// Controller to add a new car
const addCar = async (req, res) => {
  try {
    const {
      name,
      brand,
      location,
      pricePerDay,
      seats,
      fuelType,
      transmission,
      availability,
      features,
    } = req.body;

    const image = req.files?.["image"]?.[0]?.path.replace(/\\/g, "/") || "";
    const allImages =
      req.files?.["allImages"]?.map((file) => file.path.replace(/\\/g, "/")) ||
      [];

    const newCar = new Car({
      name,
      brand,
      location,
      pricePerDay,
      seats,
      fuelType,
      transmission,
      availability,
      features: features ? features.split(",") : [],
      image,
      allImages,
    });

    await newCar.save();

    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to fetch all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().lean();

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
