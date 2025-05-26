import React, { useEffect, useState } from "react";
import globalBackendRoute from "../../config/Config";
import axios from "axios";

export default function NewsHome() {
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    // Fetch the latest published blog
    axios
      .get(`${globalBackendRoute}/api/blog/all-blogs`)
      .then((res) => {
        // Find the most recent published blog with an image
        const blogs = Array.isArray(res.data) ? res.data : [];
        const publishedBlogs = blogs.filter((b) => b.published);
        // Sort by createdAt descending
        publishedBlogs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFeaturedBlog(publishedBlogs[0] || null);
      })
      .catch(() => setFeaturedBlog(null));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 font-sans px-6 py-8 flex flex-col md:flex-row gap-10 mt-14">
      {/* Left Section */}
      <div className="flex-1">
        <h1 className="text-4xl mb-6 font-extrabold font-serif text-indigo-700 tracking-tight flex items-center gap-2">
          <span className="animate-bounce">🚗</span> Recent Blogs & News
        </h1>
        {/* Main Featured Article */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-indigo-100">
          {featuredBlog ? (
            <>
              <div className="relative">
                <img
                  src={
                    featuredBlog.featuredImage && !featuredBlog.featuredImage.startsWith("http")
                      ? `${globalBackendRoute.replace(/\/$/, "")}/${featuredBlog.featuredImage.replace(/^\/+/, "")}`
                      : featuredBlog.featuredImage
                      ? featuredBlog.featuredImage
                      : "/featured-image.jpg"
                  }
                  alt={featuredBlog.title}
                  className="w-full h-64 object-cover"
                  onError={e => { e.target.src = "/featured-image.jpg"; }}
                />
                <div className="absolute top-2 right-2 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded shadow">
                  BLOG
                </div>
              </div>
              <div className="p-6">
                <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase shadow">
                  {featuredBlog.category || "Blog"}
                </span>
                <h2 className="mt-4 text-2xl font-bold leading-snug text-gray-800 hover:text-indigo-700 transition">
                  {featuredBlog.title}
                </h2>
                <div className="text-gray-600 text-base mt-3 line-clamp-3">
                  {featuredBlog.summary ||
                    (featuredBlog.body?.slice(0, 120) + "...")}
                </div>
                <div className="flex gap-6 text-sm text-gray-500 mt-6 items-center">
                  <span className="flex items-center gap-1">
                    <span className="text-lg">📅</span>
                    {featuredBlog.createdAt
                      ? new Date(featuredBlog.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-lg">🏷️</span>
                    {typeof featuredBlog.tags === "string"
                      ? featuredBlog.tags
                          .split(",")
                          .map((t) => t.trim())
                          .slice(0, 2)
                          .join(", ")
                      : Array.isArray(featuredBlog.tags)
                      ? featuredBlog.tags.slice(0, 2).join(", ")
                      : ""}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="relative">
              <img
                src="/featured-image.jpg"
                alt="Featured"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                B
              </div>
            </div>
          )}
        </div>

        {/* Special Stories */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
              <span className="animate-bounce">⭐</span> Special Stories
            </h3>
            <span className="text-sm text-orange-500 font-medium cursor-pointer hover:underline">
              Read More
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-4">
          {[
            {
              img: "/vid1.jpg",
              title: "EV Revolution: India's Electric Car Boom"
            },
            {
              img: "/vid2.jpg",
              title: "Top 5 SUVs for Indian Roads"
            },
            {
              img: "/vid3.jpg",
              title: "How to Maintain Your Car for Longevity"
            },
            {
              img: "/vid4.jpg",
              title: "Upcoming Car Launches in 2024"
            },
          ].map((story, idx) => (
            <div key={idx} className="relative group hover:scale-105 transition">
              <img
                src={story.img}
                alt={story.title}
                className="rounded-xl w-full h-32 object-cover shadow"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-2 shadow-lg text-xl opacity-90 group-hover:bg-indigo-600 group-hover:text-white transition">
                  ▶
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-xs rounded px-2 py-1">
                {story.title}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-[340px] space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100">
          <h3 className="text-xl font-bold text-teal-700 mb-4 flex items-center gap-2">
            <span className="animate-bounce">📰</span> Car News & Updates
          </h3>
          {[
            {
              title: "Tata Motors Unveils New Electric SUV",
              desc: "Tata's latest EV comes with a 400km range and advanced safety features.",
              img: "/car-news-1.jpg",
            },
            {
              title: "Maruti Suzuki Launches Hybrid Swift",
              desc: "The new Swift Hybrid offers 30km/l mileage and sporty design.",
              img: "/car-news-2.jpg",
            },
            {
              title: "India's Top Selling Cars in 2024",
              desc: "Check out the most popular cars dominating Indian roads this year.",
              img: "/car-news-3.jpg",
            },
            {
              title: "Government Pushes for EV Infrastructure",
              desc: "More charging stations to be set up across major cities.",
              img: "/car-news-4.jpg",
            },
          ].map((news, idx) => (
            <div key={idx} className="flex items-start gap-3 mb-4 last:mb-0">
              <img
                src={news.img}
                alt={news.title}
                className="w-14 h-14 rounded-lg object-cover border border-teal-100 shadow"
              />
              <div>
                <p className="font-semibold text-gray-800">{news.title}</p>
                <p className="text-xs text-gray-500">{news.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-indigo-100 to-teal-100 rounded-2xl shadow p-4 text-center text-sm text-gray-700">
          <span className="font-bold text-indigo-700">BorrowWheelz</span> brings you the latest in car news, reviews, and automotive trends. Stay tuned for more updates!
        </div>
      </div>
      <style>
        {`
          @keyframes bounce {
            0% { transform: translateY(0);}
            100% { transform: translateY(-8px);}
          }
          .animate-bounce {
            animation: bounce 1.2s infinite alternate;
          }
        `}
      </style>
    </div>
  );
}
