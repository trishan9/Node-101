const http = require("http")
const fs = require("fs")
const todosData = require("./db.json")

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    if (url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" })
        let html = fs.readFileSync(__dirname + "/index.html", "utf-8")
        html = html.replace("{{pageName}}", "Todos")
        res.end(html)
    }

    else if (url === "/add-todo" && method === "POST") {
        const body = []
        req.on("data", (chunk) => {
            body.push(chunk)
        })

        req.on("end", () => {
            const allTodos = JSON.parse(fs.readFileSync("./db.json", "utf-8"))
            const parsedBody = Buffer.concat(body).toString('utf-8')
            const todo = parsedBody.split("=")[1].replaceAll("+", " ")
            const todoArr = [...allTodos, { todo: todo }]
            fs.writeFileSync("./db.json", JSON.stringify(todoArr))
            res.writeHead(302, { "Location": "/" })
            res.end()
        })
    }

    else if (url === "/api/todos") {
        res.writeHead(200, { "Content-Type": "application/json" })
        return res.end(JSON.stringify(todosData))
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("404! Page Not Found")
    }
})

server.listen(3000, () => {
    console.log("Server started running on http://localhost:3000/")
})