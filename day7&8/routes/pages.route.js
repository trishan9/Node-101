const express = require("express")
const { getIndexPage, getAddProductPage } = require("../controllers/pages.controller")

const pagesRouter = express.Router()

pagesRouter.get("/", getIndexPage)
pagesRouter.get("/add-product", getAddProductPage)

module.exports = pagesRouter