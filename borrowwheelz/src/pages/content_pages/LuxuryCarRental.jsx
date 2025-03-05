import React from "react";
import { FaShieldAlt, FaTruck, FaClock, FaTag } from "react-icons/fa";
import carinter from "../../assets/images/car_inter.jfif";

const LuxuryCarRental = () => {
  const features = [
    {
      icon: <FaTag className="text-white text-xl" />,
      title: "Best Rate Guarantee",
      description: "We ensure transparency and value, providing the best rental rates.",
    },
    {
      icon: <FaShieldAlt className="text-white text-xl" />,
      title: "Insurance Protected",
      description: "Enjoy peace of mind as all vehicles come fully insurance-protected.",
    },
    {
      icon: <FaTruck className="text-white text-xl" />,
      title: "Local Delivery",
      description: "We deliver the vehicle to your location for maximum convenience.",
    },
    {
      icon: <FaClock className="text-white text-xl" />,
      title: "Same Day Rentals",
      description: "Get instant access to luxury vehicles with our same-day rental service.",
    },
  ];

  return (
    <section className="relative w-full py-12 bg-gray-900 text-white ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${carinter})` }} 
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center px-6">
        {/* Left - Car Image */}
        <div className="lg:w-1/2">
          
        </div>

        {/* Right - Features */}
        <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 mb-6">
              <div className="bg-gray-700 p-3 rounded-lg">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}

          {/* CTA Button */}
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md transition">
            Book a Car Now →
          </button>
        </div>
      </div>
    </section>
  );
};

export default LuxuryCarRental;
