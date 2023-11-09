const express = require("express")
const db = require("../utils/db")

const productsRouter = express.Router()

productsRouter.get("/products", async (req, res) => {
    try {
        const [data] = await db.execute("SELECT * FROM products")
        res.json(data)
    } catch {
        res.status(404).json({
            error: "404 not found!"
        })
    }
})

productsRouter.get("/products/:id", async (req, res) => {
    const id = req.params.id

    try {
        const [data] = await db.execute("SELECT * FROM products WHERE id = ?", [id])
        res.json(data)
    } catch {
        res.status(404).json({
            error: "404 not found!"
        })
    }
})

productsRouter.post("/products", async (req, res) => {
    const body = req.body

    try {
        await db.execute("INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
            [body.name, body.description, body.price]
        )
        res.json(body)
    } catch {
        res.status(404).json({
            error: "404 not found!"
        })
    }
})


module.exports = productsRouter