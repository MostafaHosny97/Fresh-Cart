import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Login({getUserData,crrUser}) {

const [loading, setLoading] = useState(false);

let user = {
  email :"",
  password :"",
}

const navigate = useNavigate();

async function logNewUser( obj ){
  setLoading(true);
try {
  let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,obj)
  console.log(data);
  setLoading(false);
  if(data.message === "success"){
    localStorage.setItem('tkn',data.token);
    getUserData();
    $('.sucMsg').fadeIn(1000,function(){
    })
    navigate('/home');
  };
} catch (error) {
  setLoading(false);
  $('.errMsg').fadeIn(1000,function(){
    setTimeout(() => {
      $('.errMsg').fadeOut(1000)
    }, 3000);
  });
}}

function showPassword(){
  let showPass = document.getElementById('password');
  if(showPass.type === "password"){
    showPass.type = "text";
  }else{
    showPass.type = "password";
  }
}



let formik = useFormik({
  initialValues : user,

  onSubmit: function( values ){
    console.log('Submit',values);
    logNewUser( values );
  },

  validate:function(values){
    let errors = {}
    
    if( values.email.includes('@') == false || values.email.includes('.com') == false){
      errors.email = "Email Must Be a Valid"
    }

    if(values.password.length < 6 || values.password.length > 12){
      errors.password = " Password Must Be From 6 To 12 Characters "
    }
    return errors;
  }
});

  return <HelmetProvider>
  <Helmet>
    <title>Login</title>
  </Helmet>
  <div className="container py-5 my-5">
  <h2 className='text-success'>Login Form</h2>

<div style={{'display':'none'}}  className="errMsg text-center alert alert-danger">
    <h3>Email or Password uncorrect</h3>
</div>

<div style={{'display':'none'}}  className="sucMsg text-center alert alert-success">
    <h3>Welcome Back </h3>
</div>

  <form onSubmit={formik.handleSubmit} className=' ' >

  <label className='mt-3 fw-bolder' htmlFor="email">Email</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" placeholder='   Email' className='form-control'  />
  {formik.errors.email && formik.touched.email ?<div className='alert alert-danger text-center '>{ formik.errors.email }</div>:"" }

  <label className='mt-3 fw-bolder' htmlFor="password">Password</label>
  
  <div className="inputWithIcon position-relative">
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" type="password" placeholder='   Password' className='form-control'  />
  {formik.errors.password && formik.touched.password ?<div className='alert alert-danger text-center '>{ formik.errors.password }</div>:''}
  <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2" onClick={showPassword} id="togglePassword"></i>
  </div>
        
        
        <div className='d-flex justify-content-between align-items-center'>
        {loading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>
          <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>
          </button> : <button disabled={!formik.isValid } type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Login</button> }
        <Link  to={'/forgetpassword'}><h5 className='text-muted forgetPass'>Forgot Your Password ?</h5></Link> 
        </div>

  </form>
  </div>
  </HelmetProvider>
}
