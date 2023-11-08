const express = require("express")

const app = express()

const delay = (dur) => {
    const now = new Date()
    while (new Date - now < dur) { }
}

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/slow", (req, res) => {
    delay(7000)
    res.send("Slow Pagesdsdf!")
})

console.log("Worker is running on", process.pid)

app.listen(3000)