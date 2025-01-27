const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const connectToDB = require("./db/db");

connectToDB();
app.get("/", (req, res) => {
  res.send("Testing Route");
});

module.exports = app;
