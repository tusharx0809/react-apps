const express = require('express');
const router = express.Router();
const Transaction = require("../models/Transactions");
const fetchuser = require("../middleware/fetchuser");

router.get('/getTransactions', fetchuser, async(req, res)=>{
    try {
        let success = false;
        const id = req.user.id;
        const transactions = await Transaction.find({user: id});
        if(!transactions){
            return res.status(400).json({success, error: "Not found!"});
        }
        success = true;
        res.status(200).json({success, transactions});
    } catch (error) {
        console.error(error);
      res.status(500).send("Internal Server error");
    }
});

module.exports = router;