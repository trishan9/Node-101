const express = require("express")
const { getAllProducts, createProduct } = require("../controllers/shop.controller")

const shopRouter = express.Router()

shopRouter.get("/products", getAllProducts)
shopRouter.post("/products", createProduct)

module.exports = shopRouter