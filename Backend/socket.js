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
    console.log(`client connected : ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log("user id = ", userId, "  Joined as: ", userType);

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

      if (
        !location ||
        typeof location.ltd !== "number" ||
        typeof location.lng !== "number"
      ) {
        console.log("Latitude: ", location.ltd, "\nLongitude: ", location.lng);
        return socket.emit("error", { message: "Invalid Location" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [location.lng, location.ltd],
        },
      });
    });
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket.io not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
