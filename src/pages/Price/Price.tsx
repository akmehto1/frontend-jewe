/* eslint-disable @typescript-eslint/no-explicit-any */

import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import {useSelector } from 'react-redux';


import config from '../../Config/config';
import { UserState } from '../../redux/user/userslice';

const PricingPage = () => {
   
    const { currentUser } = useSelector((state: { user: UserState }) => state.user);
    

    const buyPlan = async (e: any) => {
      const planState = { plan: "", amount: "" };
    
      if (e.target.id === 'Basic') {
        planState.plan = 'Basic';
        planState.amount = "3000";
      } else if (e.target.id === 'Pro') {
        planState.plan = 'Pro';
        planState.amount = "5000";
      } else if (e.target.id === 'ent') {
        planState.plan = 'ent';
        planState.amount = "7000";
      }
    
      try {
        const response = await fetch(`${config.apiBaseUrl}user/buy-plan`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
          body: JSON.stringify(planState), // Add the planState in the request body
        });
        const result = await response.json();
        console.log(result);
       
    
        alert(result.message);
        if (!response.ok) {
          throw new Error(result.message);
        }
       
      } catch (error) {
       
        console.error(error);
      }
    };
    

  return (
    <div>
      

      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Pricing</h1>
        <p className="lead">
          Quickly Buy an effective pricing table for your potential customers with this Bootstrap example.
          It's built with default Bootstrap components and utilities with little customization.
        </p>
      </div>

      <div className="container">
        <div className="row">
          {/* Each card will take up 4 columns on large screens and full width on small screens */}
          <div className="col-md-4 mb-4">
            <div className="card box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Basic</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">₹1500<small className="text-muted">/ mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>1100</li>
                  <li>Gold Jewleary</li>
                  <li>..............</li>
                  <li>Help center access</li>
                </ul>

                
                 {currentUser && <button  onClick={buyPlan} type="button" id='Basic' className="btn btn-lg btn-block btn-outline-primary">Buy</button>}
                 
               
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Pro</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">₹5000 <small className="text-muted">/ mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>181000</li>
                  <li>Gold Jewelary</li>
                  {/* <li>Priority email support</li> */}
                  <li>Help center access</li>
                </ul>
                {currentUser && <button type="button" onClick={buyPlan}  id='Pro' className="btn btn-lg btn-block btn-outline-primary">Buy</button>}
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Enterprise</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">₹11000 <small className="text-muted">/ mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>Enterprises</li>
                  <li>181000</li>
                  <li>Gold Jewelary</li>
                  <li>Help center access</li>
                </ul>
                {currentUser && <button  onClick={buyPlan} type="button" id='enterprise' className="btn btn-lg btn-block btn-outline-primary">Buy</button>}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default PricingPage;
