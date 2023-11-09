const express = require("express")

const messageRouter = express.Router()

messageRouter.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    })
})

module.exports = messageRouter