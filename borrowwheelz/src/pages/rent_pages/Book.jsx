import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { AuthContext } from "../../components/auth_components/AuthManager";
import { CalendarDays, Phone, Mail, User } from "lucide-react";

const Book = () => {
  const [searchParams] = useSearchParams();
  const carSlug = searchParams.get("car");
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fromDate: "",
    toDate: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [car, setCar] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    cardExpiryMM: "",
    cardExpiryYY: "",
    cardCVV: "",
  });

  const calculateTotalPrice = () => {
    if (formData.fromDate && formData.toDate) {
      const from = new Date(formData.fromDate);
      const to = new Date(formData.toDate);
      const rentalDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
      if (rentalDays > 0) {
        setTotalPrice(rentalDays * car.rental_price_per_day);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.fromDate, formData.toDate]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/get-car-by-slug/${carSlug}`);
        setCar(res.data);
        if (res.data.vendor) {
          const vendorRes = await axios.get(`${globalBackendRoute}/api/get-vendor-by-id/${res.data.vendor}`);
          setVendor(vendorRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch car or vendor details:", err.message);
      }
    };

    if (carSlug) fetchCarDetails();
  }, [carSlug]);

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({ ...prev, name: user.name }));
    }
  }, [isLoggedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login", { state: { message: "Please log in to confirm your booking." } });
      return;
    }
    let cardExpiry = "";
    if (paymentMethod === "card") {
      const mm = cardDetails.cardExpiryMM.padStart(2, "0");
      const yyyy = cardDetails.cardExpiryYY.length === 2 ? `20${cardDetails.cardExpiryYY}` : cardDetails.cardExpiryYY;
      cardExpiry = mm && yyyy ? `${mm}/${yyyy}` : "";
    }

    // Prepare car booking details
    const carBooking = {
      car: car._id,
      car_image: car.car_image,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
    };

    const bookingPayload = {
      user: user.id || user._id,
      email: formData.email,
      cars: [carBooking],
      vendor: vendor?._id,
      paymentMethod,
      ...(paymentMethod === "card"
        ? {
            cardNumber: cardDetails.cardNumber,
            cardName: cardDetails.cardName,
            cardExpiry,
            cardCVV: cardDetails.cardCVV,
          }
        : {}),
    };

    try {
      await axios.post(`${globalBackendRoute}/api/book/add`, bookingPayload);
      navigate("/thank-you");
    } catch (err) {
      alert("Failed to book. Please try again.");
    }
  };

  if (!car) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 rounded-3xl mt-20">
      {/* Left Section */}
      <div className="p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-inner">
        <h2 className="text-4xl font-bold mb-8 text-teal-700">Book Your Ride</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Name", type: "text", name: "name", icon: <User /> },
            { label: "Email", type: "email", name: "email", icon: <Mail /> },
            { label: "Phone", type: "tel", name: "phone", icon: <Phone /> },
            { label: "From Date", type: "date", name: "fromDate", icon: <CalendarDays /> },
            { label: "To Date", type: "date", name: "toDate", icon: <CalendarDays /> },
          ].map(({ label, type, name, icon }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <div className="flex items-center border rounded-md bg-white p-2 shadow-sm">
                <span className="text-gray-400 mr-2">{icon}</span>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-gray-700"
                  disabled={isLoggedIn && name === "name"}
                />
              </div>
            </div>
          ))}

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-teal-600"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="accent-teal-600"
                />
                Card
              </label>
            </div>
          </div>

          {/* Card Details */}
          {paymentMethod === "card" && (
            <div className="space-y-4 bg-white p-4 rounded-md shadow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  maxLength={16}
                  pattern="\d*"
                  required
                  className="w-full border rounded-md p-2 outline-none"
                  placeholder="Card Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  name="cardName"
                  value={cardDetails.cardName}
                  onChange={handleCardChange}
                  required
                  className="w-full border rounded-md p-2 outline-none"
                  placeholder="Name as per card"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="cardExpiryMM"
                      value={cardDetails.cardExpiryMM}
                      onChange={handleCardChange}
                      maxLength={2}
                      pattern="\d*"
                      required
                      className="w-16 border rounded-md p-2 outline-none"
                      placeholder="MM"
                    />
                    <span className="self-center">/</span>
                    <input
                      type="text"
                      name="cardExpiryYY"
                      value={cardDetails.cardExpiryYY}
                      onChange={handleCardChange}
                      maxLength={4}
                      pattern="\d*"
                      required
                      className="w-20 border rounded-md p-2 outline-none"
                      placeholder="YYYY"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="password"
                    name="cardCVV"
                    value={cardDetails.cardCVV}
                    onChange={handleCardChange}
                    maxLength={4}
                    pattern="\d*"
                    required
                    className="w-full border rounded-md p-2 outline-none"
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-lg font-semibold text-gray-700">
            Total Price: <span className="text-teal-600">₹{totalPrice}</span>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold shadow-lg transition duration-200"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="space-y-6">
        <div className="w-full h-[300px]  rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
          <img
            src={`${globalBackendRoute}/${car.car_image}`}
            alt={car.car_name}
            className="object-contain max-h-full"
          />
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-teal-700 mb-2">{car.car_name}</h2>
          <div className="space-y-1 text-gray-700">
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Fuel:</strong> {car.fuel_type}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Seats:</strong> {car.seating_capacity}</p>
            <p><strong>Mileage:</strong> {car.mileage} km/l</p>
            <p>
              <strong>Availability:</strong>{" "}
              {car.availability_status ? (
                <span className="text-green-600 font-semibold">Available</span>
              ) : (
                <span className="text-red-600 font-semibold">Not Available</span>
              )}
            </p>
            <p className="text-xl font-bold text-black mt-3">
              ₹{car.rental_price_per_day}
              <span className="text-sm text-gray-500 font-normal"> /day</span>
            </p>
          </div>
        </div>

        {vendor && (
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-teal-700 mb-2">Vendor Details</h3>
            <div className="space-y-1 text-gray-700">
              <p><strong>Name:</strong> {vendor.vendor_name}</p>
              <p><strong>Email:</strong> {vendor.vendor_email}</p>
              <p><strong>Phone:</strong> {vendor.vendor_phone}</p>
              <p><strong>Address:</strong> {`${vendor.vendor_address.street}, ${vendor.vendor_address.city}, ${vendor.vendor_address.state}, ${vendor.vendor_address.zip_code}, ${vendor.vendor_address.country}`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
