const express = require("express")

const pagesRouter = express.Router()

pagesRouter.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        name: "Trishan"
    })
})

pagesRouter.get("/contacts-list", (req, res) => {
    res.render("contacts", {
        title: "Contacts",
    })
})

module.exports = pagesRouter