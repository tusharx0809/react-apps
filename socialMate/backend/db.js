const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/eventPlanner"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connect to EventPlanner MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to EventPlanner MongoDB", mongoUrl);
        process.exit(1);
    }
}

module.exports = connectToMongo;