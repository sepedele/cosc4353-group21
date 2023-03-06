import React, { useState } from 'react';
import './ProfileRegister.css';
import { useNavigate, useLocation} from "react-router-dom";


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


  const handleSubmit = (e) => {
    console.log(user_id);
    navigate("/profile");
    e.preventDefault();
    // handle form submission, e.g. save data to the database
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
    <h1>Welcome [username]!</h1>
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
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          {/* Add more options for all the states */}
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