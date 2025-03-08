import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
      <p className="text-lg text-gray-700 mt-2">Our team will get in touch with you soon.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default ThankYouPage;
