const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const userScheme = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now() },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userScheme, "users");
