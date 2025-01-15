const express = require("express");
const CheqAcc = require("../models/ChequingsAccount");
const SavAcc = require("../models/SavingsAccount");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

router.get("/getAccInfo", fetchuser, async (req, res) => {
  try {
    let success = false;
    const userID = req.user.id;

    const cheqAcc = await CheqAcc.findOne({ user: userID });
    const savAcc = await SavAcc.findOne({ user: userID });
    
    if(cheqAcc && savAcc){
      return res.status(200).json({ success: true, cheqAcc, savAcc });
    }else{
      return res.status(200).json({succes: false});
    }
    
  } catch (error) {
    console.error(message);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
