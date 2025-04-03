const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const ConnectDB = async() =>{
    try {
        await mongoose.connect(URI);
        console.log("Connection successful with database");
    } catch (error) {
        console.error("Database connection failed");
        process.exit(0);
    }
}

module.exports = ConnectDB;