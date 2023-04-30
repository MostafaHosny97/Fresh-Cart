import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import {  useParams } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import Slider from 'react-slick';
import { Helmet, HelmetProvider } from 'react-helmet-async';



export default function ProDetails() {

  const  {addProductToCart,removeCartItem } = useContext(cartContext);

  async function addToCart(id){
    await addProductToCart(id)
  };

  async function removeFromCart(id){
    await removeCartItem(id)
    };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };  

  const { id } = useParams();

  const [productDetails, setProductDetails] = useState(null);

  async function getProductDetails(){
    
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
      setProductDetails(data.data);
      console.log(data.data); 
      
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  useEffect(function(){
    getProductDetails()
  },[]);

  return <HelmetProvider>
  
  { productDetails?<div className="container mt-5">
    <Helmet>
    <title>Details {productDetails.title}</title>
    </Helmet>
    <div className="row align-items-center gx-5">
      <div className="col-md-4 align-items-center pb-4 g-5 ">
      <Slider {...settings}>
        {productDetails.images.map(function(img,idx){return <img key={idx} src={img} className='w-100 my-5 rounded-5 ' alt={productDetails.title}/>})}
      </Slider>
      </div>
      <div className="col-md-8 py-5">
        <h4 className='text-success'>{productDetails.title}</h4>
        <p>{productDetails.description}</p>
        <h6 className='text-muted py-1'>Price : { productDetails.priceAfterDiscount ?  <> <span className='text-decoration-line-through text-danger'>{productDetails.price} </span> <span className=' fw-bold ps-2 text-success'>{ productDetails.priceAfterDiscount } EGP</span> </> : <span>{productDetails.price} EGP</span> }</h6>
        <h6 className='py-2 text-muted'>Quantity : {productDetails.quantity}</h6>
        <button id='addBtn' onClick={function(){addToCart(productDetails.id)}} className='btnAdd btn btn-success w-100 mt-5'>Add Product to Cart +</button>
        <button id='delBtn' onClick={function(){removeFromCart(productDetails.id)}} style={{'display':'none'}} className="btnRemove w-100 mt-5 btn btn-danger">Remove Product From Cart -</button>
      </div>
    </div>
  </div> : <LoadingScreen/> };
  </HelmetProvider>
}
