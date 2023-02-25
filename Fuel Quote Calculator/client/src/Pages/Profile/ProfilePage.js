//code for the profile page

import React, { useState } from 'react';
import './ProfilePage.css';

function ProfilePage() {
  const [fullName, setName] = useState('Giovanni Gonzalez');
  const [address1, setAddress1] = useState('123 Main St');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('Houston');
  const [state, setState] = useState('Texas');
  const [zipcode, setZipcode] = useState('12345');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  return (

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
              value={fullName} 
              onChange={(e) => setName(e.target.value)} />
          ) : (
            <span>{fullName}</span>   //if isEditMode is false, then show the span
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
              id="state" 
              value={state} 
              onChange={(e) => setState(e.target.value)} />
          ) : (
            <span>{state}</span>
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

      <div className="form-buttons">
      {isEditMode ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
      </div>

    </div>
  );
}

export default ProfilePage;
