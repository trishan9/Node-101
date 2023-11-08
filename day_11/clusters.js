const express = require("express")
const cluster = require("cluster")
const os = require("os")

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
    res.send("Slow Page!")
})

if (cluster.isMaster) {
    console.log("Master is running on", process.pid)
    const cores = os.cpus().length
    for (let i = 0; i < cores; i++) {
        cluster.fork()
    }
} else {
    console.log("Worker is running on", process.pid)
    app.listen(3000)
}