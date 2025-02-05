const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;
  console.log("request body = ", req.body);
  console.log("User Id = ", req.user._id);

  try {
    const ride = await rideService.createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
