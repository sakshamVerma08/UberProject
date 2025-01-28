const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name should be atleast 3 characters long"],
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
    minlength: [6, "Email should be atleast 6 characters long"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  // Will be used to share the live location of the driver with user.
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
