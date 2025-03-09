import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import bmwcontact from "../../assets/images/bmwcontact.png";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/thank-you");
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-20">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-60 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${bmwcontact})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="text-3xl font-bold relative">Contact Us</h1>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-12 px-6 py-12 max-w-6xl mx-auto">
        {/* Contact Form Section */}
        <div className="bg-gray-900 text-white p-8 rounded-lg w-full lg:w-1/2 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Get In Touch!</h2>
          <p className="text-gray-300 mb-6">
            Have questions about renting a car? Contact us for the best deals and assistance.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Your Name"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Your Phone"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 outline-none"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 w-full">
              Submit
            </button>
          </form>
        </div>

        {/* Location & Map Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-700">Our Location</h2>
          <p className="text-gray-600 mb-4">
            Visit us to explore our car rental services. We offer the best vehicles for your journey.
          </p>
          <div className="w-full h-60 border rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.711247097492!2d77.51204821482255!3d13.02899399081215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3dc1f2c2f11f%3A0x6e2d8e5f5b5dbff!2sPeenya%2C%20Bengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1649443322896"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>

          {/* Social Media Links */}
          <h3 className="text-lg font-semibold mt-6">Follow Us</h3>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
