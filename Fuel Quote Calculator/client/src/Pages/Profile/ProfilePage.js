//code for the profile page

import React, { useState } from 'react';
import {useLocation, generatePath, useNavigate} from "react-router-dom";
import "../../nav.css";
import './ProfilePage.css';

const ProfilePage() => {
  let navigate = useNavigate();
  const {state} = useLocation();
  const user_id = state.id;

  const initialState = {
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: ""
  };

  //set state for form data and saved data
  const [formData, setFormData] = useState(initialState);
  const [savedData, setSavedData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  //handle change and submit functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //saves form data to saved data and sets edit mode to false
  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedData(formData);
    setEditMode(false);
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

    div className="grid-container">

      <h1>My Profile</h1>

      {/* if edit mode is false and saved data is not null, display saved data */}
      {editMode || !savedData ? (

        <form onSubmit={handleSubmit} data-testid="profile-form">
          <div className="grid-item">
            <label className="form-label" htmlFor="fullName">
              Full Name:
              <input
                id="fullName"
                className="form-control"
                type="text"
                name="fullName"
                maxLength="50"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          
          <div className="grid-item">
            <label className="form-label" htmlFor="address1">
              Address 1:
              <input
                id="address1"
                className="form-control"
                type="text"
                name="address1"
                maxLength="100"
                value={formData.address1}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          
          <div className="grid-item">
            <label className="form-label" htmlFor="address2">
              Address 2 (Optional):
              <input
                id="address2"
                className="form-control"
                type="text"
                name="address2"
                maxLength="100"
                value={formData.address2}
                onChange={handleChange}
              />
            </label>
          </div>

          
          <div className="grid-item">
            <label className="form-label" htmlFor="city">
              City:
              <input
                id="city"
                className="form-control"
                type="text"
                name="city"
                maxLength="100"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          
          <div className="grid-item">
            <label className="form-label" htmlFor="state">
              State:
              <select
                id="state"
                className="form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select a state</option>
                {/* Add your state options here */}
                <option value="CA">California</option>
                <option value="NY">New York</option>
                {/* ... */}
              </select>
            </label>
          </div>

          
          <div className="grid-item">
            <label className="form-label" htmlFor="zipcode">
              Zipcode:
              <input
                id="zipcode"
                className="form-control"
                type="text"
                name="zipcode"
                minLength="5"
                maxLength="9"
                pattern="\d*"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-buttons">
            <button type="submit">Save</button>
          </div>

        </form>
      ) : (

        
        <div>
          <h2>Saved Data</h2>
          <p>
            <strong>Full Name:</strong> {savedData.fullName}
          </p>
          <p>
            <strong>Address 1:</strong> {savedData.address1}
          </p>
          <p>
            <strong>Address 2:</strong> {savedData.address2}
          </p>
          <p>
            <strong>City:</strong> {savedData.city}
          </p>
          <p>
            <strong>State:</strong> {savedData.state}
          </p>
          <p>
            <strong>Zipcode:</strong> {savedData.zipcode}
          </p>
          <div className="form-buttons">
          <button onClick={handleEdit} type = "button" >Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
