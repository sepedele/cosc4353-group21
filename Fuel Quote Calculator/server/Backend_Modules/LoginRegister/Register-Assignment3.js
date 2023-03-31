const express = require('express');
const register = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

register.use(cors());
register.use(express.json());

const validation = require('../../Middlewares/validationMiddleware');
const userSchema = require('../../Validations/credentialValidation');

const users = [
    {username: 'ocano', password: '1234', id: 1, firstTime: true},
    {username: 'duck', password: '5678', id: 2, firstTime: false}
]

register.post('/user_register', validation(userSchema), (req, res) => {
    console.log('Trying to create new user...')

    console.log('Username: ' + req.body.username)
    console.log('Password: ' + req.body.password)

    //Find if username already exists and adds user if username does not exist
    const checkUser = users.find(index => index.username == req.body.username)
    if (checkUser == null) {
        const newID = (users.slice(-1))[0].id + 1; 
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            id: newID,
            firstTime: true
        };
        users.push(newUser);
        console.log('New user created with id: ' + newUser.id);
        console.log(users);

        res.send({responseMsg: 'The username ' + newUser.username + ' is now registered!'});
    } 
    else {
        console.log('The username ' + checkUser.username + ' is already in use');
        res.status(400).send({responseMsg: 'The username ' + checkUser.username + ' is already in use'});
    }
});

module.exports = register;