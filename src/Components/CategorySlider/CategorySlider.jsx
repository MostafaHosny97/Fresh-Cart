import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";

export default function CategorySlider() {

const [Category, setCategory] = useState(null);

async function allCategories(){
  const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories');
  setCategory(data.data);
}

useEffect(function(){
  allCategories();
},[])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };  
  return <>
    <div className="text-category d-flex align-items-center">
    <h3 className='py-4'>Shop Popular</h3>
    <h3 className='text-success px-2'>Categories</h3>
    </div>
  <Slider {...settings}>
  {Category?.map(function(category,idx){return <div key={idx}>
    <Link to={ `/categoryproducts/${category._id}` }>
    <img src={category.image} className='w-100 rounded-5' style={{'height':'200px'}} alt={category.title} />
    <h2 className='h6 pt-2 text-center text-success' >{ category.name }</h2>
    </Link>
  </div> })}
  </Slider>
  </>
}
