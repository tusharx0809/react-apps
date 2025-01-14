require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_JWT;
const sendEmail = require("../utils/sendEmail");
const fetchuser = require("../middleware/fetchuser");

router.put("/renewpassword", fetchuser, async (req, res) => {
  try {
    let success = false;
    const userID = req.user.id;

    const user = await User.findById(userID).select("+password");
    if (!user) {
      return res.status(404).json({ success, error: "User not found" });
    }

    const curPassword = req.body.curpassword;

    const passwordCompare = await bcrypt.compare(curPassword, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ success, error: "Current password is incorrect!" });
    }

    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).json({
        success,
        error: "Password must be atleast 8 characters long.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();
    success = true;

    res.status(200).json({
      success,
      message: "Password has been successfully renewed.",
    });

    const message = `
            <h1> Password Renewal</h1>
            <p> Your password was renewed at <b>${new Date().toDateString()} ${new Date().toLocaleTimeString()}</b>.</p>
            `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Renewed",
        message,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({
        error: "Failed to send verification email",
        details: emailError.message,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
