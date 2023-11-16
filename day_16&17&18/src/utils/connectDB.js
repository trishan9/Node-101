const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Database Succesfully!")
}

module.exports = connectDB