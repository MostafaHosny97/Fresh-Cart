import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Cart({crrUser}) {
  


  const {totalCartPrice,cartProducts,removeCartItem,numOfCartItems,updateCount} = useContext(cartContext);
  console.log(cartProducts);

  
  async function removeItemFromCart(id){
    await removeCartItem(id);
  }

  async function incProduct(id,numCount){
    await updateCount(id,numCount);
    toast.success("Product updated successfully",{duration:1000,className:" text-success"});
  }

  async function decProduct(id,numCount){
    await updateCount(id,numCount);
    toast.success("Product updated successfully",{duration:1000,className:" text-danger",iconTheme: {
      primary: '#dc3545',
      secondary: '#fff',
    }});
    }


  return <HelmetProvider>
  <Helmet>
    <title>Cart Details</title>
  </Helmet>

    
    <h3 className='mt-5 pt-5 text-success fw-bolder text-center text-muted'>Welcome User to your Cart <i class="fa-solid fa-cart-arrow-down text-success"></i></h3>
    {/* {crrUser.name} */}

  {cartProducts? <div className="container mb-3 ">
    <div className='d-flex justify-content-between align-items-center'>
    <img src={require('../../Images/green_shoppictcart_1484336527-1.png')} className='w-25' style={{'height':'400px'}} alt="" />
    <div className='orderPayment text-muted'>
      <h2 className='text-center py-3 text-black'>Orders</h2>
      <h5 className='pt-3 pb-2 px-3'>Products  <span className='text-success'>{ numOfCartItems } items</span></h5>
      <h5 className='px-3'>Total Price <span className='text-success'>{ totalCartPrice } EGP</span></h5>
      <Link to='/payment'>
      <button className='btn btn-outline-success fw-bolder my-3 w-75 mx-4'>CheckOut</button>
      </Link>
    </div>
    </div>
    <div className="row gx-5">
      { cartProducts.map(function(cart,idx){return <div key={idx}  className='py-3 border-bottom border-1 border-dark d-flex align-items-center justify-content-between'> <div key={idx} className="col-md-3 rounded-5  ">
      <img src={cart.product.imageCover} className='w-50 rounded-5' style={{'height':'200px'}} alt={cart.title} />
      </div>
      <div className="col-md-4 text-start ">
      <div className="product rounded-5 ">
        <h6 className='text-success'>{cart.product.title?.slice(0,cart.product.title.indexOf(' ', 10 ))}</h6>
        <h6 className='text-muted' >Price : <span className="text-success"> {cart.price} EGP</span></h6>
        
        <button onClick={function(){removeItemFromCart(cart.product.id)}} className='btn btn-outline-danger my-2'>Remove</button>

      </div>
      </div>
      <div className="col-md-4 text-center d-flex align-items-center justify-content-center ">
      <button onClick={function(){decProduct(cart.product.id,cart.count-1)}} className='btn btn-outline-danger fw-bolder'>-</button>
        <h4 className='text-muted px-5'>{cart.count} </h4>
        <button onClick={function(){incProduct(cart.product.id,cart.count+1)}} className='btn btn-outline-success fw-bolder'>+</button>
      </div>
      </div> })}
    </div>
  </div>: <LoadingScreen/> }

  </HelmetProvider>
}

