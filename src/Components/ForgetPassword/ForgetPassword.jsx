import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function ForgetPassword() {

const navigate = useNavigate();

const [loading, setLoading] = useState(false);

let forgetPass = useFormik({
  initialValues : {
    "email":""
  },
    onSubmit: function( values ){
    console.log('Submit',values);
    forgetPassword( values );
}});


  async function forgetPassword(obj){
    setLoading(true);
    try {
      const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,obj)
      console.log(data);
      setLoading(false);
      if(data.statusMsg == 'success'){
        toast.success(data.message,{duration:2000,className:"text-success px-4 fw-bolder"});
        navigate('/verifycode');
      }

    } catch (error) {
      console.log('Error : ',error);
      setLoading(false);
      toast.error(error.response.data.message,{duration:2000,className:"text-danger px-4 fw-bolder"});
    }
  }

  


  return <HelmetProvider>
    <Helmet>
      <title>Forget Password</title>
    </Helmet>

    <form onSubmit={forgetPass.handleSubmit}>
      <div className="container my-5 py-5">
        <label className='mt-5 fw-bolder' name='email' htmlFor="email">Enter Your Email</label>
        <input onBlur={forgetPass.handleBlur} onChange={forgetPass.handleChange} value={forgetPass.values.email} id="email" type="email" placeholder='Enter Your Email' className='form-control my-2'  />
        
        {forgetPass.errors.email && forgetPass.touched.email ?<div className='alert alert-danger text-center '>{ forgetPass.errors.email }</div>:"" }
        {loading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>
          <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>
          </button> : <button disabled={!forgetPass.isValid } type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Send Code</button> }
      </div>
    </form>

    

</HelmetProvider>
}
