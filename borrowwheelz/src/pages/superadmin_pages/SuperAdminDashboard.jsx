import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";
import {
  FaUserShield,
  FaEnvelope,
  FaUserCircle,
  FaCrown,
  FaEdit,
  FaPhoneAlt,
  FaCalendarAlt,
  FaEye,
  FaShoppingCart,
  FaChartLine,
  FaUsers,
  FaStar,
  FaMoneyBillWave,
  FaCar,
  FaCarSide,
  FaBolt,
  FaInfoCircle,
  FaRegSmileBeam,
  FaRegClock,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaRegUser,
  FaRegCalendarAlt,
  FaRegEnvelope,
  FaRegStar,
  FaRegBuilding,
  FaRegPlusSquare,
} from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    plan: "Standard",
    role: "",
    email: "",
  });
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [websiteViews, setWebsiteViews] = useState(0);
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch logged in superadmin details
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;
        const res = await axios.get(
          `${globalBackendRoute}/api/getUserById/${userId}`
        );
        setUser({
          name: res.data.name,
          avatar: res.data.avatar
            ? `${globalBackendRoute}/${res.data.avatar}`
            : "https://randomuser.me/api/portraits/men/32.jpg",
          plan: "Standard",
          role: res.data.role || "Superadmin",
          email: res.data.email,
        });
      } catch {
        setUser({
          name: "Super Admin",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          plan: "Standard",
          role: "Superadmin",
          email: "",
        });
      }
    };
    fetchUser();

    // Fetch all reviews for messages section
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/review/allreviews`
        );
        setReviews(res.data || []);
      } catch {
        setReviews([]);
      }
    };
    fetchReviews();

    // Fetch all bookings for revenue
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/book/all-books`);
        setBooks(res.data || []);
      } catch {
        setBooks([]);
      }
    };
    fetchBooks();

    // Fetch all users for top cards
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-users`);
        setAllUsers(res.data || []);
      } catch {
        setAllUsers([]);
      }
    };
    fetchAllUsers();

    // Fetch all cars for device section
    const fetchCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setCars(res.data || []);
      } catch {
        setCars([]);
      }
    };
    fetchCars();

    // Fetch website views (simulate or use your endpoint)
    const fetchWebsiteViews = async () => {
      try {
        // Replace with your real endpoint if available
        // const res = await axios.get(`${globalBackendRoute}/api/website-views`);
        // setWebsiteViews(res.data.views || 0);
        setWebsiteViews(48213); // Simulated value (NOT dynamic)
      } catch {
        setWebsiteViews(48213);
      }
    };
    fetchWebsiteViews();
  }, []);

  // Calculate total revenue from all bookings (sum of all car bookings' price)
  const totalRevenue = books.reduce((sum, book) => {
    if (!book.cars || !Array.isArray(book.cars)) return sum;
    return (
      sum +
      book.cars.reduce((carSum, carObj) => {
        // Try to get rental_price_per_day from populated car, else fallback to 0
        const pricePerDay = carObj.car?.rental_price_per_day || 0;
        const from = carObj.fromDate ? new Date(carObj.fromDate) : null;
        const to = carObj.toDate ? new Date(carObj.toDate) : null;
        let days = 1;
        if (from && to) {
          days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
        }
        return carSum + pricePerDay * days;
      }, 0)
    );
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 text-[#1e1e2f] font-sans flex mt-[45px] mb-[-20px]">
      {/* Sidebar/Profile */}
      <div className="w-[320px] bg-white shadow-2xl rounded-xl p-6 flex flex-col border border-indigo-100 animate-fadein h-screen sticky top-0">
        <div>
          <div className="flex flex-col items-center mt-8">
            <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-6xl font-bold text-indigo-600 mb-2 shadow-lg border-4 border-indigo-200 animate-fadein animate-bounce-slow">
              {user.avatar && !user.avatar.includes("randomuser.me") ? (
                <img
                  src={user.avatar}
                  className="w-28 h-28 rounded-full object-cover border-2 border-indigo-300"
                  alt="avatar"
                />
              ) : (
                <FaRegUser className="text-indigo-400" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <FaUserCircle className="text-indigo-400 text-2xl animate-bounce" />
              <h3 className="font-bold text-xl">{user.name}</h3>
              {user.role === "superadmin" && (
                <FaCrown
                  className="text-yellow-500 text-xl animate-bounce"
                  title="Superadmin"
                />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-500 text-base">
              <FaUserShield className="text-indigo-400" />
              <span className="font-semibold capitalize">{user.role}</span>
            </div>
            {user.email && (
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <FaEnvelope className="text-indigo-300" />
                <span>{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <FaPhoneAlt className="text-indigo-300" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.createdAt && (
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <FaCalendarAlt className="text-indigo-300" />
                <span>
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg text-sm hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg animate-fadein"
              onClick={() => navigate(`/profile/${user._id || user.id}`)}
            >
              <FaEdit className="text-white" /> Edit Profile
            </button>
          </div>
          <div className="mt-8 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 flex items-center gap-1">
                <FaMoneyBillWave className="text-green-400" /> Total revenue
              </span>
              <span className="font-semibold text-lg">
                ₹{totalRevenue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 flex items-center gap-1">
                <FaShoppingCart className="text-indigo-400" /> Total Bookings
              </span>
              <span className="font-semibold text-lg">{books.length}</span>
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <div className="mt-10">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaRegStar className="text-yellow-400" /> Recent Reviews
          </h4>
          <div className="space-y-4 text-sm max-h-64 overflow-y-auto custom-scrollbar-hide">
            {reviews.length === 0 && (
              <div className="text-gray-400 flex items-center gap-2">
                <FaRegSmileBeam className="text-2xl" /> No reviews found.
              </div>
            )}
            {reviews.slice(0, 8).map((r, i) => (
              <div
                key={r._id || i}
                className="flex flex-col border-b pb-2 mb-2 animate-fadein"
              >
                <span className="font-medium text-indigo-700 flex items-center gap-1">
                  <FaUserCircle className="text-indigo-400" />
                  {r.username || (r.userId && r.userId.name) || "User"}
                </span>
                <span className="text-gray-600">{r.reviewContent}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FaRegClock />{" "}
                  {r.createdAt
                    ? new Date(r.createdAt).toLocaleDateString() +
                      " " +
                      new Date(r.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-full bg-white border border-gray-200 w-60 text-sm"
            />
            <button className="w-10 h-6 bg-indigo-500 rounded-full flex items-center justify-end pr-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "Users",
              value: allUsers.length.toLocaleString(),
              icon: <FaUsers className="text-indigo-500 animate-bounce" />,
              bg: "from-indigo-100 to-indigo-50",
            },
            {
              title: "Website views",
              value: websiteViews.toLocaleString(),
              icon: <FaEye className="text-blue-500 animate-pulse" />,
              bg: "from-blue-100 to-blue-50",
            },
            {
              title: "Orders",
              value: books.length.toLocaleString(),
              icon: <FaShoppingCart className="text-green-500 animate-bounce" />,
              bg: "from-green-100 to-green-50",
            },
            {
              title: "Reviews",
              value: reviews.length.toLocaleString(),
              icon: <FaStar className="text-yellow-400 animate-bounce" />,
              bg: "from-yellow-100 to-yellow-50",
            },            
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${item.bg} rounded-xl p-4 shadow-md flex flex-col gap-2 items-center animate-fadein transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="text-3xl mb-1">{item.icon}</div>
              <div className="text-gray-600 text-sm font-semibold">{item.title}</div>
              <div className="text-2xl font-extrabold text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>
        <style>
          {`
            @keyframes spin-slow {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
            .animate-spin-slow {
              animation: spin-slow 2.5s linear infinite;
            }
            .animate-bounce {
              animation: bounce 1.2s infinite alternate;
            }
            @keyframes bounce {
              0% { transform: translateY(0);}
              100% { transform: translateY(-8px);}
            }
            .animate-bounce-slow {
              animation: bounce 2.5s infinite alternate;
            }
            .animate-pulse {
              animation: pulse 1.5s infinite;
            }
            @keyframes pulse {
              0%, 100% { opacity: 1;}
              50% { opacity: 0.6;}
            }
          `}
        </style>

        {/* Middle Charts */}
        <div className="grid grid-cols-3 gap-6">
          {/* All Cars Section - now spans 2 columns and has scroll */}
          <div className="bg-white rounded-xl p-6 shadow-md col-span-2 flex flex-col">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <FaCarSide className="text-indigo-400 animate-caricon" /> All Cars
            </h4>
            <div className="flex-1 min-h-[160px] max-h-72 overflow-y-auto custom-scrollbar-hide pr-2">
              {cars.length === 0 && (
                <div className="text-gray-400 text-center mt-8">No cars found.</div>
              )}
              <div className="grid grid-cols-1 gap-3">
                {cars.map((car, idx) => {
                  // Pick a dynamic icon based on fuel type or index
                  let Icon = FaCar;
                  let iconColor = "text-indigo-400";
                  if (car.fuel_type?.toLowerCase() === "electric") {
                    Icon = FaBolt;
                    iconColor = "text-green-500";
                  } else if (car.fuel_type?.toLowerCase() === "diesel") {
                    iconColor = "text-gray-700";
                  } else if (car.fuel_type?.toLowerCase() === "petrol") {
                    iconColor = "text-orange-400";
                  }
                  return (
                    <div
                      key={car._id}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 shadow group bg-white hover:bg-indigo-50 transition-all duration-200 hover:scale-[1.025] border border-transparent hover:border-indigo-200 cursor-pointer animate-fadein"
                      style={{ animationDelay: `${idx * 40}ms` }}
                    >
                      <div className="relative flex-shrink-0">
                        <span className={`absolute -top-2 -left-2 z-10`}>
                          <Icon className={`text-2xl ${iconColor} animate-caricon`} />
                        </span>
                        <img
                          src={
                            car.car_image
                              ? `${globalBackendRoute}/${car.car_image}`
                              : "https://ui-avatars.com/api/?name=Car"
                          }
                          alt={car.car_name}
                          className="w-14 h-14 rounded-lg object-cover border-2 border-indigo-200 shadow group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-indigo-700 text-base group-hover:text-indigo-900 transition">{car.car_name}</div>
                        <div className="text-xs text-gray-500">{car.model} • {car.year} • {car.fuel_type}</div>
                        <div className="text-xs text-gray-400">
                          ₹{car.rental_price_per_day?.toLocaleString()} /day
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-200 ${
                          car.availability_status
                            ? "bg-green-100 text-green-700 group-hover:bg-green-200"
                            : "bg-red-100 text-red-700 group-hover:bg-red-200"
                        }`}
                      >
                        {car.availability_status ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Orders Section (replaces Revenue by location) */}
          <div className="bg-white rounded-xl p-6 shadow-sm col-span-1 flex flex-col">
            <h4 className="font-semibold mb-4">Recent Orders</h4>
            <div className="flex-1 min-h-[160px] max-h-72 overflow-y-auto custom-scrollbar-hide pr-2">
              {books.length === 0 && (
                <div className="text-gray-400 text-center mt-8">No orders found.</div>
              )}
              <div className="space-y-4">
                {books
                  .slice()
                  .sort((a, b) => new Date(b.bookingDate || b.createdAt) - new Date(a.bookingDate || a.createdAt))
                  .slice(0, 8)
                  .map((order) => (
                  <div
                    key={order._id}
                    className="border-b pb-2 mb-2 flex flex-col gap-1 animate-fadein"
                  >
                    <div className="flex items-center gap-2">
                      <FaShoppingCart className="text-green-500" />
                      <span className="font-semibold text-indigo-700">
                        {order.user?.name || "User"}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {order.bookingDate
                          ? new Date(order.bookingDate).toLocaleDateString()
                          : order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {order.cars && order.cars.length > 0
                        ? order.cars
                            .map(
                              (c) =>
                                `${c.car?.car_name || "Car"} (${c.fromDate ? new Date(c.fromDate).toLocaleDateString() : ""} - ${c.toDate ? new Date(c.toDate).toLocaleDateString() : ""})`
                            )
                            .join(", ")
                        : "No cars"}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          order.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : order.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Pending"}
                      </span>
                      {/* Accept/Reject buttons for superadmin */}
                      {order.status !== "accepted" && order.status !== "rejected" && (
                        <>
                          <button
                            className="ml-auto px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition"
                            onClick={async () => {
                              try {
                                await axios.put(
                                  `${globalBackendRoute}/api/book/update-book/${order._id}`,
                                  { status: "accepted" }
                                );
                                // Refresh orders
                                const res = await axios.get(`${globalBackendRoute}/api/book/all-books`);
                                setBooks(res.data || []);
                              } catch {
                                alert("Failed to accept order.");
                              }
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
                            onClick={async () => {
                              try {
                                await axios.put(
                                  `${globalBackendRoute}/api/book/update-book/${order._id}`,
                                  { status: "rejected" }
                                );
                                // Refresh orders
                                const res = await axios.get(`${globalBackendRoute}/api/book/all-books`);
                                setBooks(res.data || []);
                              } catch {
                                alert("Failed to reject order.");
                              }
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
            .custom-scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .custom-scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @keyframes spin-slow {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
            .animate-spin-slow {
              animation: spin-slow 2.5s linear infinite;
            }
            .animate-bounce {
              animation: bounce 1.2s infinite alternate;
            }
            @keyframes bounce {
              0% { transform: translateY(0);}
              100% { transform: translateY(-8px);}
            }
            .animate-bounce-slow {
              animation: bounce 2.5s infinite alternate;
            }
            .animate-pulse {
              animation: pulse 1.5s infinite;
            }
            @keyframes pulse {
              0%, 100% { opacity: 1;}
              50% { opacity: 0.6;}
            }
            @keyframes caricon {
              0% { transform: translateY(0);}
              50% { transform: translateY(-4px);}
              100% { transform: translateY(0);}
            }
            .animate-caricon {
              animation: caricon 1.2s infinite;
            }
            .animate-fadein {
              animation: fadein 0.7s;
            }
            @keyframes fadein {
              from { opacity: 0; transform: translateY(20px);}
              to { opacity: 1; transform: translateY(0);}
            }
          `}
        </style>

        {/* Action Buttons Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6">
          <button
            className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl p-4 shadow hover:scale-105 hover:shadow-lg transition font-semibold text-indigo-700"
            onClick={() => navigate("/add-car")}
          >
            <FaCar className="text-2xl" />
            <span>Add Car</span>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-4 shadow hover:scale-105 hover:shadow-lg transition font-semibold text-green-700"
            onClick={() => navigate("/add-product")}
          >
            <FaStar className="text-2xl" />
            <span>Add Product</span>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 shadow hover:scale-105 hover:shadow-lg transition font-semibold text-blue-700"
            onClick={() => navigate("/add-vendor")}
          >
            <FaUserShield className="text-2xl" />
            <span>Add Vendor</span>
          </button>
          <button
            className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl p-4 shadow hover:scale-105 hover:shadow-lg transition font-semibold text-yellow-700"
            onClick={() => navigate("/add-outlet")}
          >
            <FaShoppingCart className="text-2xl" />
            <span>Add Outlet</span>
          </button>
        </div>
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
        `}
      </style>
    </div>
  );
}
