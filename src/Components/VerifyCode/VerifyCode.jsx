import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function VerifyCode() {

const [loading, setLoading] = useState(false);

const navigate = useNavigate();

let verifyCode = useFormik({
  initialValues : {
    "resetCode" : ""
  },
    onSubmit: function( values ){
    console.log('Submit',values);
    verifyPassword( values );
}});

async function verifyPassword(obj){
  setLoading(true);
  try {
    const {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,obj)
    console.log(data);
    setLoading(false);
    if(data.status === 'Success'){
      toast.success('You can create a new Password',{duration:2000,className:"text-success px-4 fw-bolder"});
      navigate('/resetpassword');
    }
  } catch (error) {
    console.log('Error : ',error);
    setLoading(false);
    toast.error(error.response.data.message,{duration:2000,className:"text-danger px-4 fw-bolder"});
  }
}

  return <HelmetProvider>
  <Helmet>
    <title>Verify Code</title>
  </Helmet>

    <form onSubmit={verifyCode.handleSubmit}>
      <div className="container my-5 py-5">

        
        <label className='mt-5 fw-bolder' htmlFor="resetCode">Enter Reset Code</label>
        <input onChange={verifyCode.handleChange} onBlur={verifyCode.handleBlur}  id="resetCode" type="text" name='resetCode' placeholder='Enter Reset Code' className='form-control my-2'  />
        {verifyCode.errors.resetCode && verifyCode.touched.resetCode ?<div className='alert alert-danger text-center '>{ verifyCode.errors.resetCode }</div>:"" }
        
        {loading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>
          <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>
          </button> : <button disabled={!verifyCode.isValid } type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Verify Code</button> }
      </div>
    </form>
  
  </HelmetProvider>
}
