const http = require("http")

const request = http.request("http://cat-fact.herokuapp.com/facts", res => {
    const chunkOfData = []
    res.on("data", (chunk) => {
        chunkOfData.push(chunk)
    })
    res.on("end", () => {
        const parsedData = Buffer.concat(chunkOfData).toString()
        console.log(parsedData)
    })
})

request.end()