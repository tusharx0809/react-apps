const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isVerified:{
    type: Boolean,
    default: false,
  },
  otp:{
    type: String,
  },
  otpExpire:{
    type: Date,
  }
});

UserSchema.methods.generateOTP = function() {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); //generates 4 digit OTP
    this.otp = otp;
    this.otpExpire = Date.now() + 300000;
    return otp;
}

module.exports = mongoose.model('User', UserSchema);