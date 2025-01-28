const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain-controller");
const authMiddleware = require("../middlewares/auth.middleware");

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

    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color should be atleast 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 4 })
      .withMessage("Vehicle plate number should be atleast 4 characters long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Vehicle capacity should be atleast for 1 passenger"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid Vehicle Type"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be atleast 6 characters long"),
  ],
  captainController.loginCaptain
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);

router.post(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);

module.exports = router;
