const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "TusharBhatiaIsABad$Coder";
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1 ENDPOINT: Create a user using: POST "/api/auth/createUser". Dosent require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad Request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "A user with this email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); //creates header, payload(data) and secret part of the jwt token

      //.then(user => res.json(user))
      //.catch(err=>{console.log(err)
      //res.json({error: 'Email already exists in database! Try another email!', message: err.message})})
      //res.json(user);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);

//ROUTE 2 ENDPOINT: Authenticate a user using: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password); //compare password
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      //console.log(data);
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);

//ROUTE 3 ENDPOINT: Get logged in User Details: POST "api/auth/getuser". Login Required
router.post("/getuser", fetchuser, async (req, res) => {

  try {
    userID = req.user.id;
    //console.log(userID);
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message); 
    res.status(500).send("Internal Serever error!");
  }
});

module.exports = router;
