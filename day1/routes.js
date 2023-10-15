const fs = require("fs")

const handleRoutes = (req, res) => {
    const url = req.url
    const method = req.method

    if (url === "/") {
        res.setHeader("Content-Type", "text/html")
        res.write("<html>")
        res.write("<head><title>Home</title></head>")
        res.write("<body>")
        res.write("<h1>Hello World!</h1>")
        res.write("<form action='/create-user' method='POST'>")
        res.write("<input type='text' name='user' />")
        res.write("<button type='submit'>Create User</button>")
        res.write("</form>")
        res.write("</body>")
        res.write("</html>")
        return res.end()
    }

    if (url === "/users") {
        res.setHeader("Content-Type", "text/html")
        res.write("<ul><li>Trishan</li><li>Smarika</li><li>Pokharel</li></ul>")
        return res.end()
    }

    if (url === "/create-user" && method === "POST") {
        const body = []
        req.on("data", (chunk) => {
            body.push(chunk)
        })

        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString()
            fs.writeFile("users.txt", parsedBody, err => {
                res.statusCode = 302
                res.setHeader("Location", "/users")
                return res.end()
            })
        })
    }

    res.setHeader("Content-Type", "text/html")
    res.write("<html>")
    res.write("<head><title>404 Page</title></head>")
    res.write("<body>")
    res.write("<h1>404! Page not Found</h1>")
    res.write("</body>")
    res.write("</html>")
    res.end()
}

module.exports = handleRoutes
