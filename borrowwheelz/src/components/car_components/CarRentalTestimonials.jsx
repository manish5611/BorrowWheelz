import React from "react";
import user1 from "../../assets/images/user1.avif"; // Replace with actual user image
import user2 from "../../assets/images/user6.png"; // Replace with actual user image

const CarRentalTestimonials = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-10">
        <h4 className="text-yellow-500 uppercase font-semibold tracking-wide">
          Testimonials
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          What our happy customers say about us
        </h2>
      </div>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Testimonial 1 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="italic text-gray-300">
            “Renting a car from this company was a breeze! The vehicle was in excellent condition, and the process was quick and hassle-free. Highly recommended!”
          </p>
          <div className="flex items-center mt-6">
            <img src={user1} alt="John Doe" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-bold">John Doe</h4>
              <p className="text-yellow-500 text-sm">Frequent Traveler</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="italic text-gray-300">
            “Best car rental experience I've ever had! The prices were fair, and the customer service was outstanding. Will definitely rent again.”
          </p>
          <div className="flex items-center mt-6">
            <img src={user2} alt="Jane Smith" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h4 className="font-bold">Jane Smith</h4>
              <p className="text-yellow-500 text-sm">Business Executive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalTestimonials;
