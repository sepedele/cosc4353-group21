const express = require('express');
const profileRegister = express();
const cors = require('cors');
const mySqlConnection = require('../../database');

profileRegister.use(cors());
profileRegister.use(express.json());

profileRegister.post('/profile_register', (req, res) => {
    console.log('Trying to register user profile...');
    mySqlConnection.query('INSERT INTO ClientInformation (fullName, address1, address2, city, state, zipcode, user_id) VALUES (?,?,?,?,?,?,?)',
        [req.body.fullName, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zipcode, req.body.user_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ responseMsg: 'Error occurred while registering user profile' });
            } else {
                console.log('User profile registered with client_id: ' + result.insertId);
                res.send({ responseMsg: 'User profile registered successfully!' });
            }
        });
});

module.exports = profileRegister;