import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LoadingScreen from '../LoadingScreen/LoadingScreen';


export default function AllOrders({crrUser}) {

  const [allOrders, setAllOrders] = useState(null);

  async function getAllOrders(){
    try {
      const {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${crrUser.id}`)
        console.log(data);
        setAllOrders(data);
    } catch (error) {
      console.log('Error : ',error);
    }
  }


  useEffect(function(){
    getAllOrders();
  },[])


  return <HelmetProvider>
    <Helmet>
      <title>AllOrders</title>
    </Helmet>

    <h3 className='my-5 pt-5 text-success fw-bolder text-center text-muted'>Welcome User to Orders </h3>

      { allOrders ? <div className="container my-5">
        <div className="row g-5">
          { allOrders.map(function(order,idx){ return <div key={idx} className="col-md-4 ">
            <div className="order p-3 rounded-5">

              <div className="container">
                <div className="row">
          {order.cartItems.map(function(item,index){ return <div key={index} className="col-md-6">
                    <div className="item">
                      <img src={item.product.imageCover} className='w-100 rounded-5 p-2' style={{'height':'200px'}} alt="" />
                      
                      <div className="p-2 rounded-5">
                      <h5 className='text-success'>{item.product.brand.name}</h5>
                      <h5 className='text-success'>{item.product.title.slice(0,10)}</h5>
                      <h5 className='text-muted'>Count : <span className='text-success'>{item.count}</span></h5>
                      <h5 className='text-muted pb-4'>Price : <span className='text-success'>{item.price} EGP</span></h5>
                      </div>
                    </div>
                  </div> })}

                </div>
              </div>
                <div className="detailsitem bg-light text-white p-3 rounded-5">
              <h5 className='text-muted'>Total Price : <span className='text-success'>{order.totalOrderPrice} EGP</span></h5>
              <h5 className='text-muted'>Taxes Price : <span className='text-success'>{order.taxPrice} EGP</span></h5>
              <h5  className='text-muted'>Payment Method : <span className='text-success'>{order.paymentMethodType}</span></h5>
              </div>
            </div>
          </div> })}
        </div>
      </div> : <LoadingScreen/> }

  </HelmetProvider>
}
