const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const userRouter = require("./routes/user")
const postsRouter = require("./routes/posts")
const User = require("./models/User")

const app = express()

app.use(cookieParser())
app.use(session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: false
}))
app.use(cors())
app.use(async (req, res, next) => {
    const user = await User.findById("6554cedcb2d1d4cb0ee80eaf")
    req.user = user
    next()
})
app.use(express.json())

app.use("/users", userRouter)
app.use("/posts", postsRouter)

module.exports = app