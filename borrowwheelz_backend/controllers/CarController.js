const Car = require("../models/Car");

exports.addCar = async (req, res) => {
    try {
        const { name, brand, modelYear, location, rentalPricePerDay, availability } = req.body;
        const carImage = req.file ? req.file.path : "";  // Get uploaded image path

        const newCar = new Car({
            name,
            brand,
            modelYear,
            location,
            rentalPricePerDay,
            availability,
            carImage,  // Save image path
        });

        await newCar.save();
        res.status(201).json({ message: "Car added successfully", car: newCar });
    } catch (error) {
        console.error("Error adding car:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
