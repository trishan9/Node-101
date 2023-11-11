const express = require("express")

const userRouter = require("./routes/user.route")
const postRouter = require("./routes/post.route")

const User = require("./models/user.model")

const app = express()

app.use(async (req, res, next) => {
    const user = await User.findByPk(6)
    req.user = user
    next()
})

app.use(express.json())

app.use("/users", userRouter)
app.use("/posts", postRouter)

module.exports = app