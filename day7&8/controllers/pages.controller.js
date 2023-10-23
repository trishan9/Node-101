const products = require("../models/products.module")

const getIndexPage = (req, res) => {
    res.render("index", {
        products: products
    })
}

const getAddProductPage = (req, res) => {
    res.render("add-product")
}

module.exports = { getIndexPage, getAddProductPage }