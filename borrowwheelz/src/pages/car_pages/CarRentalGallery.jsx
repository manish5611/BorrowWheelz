import React from "react";
import sedan from "../../assets/images/sedan.jfif"
import suv from "../../assets/images/suv_adven.jfif"
import Convertible from "../../assets/images/Convertible_Drive.jfif"
import sports from "../../assets/images/sportscar.jfif"
import elecar from "../../assets/images/elecar.jfif"
import classic from "../../assets/images/classic.jfif"



const CarRentalGallery = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      {/* Heading */}
      <div className="text-center">
        <h4 className="text-yellow-500 uppercase font-semibold tracking-wide">
          Our Fleet
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">
          Browse Our Premium Cars
        </h2>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
          Choose from our extensive collection of well-maintained cars to suit your needs, whether for business trips, family vacations, or weekend getaways.
        </p>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8 px-4 ">
        <img src={sedan} alt="Luxury Sedan" className=" shadow-lg" />
        <img src={suv} alt="SUV Adventure" className=" shadow-lg" />
        <img src={Convertible} alt="Convertible Drive" className=" shadow-lg" />
        <img src={sports} alt="Sportscar Thrill" className=" shadow-lg" />
        <img src={elecar} alt="Electric Future" className=" shadow-lg" />
        <img src={classic} alt="Classic Comfort" className=" shadow-lg" />
      </div>
    </div>
  );
};

export default CarRentalGallery;
