import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bmwcontact from "../../assets/images/bmwcontact.png";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/thank-you");
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-60 bg-cover bg-center flex items-center justify-center text-white" 
        style={{ backgroundImage: `url(${bmwcontact})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="text-3xl font-bold relative">Contact</h1>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-gray-700">Contact Us</h2>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Let's Get In Touch</h1>
      </div>

      {/* Contact Info Cards with Hover Zoom Effect */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-8 px-4">
        {/* Location */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-72 transition-transform duration-300 transform hover:scale-105">
          <div className="text-teal-500 text-2xl">📍</div>
          <h3 className="text-lg font-semibold mt-2">Location</h3>
          <p className="text-gray-600 text-sm">Peenya, Bengaluru, Karnataka</p>
        </div>

        {/* Email */}
        <div className="bg-blue-500 text-white shadow-lg rounded-lg p-6 text-center w-72 transition-transform duration-300 transform hover:scale-105">
          <div className="text-xl">📧</div>
          <h3 className="text-lg font-semibold mt-2">Email Address</h3>
          <p className="text-gray-300 text-sm">borrowwheelz@gmail.com</p>
        </div>

        {/* Phone */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-72 transition-transform duration-300 transform hover:scale-105">
          <div className="text-green-500 text-2xl">📞</div>
          <h3 className="text-lg font-semibold mt-2">Phone</h3>
          <p className="text-gray-600 text-sm">+9611752722</p>
        </div>
      </div>

      {/* Contact Form & Map Section */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mt-10 px-4 max-w-5xl mx-auto">
        {/* Google Map */}
        <div className="w-full md:w-1/2 my-3">
        <iframe 
  title="Google Maps"
  className="w-full h-64 rounded-lg shadow-lg"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.711247097492!2d77.51204821482255!3d13.02899399081215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3dc1f2c2f11f%3A0x6e2d8e5f5b5dbff!2sPeenya%2C%20Bengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1649443322896" 
  allowFullScreen="" loading="lazy">
</iframe>

        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 my-3">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" placeholder="Your Name" required />
              {/* Phone */}
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" placeholder="Your Phone" required />
            </div>

            {/* Email */}
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" placeholder="Your Email" required />

            {/* Message */}
            <textarea name="message" value={formData.message} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-md" rows="4" placeholder="Your Message" required></textarea>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
