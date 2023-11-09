const express = require("express")

const errorRouter = express.Router()

errorRouter.get("/error", (req, res) => {
    res.json({
        error: "Hello World"
    })
})

module.exports = errorRouter