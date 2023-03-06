//code for the profile page

import React, { useState } from 'react';
import {useLocation, generatePath, useNavigate} from "react-router-dom";
import "../../nav.css";
import './ProfilePage.css';

function ProfilePage() {
  let navigate = useNavigate();
  const {state} = useLocation();
  const user_id = state.id;

  const [fullName, setName] = useState('Giovanni Gonzalez');
  const [address1, setAddress1] = useState('123 Main St');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('Houston');
  const [US_state, setState] = useState('Texas');
  const [zipcode, setZipcode] = useState('12345');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
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

    <div className="grid-container">
      <h1>Profile Page</h1>

      <form>
        <div className="grid-item">
        <label className="profile-pg-form-label" htmlFor="fullName">Full Name:</label>
          {isEditMode ? (            //if isEditMode is true, then show the input field
            <input 
              className='form-control'
              type="text" 
              id="name" 
              value={user_id} 
              onChange={(e) => setName(e.target.value)} />
          ) : (
            <span>{user_id}</span>   //if isEditMode is false, then show the span
          )}
        </div>

        <div className="grid-item">
        <label className="profile-pg-form-label" htmlFor="address1">Address 1:</label>
          {isEditMode ? (
            <input 
              className='form-control'
              type="address1" 
              id="address" 
              value={address1} 
              onChange={(e) => setAddress1(e.target.value)} />
          ) : (
            <span>{address1}</span>
          )}
        </div>

        <div className="grid-item">
        <label className="profile-pg-form-label" htmlFor="address2">Address 2:</label>
          {isEditMode ? (
            <input 
              className='form-control'
              type="text" 
              id="address" 
              value={address2} 
              onChange={(e) => setAddress2(e.target.value)} />
          ) : (
            <span>{address2}</span>
          )}
        </div>

        <div className="grid-item">
        <label className="profile-pg-form-label" htmlFor="city">City:</label>
          {isEditMode ? (
            <input 
              className='form-control'
              type="tel" 
              id="phone" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} />
          ) : (
            <span>{city}</span>
          )}
        </div>

        <div className="grid-item">
        <label className="profile-pg-form-label" htmlFor="state">State:</label>
          {isEditMode ? (
            <input 
              className='form-control'
              id="US_state" 
              value={US_state} 
              onChange={(e) => setState(e.target.value)} />
          ) : (
            <span>{US_state}</span>
          )}

        </div>
        <div className="grid-item">
        <label className="profile-pg-form-label" htmlFor="zipcode">Zipcode:</label>
          {isEditMode ? (
            <input 
              className='form-control'
              type="text" 
              id="zipcode"
              value={zipcode} 
              onChange={(e) => setZipcode(e.target.value)} />
          ) : (
            <span>{zipcode}</span>
          )}

        </div>
      </form>

      <div className="profile-form-buttons">
      {isEditMode ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
      </div>

    </div>

    </>
  );
}

export default ProfilePage;
