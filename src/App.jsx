import React, { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layoutt/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Brands from "./Components/Brands/Brands";
import ProDetails from "./Components/ProDetails/ProDetails";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import Profile from "./Components/Profile/Profile";
import jwtDecode from "jwt-decode";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import toast, { Toaster } from 'react-hot-toast';
import Wishlist from "./Components/Wishlist/Wishlist";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import CartContext from "./Components/Context/CartContext";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";


export default function App() {

  function ProtectRoute({children}){

    if(crrUser == null && localStorage.getItem('tkn') == null){
      return <Navigate to={'/login'}/>
    }else{
      return <> 
      { children }
      </>
    }
  };

    
    const [crrUser, setCrrUser] = useState(null);
    function getUserData(){
    const userData = jwtDecode(localStorage.getItem('tkn'))
    setCrrUser(userData);
    }

    function clearUserData(){
      localStorage.removeItem('tkn');
      setCrrUser(null);
    }

      useEffect(function(){
        if ( localStorage.getItem('tkn') != null && crrUser == null ){
          getUserData();
        }
      },[]);

  const router = createBrowserRouter([
    { path: "/", element: <Layout crrUser={crrUser} clearUserData={clearUserData} /> ,
      children: [
        { index:true,element: <Home /> },
    { path: "home", element:  <Home />  },
        { path: "brandproducts/:id", element: <BrandProducts/> },
        { path: "categoryproducts/:id", element: <CategoryProducts/> },
        { path: "cart", element: <ProtectRoute><Cart crrUser={crrUser}/> </ProtectRoute>  },
        { path: "wishlist", element: <ProtectRoute><Wishlist crrUser={crrUser}/> </ProtectRoute>  },
        { path: "category", element: <Category/> },
        { path: "prodetails/:id", element:  <ProDetails />   },
        { path: "login", element: <Login getUserData={getUserData} crrUser={crrUser} /> },
        { path: "profile", element: <ProtectRoute><Profile crrUser={crrUser} /></ProtectRoute> },
        { path: "payment", element: <ProtectRoute><Payment /></ProtectRoute> },
        { path: "allorders", element: <ProtectRoute><AllOrders crrUser={crrUser} /></ProtectRoute> },
        { path: "register", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "brands", element:<Brands/>  },
        {
          path: "*",
          element: (
            <div className="text-center mt-5 w-100">
              <img src={require("./Images/404-Error-0.jpg")} className="w-100" alt=""/>
            </div>
          ),
        },
      ],
    },
  ]);
  return <CartContext>

      <Toaster/>
      <RouterProvider router={router} />
      </CartContext>
}
