import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from "axios";
import {
  Car,
  Settings,
  Users,
  Gauge,
  Calendar,
  Star,
  X,
  Sun,
  Rocket,
  MonitorSmartphone,
  ShieldCheck,
  Sofa,
  Flame,
  User as UserIcon,
  Image as ImageIcon,
} from "lucide-react";
import globalBackendRoute from "../../config/Config";
import { AuthContext } from "../../components/auth_components/AuthManager";
import { FaStar, FaRegStar } from "react-icons/fa";

const SingleRentPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [allCars, setAllCars] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Review state
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(5);
  const [photos, setPhotos] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [reviewEmail, setReviewEmail] = useState(user?.email || "");

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/get-car-by-slug/${slug}`);
        setCar(res.data);
      } catch (err) {
        console.error("Failed to fetch car details:", err.message);
      }
    };

    const fetchAllCars = async () => {
      try {
        const res = await axios.get(`${globalBackendRoute}/api/all-added-cars`);
        setAllCars(res.data.filter((c) => c.slug !== slug)); // Exclude current car
      } catch (err) {
        console.error("Failed to fetch all cars:", err.message);
      }
    };

    fetchCarDetails();
    fetchAllCars();
  }, [slug]);

  // Fetch reviews for this car
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!car?._id) return;
        const res = await axios.get(`${globalBackendRoute}/api/review/allreviews?carId=${car._id}`);
        setReviews(res.data);
      } catch (err) {
        setReviews([]);
      }
    };
    fetchReviews();
  }, [car?._id]);

  useEffect(() => {
    if (isLoggedIn && user) {
      setReviewEmail(user.email || "");
    }
  }, [isLoggedIn, user]);

  const handleThumbnailNext = () => {
    if (startIndex + 3 < car.all_car_images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleThumbnailPrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const openModal = (index) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modalNext = () => {
    if (modalIndex < car.all_car_images.length - 1) {
      setModalIndex(modalIndex + 1);
    }
  };

  const modalPrev = () => {
    if (modalIndex > 0) {
      setModalIndex(modalIndex - 1);
    }
  };

  const visibleCount = 5; // For "You may also like"
  const visibleCars = allCars.slice(startIndex, startIndex + visibleCount);

  const handleNext = () => {
    if (startIndex + visibleCount < allCars.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Review form handlers
  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleEditClick = (review) => {
    setEditingReviewId(review._id);
    setReviewContent(review.reviewContent);
    setRating(review.rating);
    setPhotos([]); // User can upload new photos if desired
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setReviewContent("");
    setRating(5);
    setPhotos([]);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`${globalBackendRoute}/api/review/delete/${reviewId}`);
      setReviews(reviews.filter((r) => r._id !== reviewId));
      if (editingReviewId === reviewId) handleCancelEdit();
    } catch (err) {
      // Optionally show error
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      navigate("/login");
      return;
    }
    setReviewLoading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("userId", user.id || user._id);
      formDataObj.append("username", user.name);
      formDataObj.append("email", reviewEmail);
      formDataObj.append("rating", rating);
      formDataObj.append("reviewContent", reviewContent);
      formDataObj.append("carName", car.car_name);
      formDataObj.append("carId", car._id);
      photos.forEach((photo) => formDataObj.append("photos", photo));

      if (editingReviewId) {
        // Update review
        await axios.put(`${globalBackendRoute}/api/review/update/${editingReviewId}`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Add review
        await axios.post(`${globalBackendRoute}/api/review/add`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setReviewContent("");
      setReviewEmail(user.email || "");
      setRating(5);
      setPhotos([]);
      setEditingReviewId(null);
      // Refresh reviews
      const res = await axios.get(`${globalBackendRoute}/api/review/allreviews?carId=${car._id}`);
      setReviews(res.data);
    } catch (err) {
      // Optionally show error
    }
    setReviewLoading(false);
  };

  if (!car) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  // Calculate rating distribution and average
  const ratingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRatings = 0;
  let sumRatings = 0;
  reviews.forEach((r) => {
    ratingsCount[r.rating] = (ratingsCount[r.rating] || 0) + 1;
    totalRatings += 1;
    sumRatings += r.rating;
  });
  const avgRating = totalRatings ? (sumRatings / totalRatings).toFixed(1) : "0.0";

  const renderStars = (count) => (
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        fill={i < count ? "currentColor" : "none"}
      />
    ))
  );

  const RatingBar = ({ label, value }) => (
    <div className="flex items-center space-x-2">
      <span className="w-12 text-sm font-medium text-teal-700">{label}</span>
      <div className="flex-1 h-2 bg-teal-100 rounded overflow-hidden">
        <div
          className="h-full bg-teal-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="w-10 text-sm text-teal-700 text-right">{value}</span>
    </div>
  );

  const FeedbackCard = ({ name, image, rating, message, children }) => (
    <div className="flex items-start space-x-4 p-4 border border-teal-100 rounded-xl shadow-sm bg-white">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-teal-800">{name}</h4>
          <div className="flex text-teal-400">
            {Array(5)
              .fill(0)
              .map((_, i) =>
                i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
              )}
          </div>
        </div>
        <p className="text-sm text-teal-700 mt-1">{message}</p>
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 font-sans mt-20">

      {/* Main Image */}
      <div>
        <div className="w-full h-[400px] bg-white rounded-xl shadow-md overflow-hidden flex items-center justify-center">
          <img
            src={`${globalBackendRoute}/${car.car_image}`}
            alt={car.car_name}
            className="object-contain max-h-full"
            onClick={() => openModal(0)}
          />
        </div>

        {/* Thumbnail Slider */}
        <div className="relative mt-4 flex items-center">
          {startIndex > 0 && (
            <button
              onClick={handleThumbnailPrev}
              className="absolute left-0 z-10 bg-white shadow rounded-full p-1 hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
          )}
          <div className="flex gap-3 overflow-hidden ml-6 mr-6 w-full">
            {car.all_car_images?.slice(startIndex, startIndex + 3).map((img, i) => (
              <div
                key={i}
                className="flex-1 bg-white rounded-xl shadow hover:shadow-lg p-2 cursor-pointer"
                onClick={() => openModal(startIndex + i)}
              >
                <img
                  src={`${globalBackendRoute}/${img}`}
                  alt={`thumb-${i}`}
                  className="object-contain h-[80px] w-full"
                />
              </div>
            ))}
          </div>
          {startIndex + 3 < car.all_car_images.length && (
            <button
              onClick={handleThumbnailNext}
              className="absolute right-0 z-10 bg-white shadow rounded-full p-1 hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>

      {/* Car Info */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{car.car_name}</h2>
          <div className="text-gray-600 text-sm mt-1">
            <p>Brand: {car.brand}</p>
            <p>Model: {car.model}</p>
            <p>Year: {car.year}</p>
          </div>
          <p className="text-2xl font-semibold text-black mt-2">
            ₹{car.rental_price_per_day}
            <span className="text-sm text-gray-600 font-normal"> /day</span>
          </p>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed border-l-4 border-teal-500 pl-4 italic bg-gray-50 py-2">
          {car.description}
        </p>

        {/* Specifications */}
        <div>
          <h4 className="font-semibold text-sm text-gray-800 uppercase mb-2">Specifications</h4>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2"><Car className="h-5 w-5 text-teal-600" />Fuel Type: {car.fuel_type}</div>
            <div className="flex items-center gap-2"><Settings className="h-5 w-5 text-teal-600" />Transmission: {car.transmission}</div>
            <div className="flex items-center gap-2"><Gauge className="h-5 w-5 text-teal-600" />Mileage: {car.mileage} km/l</div>
            <div className="flex items-center gap-2"><Users className="h-5 w-5 text-teal-600" />Seating: {car.seating_capacity} passengers</div>
            <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-teal-600" />Availability: {car.availability_status ? "Available" : "Not Available"}</div>
            <div className="flex items-center gap-2"><Star className="h-5 w-5 text-teal-600" />Rating: {car.avg_rating} ({car.total_reviews} reviews)</div>
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md transition duration-200"
          onClick={() => navigate(`/book?car=${slug}`)}
        >
          Book This Car
        </button>
      </div>

      {/* Modal Image Viewer */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white rounded-full p-1 shadow hover:bg-gray-200"
          >
            <X />
          </button>
          <div className="relative max-w-4xl w-full h-[80vh] bg-white rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
            <img
              src={`${globalBackendRoute}/${car.all_car_images[modalIndex]}`}
              alt="preview"
              className="object-contain max-h-full max-w-full"
            />
            {modalIndex > 0 && (
              <button
                onClick={modalPrev}
                className="absolute left-4 bg-white p-1 rounded-full shadow hover:bg-gray-100"
              >
                <ChevronLeft />
              </button>
            )}
            {modalIndex < car.all_car_images.length - 1 && (
              <button
                onClick={modalNext}
                className="absolute right-4 bg-white p-1 rounded-full shadow hover:bg-gray-100"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Car Features */}
      <div className="md:col-span-2 mt-12 px-6 md:px-0 flex flex-col md:flex-row items-start gap-8">
        <h2 className="text-2xl font-semibold min-w-[150px]">Car Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <Feature icon={Sun} title="CONVERTIBLE TOP" text="Enjoy the open-air experience with an easy power-operated convertible top." />
          <Feature icon={Rocket} title="SPORT MODE" text="Unleash the full power of the V8 engine for an exhilarating ride." />
          <Feature icon={MonitorSmartphone} title="INFOTAINMENT SYSTEM" text="Stay connected with a modern and flexible multimedia system." />
          <Feature icon={ShieldCheck} title="ADVANCED SAFETY" text="Benefit from modern safety features, including airbags and stability control." />
          <Feature icon={Sofa} title="LEATHER INTERIOR" text="Experience premium comfort with leather-trimmed seats and design." />
          <Feature icon={Flame} title="ICONIC DESIGN" text="Turn heads with the timeless, bold styling of the Ford Mustang." />
        </div>
      </div>
<h1 className="text-3xl font-semibold mb-[-40px] mt-10">Reviews & Feedback</h1>
      {/* Review Section */}
      <div className="md:col-span-2 mt-1" id="reviews-section">
        <div className="max-w-6xl mx-auto p-8">
          {/* Rating Summary */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-3 col-span-2">
              <RatingBar label="FIVE"  value={ratingsCount[5] ? Math.round((ratingsCount[5] / totalRatings) * 100) : 0} />
              <RatingBar label="FOUR" value={ratingsCount[4] ? Math.round((ratingsCount[4] / totalRatings) * 100) : 0} />
              <RatingBar label="THREE" value={ratingsCount[3] ? Math.round((ratingsCount[3] / totalRatings) * 100) : 0} />
              <RatingBar label="TWO" value={ratingsCount[2] ? Math.round((ratingsCount[2] / totalRatings) * 100) : 0} />
              <RatingBar label="ONE" value={ratingsCount[1] ? Math.round((ratingsCount[1] / totalRatings) * 100) : 0} />
            </div>
            <div className="bg-teal-50 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-teal-500">{avgRating}</div>
              <div className="flex justify-center my-2 text-teal-400">
                {[...Array(5)].map((_, i) =>
                  i < Math.round(avgRating) ? <FaStar key={i} /> : <FaRegStar key={i} />
                )}
              </div>
              <p className="text-teal-700 font-medium">{totalRatings} Ratings</p>
            </div>
          </div>

          {/* Feedback + Form */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Recent Feedback */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-teal-800">
                Recent Feedbacks
              </h3>
              <div className="space-y-4">
                {reviews.length === 0 && (
                  <div className="text-teal-400 text-sm">No reviews yet.</div>
                )}
                {reviews.map((review) => (
                  <FeedbackCard
                    key={review._id}
                    name={review.username}
                    image={
                      review.userId && review.userId.profilePic
                        ? review.userId.profilePic
                        : "https://ui-avatars.com/api/?name=" + encodeURIComponent(review.username)
                    }
                    rating={review.rating}
                    message={review.reviewContent}
                  >
                    {review.photos && review.photos.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {review.photos.map((photo, idx) => (
                          <img
                            key={idx}
                            src={`${globalBackendRoute}/${photo.replace(/\\/g, "/")}`}
                            alt="review"
                            className="w-16 h-16 object-cover rounded border border-teal-100"
                          />
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-teal-400 mt-1">{new Date(review.createdAt).toLocaleString()}</div>
                    {isLoggedIn && user && (review.userId?._id === user.id || review.userId === user.id) && (
                      <div className="flex gap-2 mt-2">
                        <button
                          className="text-teal-600 text-xs hover:underline"
                          onClick={() => handleEditClick(review)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 text-xs hover:underline"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </FeedbackCard>
                ))}
              </div>
            </div>

            {/* Add Review */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-teal-800">
                {editingReviewId ? "Edit Your Review" : "Add a Review"}
              </h3>
              {isLoggedIn ? (
                <form className="space-y-5" onSubmit={handleReviewSubmit}>
                  <div>
                    <label className="block mb-1 font-medium text-sm text-teal-700">
                      Add Your Rating *
                    </label>
                    <div className="flex space-x-1 text-teal-400 text-xl">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} onClick={() => setRating(i + 1)} className="cursor-pointer">
                          {i < rating ? <FaStar /> : <FaRegStar />}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-sm text-teal-700">Name *</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={user?.name || ""}
                      disabled
                      className="w-full p-3 border rounded-md bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-sm text-teal-700">Email *</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={reviewEmail}
                      onChange={e => setReviewEmail(e.target.value)}
                      className="w-full p-3 border rounded-md bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-sm text-teal-700">
                      Write Your Review *
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Write here..."
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      className="w-full p-3 border rounded-md bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-teal-700">Photos (optional)</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="block w-full text-sm text-teal-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={reviewLoading}
                      className="w-full bg-teal-500 hover:bg-teal-600 transition-colors duration-200 text-white py-3 rounded-md font-semibold shadow-md"
                    >
                      {editingReviewId
                        ? reviewLoading
                          ? "Updating..."
                          : "Update Review"
                        : reviewLoading
                        ? "Submitting..."
                        : "Submit"}
                    </button>
                    {editingReviewId && (
                      <button
                        type="button"
                        className="w-full bg-gray-200 text-gray-700 py-3 rounded-md font-semibold shadow hover:bg-gray-300 transition"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div className="text-center text-teal-500">
                  <button
                    className="text-teal-600 underline"
                    onClick={() => navigate("/login")}
                  >
                    Login to add a review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* You may also like */}
      <div className="md:col-span-2 max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">You may also like</h2>
        <div className="relative flex items-center">
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 bg-white shadow rounded-full p-1 hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
          )}
          <div className="flex gap-4 overflow-hidden ml-6 mr-6 w-full">
            {visibleCars.map((relatedCar) => (
              <div
                key={relatedCar._id}
                className="rounded-lg shadow-md w-48 p-4 text-center text-black cursor-pointer"
                onClick={() => navigate(`/singlerent/${relatedCar.slug}`)}
              >
                <div className="bg-white">
                  <img
                    src={`${globalBackendRoute}/${relatedCar.car_image}`}
                    alt={relatedCar.car_name}
                    className="h-24 object-contain mx-auto mb-4"
                  />
                </div>

                <p className="font-semibold text-sm">{relatedCar.car_name}</p>
                <p className="text-sm text-gray-600 truncate">{relatedCar.description}</p>
                <p className="text-sm mt-1">₹{relatedCar.rental_price_per_day} / day</p>
              </div>
            ))}
          </div>
          {startIndex + visibleCount < allCars.length && (
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 bg-white shadow rounded-full p-1 hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable feature card
const Feature = ({ icon: Icon, title, text }) => (
  <div className="flex items-start gap-3 bg-gray-100 p-4 rounded-md shadow-sm">
    <Icon className="text-teal-600 w-5 h-5 mt-1" />
    <div>
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  </div>
);

export default SingleRentPage;
