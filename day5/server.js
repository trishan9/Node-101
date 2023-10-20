const http = require("http")

const friends = [
    {
        id: 1,
        name: "Trishan"
    },
    {
        id: 2,
        name: "Albert"
    },
    {
        id: 3,
        name: "Harry"
    },
    {
        id: 4,
        name: "Jimmy"
    }
]

const server = http.createServer((req, res) => {
    const url = req.url.split("/")
    const method = req.method

    if (url[1] === "") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.end("<h1>Hello World</h1>")
    }

    else if (url[1] === "friends" && method === "GET") {
        if (url.length >= 3) {
            const id = Number(url[2])
            if (id <= friends.length) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                })
                res.end(JSON.stringify(friends[id - 1]))
            } else {
                res.writeHead(404)
                res.end(`<p>No data found for user id: ${id}</p>`)
            }
        } else {
            res.writeHead(200, {
                "Content-Type": "application/json",
            })
            res.end(JSON.stringify(friends))
        }
    }

    else if (url[1] === "friends" && method === "POST") {
        req.on("data", chunk => {
            friends.push(JSON.parse(chunk))
            console.log(friends)
            res.writeHead(200, {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*"
            })
            res.end(chunk)
        })
    }

    else {
        res.writeHead(404)
        res.end("<p>404 Not Found</p>")
    }
})

server.listen(3000, () => {
    console.log(`Server running on 3000`)
})