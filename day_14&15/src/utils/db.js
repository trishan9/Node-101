const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI)
    console.log("Database Connected!")
}

module.exports = connectDB