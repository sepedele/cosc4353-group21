const express = require("express");
const fuelquote = express();
// const bcrypt = require('bcrypt');
const cors = require("cors");

fuelquote.use(cors());
fuelquote.use(express.json());

const data = require("./MockData");

fuelquote.get("/quote_history", (req, res) => {
  res.json(data);
  // implement more useful error handling when we have a database
  // try {
  //   if (!Array.isArray(data)) {
  //     throw new Error("Data is not an array");
  //   }
  //   res.json(data);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Server error");
  // }
});

module.exports = fuelquote;
