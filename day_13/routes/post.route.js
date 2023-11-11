const express = require("express")
const User = require("../models/user.model")
const Post = require("../models/post.model")

const postRouter = express.Router()

postRouter.post("/", async (req, res, next) => {
    const { user, body } = req
    const data = await user.createPost({
        ...body,
    })
    res.json(data)
})

postRouter.get("/", async (req, res, next) => {
    const { user, query: { showUser } } = req
    if (showUser == "true") {
        const data = await user.getPosts({ include: User })
        return res.json(data)
    }
    const data = await user.getPosts()
    res.json(data)
})

postRouter.get("/:id", async (req, res, next) => {
    const { user, query: { showUser }, params: { id } } = req
    if (showUser == "true") {
        const [data] = await user.getPosts({ include: User, where: { id: id } })
        return res.json(data)
    }
    const [data] = await user.getPosts({ where: { id: id } })
    res.json(data)
})

postRouter.get("/all", async (req, res, next) => {
    const data = await Post.findAll({ include: User })
    res.json(data)
})

postRouter.patch("/:id", async (req, res, next) => {
    const { params: { id }, body } = req
    let data = await Post.findByPk(id)
    data.title = body.title ? body.title : data.title
    data.content = body.content ? body.content : data.content
    data.thumbnail = body.thumbnail ? body.thumbnail : data.thumbnail
    data.save()
    res.json(data)
})

postRouter.delete("/:id", async (req, res, next) => {
    const { params: { id } } = req
    const data = await Post.findByPk(id)
    data.destroy()
    res.json(data)
})

module.exports = postRouter