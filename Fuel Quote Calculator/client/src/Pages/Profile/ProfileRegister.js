import React, { useState } from 'react';
import './ProfileRegister.css';
import { useNavigate, generatePath, useLocation} from "react-router-dom";
import Axios from 'axios';
import states from './US_States';


const ClientProfileForm = () => {
  let navigate = useNavigate();
  const {state} = useLocation();
  const user_id = state.id;
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [US_state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.post("http://localhost:3001/profile_register", {
        user_id: user_id,
        fullName: fullName,
        address1: address1,
        address2: address2,
        city: city,
        state: US_state,
        zipcode: zipcode,
      });
  
      console.log(response.data.responseMsg);
      const path = generatePath("/profile/:id", { id: user_id });
      navigate(path, { state: { id: user_id } });
    } catch (err) {
      console.log(err.response.data.responseMsg);
    }
  };
  
  
  const handleReset = () => {
    setFullName('');
    setAddress1('');
    setAddress2('');
    setCity('');
    setState('');
    setZipcode('');
  };

  return (
  <div className="profileRegContainer"> {/* changed name from 'container' to 'rectangle' to avoid css overriding in FuelHistory.css*/}
    
    <div className = "registration-heading">
    <h1>Welcome!</h1>
    <p>Please fill out the information below to complete registration.</p>
    </div>
    
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="fullName">Full Name:</label>
        <input
          id="fullName"
          className="form-control"
          type="text"
          maxLength="50"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="address1">Address 1:</label>
        <input
          id="address1"
          className="form-control"
          type="text"
          maxLength="100"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="address2">Address 2:</label>
        <input
          id="address2"
          className="form-control"
          type="text"
          maxLength="100"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="city">City:</label>
        <input
          id="city"
          className="form-control"
          type="text"
          maxLength="100"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="US_state">State:</label>
        <select id="US_state" className="form-control" value={US_state} onChange={(e) => setState(e.target.value)} required>
        <option value="">--Select--</option>
          {states.map((state) => (
            <option key={state.abbr} value={state.abbr}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="zipcode">Zipcode:</label>
        <input
          id="zipcode"
          className="form-control"
          type="text"
          minLength="5"
          maxLength="9"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          required
        />
      </div>

      <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>

  </div>
  );
};

export default ClientProfileForm;
