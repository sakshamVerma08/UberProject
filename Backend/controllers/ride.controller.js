const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);

    try {
      const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
      console.log("PickupCoordinates =", pickupCoordinates);
      if (
        !pickupCoordinates ||
        !pickupCoordinates.ltd ||
        !pickupCoordinates.lng
      ) {
        console.log(
          "\nFrom ride-controller\n Pickup latitude: ",
          pickupCoordinates.ltd,
          "\nPickupCoordinates longitude: ",
          pickupCoordinates.lng
        );
        return res.status(400).json({ message: "Invalid pickup location" });
      }

      const captainsInRadius = await mapService.getCaptainsInTheRadius(
        pickupCoordinates.ltd,
        pickupCoordinates.lng,
        3
      );
      console.log("captains in radius = ", captainsInRadius);
      captainsInRadius.map((captain) => {
        console.log("captain= ", captain, "\nride= ", ride);
        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: ride,
        });
      });
    } catch (err) {
      console.log("Couldn't process captains in the backend");
      return res.status(500).json({ message: err.message });
    }
  } catch (err) {
    console.log("Error in ride-controller", err);
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
    return res.status(500).json({ message: err.message });
  }
};
