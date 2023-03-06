import React, { useState } from 'react';
import {useLocation, generatePath, useNavigate} from "react-router-dom";
import "../../nav.css";
import './FuelQuoteForm.css';


function TotalPrice() { // This will end up being a backend function that calculates suggested price and total only triggered by button
  const gallonVal = document.getElementById('gallons').value; // get 'gallons' value from form
  const priceVal = document.getElementById('price').value; // get 'price' value from form
  const totalVal = gallonVal*priceVal;
  document.getElementById('total').value = totalVal;
}

function FuelQuoteForm() {
  let navigate = useNavigate();  
  const {state} = useLocation();
  const user_id = state.id;

  const [gallons, setGallons] = useState('');

  const handleQuoteSubmit = (e) => {
  console.log(gallons);
  navigate("/fuel_history");
  e.preventDefault();
  };

  return (
    <>

    <div className = "navigation_bar">
      <div className = "links" >
        <button
            onClick={() => {
                const path = generatePath('/profile/:id', {id: user_id});
                navigate(path, {state: {id: user_id}});
            }}
        > 
        Profile
        </button>

        <button 
            onClick={() => {
                const path = generatePath('/fuel_quote/:id', {id: user_id});
                navigate(path, {state: {id: user_id}});
            }}
        > 
        Fuel Quote
        </button>

        <button 
            onClick={() => {
              const path = generatePath('/fuel_history/:id', {id: user_id});
              navigate(path, {state: {id: user_id}});
            }}
        > 
        Fuel History
        </button>

        <button 
            onClick={() => {
                navigate('/');
            }}
        > 
        Logout
        </button>

      </div>
    </div>

    <div className="fuelQuoteContainer">
      <div className ="fuel-paragraph">
      <h1>Fuel Quote Form</h1>
      <p>Fill out the form below.</p>
      </div>
      
      <form onSubmit={handleQuoteSubmit}>
        <div className="form-group">
          <label className="form-label">Gallons Requested:</label>
            <input
              type="number" 
              min="0"
              className ="form-control"
              pattern="[0-9]*"
              name="gallons_requested"
              id="gallons"
              //oninput="TotalPrice()" I removed this because I got a warning 
              onInput={(e) => {setGallons(Math.abs(e.target.value)); TotalPrice();}}
              required
            />
        </div>
          
        <div className="form-group">
          <label className="form-label">Delivery Address:</label>
            <input 
              type="text" 
              className ="form-control"
              name="delivery_address" 
              id="Daddress"
              readOnly={true}
            />
        </div>

        <div className="form-group">
          <label className="form-label">Delivery Date:</label>
            <input 
              type="date" 
              className ="form-control"
              name="delivery_date"
              id="Ddate"
            />
        </div>

        <div className="form-group">
          <label className="form-label">Suggested Price:</label>
            <input 
              type="number" 
              className ="form-control"
              name="suggested_price" 
              id="price"
              readOnly={true}
            />
        </div>

        <div className="form-group">
          <label className="form-label">Total Amount Due:</label>       
            <input 
              type="number" 
              className ="form-control"
              name="amount_due" 
              id="total"
              readOnly={true}
            />
        </div>

          <div className="form-buttons">
          <button type="button" id="calculatorButton" onClick={TotalPrice}>Calculate</button> {/*Future task: disable button if no input or have same disabling as submit button*/}
          <button type="submit">Submit</button>
          {/*add a third button that resets/cancels the fields? Like ProfileRegister*/}
        </div>
      </form>

    </div>
    </>
  );
};

export default FuelQuoteForm;
