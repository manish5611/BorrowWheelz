import React, { useState } from 'react';

const tabs = ["Current", "Upcoming", "Expired"];

const brands = [
  { name: "Maruti", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Maruti_Suzuki_Logo.svg/2048px-Maruti_Suzuki_Logo.svg.png" },
  { name: "Tata", image: "https://1000logos.net/wp-content/uploads/2021/06/Tata-Logo.png" },
  { name: "Kia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/KIA_logo3.svg/2560px-KIA_logo3.svg.png" },
  { name: "Toyota", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.png" },
  { name: "Hyundai", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Hyundai-logo.png/800px-Hyundai-logo.png" },
  { name: "Mahindra", image: "https://seeklogo.com/images/M/mahindra-logo-7C597933F8-seeklogo.com.png" },
  { name: "Honda", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Honda_logo.svg/2048px-Honda_logo.svg.png" },
  { name: "MG", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/MG_Motor_UK_logo.svg/1024px-MG_Motor_UK_logo.svg.png" },
  { name: "Skoda", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Skoda_Auto_logo.svg/1024px-Skoda_Auto_logo.svg.png" },
  { name: "Jeep", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Jeep_logo.svg/2560px-Jeep_logo.svg.png" },
  { name: "Renault", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Renault_2021_Text.svg/2560px-Renault_2021_Text.svg.png" },
  { name: "Nissan", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Nissan_logo.svg/1280px-Nissan_logo.svg.png" },
];

const Vehicles3 = () => {
  const [activeTab, setActiveTab] = useState("Current");

  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Explore Rental Cars by Brand
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? "text-orange-600 border-orange-500"
                  : "text-gray-600 border-transparent hover:text-orange-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 flex flex-col items-center justify-center hover:shadow transition-all"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-14 h-14 object-contain mb-2"
              />
              <p className="text-sm font-medium text-gray-700 text-center">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicles3;
