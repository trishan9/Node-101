// const mysql = require("mysql2")

// const pool = mysql.createPool({
//     host: "127.0.0.1",
//     user: "root",
//     password: "trishan1122@S",
//     database: "trishan"
// })

// module.exports = pool.promise()

const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("trishanDB", "root", "trishan1122@S", {
    dialect: "mysql",
    host: "127.0.0.1"
})

module.exports = sequelize