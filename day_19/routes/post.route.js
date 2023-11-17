const express = require("express")
const User = require("../models/user.model")
const Post = require("../models/post.model")
const isAuthenticated = require("../middlewares/auth")

const postRouter = express.Router()

postRouter.post("/", isAuthenticated, async (req, res) => {
    const { user, body } = req
    const data = await user.createPost({
        ...body,
    })
    res.json(data)
})

postRouter.get("/", isAuthenticated, async (req, res) => {
    const { user, query: { showUser } } = req
    if (showUser == "true") {
        const data = await user.getPosts({ include: User })
        return res.json(data)
    }
    const data = await user.getPosts()
    res.json(data)
})

postRouter.get("/:id", isAuthenticated, async (req, res) => {
    const { user, query: { showUser }, params: { id } } = req
    if (showUser == "true") {
        const [data] = await user.getPosts({ include: User, where: { id: id } })
        return res.json(data)
    }
    const [data] = await user.getPosts({ where: { id: id } })
    res.json(data)
})

postRouter.get("/all", isAuthenticated, async (req, res) => {
    const data = await Post.findAll({ include: User })
    res.json(data)
})

postRouter.patch("/:id", isAuthenticated, async (req, res) => {
    const { params: { id }, body } = req
    const data = await Post.update({ ...body }, { where: { id: id } })
    res.json(data)
})

postRouter.delete("/:id", isAuthenticated, async (req, res) => {
    const { params: { id } } = req
    const data = await Post.destroy({ where: { id: id } })
    res.json(data)
})

module.exports = postRouter