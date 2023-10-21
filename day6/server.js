const express = require("express")
require("dotenv").config()

const contactsRouter = require("./routes/contacts.route")
const pagesRouter = require("./routes/pages.route")

const PORT = process.env.PORT
const app = express()

app.set("view engine", "hbs")
app.set("views", __dirname + "/views")

app.use("/", pagesRouter)
app.use("/contacts", contactsRouter)

app.listen(PORT, () => {
    console.log(`Server started running on ${PORT}`)
})