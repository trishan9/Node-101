const express = require("express")
const cors = require("cors")

const contactsRouter = require("./routes/contacts.route")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/contacts", contactsRouter)

module.exports = app