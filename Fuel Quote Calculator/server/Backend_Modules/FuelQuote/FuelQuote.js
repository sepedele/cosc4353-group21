const express = require("express");
const app = express();
// const bcrypt = require('bcrypt');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const data = require("./MockData");

app.get("/quote_history", (req, res) => {
  // implement more useful error handling when we have a database
  try {
    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = app;
