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
    } 
})

module.exports = mongoose.model('Employee', EmpSchema);
