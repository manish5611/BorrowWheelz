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
