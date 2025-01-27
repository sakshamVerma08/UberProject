const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  console.log("Cookies:", req.cookies);
  const token = req.cookies.token;
  // const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "couldn't decode token" });
    }

    console.log("decoded token = ", decodedToken);

    const user = await userModel.findById(decodedToken._id);
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", error: err });
  }
};
