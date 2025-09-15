const captainModel = require("../models/captain.model");
const blackListTokenModel = require("./blacklist-controller");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Error in route Validation" });
  }

  const { fullname, email, password, vehicle, location } = req.body;

  const isCaptainExists = await captainModel.findOne({ email });

  if (isCaptainExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
    location,
  });

  const token = await captain.generateAuthToken();

  if (!token) {
    return res.status(401).json({ message: "token was not generated" });
  }

  return res
    .status(201)
    .json({ token, captain, message: "Account created Successfully" });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(404).json({ message: "Invalid Email or Password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }

  const token = await captain.generateAuthToken();

  if (!token) {
    return res.status(400).json({ message: "Token not generated correctly" });
  }

  res.cookie("token", token);
  res.status(200).json({ token, captain, message: "Captain Login Successful" });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: "couldn't access token" });
  }

  res.clearCookie("token");

  await blackListTokenModel.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
};
