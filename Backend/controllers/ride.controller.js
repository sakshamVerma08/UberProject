const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const rideModel = require("../models/ride.model");
const captainModel = require("../models/captain.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType, pickupCoords, destinationCoords } =
    req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  try {
    const ride = await rideService.createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      pickupCoords,
      destinationCoords,
    });

    try {
      const rideWithUser = await rideModel
        .findOne({ _id: ride._id })
        .populate("user");

      if (!rideWithUser) {
        console.log("Problem in Ride Creation ");
      }

      res.status(201).json(ride);
    } catch (err) {
      console.log("Couldn't process captains in the backend", err.message);
    }
  } catch (err) {
    console.log("Error in Ride Creation", err.message);
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);

    return res.status(200).json(fare);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "error in getting the fare of the ride",
    });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, captainId } = req.body;

  if (!rideId) {
    return res.status(400).json({ message: "Ride Id is invalid" });
  }

  if (!captainId) {
    return res.status(400).json({ message: "Unauthorized:Captain Not found" });
  }

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captainId: req.captain._id,
    });

    const captainDetails = await captainModel.findById(captainId);

    if (!captainDetails) {
      return res
        .status(404)
        .json({ message: "No associated Captain found with the created ride" });
    }

    return res.status(200).json({
      ride,
      message: "Ride Accepted Successfully",
      captainDetails,
      userId: ride.user,
    });
  } catch (err) {
    console.log("\nerror in confirming ride\n");
    return res.status(500).json({ message: err.message });
  }
};
