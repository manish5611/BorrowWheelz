import React from "react";

// Sample images (Replace with actual images)
import car1 from "../../assets/images/lux_car.jfif";
import car2 from "../../assets/images/lux_car.jfif";
import car3 from "../../assets/images/lux_car.jfif";
import car4 from "../../assets/images/lux_car.jfif";

const carCollections = [
  {
    title: "Luxury Cars",
    description: "Experience premium rides with our luxury car rentals, offering comfort and style.",
    image: car1,
  },
  {
    title: "Sedan Collection",
    description: "Find the perfect sedan for city drives or long road trips at affordable rates.",
    image: car2,
  },
  {
    title: "SUV Collection",
    description: "Spacious and powerful SUVs for family vacations or off-road adventures.",
    image: car3,
  },
  {
    title: "Convertible Collection",
    description: "Enjoy the open road with our stylish and sleek convertible car rentals.",
    image: car4,
  },
];

const CarRentalCollection = () => {
  return (
    <div className="bg-[#14161B] text-white py-16 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {carCollections.map((car, index) => (
          <div
            key={index}
            className="relative bg-gray-800 rounded-lg overflow-hidden group cursor-pointer"
          >
            <img
              src={car.image}
              alt="Luxury Car"
              className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-between">
              <h3 className="text-xl font-semibold">{car.title}</h3>
              <p className="text-sm opacity-80">{car.description}</p>
              <a href="#" className="text-yellow-400 font-medium hover:underline mt-2">
                READ MORE →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarRentalCollection;
