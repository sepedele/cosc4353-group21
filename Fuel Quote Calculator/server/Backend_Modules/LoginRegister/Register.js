const express = require('express');
const register = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const saltRounds = 10;
const mySqlConnection = require('../../database');

register.use(cors());
register.use(express.json());

const validation = require('../../Middlewares/validationMiddleware');
const userSchema = require('../../Validations/credentialValidation');

register.post('/user_register', validation(userSchema), async (req, res) => {
    console.log('Trying to create new user...')

    console.log('Username: ' + req.body.username)
    
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    console.log('Password: ' + req.body.password)

    //Find if username already exists and adds user if username does not exist
    try {
        mySqlConnection.query('SELECT * FROM UserCredentials WHERE username = ?', [req.body.username], 
        (err, result) => {
            if(result.length > 0) // a user exists
            {   
                console.log('The username ' + result[0].username + ' is already in use');
                res.status(400).send({responseMsg: 'The username ' + result[0].username + ' is already in use'});               
            }
                
            else // a user does not exist
            {
                mySqlConnection.query('INSERT INTO UserCredentials (username, password) VALUES (?,?)', 
                [req.body.username, req.body.password], 
                (err, result) => {
                        console.log('New user created with id: ' + result.insertId);
                        res.send({responseMsg: 'The username ' + req.body.username + ' is now registered!'});
                    }
                );
            }
        });

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    
});

module.exports = register;