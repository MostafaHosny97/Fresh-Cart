import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



export default function ResetPassword() {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

let resetPass = useFormik({
  initialValues : {
    "email":"",
    "newPassword": ""
    },
    onSubmit: function( values ){
    console.log('Submit',values);
    resetPassword( values );
},

validate:function(values){
  let errors = {}

  if( values.email.includes('@') == false || values.email.includes('.com') == false){
    errors.email = "Email Must Be a Valid"
  }

  if(values.newPassword.length < 6 || values.newPassword.length > 12){
    errors.newPassword = " Password Must Be From 6 To 12 Characters "
  }

  return errors;
}
});

async function resetPassword(obj){
  setLoading(true);
  try {
    const {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,obj)
    console.log(data);
    setLoading(false);
    if(data.token != null){
      toast.success("Your Password Changed Successfully",{duration:2000,className:"text-success px-4 fw-bolder"});
      navigate('/login');
    }

  } catch (error) {
    console.log('Error : ',error);
    toast.error(error.response.data.message,{duration:2000,className:"text-danger px-4 fw-bolder"});
    setLoading(false);
  }
}

function showNewPassword(){
  let showNewPass = document.getElementById('newPassword');
  if(showNewPass.type === "password"){
    showNewPass.type = "text";
  }else{
    showNewPass.type = "password";
  }
}



  return <HelmetProvider>
  <Helmet>
    <title>Reset New Password</title>
  </Helmet>

    <form onSubmit={resetPass.handleSubmit}>
      <div className="container my-5 py-5">

      <label className='mt-5 fw-bolder' name='email' htmlFor="email">Email</label>
      <input onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} value={resetPass.values.email} id="email" type="email" placeholder='Email' className='form-control'  />
      {resetPass.errors.email && resetPass.touched.email ?<div className='alert alert-danger text-center '>{ resetPass.errors.email }</div>:''}

        <label className='mt-3 fw-bolder' htmlFor="newPassword">New Password</label>
        <div className="inputWithIcon position-relative">
        <input onChange={resetPass.handleChange} onBlur={resetPass.handleBlur} value={resetPass.values.newPassword}  id="newPassword" type="password" name='newPassword' placeholder='Enter New Password' className='form-control my-2'  />
        {resetPass.errors.newPassword && resetPass.touched.newPassword ?<div className='alert alert-danger text-center '>{ resetPass.errors.newPassword }</div>:''}
        <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2" onClick={showNewPassword} id="togglePassword"></i>
        </div>

        {loading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>
          <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>
          </button> : <button disabled={!resetPass.isValid } type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Confirmation</button> }
      </div>
    </form>
  
  </HelmetProvider>
}