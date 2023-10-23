const express = require("express")
const bodyParser = require("body-parser")
const pagesRouter = require("./routes/pages.route")
const shopRouter = require("./routes/shop.route")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(pagesRouter)
app.use("/api", shopRouter)

app.get("*", (req, res) => {
    res.send("<h1>404 not Found</h1>")
})

app.listen(3000)