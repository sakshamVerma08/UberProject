const dotenv = require("dotenv");
const userRoutes = require("./routes/user.routes");
const http = require("http");
const { Server } = require("socket.io");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/map.routes");
const rideRoutes = require("./routes/ride.routes");
// Loading the correct environment
let env = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${env}`, override: true });
console.log("Running it in :", env);

// dotenv.config({ path: ".env.local", override: true });

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const server = http.createServer(app);

app.use(cookieParser());
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "https://uber-project-jade.vercel.app/"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDB = require("./db/db");

connectToDB();
app.get("/", (req, res) => {
  res.send("Testing Route");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapRoutes);
app.use("/rides", rideRoutes);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
module.exports = app;
