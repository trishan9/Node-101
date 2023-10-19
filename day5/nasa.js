const { parse } = require("csv-parse")
const fs = require("fs")

const csv_file = fs.createReadStream(__dirname + "/nasa.csv").pipe(parse({
    comment: "#",
    columns: true
}))

const body = []

csv_file.on("data", (chunk) => {
    if (chunk.koi_disposition === "CONFIRMED") {
        if (chunk.koi_insol > 0.36 && chunk.koi_insol < 1.11) {
            if (chunk.koi_prad < 1.6) {
                body.push(chunk)
            }
        }
    }
})

csv_file.on("end", () => {
    console.log(`Found ${body.length} planets which are similar to our Earth!`)
    body.forEach((data) => {
        console.log(data.kepler_name)
    })
})