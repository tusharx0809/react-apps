const express = require("express");
const CheqAcc = require("../models/ChequingsAccount");
const SavAcc = require("../models/SavingsAccount");
const User = require("../models/User");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

router.put("/transferFunds", fetchuser, async (req, res) => {
  try {
    let success = false;
    const { amount, receiverMail } = req.body;
    const userID = req.user.id;

    const senderAcc = await CheqAcc.findOne({ user: userID });
    if (!senderAcc) {
      return res.status(400).json({ success, error: "Account not found!" });
    }
    const receiver = await User.findOne({ email: receiverMail }).select("-password");
    if (!receiver) {
      return res.status(400).json({
        success,
        error: "Receiver not found, please check the receiver email!",
      });
    }
    const receiverAcc = await CheqAcc.findOne({user: receiver.id});

    if (amount <= 0) {
      return res
        .status(400)
        .json({ success, error: "Please enter amount greater than zero!" });
    }
    if (amount < senderAcc.amount) {
      return res
        .status(400)
        .json({ success, error: "Insufficient funds in Checquings Account!" });
    }

    senderAcc.amount -= amount;
    receiver += amount;

    await senderAcc.save();
    await receiverAcc.save();

    success = true;
    res.status(200).json({success, message:`Amount of ${amount} sent to ${receiverMail}`});
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
