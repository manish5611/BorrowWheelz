import React from "react";
import xuv700 from "../../assets/images/xuv700.webp";

import {
  FaMobileAlt,
  FaUserTie,
  FaCrown,
  FaMoneyCheckAlt,
  FaCheck, // ✅ Import FaCheck icon
} from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaMobileAlt size={70} className="text-white" />,
      title: "Easy Online Booking",
      description:
        "Book your desired vehicle in just a few clicks from the comfort of your home.",
      bg: "bg-green-300",
    },
    {
      icon: <FaUserTie size={70} className="text-white" />,
      title: "Professional Drivers",
      description:
        "Our experienced and licensed drivers ensure a safe and pleasant journey.",
      bg: "bg-gray-900",
    },
    {
      icon: <FaCrown size={70} className="text-white" />,
      title: "Variety of Cars Brands",
      description:
        "Choose from a wide range of premium, luxury, and budget-friendly car brands.",
      bg: "bg-green-300",
    },
    {
      icon: <FaMoneyCheckAlt size={70} className="text-white" />,
      title: "Online Payment",
      description:
        "Pay securely through our multiple online payment options with ease.",
      bg: "bg-gray-900",
    },
  ];

  const featuresLeft = [
    "For Upto 6 Passengers",
    "Incredible Sound System",
    "Fiber Optic Lights",
    "Bar Area With Fridge",
  ];

  const featuresRight = [
    "Tinted Windows",
    "Divider With Premium Style",
    "Multipurpose Designed Limo",
    "Chill Air Conditioning",
  ];

  return (
    <div className="">
      {/* Section Heading */}
      <div className="flex justify-evenly container">
        <h1 className="text-6xl font-bold font-serif mb-4 lg:mb-0 ">
          Why Choose Us
        </h1>
        <p className="max-w-xl text-gray-600 text-sm lg:text-base lg:text-left p-[10px]">
          At LIMOS we pride ourselves in delivering extensive services to
          fulfill all of your needs with first rate customer care
        </p>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 my-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {features.map((feature, index) => (
            <div key={index}>
              <div
                className={`w-36 h-36 mx-auto rounded-xl flex items-center justify-center ${feature.bg}`}
              >
                {feature.icon}
              </div>
              <h4 className="font-semibold text-lg mt-4">{feature.title}</h4>
              <p className="text-gray-500 text-sm mt-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Section */}
      <div className="text-center my-16">
        <h2 className="text-6xl font-bold mb-4">
          Only today <span className="font-extrabold">₹500/day</span>
        </h2>
        <p className="text-gray-600 text-sm">
          Take advantage of our hot offers, saving a significant amount
          <br />
          when renting a limousine
        </p>
      </div>

      {/* Cadillac Escalade Section */}
      <div className="bg-[#f3f2f4] rounded-3xl flex flex-col lg:flex-row items-center justify-between px-10 py-12  container mb-4">
        {/* Text Section */}
        <div className="lg:w-1/2 w-full mb-8 lg:mb-0">
          <h2 className="text-4xl font-bold mb-6 font-sans">Tata XUV 700</h2>
          <div className="flex flex-wrap gap-x-12">
            {/* Left Features */}
            <ul className="space-y-3 mb-4">
              {featuresLeft.map((feature, idx) => (
                <li key={`left-${idx}`} className="flex items-center text-gray-800">
                  <FaCheck className="text-black mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            {/* Right Features */}
            <ul className="space-y-3 mb-4">
              {featuresRight.map((feature, idx) => (
                <li key={`right-${idx}`} className="flex items-center text-gray-800">
                  <FaCheck className="text-black mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Button */}
          <button className="mt-6 px-6 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-900 transition">
            Reserve Now
          </button>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <img
            src={xuv700}
            alt="Cadillac Escalade"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
