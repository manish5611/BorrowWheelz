import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ThankYou = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-indigo-50 relative overflow-hidden animate-fadein">
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-400 to-pink-400 opacity-20 rounded-full blur-3xl animate-float1 z-0"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-400 to-teal-400 opacity-20 rounded-full blur-3xl animate-float2 z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 opacity-10 rounded-full blur-2xl animate-float3 z-0"></div>

      <div className="containerWidth flex flex-col items-center justify-center z-10 bg-white/90 rounded-2xl shadow-2xl px-10 py-16 max-w-xl border border-orange-100">
        <FaCheckCircle className="text-green-500 text-7xl mb-6 animate-bounce" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 font-serif tracking-tight">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-8 text-lg font-medium font-sans">
          We have received your order. We will process and ship it soon.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-indigo-500 text-white rounded-full font-bold text-lg shadow-lg hover:from-orange-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 active:scale-95 animate-glow"
        >
          Continue Shopping
        </Link>
      </div>
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadein { animation: fadein 1s cubic-bezier(.4,0,.2,1) both; }
          @keyframes float1 {
            0%, 100% { transform: translateY(0) scale(1);}
            50% { transform: translateY(-30px) scale(1.05);}
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0) scale(1);}
            50% { transform: translateY(30px) scale(1.08);}
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0) scale(1);}
            50% { transform: translateY(-15px) scale(1.03);}
          }
          .animate-float1 { animation: float1 7s ease-in-out infinite; }
          .animate-float2 { animation: float2 8s ease-in-out infinite; }
          .animate-float3 { animation: float3 6s ease-in-out infinite; }
          @keyframes bounce {
            0% { transform: translateY(0);}
            100% { transform: translateY(-8px);}
          }
          .animate-bounce { animation: bounce 1.2s infinite alternate; }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 0px 0 #fbbf24, 0 0 0px 0 #6366f1;}
            50% { box-shadow: 0 0 16px 4px #fbbf24, 0 0 24px 8px #6366f1;}
          }
          .animate-glow { animation: glow 2.5s infinite alternate; }
        `}
      </style>
    </div>
  );
};

export default ThankYou;
