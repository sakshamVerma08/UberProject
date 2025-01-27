const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be atleast 3 characters long."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be atleast 6 characters"),
  ],

  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be atleast 6 characters"),
  ],

  userController.loginUser
);

module.exports = router;
