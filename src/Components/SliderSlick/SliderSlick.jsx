import React from "react";
import Slider from "react-slick";

export default function SliderSlick() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };  
  return (
    <>
<div className="container my-5 py-5">
<Slider {...settings}>
<img src={require('../../Images/slider-image-2.jpeg')} alt="" height={400} className='w-100 '/>
<div>
<img src={require('../../Images/grocery-banner-2.jpeg')} alt="" height={200} className='w-100'/>
<img src={require('../../Images/slider-image-1.jpeg')} alt="" height={200} className='w-100'/>
</div>
<img src={require('../../Images/slider-image-3.jpeg')} alt="" height={400} className='w-100'/>
<div>
<img src={require('../../Images/slider-2.jpeg')} alt="" height={200} className='w-100'/>
<img src={require('../../Images/slider-2.jpeg')} alt="" height={200} className='w-100'/>
</div>
</Slider>
</div>
</>
)}
