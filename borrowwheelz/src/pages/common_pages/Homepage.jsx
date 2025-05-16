import React from 'react'
import { useNavigate } from 'react-router-dom'
import FindYourRent from '../../components/homepage_components/FindYourRent'
import CarsByBudget from '../../components/homepage_components/CarsByBuget'
import PopularCarOffers from '../../components/homepage_components/PopularCarOffers'
import CarBrands from '../../components/homepage_components/CarBrands'
import TopCarsIndia from '../../components/homepage_components/TopCarsIndia'
import CarsByFuelType from '../../components/homepage_components/CarsByFuelType'
import CarProducts from '../../components/homepage_components/CarProduct'
import FeaturedCarAccessories from '../../components/homepage_components/FeaturedCarAccessories'
import Carousel from '../../components/homepage_components/Carousel'
import img1 from "../../assets/carousel/hyundai.webp"
import img2 from "../../assets/carousel/fronx.webp"


const Homepage = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/singlerent/maru-fronx');
  };

  return (
    <div>
      <div className="h-[110vh] mt-20">
        <FindYourRent />
      </div>

      <div className="w-auto max-w-[975px] mx-auto ">
        
        <h1 className='text-4xl font-serif font-bold text-center text-red-600 mb-6 animate-fade-in'>
          POPULAR RIGHT NOW!
        </h1>
        <img 
          src={img2} 
          alt="Popular Car" 
          className='rounded-md shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer'
          onClick={handleImageClick}
        />
        <CarsByBudget />
        <PopularCarOffers />

      </div>
      
      <div className="my-9">
        <img src={img1} alt="" />
      </div>


      <div className="w-auto max-w-[950px] mx-auto">

        <CarBrands />
        <TopCarsIndia />
        <CarsByFuelType />
      </div>

      <CarProducts />
      <FeaturedCarAccessories />

    </div>
  )
}

export default Homepage
