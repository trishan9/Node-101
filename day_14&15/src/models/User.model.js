const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email Address is Required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is Required"],
        enum: ["male", "female", "others"]
    }
})

module.exports = mongoose.model("User", userSchema)