//code for the profile page
import React, { useState, useEffect } from 'react';
import { useLocation, generatePath, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import states from './US_States';
import '../../nav.css';
import './ProfilePage.css';

const ProfilePage = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const user_id = state.id;

  const initialState = {
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  };

  // Set state for form data and saved data
  const [formData, setFormData] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);


  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:3001/profile/${user_id}`);
        setFormData(response.data);
        setDataLoaded(true); // Data has been loaded
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, [user_id]);
  

  // Handle change and submit functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await Axios.put(`http://localhost:3001/profile/${user_id}`, formData);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
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

      <h1>My Profile</h1>

      {/* if edit mode is false and saved data is not null, display saved data */}
      {editMode || !dataLoaded ? (

        <form onSubmit={handleSave} data-testid="profile-form">

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
                {states.map((state) => (
                  <option key={state.abbr} value={state.abbr}>
                    {state.name}
                  </option>
                ))}
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
            {editMode ? (
              <button type="submit">Save</button>
            ) : (
              <button onClick={handleEdit} type="button">Edit</button>
            )}
          </div>
        </form>
      ) : (

<div className="saved-data">
  <h2 className="saved-data-title">Personal Information</h2>

  <p className="saved-data-item">
    <strong>Full Name:</strong> {formData.fullName}
  </p>

  <p className="saved-data-item">
    <strong>Address 1:</strong> {formData.address1}
  </p>

  <p className="saved-data-item">
    <strong>Address 2:</strong> {formData.address2}
  </p>

  <p className="saved-data-item">
    <strong>City:</strong> {formData.city}
  </p>

  <p className="saved-data-item">
    <strong>State:</strong> {formData.state}
  </p>

  <p className="saved-data-item">
    <strong>Zipcode:</strong> {formData.zipcode}
  </p>
  
  <div className="form-buttons">
            <button onClick={handleEdit} type="button">Edit</button>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default ProfilePage;
