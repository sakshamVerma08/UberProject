const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pickup Location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Drop Location"),

  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid Vehicle Type"),

  body("pickupCoords").exists().withMessage("Must send pickup coords"),

  body("destinationCoords")
    .exists()
    .withMessage("Destination coords must exist"),
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination"),
  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  rideController.confirmRide
);
module.exports = router;
