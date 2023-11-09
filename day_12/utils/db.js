const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    database: "trishan",
    password: "trishan1122@S"
})

module.exports = pool.promise()