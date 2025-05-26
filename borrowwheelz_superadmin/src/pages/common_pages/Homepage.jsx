import React from "react";
import { FaCrown, FaUserShield, FaChartBar, FaUsers, FaCar, FaStar } from "react-icons/fa";
import UserComponent from "../../components/common_components/UserComponent";
import PageHeading from "../../components/common_components/PageHeading";

const Homepage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-teal-50 py-10 mt-[35px]">
      <div className="flex flex-col items-center gap-2 animate-fadein">
        <FaCrown className="text-5xl text-yellow-500 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">Welcome, Superadmin!</h1>
        <p className="text-lg text-gray-700 max-w-xl text-center mb-6">
          This is your <span className="font-semibold text-indigo-600">Superadmin Homepage</span>. 
          Here you can manage users, cars, vendors, products, and view analytics for the entire platform.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-3 hover:scale-105 transition">
          <FaUserShield className="text-3xl text-indigo-500 animate-bounce" />
          <span className="font-bold text-lg text-indigo-700">User Management</span>
          <p className="text-gray-500 text-center text-sm">View, edit, or remove users and assign roles.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-3 hover:scale-105 transition">
          <FaCar className="text-3xl text-teal-500 animate-bounce" />
          <span className="font-bold text-lg text-teal-700">Car & Vendor Control</span>
          <p className="text-gray-500 text-center text-sm">Add, update, or remove cars and manage vendors.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-3 hover:scale-105 transition">
          <FaChartBar className="text-3xl text-pink-500 animate-bounce" />
          <span className="font-bold text-lg text-pink-700">Analytics & Reviews</span>
          <p className="text-gray-500 text-center text-sm">Track platform growth, bookings, and review feedback.</p>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-400 text-xs animate-fadein">
        &copy; {new Date().getFullYear()} BorrowWheelz Superadmin Panel
      </div>
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadein {
            animation: fadein 0.7s;
          }
          .animate-bounce {
            animation: bounce 1.2s infinite alternate;
          }
          @keyframes bounce {
            0% { transform: translateY(0);}
            100% { transform: translateY(-8px);}
          }
        `}
      </style>
    </div>
  );
};

export default Homepage;
