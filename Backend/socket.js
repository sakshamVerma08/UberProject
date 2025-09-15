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
        updatedUser = await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });

        console.warn(
          "User socket.id was updated successfully ✅\nNew socket id = ",
          updatedUser.socketId
        );
      } else if (userType === "captain") {
        updatedCaptain = await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });

        console.warn(
          "Captain socket.id was updated successfully ✅\nNew socket id = ",
          updatedCaptain.socketId
        );
      }

      // console.log("Updated User/Captain = ", updatedUser);
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

        console.log(`From frontend: Longitude: ${lng}`);
        console.log(`from frontend: Latitude: ${lat} \n`);
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
