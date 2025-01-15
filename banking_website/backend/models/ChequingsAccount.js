const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChequingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //connects userobject with notes schema
        ref: "User",
        required: true,
      },
    amount: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('Chequings', ChequingSchema);