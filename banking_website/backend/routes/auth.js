const express = require('express');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const router = express.router();

router.post('/signup', async(req, res) => {
    const {name, email, password, dob, phone} = req.body;

    try {
        const user = new User({name, email, password, dob, phone});
        const otp = user.generateOTP();
        await user.save();

        //Send mail
        const message = `<p> Your verification OTP is: <strong>${otp} </strong></p><p>It will expire in 5 minutes</p>`
        await sendEmail({email: user.email, subject:"Verify your email",message});

        res.status(200).json({message: "OTP sent to your email."});
    } catch (error) {
        res.status(500).json({message:"Error signing up.", error});
        
    }
})

module.exports = router;