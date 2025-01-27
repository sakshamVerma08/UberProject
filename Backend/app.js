const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");
dotenv.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(cookieParser());
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDB = require("./db/db");

connectToDB();
app.get("/", (req, res) => {
  res.send("Testing Route");
});

app.use("/users", userRoutes);

module.exports = app;
