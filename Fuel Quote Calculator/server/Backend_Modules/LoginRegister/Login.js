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

app.post("/user_login", validation(userSchema), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    const checkUser = users.find(index => index.username == username);
    if(checkUser == null) {
        console.log('user does not exist');
        res.send({loginReload: true}); // message to reload login page
    }
    
    try {
        if(checkUser.password == password) {
            console.log('login successful');
            res.send({loginReload: false, isFirst: checkUser.firstTime, user_id: checkUser.id});
        }
        else {
            console.log('login failed');
            res.send({loginReload: true});
        }
    } catch {
        console.log('error');
    }
});

module.exports = app;