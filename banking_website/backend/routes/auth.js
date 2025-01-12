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

router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
    body("dob", "Enter a date of birth")
      .isISO8601()
      .withMessage("Date of birth must be in format YYYY-MM-DD"),
    body("phone", "Enter a phone number").isLength({ min: 10 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "A username with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        dob: req.body.dob,
        phone: req.body.phone,
      });

      const otp = user.generateOTP();

      await user.save();

      const message = `
            <h1> Welcome to Banking Website</h1>
            <p> Your OTP for email verification is: <b>${otp}</b></p>
            <p>OTP Valid for 5 minutes</p>`;

      try {
        await sendEmail({
          email: user.email,
          subject: "Email verification OTP",
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

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;

      res.status(201).json({
        success,
        authToken,
        message: "User Registered Successfully. Please verify your email.",
      });
    } catch (error) {
      console.error(message);
      res.status(500).send("Internal Server error");
    }
  }
);

router.post("/verify-otp", fetchuser, async (req, res) => {
  try {
    let success = false;
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { otp } = req.body;

    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ error: "Invalid or Expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();
    success = true;
    res.status(200).json({
      success,
      message: "Email verified Successfully!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", 
  [
    body("email","Enter Email").notEmpty(),
    body("password","Password cannot be blank").exists()
  ],
  async(req, res)=>{
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const{ email, password } = req.body;
  
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Invalid Credentials"})
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Invalid Credentials"});
    }
    
    const payload = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(payload, JWT_SECRET);
    success = true;
    res.json({success, authToken, isVerified: user.isVerified });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error")
  }
})

module.exports = router;
