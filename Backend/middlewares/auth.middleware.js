const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../controllers/blacklist-controller");

module.exports.authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized (blacklisted)" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "couldn't decode token" });
    }

    const user = await userModel.findById(decodedToken._id);
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", error: err });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);
  if (!token) {
    return res.status(401).json({ message: "Token not generated correctly" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decodedToken._id);

    req.captain = captain;
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized{error in middleware)", error: err });
  }
};
