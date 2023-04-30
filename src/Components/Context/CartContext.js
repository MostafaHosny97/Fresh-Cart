import axios from "axios";
import React, { createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import $ from 'jquery';
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const cartContext = createContext();

export default function CartContext({ children }) {


  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);

  const [numOfWishlist, setNumOfWishlist] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState(null);
  const [cartId, setCartId] = useState(null);


  async function addProductToCart(proId) {
    try {
        const { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/cart",{
            'productId': proId,
          },
          {
            headers: { 'token': localStorage.getItem("tkn"),
            },
          }
        );
        if(data.status ==='success'){
          setNumOfCartItems(data.numOfCartItems);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          getCartProducts();
          toast.success(data.message,{duration:1000,className:" text-success"});
          $('#addBtn').fadeOut(500);
          $('#delBtn').fadeIn(500);
          return true;
        }else{
          toast.error(data.message,{duration:1000,className:"bg-black text-white"});
          return false;
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    async function getCartProducts(){
      try {
        const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart',{
        headers :{ 'token' : localStorage.getItem('tkn') }
      })
      console.log(data);
        if(data.status === 'success'){
          setNumOfCartItems(data.numOfCartItems);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          setCartId(data.data._id);
          localStorage.setItem("cartId",data.data._id)
        }
    } catch (error) {
      if(error.response.status == 404){
        toast.error("No Cart exist for this User",{duration:2000,className:"text-danger px-4 fw-bolder"});
        <Navigate to={'/home'}/>
      }}}
    

    async function removeCartItem(id){
      try {
        const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{
        headers :{ 'token' : localStorage.getItem('tkn') }
      })
      if(data.status ==='success'){
          setNumOfCartItems(data.numOfCartItems);
          setTotalCartPrice(data.data.totalCartPrice);
          setCartProducts(data.data.products);
          getCartProducts();
          toast.success('Product removed successfully from your cart',{duration:3000,className:" text-danger",iconTheme: {
            primary: '#dc3545',
            secondary: '#fff',
          },});
        $('#delBtn').fadeOut(500);
        $('#addBtn').fadeIn(500);
        return true;
      }else{
        toast.error(data.message,{duration:3000,className:"bg-black text-white"});
        return false;
      }
      } catch (error) {
        console.log('Error : ',error);
      }
    }

    async function updateCount(id,numCount){
      try {
        const {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{
        'count' : numCount
      },{
        headers :{ 'token' : localStorage.getItem('tkn') }
      })
      if(data.status==='success'){
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        getCartProducts();
      }} catch (error) {
        console.log('Error : ',error);
      }
    }

    async function getWishlist(){
      try {
        const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/wishlist',{
          headers :{ 'token' : localStorage.getItem('tkn') }
        })
        if(data.status === 'success'){
          setNumOfWishlist(data.count);
          setWishlistProducts(data.data);
        }
        return true;
      } catch (error) {
        console.log('Error : ', error);
      }
    }

    async function addToWishlist(id){
      try {
        const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
        "productId": id
      },{
        headers :{ 'token' : localStorage.getItem('tkn') }
      });
      if(data.status === 'success'){
          setNumOfWishlist(data.count);
          setWishlistProducts(data.data);
          getWishlist();
          toast.success(data.message,{duration:3000,className:" text-success"});
        return true;
      }else{
        toast.error(data.message,{duration:3000,className:"bg-black text-white"});
        return false;
      }
      } catch (error) {
        console.log('Error : ', error);
      }};

      async function removeWishlist(id){
        try {
          const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,{
          headers :{ 'token' : localStorage.getItem('tkn') }
        })
        if(data.status==='success'){
          setNumOfWishlist(data.count);
          setWishlistProducts(data.data);
          getWishlist();
            toast.success(data.message,{duration:3000,className:" text-danger",iconTheme: {
              primary: '#dc3545',
              secondary: '#fff',
            },});
          $('#delWishlist').fadeOut(100);
          $('#addWishlist').fadeIn(100);
          console.log(data);
          return true;
        }else{
          toast.error(data.message,{duration:3000,className:"bg-black text-white"});
          return false;
        }
        } catch (error) {
          console.log('Error : ',error);
        }
      }

      useEffect(function(){
        getWishlist();
      },[])
      
      useEffect(function(){
        getCartProducts();
      },[])
      
  return (
    <cartContext.Provider value={{ addProductToCart,numOfCartItems,totalCartPrice,cartProducts,removeCartItem,updateCount,addToWishlist,removeWishlist,numOfWishlist,wishlistProducts,cartId }}>
      {children}
    </cartContext.Provider>
  );
}
