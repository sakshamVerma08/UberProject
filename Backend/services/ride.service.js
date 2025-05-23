const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  try {
    if (!pickup || !destination) {
      return res
        .status(400)
        .json({ error: "Pickup and Destination are required" });
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
      auto: 30,
      car: 50,
      motorcycle: 20,
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      motorcycle: 8,
    };

    const perMinuteRate = {
      auto: 2,
      car: 3,
      motorcycle: 1.5,
    };

    const fare = {
      auto: Math.round(
        baseFare.auto +
          (distanceTime.distance.value / 1000) * perKmRate.auto +
          (distanceTime.duration.value / 60) * perMinuteRate.auto
      ),
      car: Math.round(
        baseFare.car +
          (distanceTime.distance.value / 1000) * perKmRate.car +
          (distanceTime.duration.value / 60) * perMinuteRate.car
      ),
      motorcycle: Math.round(
        baseFare.motorcycle +
          (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
          (distanceTime.duration.value / 60) * perMinuteRate.motorcycle
      ),
    };

    return fare;
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports.getFare = getFare;
function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}
module.exports.createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRide = async ({ rideId, captainId }) => {
  if (!rideId) {
    throw new Error("Ride ID is Required");
  }

  await rideModel.findByIdAndUpdate(rideId, {
    status: "accepted",
    captain: captainId,
  });

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user");

  if (!ride) {
    throw new Error("Ride not found!");
  }

  ride.status = "accepted";
  return ride;
};
