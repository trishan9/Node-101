const axios = require("axios")
require("dotenv").config()

axios.get(process.env.GITHUB_URL)
    .then(res => {
        console.log(res)
    }).catch(() => {
        console.log("Error occured")
    })