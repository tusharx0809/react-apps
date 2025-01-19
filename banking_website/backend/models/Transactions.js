const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //connects userobject with notes schema
        ref: "User",
    },
    type:{
        type: String,
    },
    amount: {
        type: Number,
    },
    date:{
        type: Date,
    }
})

module.exports = mongoose.model('Transactions', TransactionSchema);