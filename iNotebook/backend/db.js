const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the application on failure
    }
};

module.exports = connectToMongo;

