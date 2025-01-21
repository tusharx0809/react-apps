const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpSchema = new Schema({
    empid:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    position:{
        type: String,
        default: null,
    },
    phone:{
        type: String,
        default: null
    },
    loginOTP:{
        type: String,
        default: null,
    },
    loginOtpExp:{
        type: Date
    }
})

EmpSchema.methods.generateOTP = function() {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); //generates 4 digit OTP
    this.loginOTP = otp;
    this.loginOtpExp = Date.now() + 300000;
    return otp;
}

module.exports = mongoose.model('Employee', EmpSchema);
