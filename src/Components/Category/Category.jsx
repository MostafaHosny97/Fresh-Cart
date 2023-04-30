import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';




export default function Category() {

const [allcategory, setAllCategory] = useState(null);

async function getAllCategories(){
  const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories');
  setAllCategory(data.data);
}

useEffect(function(){
  getAllCategories();
},[])

  return <HelmetProvider>
  <Helmet>
    <title>Categories</title>
    </Helmet>
  { allcategory ? <div className="container py-5 my-5">
    <div className="row align-items-center g-5">
      <div className="col-md-3">
        <div className="textBrands">
          <h3 className='text-success fw-bolder'>Our Category</h3>
          <p className='text-muted lead'>You can see our categories and each category includes the products in it</p>
        </div>
      </div>
      { allcategory.map(function( category,idx ){ return <div key={idx} className="col-md-3 " >
        <Link to={ `/categoryproducts/${category._id}` }>
        <div className="item cart-customize rounded-5 shadow">
          <img src={category.image} className='w-100 rounded-5' alt={category.name} style={{'height':'300px'}} />
          <h4 className='text-success text-center  py-4'>{category.name}</h4>
        </div>
        </Link>
      </div>
    })}
    </div>
  </div> : <LoadingScreen /> }
  </HelmetProvider>
}
