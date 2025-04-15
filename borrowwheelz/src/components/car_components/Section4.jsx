import React from 'react';

const rentalCars = [
  {
    name: "Volkswagen Tiguan R-Line",
    price: "₹ 2,499 / day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/147603/tiguan-exterior-right-front-three-quarter.jpeg?isig=0",
    launchDate: "Available from: Apr 14, 2025",
  },
  {
    name: "Tata Curvv",
    price: "₹ 1,999 / day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/157261/curvv-exterior-right-front-three-quarter.jpeg?isig=0",
    launchDate: "Available from: Apr 12, 2025",
  },
  {
    name: "Tata Curvv EV",
    price: "₹ 2,299 / day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/157263/curvv-ev-exterior-right-front-three-quarter.jpeg?isig=0",
    launchDate: "Available from: Apr 12, 2025",
    tags: ["Electric"],
  },
  {
    name: "BMW Z4",
    price: "₹ 6,999 / day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/147420/z4-exterior-right-front-three-quarter.jpeg?isig=0",
    launchDate: "Available from: Apr 10, 2025",
  },
];

const Vehicles4 = () => {
  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Newly Added Rental Cars
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {rentalCars.map((car, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition duration-200"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                  {car.launchDate}
                </div>
                {car.tags && (
                  <div className="absolute bottom-2 left-2 flex gap-2">
                    {car.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{car.price}</p>
                <button className="w-full border border-orange-500 text-orange-500 py-2 rounded hover:bg-orange-50 transition text-sm font-medium">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles4;
