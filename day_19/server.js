const http = require("http")
const app = require("./app")
const sequelize = require("./utils/db")

const Post = require("./models/post.model")
const User = require("./models/user.model")

const server = http.createServer(app)

Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" })
User.hasMany(Post)

sequelize.sync()
    .then(() => {
        server.listen(3000, () => {
            console.log("Server started running on port 3000")
        })
    })