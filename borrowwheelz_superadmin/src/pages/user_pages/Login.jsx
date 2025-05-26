import React, { useState, useContext } from "react";
import axios from "axios";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../components/auth_components/AuthManager";
import globalBackendRoute from "../../config/Config";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validateInputs = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return "Email and password are required.";
    }

    if (email !== trimmedEmail) {
      return "Email cannot start or end with spaces.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail.match(emailRegex)) {
      return "Please enter a valid email address.";
    }

    if (password !== trimmedPassword) {
      return "Password cannot start or end with spaces.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post(
        `${globalBackendRoute}/api/login`,
        formData
      );
      login(response.data.token);
      alert("Login successful, redirecting...");
      setError("");
    } catch {
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-indigo-100 relative overflow-hidden mt-10 mb-[-24px]">
      {/* Animated Circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-orange-400 to-pink-400 opacity-30 rounded-full blur-3xl animate-float1 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400 to-teal-400 opacity-30 rounded-full blur-3xl animate-float2 z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-yellow-300 to-orange-400 opacity-20 rounded-full blur-2xl animate-float3 z-0"></div>

      <div className="bg-white/90 w-full max-w-md p-10 space-y-8 rounded-2xl shadow-2xl border border-orange-100 z-10 animate-fadein">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <span className="inline-block animate-bounce">
              <FaSignInAlt className="text-orange-500 drop-shadow-lg" size={54} />
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mt-2 tracking-tight font-serif">
            Welcome Back!
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Sign in to your <span className="font-bold text-orange-500">BorrowWheelz</span> account
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 font-semibold animate-shake">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-orange-200 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none bg-orange-50/50 transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm font-semibold text-orange-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-orange-200 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none pr-10 bg-orange-50/50 transition"
              placeholder="Enter your password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-500 hover:text-orange-600 cursor-pointer transition"
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-indigo-500 text-white font-bold rounded-full shadow-lg hover:from-orange-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 active:scale-95 animate-glow"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gradient-to-r from-orange-200 via-gray-200 to-indigo-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gradient-to-l from-orange-200 via-gray-200 to-indigo-200" />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register here
          </a>
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
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
          @keyframes fadein {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadein { animation: fadein 1s cubic-bezier(.4,0,.2,1) both; }
          @keyframes shake {
            0%, 100% { transform: translateX(0);}
            20%, 60% { transform: translateX(-6px);}
            40%, 80% { transform: translateX(6px);}
          }
          .animate-shake { animation: shake 0.4s; }
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

export default Login;