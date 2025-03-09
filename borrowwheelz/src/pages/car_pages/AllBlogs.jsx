import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaThList, FaThLarge, FaArrowLeft, FaArrowRight, FaCar } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import backendGlobalRoute from "../../config/config";

export default function AllCars() {
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${backendGlobalRoute}/api/all-cars`);
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = cars.filter((car) =>
      car.name.toLowerCase().includes(value) ||
      car.brand.toLowerCase().includes(value) ||
      car.category.toLowerCase().includes(value)
    );
    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-700 hover:text-cyan-800">Available Cars</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64 rounded-md border px-4 py-2 shadow-sm focus:ring-indigo-500"
          />
          <FaThList className={`cursor-pointer ${view === "list" ? "text-blue-500" : "text-gray-500"}`} onClick={() => setView("list")} />
          <FaThLarge className={`cursor-pointer ${view === "grid" ? "text-green-500" : "text-gray-500"}`} onClick={() => setView("grid")} />
        </div>
      </div>

      <motion.div className={`grid gap-6 ${view === "list" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {paginatedCars.map((car) => (
          <Link key={car._id} to={`/car-details/${car._id}`}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="border rounded-lg shadow-sm hover:shadow-md bg-white overflow-hidden p-4">
              <img src={car.image || "https://via.placeholder.com/150"} alt={car.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{car.name}</h3>
              <p className="text-sm text-gray-600 flex items-center"><FaCar className="mr-1 text-yellow-500" /> {car.brand}</p>
              <p className="text-gray-700">{car.description}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {filteredCars.length === 0 && <p className="text-center text-gray-600 mt-6">No cars found.</p>}

      <div className="flex justify-between items-center mt-8">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className={`flex items-center px-4 py-2 rounded-md text-white ${currentPage === 1 ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-500"}`}>
          <FaArrowLeft /> <span>Previous</span>
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`flex items-center px-4 py-2 rounded-md text-white ${currentPage === totalPages ? "bg-gray-300" : "bg-indigo-600 hover:bg-indigo-500"}`}>
          <span>Next</span> <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
