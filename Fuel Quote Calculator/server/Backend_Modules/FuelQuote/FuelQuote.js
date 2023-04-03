const express = require("express");
const fuelquote = express();
// const bcrypt = require('bcrypt');
const cors = require("cors");
const mySqlConnection = require("../../database");

fuelquote.use(cors());
fuelquote.use(express.json());

fuelquote.get("/quote_history", (req, res) => {
  const query = "SELECT * FROM fuel_quotes";
  mySqlConnection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send("Server error");
    } else {
      console.log(res);
      res.json(results);
    }
  });
});

module.exports = fuelquote;
