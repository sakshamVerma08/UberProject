const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const location = response.data.results[0]?.geometry?.location;

      if (!location || !location.lat || !location.lng) {
        throw new Error("Invalid location data received from Google Maps API");
      }

      return { lat: location.lat, lng: location.lng };
    } else if (response.data.status === "ZERO_RESULTS") {
      return null;
    } else {
      throw new Error(`Google Maps API Error: ${response.data.status}`);
    }
  } catch (err) {
    throw new Error("Error fetching Coordinates");
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
      throw new Error("No routes found");
    }
    if (response.data.status === "OK") {
      return response.data.rows[0].elements[0];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else if (response.data.status === "REQUEST_DENIED") {
      console.log(response.data.error_message);
    }
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

module.exports.getCaptainsInTheRadius = async (
  lat,
  lng,
  radius,
  vehicleType
) => {
  try {
    console.log("Chosen vehicle type: ", vehicleType);

    const captains = await captainModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },

          $maxDistance: radius * 1000,
          $minDistance: 0,
        },
      },
      "vehicle.vehicleType": vehicleType,
    });

    /*
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[ltd, lng], radius / 6371],
        },
      },

      "vehicle.vehicleType": vehicleType,
    });
    */

    // If the $geoWithin method fails, use the below code:

    /* const captains = await captainModel.find({
       "location.coordinates.1": { $gte: ltd - latRange, $lte: ltd + latRange },
       "location.coordinates.0": { $gte: lng - lngRange, $lte: lng + lngRange },
     });
     */

    console.warn(
      `Total ${captains.length} captains were found to be in radius\nCaptains array from $near\n`
    );
    console.log(captains);

    if (!captains) {
      console.error("No captains were found in the Vicinity");
      return [];
    }

    return captains;
  } catch (error) {
    console.log("Error in fetching captains: ", error);
    return [];
  }
};
