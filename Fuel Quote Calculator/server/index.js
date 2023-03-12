const express = require("express");
const app = express();

const login = require("./Backend_Modules/LoginRegister/Login");
app.use(login);

const register = require("./Backend_Modules/LoginRegister/Register");
app.use(register);

const fuelquote = require("./Backend_Modules/FuelQuote/FuelQuote");
app.use(fuelquote);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
