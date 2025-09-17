const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected", socket.id);
    let lng = 0;
    let lat = 0;
    socket.on("join", async (data) => {
      console.warn("\nSocket Join Event was received\n");

      const { userId, userType } = data;
      console.log(`${userType} Mongo_id = ${userId}, Joined as : ${userType}`);

      console.warn(`SocketId of ${userType} = ${socket.id}`);

      let currentUser;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      if (!data) {
        return socket.emit("error", { message: "Invalid Data" });
      }

      const { userId, location } = data;
      // console.log("location object : \n", location);

      if (
        location &&
        location.coordinates &&
        typeof location.coordinates[0] === "number" &&
        typeof location.coordinates[1] === "number"
      ) {
        lng = location.coordinates[0];
        lat = location.coordinates[1];

        console.log(`From captain: Longitude: ${lng}`);
        console.log(`from captain: Latitude: ${lat} \n`);
      } else {
        console.error("Invaid location received from Frontend ");
        return;
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
      });
    });

    socket.on("new-ride-request", async (data) => {
      console.log("\nNew Ride request received :\n");
      console.log(data);

      await userModel
        .findById(data.userId)
        .then((user) => {
          currentUser = user;
        })
        .catch((err) => {
          console.error(
            "Error finding the User who booked the Ride in DB\n",
            err
          );
        });

      data.captainsInRadius.forEach((cpn) => {
        sendMessageToSocketId(cpn.socketId, {
          event: "new-ride-request",
          data: {
            user: currentUser,
            userSocketId: socket.id,
            vehicleType: data.vehicleType,
            pickup: data.pickup,
            destination: data.destination,
            pickupCoords: data.pickupCoords,
            destinationCoords: data.destinationCoords,
            distance: data.distance,
            duration: data.duration,
            location: {
              type: "Point",
              coordinates: [lng, lat],
            },
          },
        });
        console.log("Sent message to cpn");
      });
    });

    socket.on("ride-confirmed", (data) => {
      console.log("\nRide Accepted By captain");
      sendMessageToSocketId(data.userId.socketId, {
        event: "ride-confirmed",
        data: {
          rideId: data.ride._id,
          captainId: data.captainDetails._id,
          userSocketId: data.userId.socketId,
        },
      });
    });

    socket.on("ride-rejected", (data) => {
      console.log("Ride rejected by captain");
      sendMessageToSocketId(data.userId.socketId, {
        event: "ride-rejected",
        data,
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  // console.log(`sending message to ${socketId}, message = `, messageObject);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
