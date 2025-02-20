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
      console.log("From map-services\nLocation = ", location);

      if (!location || !location.lat || !location.lng) {
        throw new Error("Invalid location data received from Google Maps API");
      }

      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Google Maps API Error: ${response.data.status}`);
    }
  } catch (err) {
    console.error("Error fetching Coordinates");
    return { ltd: null, lng: null };
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
    }
  } catch (err) {
    console.log(err);
    throw new err();
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  console.log(
    "\nFrom 'getCaptainsInRadius'\n Ltd:",
    ltd,
    "\nLng: ",
    lng,
    "\nRadius:",
    radius
  );

  try {
    let captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[ltd, lng], radius / 6371],
        },
      },
    });

    if (captains.length === 0) {
      console.log("No captains found within the specified radius.");

      const addTestCaptains = () => {
        const testCaptains = [
          {
            fullname: { firstname: "Test1", lastname: "Captain" },
            email: "test1@example.com",
            password: "hashed_password",
            status: "active",
            vehicle: {
              color: "red",
              plate: "XYZ 123",
              capacity: 4,
              vehicleType: "car",
            },
            location: { type: "Point", coordinates: [77.8395, 29.9046] }, // Longitude first!
            socketId: "testSocket1",
          },
          {
            fullname: { firstname: "Test2", lastname: "Captain" },
            email: "test2@example.com",
            password: "hashed_password",
            status: "active",
            vehicle: {
              color: "blue",
              plate: "ABC 456",
              capacity: 2,
              vehicleType: "motorcycle",
            },
            location: { type: "Point", coordinates: [77.8397, 29.9048] },
            socketId: "testSocket2",
          },
        ];

        captains = captains.concat(testCaptains); // Append test data to captains array
        console.log("Test captains added to the array!");
      };

      addTestCaptains();
    } else {
      console.log(`Found ${captains.length} captains within the radius.`);
    }

    return captains;
  } catch (error) {
    console.log("Error in fetching captains: ", error);
    return [];
  }
};
