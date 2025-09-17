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

      let updatedUser;
      let updatedCaptain;

      if (userType === "user") {
        userModel.findById(userId)
          .then((user) => {
            if (user && !user.socketId) {
              return userModel.findByIdAndUpdate(userId, {
                socketId: socket.id,
              });
            }
          })
          .then(() => {
            console.log("User's socketId was updated successfully ✅");
          })
          .catch((err) => {
            console.error("Error updating user's socketId: ", err);
          });
      } else if (userType === "captain") {
        captainModel
          .findById(userId)
          .then((captain) => {
            if (captain && !captain.socketId) {
              return captainModel.findByIdAndUpdate(userId, {
                socketId: socket.id,
              });
            }
          })
          .then((updatedCaptain) => {
            if (updatedCaptain) {
              console.warn("Captain socketId was updated successfully ✅");
            }
          })
          .catch((err) => {
            console.error("Error updating captain's socketId: ", err);
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

      data.captainsInRadius.forEach((cpn) => {
        sendMessageToSocketId(cpn.socketId, {
          event: "new-ride-request",
          data: {
            userId: data.userId,
            vehicleType: data.vehicleType,
            pickup: data.pickup,
            destination: data.destination,
            distance: data.distance,
            duration: data.duration,
            location: {
              type: "Point",
              coordinates: [lng, lat],
            },
          },
        });
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
