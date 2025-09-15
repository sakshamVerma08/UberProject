const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinates(address);

    if (!coordinates) {
      return res.status(400).json({
        mssage: "Invalid location data received from Google Maps API",
      });
    }

    return res.status(200).json({
      lat: coordinates.lat,
      lng: coordinates.lng,
    });
  } catch (err) {
    // console.error("Error while fetching Coordinates of address", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Error in Validation, getAutoCompleteSuggestions");
      return res.status(400).json({ message: errors.array() });
    }

    const { input } = req.query;
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getNearbyDrivers = async (req, res) => {
  try {
    const { lat, lng, radius, vehicleType, location } = req.query;

    const captains = await mapService.getCaptainsInTheRadius(
      lat,
      lng,
      radius,
      vehicleType,
      location
    );

    if (captains.length == 0) {
      return res
        .status(400)
        .json({ message: "Couldn't get any captains in radius" });
    }

    return res.status(200).json(captains);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
