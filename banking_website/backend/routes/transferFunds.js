const express = require("express");
const CheqAcc = require("../models/ChequingsAccount");
const User = require("../models/User");
const Transaction = require("../models/Transactions");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

router.put("/transferFunds", fetchuser, async (req, res) => {
  try {
    let success = false;
    const { amount, receiverMail } = req.body;
    const senderID = req.user.id;
    const sender = await User.findById(senderID);
    

    const senderAcc = await CheqAcc.findOne({ user: senderID });
   
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
    if (amount > senderAcc.amount) {
      return res
        .status(400)
        .json({ success, error: "Insufficient funds in Checquings Account!" });
    }

    senderAcc.amount -= amount;
    receiverAcc.amount += amount;

    const senderTransaction = new Transaction({
      user: req.user.id,
      type: "Sent",
      from: undefined,
      to: receiverMail,
      amount: amount, 
      date: new Date()
    });

    const receiverTransaction = new Transaction({
      user: receiver.id,
      type: "Received",
      from: sender.email,
      to: undefined,
      amount: amount, 
      date: new Date()
    });

    await senderAcc.save();
    await receiverAcc.save();
    await senderTransaction.save();
    await receiverTransaction.save();

    success = true;
    res.status(200).json({success, message:`Amount of ${amount} sent to ${receiverMail}`});
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
