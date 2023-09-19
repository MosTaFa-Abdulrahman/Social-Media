const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, min: 3, max: 25, required: true, unique: true },
    email: { type: String, max: 56, required: true, unique: true },
    password: { type: String, min: 6, max: 16, required: true },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    relationship: { type: Number, enum: [1, 2, 3] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
