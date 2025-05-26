import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../components/auth_components/AuthManager";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBoxOpen, FaStar, FaClipboardList, FaCar, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import jsPDF from "jspdf";

const Dashboard = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [carIndex, setCarIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`${globalBackendRoute}/api/book/user/${user._id}`)
        .then((res) => setOrders(res.data))
        .catch(() => setOrders([]));
    }
  }, [user?._id]);

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/all-added-cars`)
      .then((res) => setCars(res.data))
      .catch(() => setCars([]));
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`${globalBackendRoute}/api/review/allreviews?userId=${user._id}`)
        .then((res) => {
          // Filter reviews to only those by the current user (in case backend returns all)
          const userReviews = Array.isArray(res.data)
            ? res.data.filter((r) =>
                r.userId && (r.userId._id === user._id || r.userId === user._id)
              )
            : [];
          setReviews(userReviews);
        })
        .catch(() => setReviews([]));
    }
  }, [user?._id]);

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return "Good night";
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${globalBackendRoute}/api/update-profile/${user._id}`,
        profile
      );
      window.location.reload(); // reload to get updated profile from context
    } catch (err) {
      alert("Failed to update profile.");
    }
    setLoading(false);
  };

  // PDF receipt download
  const handleDownloadReceipt = (order) => {
    const car = order.cars?.[0]?.car || {};
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("BorrowWheelz - Booking Receipt", 15, 20);
    doc.setFontSize(12);
    doc.text("-----------------------------", 15, 28);
    doc.text(`Order ID: ${order._id}`, 15, 36);
    doc.text(`Name: ${user?.name || ""}`, 15, 44);
    doc.text(`Email: ${user?.email || ""}`, 15, 52);
    doc.text(`Car: ${car.car_name || "N/A"}`, 15, 60);
    doc.text(`Brand: ${car.brand || "N/A"}`, 15, 68);
    doc.text(`Model: ${car.model || "N/A"}`, 15, 76);
    doc.text(
      `From: ${order.cars?.[0]?.fromDate ? new Date(order.cars[0].fromDate).toLocaleDateString() : ""}`,
      15,
      84
    );
    doc.text(
      `To: ${order.cars?.[0]?.toDate ? new Date(order.cars[0].toDate).toLocaleDateString() : ""}`,
      15,
      92
    );
    doc.text(`Status: ${order.status || "pending"}`, 15, 100);
    doc.text(
      `Booking Date: ${order.bookingDate ? new Date(order.bookingDate).toLocaleDateString() : ""}`,
      15,
      108
    );
    // Calculate price
    let price = 0;
    if (
      order.cars &&
      order.cars[0] &&
      order.cars[0].fromDate &&
      order.cars[0].toDate &&
      car.rental_price_per_day
    ) {
      const from = new Date(order.cars[0].fromDate);
      const to = new Date(order.cars[0].toDate);
      const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
      price = days * car.rental_price_per_day;
    }
    doc.text(`Price: ₹${price}`, 15, 116);
    doc.text(`Payment Method: ${order.paymentMethod ? order.paymentMethod.toUpperCase() : "N/A"}`, 15, 124);
    doc.text("-----------------------------", 15, 132);
    doc.text("Thank you for booking with us!", 15, 140);

    doc.save(`BorrowWheelz_Receipt_${order._id}.pdf`);
  };

  // Animation for cards
  const cardAnim = "transition-all duration-300 hover:scale-105 hover:shadow-2xl";

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-indigo-50 p-8 font-sans text-gray-800 pt-24">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-fadein">
          {getGreeting()},{" "}
          <span className="text-gray-700">{user?.name || "User"}</span>
        </h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* User Profile */}
        <div
          className={`bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl border border-teal-100 relative group ${cardAnim}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative">
            <img
              src={
                user?.profilePic ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user?.name || "User")
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-teal-400 shadow-lg"
            />
            
          </div>
          {!editMode ? (
            <>
              <h2 className="text-2xl font-bold mb-1 flex items-center gap-2 text-teal-800">{user?.name || "User"}</h2>
              <p className="text-sm text-teal-700 mb-1 flex items-center gap-2">
                <FaEnvelope className="text-teal-400" /> {user?.email || "No email"}
              </p>
              <p className="text-sm text-teal-700 flex items-center gap-2">
                <FaPhone className="text-teal-400" /> {user?.phone || "No phone"}
              </p>
              {hovered && isLoggedIn && (
                <button
                  className="absolute top-3 right-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs shadow hover:bg-teal-700 transition"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              )}
            </>
          ) : (
            <form
              className="w-full flex flex-col items-center animate-fadein"
              onSubmit={handleProfileUpdate}
            >
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="mb-2 p-2 border border-teal-200 rounded w-full text-center focus:ring-2 focus:ring-teal-400"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="mb-2 p-2 border border-teal-200 rounded w-full text-center focus:ring-2 focus:ring-teal-400"
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="mb-2 p-2 border border-teal-200 rounded w-full text-center focus:ring-2 focus:ring-teal-400"
                placeholder="Phone"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-1 rounded shadow hover:bg-teal-700 transition"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-1 rounded shadow hover:bg-gray-300 transition"
                  onClick={() => {
                    setEditMode(false);
                    setProfile({
                      name: user?.name || "",
                      email: user?.email || "",
                      phone: user?.phone || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Stats & Shortcuts */}
        <div className={`bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-2xl p-6 flex flex-col items-center shadow-xl border border-yellow-100 space-y-4 ${cardAnim} lg:col-span-1`}>
          <h4 className="font-semibold mb-4 text-center w-full text-yellow-700">Your Stats</h4>
          <div className="w-full flex flex-col gap-2">
            <div className="bg-white rounded-lg p-4 shadow flex items-center gap-3 hover:bg-yellow-50 transition">
              <FaBoxOpen className="text-yellow-500 text-2xl animate-bounce" />
              <div>
                <p className="font-medium text-sm">Total Orders</p>
                <p className="text-xs text-gray-500">{orders.length} placed</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow flex items-center gap-3 hover:bg-indigo-50 transition">
              <FaStar className="text-indigo-500 text-2xl animate-pulse" />
              <div>
                <p className="font-medium text-sm">Reviews Written</p>
                <p className="text-xs text-gray-500">{reviews.length} reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Orders */}
        <div className={`bg-white rounded-2xl p-6 shadow-xl border border-teal-100 ${cardAnim} lg:col-span-1`}>
          <h4 className="font-semibold mb-4 text-teal-700">Your Orders</h4>
          <div className="space-y-4">
            {orders.length === 0 && (
              <div className="text-gray-400 text-sm">No orders found.</div>
            )}
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex items-center gap-4 cursor-pointer hover:bg-teal-50 rounded-xl p-2 transition group"
                onClick={() => {
                  if (order.status === "accepted") {
                    handleDownloadReceipt(order);
                  } else {
                    alert("Receipt is available only for accepted orders.");
                  }
                }}
              >
                <div className="relative">
                  <FaCar className="absolute -top-2 -left-2 text-teal-300 text-lg animate-pulse" />
                  <img
                    src={
                      order.cars?.[0]?.car_image
                        ? `${globalBackendRoute}/${order.cars[0].car_image}`
                        : "https://ui-avatars.com/api/?name=Order"
                    }
                    className="w-10 h-10 rounded-full object-cover border-2 border-teal-200"
                    alt="order"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-teal-700 transition">
                    {order.cars?.[0]?.car?.car_name || "Car Order"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {order.cars?.[0]?.fromDate
                      ? `From: ${new Date(order.cars[0].fromDate).toLocaleDateString()}`
                      : ""}
                    {order.cars?.[0]?.toDate
                      ? ` - To: ${new Date(order.cars[0].toDate).toLocaleDateString()}`
                      : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    Status: {order.status || "pending"}
                  </p>
                </div>
                {/* No download button here, click on the order to download if accepted */}
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Quick Actions */}
        <div className={`bg-gradient-to-br from-teal-100 via-white to-teal-50 rounded-2xl p-6 flex flex-col items-center shadow-xl border border-teal-100 ${cardAnim}`}>
          <h4 className="font-semibold mb-4 text-center w-full text-teal-700">Quick Actions & Insights</h4>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow transition flex items-center justify-center gap-2"
              onClick={() => navigate("/rent")}
            >
              <FaCar /> Rent a Car
            </button>
          </div>
          <div className="mt-6 w-full">
            <h5 className="font-semibold mb-2 text-teal-700">Account Insights</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <FaClipboardList className="text-teal-400" />
                <span className="font-bold">{orders.length}</span> Orders placed
              </li>
              <li className="flex items-center gap-2">
                {user?.email ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-400" />
                )}
                Email {user?.email ? "verified" : "not verified"}
              </li>
              <li className="flex items-center gap-2">
                {user?.phone ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-400" />
                )}
                Phone {user?.phone ? "added" : "not added"}
              </li>
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div className={`bg-white rounded-2xl p-6 shadow-xl border border-indigo-100 ${cardAnim} lg:col-span-2`}>
          <h4 className="font-semibold mb-4 text-indigo-700">Your Reviews</h4>
          <div className="space-y-4">
            {reviews.length === 0 && (
              <div className="text-gray-400 text-sm">No reviews found.</div>
            )}
            {reviews
              .slice(0, 3)
              .map((review) => (
                <div
                  key={review._id}
                  className="flex items-center gap-4 cursor-pointer hover:bg-indigo-50 rounded-xl p-2 transition group"
                  onClick={() =>
                    review.carId && review.carId.slug
                      ? navigate(`/singlerent/${review.carId.slug}`)
                      : undefined
                  }
                >
                  <div className="relative">
                    <FaStar className="absolute -top-2 -left-2 text-yellow-400 text-lg animate-spin-slow" />
                    <img
                      src={
                        review.carId && review.carId.car_image
                          ? `${globalBackendRoute}/${review.carId.car_image}`
                          : "https://ui-avatars.com/api/?name=Car"
                      }
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
                      alt="car"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm group-hover:text-indigo-700 transition">
                      {review.carId?.car_name || review.carName || "Car"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {review.reviewContent?.slice(0, 60) || ""}
                      {review.reviewContent?.length > 60 ? "..." : ""}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Personalized Tips & Help */}
        <div className={`bg-gradient-to-br from-indigo-50 via-white to-indigo-100 rounded-2xl p-6 flex flex-col items-center shadow-xl border border-indigo-100 ${cardAnim} lg:col-span-2`}>
          <h4 className="font-semibold mb-4 text-center w-full text-indigo-700">Tips & Support</h4>
          <div className="w-full flex flex-col gap-4">
            <div className="bg-white rounded-lg p-4 shadow flex items-center gap-3 hover:bg-indigo-50 transition">
              <span className="text-indigo-500 text-xl animate-bounce">💡</span>
              <div>
                <p className="font-medium text-sm">Tip: Keep your profile updated</p>
                <p className="text-xs text-gray-500">A complete profile helps us serve you better and ensures smooth bookings.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow flex items-center gap-3 hover:bg-teal-50 transition">
              <span className="text-teal-500 text-xl animate-pulse">🚗</span>
              <div>
                <p className="font-medium text-sm">Explore More Cars</p>
                <p className="text-xs text-gray-500">Check out our latest arrivals and trending cars for your next ride.</p>
              </div>
              <button
                className="ml-auto bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-xs shadow"
                onClick={() => navigate("/rent")}
              >
                Browse Cars
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow flex items-center gap-3 hover:bg-yellow-50 transition">
              <span className="text-yellow-500 text-xl animate-spin-slow">❓</span>
              <div>
                <p className="font-medium text-sm">Need Help?</p>
                <p className="text-xs text-gray-500">Visit our <span className="underline cursor-pointer" onClick={() => navigate("/contact-us")}>Contact Us</span> page for support or questions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadein {
            animation: fadein 0.7s;
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .animate-spin-slow {
            animation: spin-slow 2.5s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
