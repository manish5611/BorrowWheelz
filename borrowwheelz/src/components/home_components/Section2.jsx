import React from "react";
import availability from "../../assets/images/avail.jpg"
import booking from "../../assets/images/book.jpg"
import price from "../../assets/images/price.jfif"

const CarRentalServices = () => {
  const services = [
    {
      title: "24/7 Availability",
      description:
        "Our services are available round the clock, ensuring you have access to a vehicle whenever you need it, day or night.",
      image:
        availability,
    },
    {
      title: "Easy Booking Process",
      description:
        "With our seamless online booking system, renting a car has never been easier. Book your ride in just a few clicks.",
      image:
        booking,
    },
    {
      title: "Affordable Pricing",
      description:
        "We offer competitive and transparent pricing with no hidden charges, ensuring you get the best value for your money.",
      image:
        price,
    },
    {
      title: "Wide Range of Vehicles",
      description:
        "Choose from a diverse fleet of well-maintained cars, including economy, luxury, and SUVs, to suit your travel needs.",
      image:
        "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd",
    },
  ];

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-56 h-52 object-cover p-2 mt-1 "
            />
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarRentalServices;
