const express = require("express");
const CheqAcc = require("../models/ChequingsAccount");
const SavAcc = require("../models/SavingsAccount");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

router.get("/getAccInfo", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;

    const cheqAcc = await CheqAcc.findOne({ user: userID });
    const savAcc = await SavAcc.findOne({ user: userID });
    
    res.status(200).json({ cheqAcc, savAcc });
  } catch (error) {
    console.error(message);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
