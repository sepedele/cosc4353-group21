import React, { useState, useEffect } from 'react';
import {useLocation, generatePath, useNavigate} from "react-router-dom";
import Axios from 'axios';
import "../../nav.css";
import './FuelQuoteForm.css';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  const [delivery_address, setAddress] = useState('');
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true); // used to disable submit quote button
  const [isGalDisabled, setGalDisabled] = useState(false); // used to disable gallon number after getting quote and total

  const {register, handleSubmit, formState: {errors}} = useForm ({
    resolver: yupResolver(fuelSchema)
  });

  const getQuote = () => { // calls Pricing modile backend function that calculates suggested price and total only triggered by getQuote button
    Axios.post("http://localhost:3001/getQuote" , {
      user_id: user_id,
      gallons: gallons
    }).then((response) => {
      setTotal(response.data.total);
      setPrice(response.data.suggested_price);
    }).catch((err) => {
      console.log(err);
    });
    setSubmitDisabled(false);
    setGalDisabled(true);
  }
  
  const getAddress = () => {  //retrieving address from backend
    Axios.post("http://localhost:3001/getAddress" , {
      user_id: user_id,
    }).then((response) => {
      setAddress(response.data.delivery_address);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleReset = () => {
    setGallons(0);
    setDate('');
    setTotal(0);
    setPrice(0);
    setSubmitDisabled(true);
    setGalDisabled(false);
  };
  
  const handleQuoteSubmit = (e) => { //sending data to backend
    console.log(e.nativeEvent.submitter.id); // prints id of specific button
    if(e.nativeEvent.submitter.id === 'submitQuote')
    {  
      Axios.post("http://localhost:3001/submitQuote", {
        gallons: gallons,
        delivery_date: delivery_date,
        delivery_address: delivery_address,
        total: total,
        user_id: user_id,
        suggested_price: price,
      }).then((response) => {
        console.log(response.data.responseMsg); // prints success message
        handleReset();
        const path = generatePath('/fuel_history/:id', {id: user_id});
        navigate(path, {state: {id: user_id}}); // navigate to history
      }).catch((err) => {
        console.log(err);
      });
    }
    else
      getQuote();

    e.preventDefault();
  };

  useEffect(() => {
    getAddress();
  });

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
              id="gallons"
              className ="form-control"
              type="number" 
              min="1"
              pattern="[1-9]*"
              //name="gallons_requested"
              value = {gallons}
              readOnly = {isGalDisabled}
              onInput={(e) => {setGallons(Math.abs(e.target.value))}}
              required
            />
        </div>
          
        <div className="form-group">
          <label className="form-label">Delivery Address:</label>
            <input 
              id="Daddress" 
              className ="form-control"
              type="text"
              //name="delivery_address"  
              value = {delivery_address}   
              readOnly={true}
            />
        </div>

        <div className="form-group">
          <label className="form-label">Delivery Date:</label>
            <input 
              id="Ddate" 
              className ="form-control"
              type="date"
              //name="delivery_date"
              value = {delivery_date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
              required
            />
        </div>

        <div className="form-group">
          <label className="form-label">Suggested Price:</label>
            <input 
              id="price" 
              className ="form-control"
              type="number"
              //name="suggested_price" 
              value = {price}
              readOnly={true}
            />
        </div>

        <div className="form-group">
          <label className="form-label">Total Amount Due:</label>       
            <input 
              id="total"
              className ="form-control"
              type="number"
              //name="amount_due" 
              value = {total}
              readOnly={true}
              onChange={(event) => {
                setTotal(event.target.value);   //need to make this value readable to backend when it's updated automatically...
              }}                                //...rather than only when a user types in this field directly
            />
        </div>

        <div className="form-buttons">
          <button type="button" id="resetButton" onClick = {handleReset}>Reset</button> 
          <button type="submit" id="getQuoteButton">Get Quote</button> 
          <button type="submit" id="submitQuote" disabled = {submitDisabled} >Submit Quote</button>
        </div>

      </form>

    </div>
    </>
  );
};

export default FuelQuoteForm;