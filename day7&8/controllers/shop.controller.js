const products = require("../models/products.module")

const getAllProducts = (req, res) => {
    res.send(products)
}

const createProduct = (req, res) => {
    const body = req.body
    products.push(body)
    res.redirect("/")
}

module.exports = {
    getAllProducts, createProduct
}