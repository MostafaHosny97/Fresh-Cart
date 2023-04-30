import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile({crrUser}) {

  const navigate = useNavigate();

  useEffect(function(){
    if (localStorage.getItem('tkn') == null && crrUser == null  ){
      navigate('/login');
    }
  },[]);

  return <>

    { crrUser ? <div className="py-5 my-5">
    <h1 className='text-center text-success my-5 py-5 fw-bolder'>Welcome {crrUser.name}</h1>
  </div> : <div className="py-5 my-5">
    <h1 className='text-center text-success my-5 py-5 fw-bolder'>Welcome User</h1>
  </div> };
  </>
}
