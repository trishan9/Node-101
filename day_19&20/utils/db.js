const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("trishanDB", "postgres", "password", {
    dialect: "postgres",
    host: "127.0.0.1",
    schema: "trishan"
})

module.exports = sequelize