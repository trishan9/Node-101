const express = require("express")
const session = require("express-session")

const userRouter = require("./routes/user.route")
const postRouter = require("./routes/post.route")

const User = require("./models/user.model")

const app = express()

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "my secrekt key"
}))
app.use(express.json())

app.use("/users", userRouter)
app.use("/posts", postRouter)

module.exports = app