import React from "react";
import BMW5Series from "../../assets/images/BMW5Series.jpg";
import CarRental from "../../assets/images/CarRental.png";  

const AboutUs = () => {
  return (
    <section className="relative">
      {/* Background Image for About Company Section */}
      <div 
        className="bg-cover bg-center py-16 text-white relative" 
        style={{ backgroundImage: `url(${BMW5Series})` }}
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">About Company</h2>
          <nav className="mb-6">
            {/* Clickable Home Link */}
            <a href="/" className="text-red-500 hover:underline">Home</a> / <span className="text-white">About Us</span>
          </nav>
        </div>
      </div>

      {/* Best Car Rental Deals Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Best Car Rental Deals</h3>
              <p className="text-gray-600 mb-4">
                Our services ensure a seamless car rental experience with the best prices and top-notch assistance whenever you need it.
              </p>
              <ul className="text-left text-gray-700">
                <li className="mb-2">✅ Competitive Prices</li>
                <li className="mb-2">✅ Breakdown Assistance</li>
                <li className="mb-2">✅ 24/7 Customer Support</li>
              </ul>
              <div className="mt-4 bg-red-500 text-white px-4 py-2 inline-block rounded-lg">
                <p>Call Us for Your Next Ride</p>
                <p className="font-bold">+91 8747005611</p>
              </div>
            </div>
            
            {/* Updated Image for Car Rental Section */}
            <div className="flex justify-center">
              <img src={CarRental} alt="Car Rental" className="rounded-lg shadow-lg max-w-xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
