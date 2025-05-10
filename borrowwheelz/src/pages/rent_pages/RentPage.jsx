import React from "react";
import ByBrandSection from "../../components/rentpage_components/ByBrandSection";
import Creta from "../../assets/carousel/creta.webp"
import FeaturedCars from "../../components/rentpage_components/FeaturedCars";
import PopularCarOffers from "../../components/homepage_components/PopularCarOffers";
import FilterCars from "../../components/rentpage_components/FilterCarForm";


const RentPage = () => {
  return (
    <div className="w-auto max-w-[995px] mx-auto my-5">
      <h1 className="text-3xl font-bold">Rent a Car</h1>
      <p className="text-sm mb-6">Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ad error totam cupiditate velit quidem quo quibusdam exercitationem sint numquam, asperiores, perspiciatis eveniet sapiente mollitia itaque tempora neque pariatur et.</p>
      <ByBrandSection />

      <img src={Creta} alt="creataimg" className="rounded" />
      <FeaturedCars />
      <PopularCarOffers />
      <FilterCars />

           

    </div>
  );
};

export default RentPage;
