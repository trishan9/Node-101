const http = require("http")
const handleRoutes = require("./routes")

const server = http.createServer(handleRoutes)

server.listen(3000)