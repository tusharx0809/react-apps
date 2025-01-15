const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //connects userobject with notes schema
        ref: "User",
        required: true,
      },
    amount: {
        type: Number,
        default: 0,
    },
    interest: {
        type: Number,
        default: 3,
    }
})

module.exports = mongoose.model('Savings', SavingSchema);