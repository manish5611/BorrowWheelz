import React from "react";
import car1 from "../../assets/images/car1.png";
import "./Homepage.css";
import { LuAirplay } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { SlEarphonesAlt } from "react-icons/sl";

const Homepage = () => {
  return (
    <div className="bg-white main">
    
      <div className="w-full bg-gray-800 text-white sec">
        <div className="mt-3 text-center">
          <p className="text-orange-500 uppercase tracking-wide">
            Exclusive Car Deal
          </p>
          <h1 className="text-5xl font-bold">Fast & Affordable</h1>
        </div>
        <div className="container mx-auto max-w-screen-xl px-6 flex flex-col md:flex-row items-center justify-between">
         
          <div className="md:w-1/2 text-center md:text-left mt-3 bsec">
            <p className="text-orange-400 text-2xl mt-2">Bangalore / India</p>
            <p className="text-3xl font-semibold mt-2">$25 / Day</p>
            <button className="mt-6 bg-orange-500 px-6 py-3 rounded transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-orange-600">
              Book Now
            </button>
          </div>

        
          <div className="md:w-1/2 mt-5 md:mt-0 flex justify-center">
            <img src={car1} alt="Car Rental" className="w-full max-w-md" />
          </div>
        </div>
      </div>

  
      <div className="bg-orange-500 mx-3 py-8 px-4 md:px-10 text-white text-center rounded-lg shadow-lg sec2">
      
        <h2 className="text-4xl font-bold mb-6">Rent a Car Now!</h2>

      
        <form className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="flex-1 p-3 rounded text-black "
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="flex-1 p-3 rounded text-black "
            required
          />
          <input
            type="date"
            className="flex-1 p-3 rounded text-black "
            required
          />
          <input
            type="date"
            className="flex-1 p-3 rounded text-black "
            required
          />
          <select className="flex-1 p-3 rounded text-black ">
            <option value="">Select Car</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
          </select>
          <button className="bg-black py-3 px-6 rounded hover:bg-gray-800 transition ">
            Book Now
          </button>
        </form>
      </div>

      <div className="sec3 d-flex justify-evenly ">
        <div className="justify-items-center p-1 ">
          <LuAirplay className="w-10 h-10 m-1 sec3l" /> <h1>Services</h1>
          <span className="my-3">
            We offer a wide range of well-maintained vehicles at affordable
            prices, ensuring a smooth and hassle-free rental experience.
          </span>
        </div>
        <div className="justify-items-center p-1 ">
          <SlBadge className="w-10 h-10 m-1 sec3l" /> <h1>Achievements</h1>
          <span className="my-3">
            We have served thousands of happy customers with reliable,
            affordable, and quality car rental services.
          </span>
        </div>
        <div className="justify-items-center p-1 ">
          <SlEarphonesAlt className="w-10 h-10 m-1 sec3l" />{" "}
          <h1>24/7 Support</h1>
          <span className="my-3">
            Our 24/7 support ensures quick assistance, hassle-free booking, and
            a smooth car rental experience.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
