const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");
const { verifyToken } = require("../middleware/VerifyToken");
const LoginLog = require("../models/LoginLog");

router
  .post("/signup", authController.signup)
  .post("/login", authController.login)
  .post("/verify-otp", authController.verifyOtp)
  .post("/resend-otp", authController.resendOtp)
  .post("/forgot-password", authController.forgotPassword)
  .post("/reset-password", authController.resetPassword)
  .get("/check-auth", verifyToken, authController.checkAuth)
  .get("/logout", authController.logout)
  .get("/login-logs", async (req, res) => {
    try {
      const logs = await LoginLog.find().sort({ timestamp: -1 });
      res.json(logs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
