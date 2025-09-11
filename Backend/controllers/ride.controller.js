const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");
const captainModel = require("../models/captain.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  try {
    const ride = await rideService.createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    try {
      const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
      if (
        !pickupCoordinates ||
        !pickupCoordinates.ltd ||
        !pickupCoordinates.lng
      ) {
        return res.status(400).json({ message: "Invalid pickup location" });
      }

      const captainsInRadius = await mapService.getCaptainsInTheRadius(
        pickupCoordinates.ltd,
        pickupCoordinates.lng,
        15
      );

      // if (captainsInRadius.data.status == 404) {
      //   return res
      //     .status(404)
      //     .json({ message: "No Captains were found in Radius" });
      // }

      if (captainsInRadius.length === 0) {
        const randomCaptains = await captainModel.find();
        if (randomCaptains) {
          randomCaptains.map((cpn, index) => {
            if (cpn.socketId) {
              captainsInRadius.push(cpn);
            }
          });
        } else {
          console.log(
            "No captains available in database who have a valid socketID"
          );
        }
      }

      console.warn("\nCreated Ride Details:");
      console.log(ride);

      const rideWithUser = await rideModel
        .findOne({ _id: ride._id })
        .populate("user");

      if (!rideWithUser) {
        console.log("Problem in Ride Creation ");
      }

      console.log("\nCaptains in Radius Array = ", captainsInRadius);
      captainsInRadius.map((captain) => {
        sendMessageToSocketId(captain.socketId, {
          event: "new-ride-request",
          data: rideWithUser,
        });
      });

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

  const { rideId } = req.body;

  if (!rideId) {
    return res.status(400).json({ message: "Ride Id is invalid" });
  }

  if (!req.captain || !req.captain._id) {
    return res.status(400).json({ message: "Unauthorized:Captain Not found" });
  }

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captainId: req.captain._id,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log("\nerror in confirming ride\n");
    return res.status(500).json({ message: err.message });
  }
};
