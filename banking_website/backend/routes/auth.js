require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_JWT;
const sendEmail = require('../utils/sendEmail');

router.post('/signup',
    [
        body("name","Enter a valid name").isLength({min:3}),
        body("email","Enter a valid email").isEmail(),
        body("password","Password must be atleast 8 characters").isLength({min:8}),
        body("dob","Enter a date of birth").isISO8601().withMessage("Date of birth must be in format YYYY-MM-DD"),
        body("phone","Enter a phone number").isLength({min:10}),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        try {
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).json({error:"A username with this email already exists"})
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

            await sendEmail({
                email: user.email,
                subject: "Email verification OTP",
                message,
            })
            res.status(201).json({message:"User Registered Successfully. Please verify your email."})

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    }
)



module.exports = router;