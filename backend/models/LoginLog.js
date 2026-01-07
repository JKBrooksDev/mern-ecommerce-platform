const mongoose = require("mongoose");

const LoginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: String,
  timestamp: { type: Date, default: Date.now },
  ip: String,
  userAgent: String
});

module.exports = mongoose.model("LoginLog", LoginLogSchema);
