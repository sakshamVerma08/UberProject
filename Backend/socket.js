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

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`${userType} id = ${userId}, Joined as : ${userType}`);

      let updatedUser;

      if (userType === "user") {
        updatedUser = userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        updatedUser = captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
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
        !location ||
        typeof location.ltd !== "number" ||
        typeof location.lng !== "number"
      ) {
        console.log(
          "from socket.js\n Latitude: ",
          location.ltd,
          "\nLongitude: ",
          location.lng
        );
        return socket.emit("error", { message: "Invalid Location" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          lat: location.ltd,
          lng: location.lng,
        },
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
