const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname should be atleast 3 characters long"],
    },

    lastname: {
      type: String,
      minlength: [3, "Last name should be atleast 3 characters long"],
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Vehicle color should be atleast 3 characters long"],
    },

    plate: {
      type: String,
      required: true,
      minlength: [4, "Number plate should be atleast 4 characters long"],
    },

    capacity: {
      type: Number,
      required: true,
      minlength: [1, "Minimum capacity should be atleast 1"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "auto", "motorcycle"],
    },
  },

  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  if (typeof password !== "string") {
    throw new Error("Password & hash must be string");
  }
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
