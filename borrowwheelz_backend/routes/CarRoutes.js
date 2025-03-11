const express = require("express");
const multer = require("multer");
const { addCar, getAllCars } = require("../controllers/CarController");

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ensure the "uploads" folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const carUpload = multer({ storage: storage });

// Routes
router.post("/add-car", carUpload.single("carImage"), addCar);
router.get("/all-cars", getAllCars);

module.exports = router;
