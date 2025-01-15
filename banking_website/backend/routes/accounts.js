const express = require("express");
const ChequingsAcc = require("../models/ChequingsAccount");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const fetchuser = require("../middleware/fetchuser");

router.post("/createCheqAccount", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const account = new ChequingsAcc({
      amount: 0,
      user: userID
    });
    await account.save();
    res.status(200).json({ message: "Chequing account created" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
