import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';




export default function Brands() {
const [allBrands, setAllBrands] = useState(null);

async function getAllBrands(){
  const { data } = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/brands');
  setAllBrands(data.data);
}

useEffect(function(){
  getAllBrands();
},[])

  return <HelmetProvider>
  
  { allBrands ? <div className="container py-5 my-5">
  <Helmet>
    <title>Brands</title>
    </Helmet>
    <div className="row align-items-center">
      <div className="col-md-3">
        <div className="textBrands">
          <h3 className='text-success fw-bolder'>Our Brands</h3>
          <p className='text-muted lead'>You can see our brands and each brand includes the products in it</p>
        </div>
      </div>
      { allBrands.map(function( brand,idx ){ return <div key={idx} className="col-md-3 rounded-5 my-3 ">
        <Link to={ `/brandproducts/${brand._id}` }>
        <div className="brand-item item rounded-5 shadow">
          <img src={brand.image}alt={brand.name} className="w-100" />
          <h4 className='text-success text-center py-4'>{brand.name}</h4>
        </div>
        </Link>
      </div>
    })}
    </div>
  </div> : <LoadingScreen /> }
  </HelmetProvider>
}
