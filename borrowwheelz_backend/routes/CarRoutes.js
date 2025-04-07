const express = require("express");
const {
    carUpload,
    addCar,
    getAllCars,
  } = require("../controllers/CarController");

const router = express.Router();

router.post(
  "/add-car",
  carUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "allImages", maxCount: 5 },
  ]),
  addCar
);

router.get("/cars", getAllCars);

module.exports = router;