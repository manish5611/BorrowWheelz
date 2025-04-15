// File: FeatureHighlights.jsx

import { BadgeCheck, Car, Tag, Scale } from 'lucide-react'; // Optional icon set
import React from 'react';

const features = [
  {
    icon: <BadgeCheck className="w-6 h-6 text-gray-700" />,
    title: "India’s #1",
    subtitle: "Largest Auto portal",
  },
  {
    icon: <Car className="w-6 h-6 text-gray-700" />,
    title: "Car Rented",
    subtitle: "Every 4 minute",
  },
  {
    icon: <Tag className="w-6 h-6 text-gray-700" />,
    title: "Offers",
    subtitle: "Stay updated pay less",
  },
  {
    icon: <Scale className="w-6 h-6 text-gray-700" />,
    title: "Compare",
    subtitle: "Decode the right car",
  },
];

const FeatureHighlights = () => {
  return (
    <div className="flex justify-around items-start py-6 bg-white">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center text-center space-y-1 px-4">
          <div>{feature.icon}</div>
          <div className="text-base font-semibold text-gray-800">{feature.title}</div>
          <div className="text-sm text-gray-500">{feature.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default FeatureHighlights;
