require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
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

    const curPassword = req.body.curPassword;

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
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
