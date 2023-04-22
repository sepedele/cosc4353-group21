const express = require('express');
const profilePage = express();
const cors = require('cors');
const mySqlConnection = require('../../database');


profilePage.use(cors());
profilePage.use(express.json());


// Fetch user data
profilePage.get('/profile/:id', (req, res) => {
    const { id } = req.params;
  
    mySqlConnection.query(
      'SELECT * FROM ClientInformation WHERE user_id = ?',
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ responseMsg: 'Error occurred while fetching user data' });
        } else {
          res.send(result[0]);
        }
      }
    );
  });
  
  // Update user data
  profilePage.put('/profile/:id', (req, res) => {
    const { id } = req.params;
    const { fullName, address1, address2, city, state, zipcode } = req.body;
  
    mySqlConnection.query(
      'UPDATE ClientInformation SET fullName = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ? WHERE user_id = ?',
      [fullName, address1, address2, city, state, zipcode, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ responseMsg: 'Error occurred while updating user data' });
        } else {
          res.send({ responseMsg: 'User data updated successfully!' });
        }
      }
    );
});

module.exports = profilePage;