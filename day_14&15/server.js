const http = require("http")
require("dotenv").config()

const app = require("./src/app")
const connectDB = require("./src/utils/db")

const server = http.createServer(app)

connectDB().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server started running on PORT: ${process.env.PORT}`)
    })
})