const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpSchema = new Schema({
    empid:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Employee', EmpSchema);
