const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const appRouter = require("./routes")

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("combined"))

app.use(appRouter)

module.exports = app