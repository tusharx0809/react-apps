const express = require("express");
const CheqAcc = require("../models/ChequingsAccount");
const SavAcc = require("../models/SavingsAccount");
const Transaction = require("../models/Transactions");
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
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

router.put('/cheqToSav', fetchuser, async (req, res) => {
  try {
    let success = false;
    const userID = req.user.id;
    const { amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ success: false, error: "Transfer amount must be greater than zero!" });
    }

    const cheqAcc = await CheqAcc.findOne({ user: userID });
    const savAcc = await SavAcc.findOne({ user: userID });

    if (!cheqAcc || !savAcc) {
      return res.status(404).json({ success: false, error: "Accounts not found!" });
    }

    if (amount > cheqAcc.amount) {
      return res.status(400).json({ success: false, error: "Not enough amount in Chequings Account!" });
    }

    cheqAcc.amount -= amount;
    savAcc.amount += amount;

    await cheqAcc.save();
    await savAcc.save();

    success = true;
    res.status(200).json({ success, message: `Amount of ${amount} transferred to Savings Account!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.put('/savToCheq', fetchuser, async (req, res) => {
  try {
    let success = false;
    const userID = req.user.id;
    const { amount } = req.body;
  
    if (amount <= 0) {
      return res.status(400).json({ success: false, error: "Transfer amount must be greater than zero!" });
    }

    const cheqAcc = await CheqAcc.findOne({ user: userID });
    const savAcc = await SavAcc.findOne({ user: userID });

    if (!cheqAcc || !savAcc) {
      return res.status(404).json({ success: false, error: "Accounts not found!" });
    }

    if (amount > savAcc.amount) {
      return res.status(400).json({ success: false, error: "Not enough amount in Savings Account!" });
    }

    savAcc.amount -= amount;
    cheqAcc.amount += amount;

    await savAcc.save();
    await cheqAcc.save();

    success = true;
    res.status(200).json({ success, message: `Amount of ${amount} transferred to Chequings Account!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


module.exports = router;
