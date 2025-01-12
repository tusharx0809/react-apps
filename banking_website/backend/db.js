require('dotenv').config();
const mongoose = require('mongoose');
const mongourl = "mongodb://localhost:27017/bankingWebsite";

const connecToMongo = async()=>{
    try{
        await mongoose.connect(mongourl);
        console.log("Connect to Banking Mongo Databse successfully");
    }catch(error){
        console.error("Error connecting Banking Mongo Database", mongourl);
        process.exit(1);
    }
}

module.exports = connecToMongo;