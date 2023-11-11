const express = require("express")
const sequelize = require("../utils/db")
const User = require("../models/user.model")

const userRouter = express.Router()

// userRouter.post("/", async (req, res, next) => {
//     const body = req.body
//     console.log(body)
//     await db.execute("INSERT INTO users (name, email) VALUES (?, ?)", [body.name, body.email])
//     res.send(body)
// })

userRouter.post("/", async (req, res, next) => {
    const body = req.body
    const data = await User.create(body)
    res.send(data)
})

// userRouter.get("/", async (req, res, next) => {
//     const [data] = await db.execute("SELECT * FROM users")
//     res.send(data)
// })

userRouter.get("/", async (req, res, next) => {
    const data = await User.findAll()
    res.send(data)
})

// userRouter.get("/:id", async (req, res, next) => {
//     const [data] = await db.execute("SELECT * FROM users WHERE id = ?", [req.params.id])
//     res.send(data[0])
// })

userRouter.get("/:id", async (req, res, next) => {
    const data = await User.findByPk(req.params.id)
    res.send(data)
})


// userRouter.put("/:id", async (req, res, next) => {
//     const body = req.body
//     const id = req.params.id
//     await db.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [body.name, body.email, id])
//     res.send("Updated!")
// })

userRouter.patch("/:id", async (req, res, next) => {
    const { body, params: { id } } = req
    let user = await User.findByPk(id)
    user.name = body.name ? body.name : user.name
    user.email = body.email ? body.email : user.email
    user.save()
    res.send(user)
})

// userRouter.delete("/:id", async (req, res) => {
//     const id = req.params.id
//     const [data] = await db.execute("SELECT * FROM users WHERE id = ?", [req.params.id])
//     await db.execute("DELETE FROM users WHERE id = ?", [id])
//     res.send(data[0])
// })

userRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    user.destroy()
    res.send(user)
})

module.exports = userRouter