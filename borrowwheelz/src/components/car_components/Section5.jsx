import React from 'react';

const electricRentalCars = [
  {
    name: "Mahindra BE 6",
    price: "₹ 2,099 / day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/154373/be-06-exterior-right-front-three-quarter.jpeg?isig=0",
  },
  {
    name: "Mahindra XEV 9e",
    price: "₹ 2,499 / day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/154375/xuv-e9-exterior-right-front-three-quarter.jpeg?isig=0",
  },
  {
    name: "MG Windsor EV",
    price: "₹ 1,799 / day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/149985/windsor-ev-exterior-right-front-three-quarter.jpeg?isig=0",
  },
  {
    name: "Tata Curvv EV",
    price: "₹ 2,299 / day",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/157263/curvv-ev-exterior-right-front-three-quarter.jpeg?isig=0",
  },
];

const Vehicles5 = () => {
  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Rent Electric Cars
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {electricRentalCars.map((car, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow hover:shadow-md transition duration-200"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-44 object-cover"
              />
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

export default Vehicles5;
