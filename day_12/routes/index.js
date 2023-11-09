const express = require("express")

const messageRouter = require("./message.route")
const errorRouter = require("./error.route")
const productsRouter = require("./products.route")

const appRouter = express.Router()

appRouter.use("/api", messageRouter)
appRouter.use("/api", errorRouter)
appRouter.use("/api", productsRouter)

module.exports = appRouter