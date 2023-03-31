const express = require('express');
const login = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const mySqlConnection = require('../../database');


login.use(cors());
login.use(express.json());

const validation = require('../../Middlewares/validationMiddleware');
const userSchema = require('../../Validations/credentialValidation');

login.post("/user_login", validation(userSchema), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    try {
        mySqlConnection.query('SELECT * FROM UserCredentials WHERE username = ?', [req.body.username], 
        async (err, result) => {
            if(result.length > 0) // a user exists
            {  
                const userPassword = result[0].password;
                const userId = result[0].user_id;
                console.log(userId);
                const validPassword = await bcrypt.compare(password, userPassword);
                if(validPassword) {
                    console.log('login successful');
                    mySqlConnection.query('SELECT * FROM ClientInformation WHERE user_id = ?', [userId], 
                    (err, result) => {
                        var firstTime = true;
                        if(result.length > 0) // not first time user
                            firstTime = false;
                        console.log(userId);
                        console.log('first time for user ' + userId + ': ' + firstTime);
                        res.send({responseMsg: 'Login Successful', isFirst: firstTime, user_id: userId});
                    });   
                }
                else {
                    console.log('login failed');
                    res.status(400).send({responseMsg: 'Login Failed'}); 
                }
            }
            else // a user does not exist
            {
                console.log('user does not exist');
                res.status(400).send({responseMsg: 'User Does Not Exist'});
            }
        });

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }

});

module.exports = login;