import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../Images/freshcart-logo.svg'
import { cartContext } from '../Context/CartContext';


export default function Navbar({crrUser,clearUserData}) {

  const {numOfCartItems,numOfWishlist} = useContext(cartContext);
  
  const navigate = useNavigate();
  function logoutUser(){
    clearUserData();
    navigate('/login')
  };
  
  return <>
    <nav className="navbar navbar-expand-lg fw-bold fixed-top pt-3 ">
  <div className="container-fluid ">
    <div className="navbar-brand text-success pe-2 ">
      <img src={ Logo } alt="Fresh Cart"  />
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-lg-0">
      {crrUser? <> <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/category">Category</Link>
        </li>
        </> : <> <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to="/category">Category</Link>
        </li> 
        </> }
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      { crrUser   ? <> <li className="nav-item">
          <Link className="nav-link position-relative px-3" to="/cart">
          <i class="fa-solid fa-cart-arrow-down text-success fs-3"><div className='numCustomize rounded-3 bg-success d-flex justify-content-center align-items-center'><span className='text-white fs-6'>{numOfCartItems}</span></div></i>
          </Link>
        </li>
        <li>
        <Link className="nav-link position-relative px-4" to="/wishlist">
          <i class="fa-solid fa-heart text-danger fs-3"><div className='wishCustomize rounded-3 bg-danger d-flex justify-content-center align-items-center'><span className='text-white fs-6'>{numOfWishlist}</span></div></i>
        </Link>
        </li>
      <li className="nav-item">
      <Link className="nav-link"  to="/allorders">All Orders</Link>
        </li>
        <li className="nav-item">
          <button onClick={logoutUser} className="nav-link cursol btn" >Logout</button>
        </li> </> : <> <li className="nav-item">
          <Link className="nav-link"  to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li> </> }
      </ul>
    </div>
  </div>
</nav>
  </>
}

