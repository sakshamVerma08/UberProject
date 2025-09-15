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
  vehicleType,
  location
) => {
  try {
    console.log("Chosen vehicle type: ", vehicleType);
    console.log(
      `Searching for captains within ${radius} meters of [${lat}, ${lng}]`
    );

    const captains = await captainModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [location.lng, location.lat],
          },
          distanceField: "dist.calculated",
          maxDistance: radius,
          spherical: true,
        },
      },

      {
        $match: {
          "vehicle.vehicleType": vehicleType,
          status: "active",
        },
      },

      {
        $sort: { "dist.calculated": 1 },
      },
    ]);

    console.log(`Found ${captains.length} captains within ${radius} meters`);

    return captains;
  } catch (error) {
    console.error("Error in getCaptainsInTheRadius:", error);
    return [];
    // throw new Error("Failed to find nearby captains");
  }
};
