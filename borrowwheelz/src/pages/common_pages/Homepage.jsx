import React from 'react'
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

  return (
    <div>
      <div className="h-[110vh]">
        <FindYourRent />
      </div>

      <div className="w-auto max-w-[975px] mx-auto ">
        <img src={img2} alt="" className='rounded-md'/>
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
