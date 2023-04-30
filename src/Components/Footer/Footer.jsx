import React from 'react'

export default function Footer() {
  return <>
  <footer className='p-4'>
      <h2>Get The FreshCart App</h2>
      <p className='text-muted'>We will send you a link, Open it in your phone to download App</p>
      <div className="container d-flex justify-content-between mb-3">
        <input type="email" placeholder='Email' className='form-control w-75' />
        <button className='btn btn-success w-25 mx-3'>Share App Link</button>
      </div>
      <div className="container border-bottom border-top border-2 border-dark py-4 d-flex align-items-center justify-content-between">
        <div className="row">
            <div className="leftPart d-flex align-items-center jusify-content-center">
              <div className="col-md-6 d-flex align-items-center jusify-content-center">
              <h6 className='pe-4'>Payment Partners</h6>
                <img src={require('../../Images/amazonpay.png')} style={{'width':'15%'}} className='pt-4' alt={'amazonpay'} />
                <img src={require('../../Images/americanexpress.png')} style={{'width':'10%'}} alt={'americanexpress'} />
                <img src={require('../../Images/mastercard.png')} style={{'width':'10%'}} alt={'mastercard'} />
                <img src={require('../../Images/paypal.png')} style={{'width':'15%'}} alt={'paypal'} />
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <h6 className='text-muted'>Get deliveries with FreshCart</h6>
                <img src={require('../../Images/googleplay.png')} className='w-25' alt={'googleplay'} />
                <img src={require('../../Images/appstore.png')} className='w-25' alt={'appstore'} />
              </div>
          </div>
        </div>
      </div>
    </footer>
  </>
}
