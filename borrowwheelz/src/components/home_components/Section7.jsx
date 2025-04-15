import React from "react";

const Section7 = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 mt-12">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          📬 Stay in the Loop!
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter and get exclusive offers, product updates, and event news directly to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-md w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default Section7;
