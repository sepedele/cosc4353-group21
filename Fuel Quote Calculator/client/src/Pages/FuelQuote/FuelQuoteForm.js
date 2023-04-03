import React, { useState } from 'react';
import {useLocation, generatePath, useNavigate} from "react-router-dom";
import Axios from 'axios';
import "../../nav.css";
import './FuelQuoteForm.css';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

function TotalPrice() { // This will end up being a backend function that calculates suggested price and total only triggered by button
  const gallonVal = document.getElementById('gallons').value; // get 'gallons' value from form
  const priceVal = document.getElementById('price').value; // get 'price' value from form
  const totalVal = gallonVal*priceVal;
  document.getElementById('total').value = totalVal;
}

const fuelSchema = yup.object().shape({
  gallons: yup.number().required,
  delivery_date: yup.string()
});

function FuelQuoteForm() {
  let navigate = useNavigate();  
  const {state} = useLocation();
  const user_id = state.id;

  const [gallons, setGallons] = useState('');
  const [delivery_date, setDate] = useState('');
  const [total, setTotal] = useState(0);

  const {register, handleSubmit, formState: {errors}} = useForm ({
    resolver: yupResolver(fuelSchema)
  });
  
  function sendInfo() { //sending data to backend
    Axios.post("http://localhost:3001/create", {
      gallons: gallons,
      delivery_date: delivery_date,
      total: total,
      user_id: user_id
    }).then((response) => {
      // console.log("working");
    }).catch((err) => {
      console.log(err);
    });
  }
  
  function getInfo() {  //retrieving data from backend
    Axios.get("http://localhost:3001/getInfo", {

    }).then((response) => {
      document.getElementById('Daddress').value = response.data.delivery_address;
      document.getElementById('price').value = response.data.suggested_price;
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleQuoteSubmit = (e) => {
  // console.log(gallons);
  // console.log(delivery_date);
  // console.log(total);
  // navigate("/fuel_history");
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
              onChange={(event) => {
                setDate(event.target.value);
              }}
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
              value = {total}
              readOnly={true}
              onChange={(event) => {
                setTotal(event.target.value);   //need to make this value readable to backend when it's updated automatically...
              }}                                //...rather than only when a user types in this field directly
            />
        </div>

          <div className="form-buttons">
          <button type="button" onClick={getInfo}>Retrieve</button>
          <button type="button" id="calculatorButton" onClick={TotalPrice}>Calculate</button> 
          <button type="submit" onClick={sendInfo}>Submit</button>
          {/*add a third button that resets/cancels the fields? Like ProfileRegister*/}
        </div>
      </form>

    </div>
    </>
  );
};

export default FuelQuoteForm;
