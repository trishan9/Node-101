const Sequelize = require("sequelize")
const sequelize = require("../utils/db")

const Post = sequelize.define("post", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    thumbnail: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Post