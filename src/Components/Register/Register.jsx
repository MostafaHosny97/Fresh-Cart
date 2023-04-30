import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Register() {

const [loading, setLoading] = useState(false);


let user = {
  name :"",
  email :"",
  phone :"",
  password :"",
  rePassword :""
}

const navigate = useNavigate();

async function regNewUser( obj ){
  setLoading(true);
try {
  let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,obj)
  setLoading(false);
  console.log(data);
  if(data.message === "success"){
    $('.sucMsg').fadeIn(1000,function(){
      navigate('/login');
    })
  }
} catch (error) {
  setLoading(false);
  $('.errMsg').fadeIn(1000,function(){
    setTimeout(() => {
      $('.errMsg').fadeOut(1000)
    }, 3000);
  });
}}


let formik = useFormik({
  initialValues : user,

  onSubmit: function( values ){
    console.log('Submit',values);
    regNewUser( values );
  },

  validate:function(values){
    let errors = {}
    if(values.name.length < 3 || values.name.length > 14){
      errors.name = "Name Must Be More Than 3 Characters and Less Than 14 Characters"
    }

    if( values.email.includes('@') == false || values.email.includes('.com') == false){
      errors.email = "Email Must Be a Valid"
    }

    if(! values.phone.match(/^01[0125][0-9]{8}$/) ){
      errors.phone  = " Phone Must Be a Valid "
    }

    if(values.password.length < 6 || values.password.length > 12){
      errors.password = " Password Must Be From 6 To 12 Characters "
    }

    if(values.password !== values.rePassword){
      errors.rePassword = " Password and Repassword Not Matched "
    }
    return errors;
  }
});

function showPassword(){
  let showPass = document.getElementById('password');
  if(showPass.type === "password" ){
    showPass.type = "text";
  }else{
    showPass.type = "password";
  };
};

function showRePassword(){
  let showRePass = document.getElementById('rePassword');
  if(showRePass.type === "password"){
    showRePass.type = "text";
  }else{
    showRePass.type = "password"
  }
};

  return <HelmetProvider>
  <Helmet>
    <title>Register</title>
  </Helmet>


  <div className="container py-5 mt-5">
  <h2 className='text-success'>Registeration Form</h2>

<div style={{'display':'none'}}  className="errMsg text-center alert alert-danger">
    <h3>Email is Already Used</h3>
</div>

<div style={{'display':'none'}}  className="sucMsg text-center alert alert-success">
    <h3>Congratulations</h3>
</div>

  <form onSubmit={formik.handleSubmit}  >
  <label className='mt-2 fw-bolder displayy' htmlFor="name">Name</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id="name" type="text" placeholder='  Name' className='form-control'  />
  {formik.errors.name && formik.touched.name ? <div className='alert alert alert-danger text-center '>{ formik.errors.name }</div> :""}

  <label className='mt-3 fw-bolder' htmlFor="email">Email</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" type="email" placeholder='  Email' className='form-control'  />
  {formik.errors.email && formik.touched.email ?<div className='alert alert-danger text-center '>{ formik.errors.email }</div>:"" }

  <label className='mt-3 fw-bolder' htmlFor="phone">Phone</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="phone" type="text" placeholder='  Phone' className='form-control'  />
  {formik.errors.phone && formik.touched.phone ?<div className='alert alert-danger text-center '>{ formik.errors.phone }</div>:''}

  <label className='mt-3 fw-bolder' htmlFor="password">Password</label>
  <div className="inputWithIcon position-relative">
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" type="password" placeholder='  Password' className='form-control'  />
  {formik.errors.password && formik.touched.password ?<div className='alert alert-danger text-center '>{ formik.errors.password }</div>:''}
  <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2" onClick={showPassword} ></i>
  </div>

  <label className='mt-3 fw-bolder' htmlFor="rePassword">Repassword</label>
  <div className="inputWithIcon position-relative">
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id="rePassword" type="password" placeholder='  Repassword' className='form-control'  />
  {formik.errors.rePassword && formik.touched.rePassword ?<div className='alert alert-danger text-center '>{ formik.errors.rePassword }</div>:''}
  <i class="fa-solid fa-eye fs-5 position-absolute end-0 top-0 p-2" onClick={showRePassword} ></i>
  </div>

        {loading ? <button type='button' className='btn btn-outline-success mt-3 fw-bolder'>
          <i className='fa-solid fa-spinner fa-spin text-success mx-2'></i>
        </button> : <button disabled={!formik.isValid } type='submit' className='btn btn-outline-success mt-3 fw-bolder'>Register</button> }
          </form>
        <h5 className='text-muted py-3'>Already have an account ? <Link to={'/login'}><span className='text-muted signIn '>Sign in</span></Link></h5>
  </div>
  </HelmetProvider>
}
