const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const validation = require('../../Middlewares/validationMiddleware');
const userSchema = require('../../Validations/loginValidation');

const users = [
    {username: 'ocano', password: '1234', id: 1, firstTime: true},
    {username: 'duck', password: '5678', id: 2, firstTime: false}
]

app.post('/user_register', validation(userSchema), (req, res) => {
    console.log('Trying to create new user...')

    console.log('Username: ' + req.body.username)
    console.log('Password: ' + req.body.password)

    //Find if username already exists and adds user if username does not exist
    const checkUser = users.find(index => index.username == req.body.username)
    if (checkUser == null) {
        const newID = (users.slice(-1))[0].id + 1; 
        const user = {
            username: req.body.username,
            password: req.body.password,
            id: newID,
            firstTime: true
        };
        users.push(user);
        console.log('New user created: ' + user.id);
        console.log(users);

        res.send({loginRedirect: true}); // redirect to login page! no need to send id value since login will take care of that
    } else {
        console.log('The username ' + checkUser.username + ' is already in use')
        res.send({loginRedirect: false}); // this means to refresh register page
    }
});

module.exports = app;