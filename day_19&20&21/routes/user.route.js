const express = require("express")
const bcrypt = require("bcrypt")
// const nodemailer = require("nodemailer")
// const sendgridTransport = require("nodemailer-sendgrid-transport")
const sgMail = require("@sendgrid/mail")
require("dotenv").config()

const User = require("../models/user.model")
const isAuthenticated = require("../middlewares/auth")

const userRouter = express.Router()

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth: {
//         api_key: process.env.SENDGRID_API_KEY
//     }
// }))
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            return res.send({
                error: "User with this email address already exists!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const data = await User.create({ name, email, password: hashedPassword })
        res.send(data)
        const msg = {
            from: "mailtotrishan@gmail.com",
            to: data.email,
            subject: "Welcome onboard!",
            html: `<h1>Welcome to our App Mr. ${data.name}, Glad that you registered!</h1>`,
            text: `Welcome to our App Mr. ${data.name}, Glad that you registered!`
        }
        // await transporter.sendMail(msg)
        await sgMail.send(msg)

    } catch {
        res.send({ error: "Some error occured!" })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.send({
                error: "User with this email address doesn't exist!"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {
            req.session.isLoggedIn = true
            req.session.user = user
            return res.send({
                success: "Logged in Succesfully!",
                user
            })
        }
        res.send({
            error: "Password incorrect!"
        })
    } catch {
        res.send({ error: "Some error occured!" })
    }
})

userRouter.get("/logout", async (req, res) => {
    req.session.destroy(() => {
        res.send({
            success: "Logged out!"
        })
    })
})

userRouter.get("/", isAuthenticated, async (req, res) => {
    const data = await User.findAll()
    res.send(data)
})

userRouter.get("/:id", isAuthenticated, async (req, res) => {
    const data = await User.findByPk(req.params.id)
    res.send(data)
})

userRouter.patch("/:id", isAuthenticated, async (req, res) => {
    const { body, params: { id } } = req
    console.log(body)
    const user = await User.update({
        ...body
    }, {
        where: {
            id: parseInt(id)
        }
    })
    res.send(user)
})

userRouter.delete("/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id
    const user = await User.destroy({ where: { id: id } })
    res.send(user)
})

module.exports = userRouter