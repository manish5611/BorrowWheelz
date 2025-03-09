import React from "react";
import car1 from "../../assets/images/aboutus/car1.jpg";
import background from "../../assets/images/aboutus/background.jfif";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {

const navigate = useNavigate();


  return (
    <div className="bg-gray-900 text-white py-16 px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src={car1}
            alt="Car Rental Service"
            className="w-full rounded-lg"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
          <h4 className="text-gray-400 uppercase tracking-widest">About Us</h4>
          <h2 className="text-4xl font-bold mt-2">
            Your Trusted Car Rental Partner
          </h2>
          <p className="text-gray-300 mt-4">
            We offer a wide range of well-maintained vehicles at competitive
            prices, ensuring a hassle-free experience for your journeys. Whether
            it's a short trip or a long vacation, our cars are ready to take you
            anywhere!
          </p>
          <button
            onClick={() => navigate("/contact-us")} // Navigate on button click
            className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Contact Us
          </button>
        </div>
      </div>

      <section className="bg-gray-900 text-white py-16 px-8 mt-4">
        <div className="max-w-7xl mx-auto">
          {/* Title & Description */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Why Choose Us?</h2>
            <p className="text-gray-400 mt-4">
              We provide high-quality car rental services with a seamless
              experience. Our fleet is well-maintained, and our customer
              satisfaction speaks for itself.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Left: Progress Bars */}
            <div className="md:w-1/2">
              <div className="mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Vehicle Quality</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Customer Support</span>
                  <span>98%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "98%" }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Affordability</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right: Statistics */}
            <div className="md:w-1/2 grid grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold">10+</h3>
                <p className="text-gray-400">Years of Service</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">5,000+</h3>
                <p className="text-gray-400">Successful Rentals</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">4.8/5</h3>
                <p className="text-gray-400">Customer Rating</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-gray-400">Luxury Cars Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative w-full h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

        <div className="relative z-10">
          <h3 className="text-lg font-semibold">Rent With Us</h3>
          <h2 className="text-4xl font-bold mt-2">
            We Are Always Ready To Get You On The Road
          </h2>
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold shadow-lg hover:bg-gray-200">
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
