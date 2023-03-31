const express = require('express');
const login = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

login.use(cors());
login.use(express.json());

const validation = require('../../Middlewares/validationMiddleware');
const userSchema = require('../../Validations/credentialValidation');

const users = [
    {username: 'ocano', password: '1234', id: 1, firstTime: true},
    {username: 'duck', password: '5678', id: 2, firstTime: false}
]

login.post("/user_login", validation(userSchema), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    const checkUser = users.find(index => index.username == username);
    
    try { // try block runs if checkUser is not null
        if(checkUser.password == password) {
            console.log('login successful');
            res.send({responseMsg: 'Login Successful', isFirst: checkUser.firstTime, user_id: checkUser.id});
        }
        else {
            console.log('login failed');
            res.status(400).send({responseMsg: 'Login Failed'}); // message to reload login page
        }
    } catch { // catch block runs if checkUser is null
        console.log('user does not exist');
        res.status(400).send({responseMsg: 'User Does Not Exist'}); // message to reload login page
    }
});

module.exports = login;