const Posts = require("../models/Posts")

const createPost = async (req, res) => {
    const { user, body } = req
    await Posts.findOneAndUpdate({
        title: body.title
    }, {
        ...body,
        user
    }, {
        upsert: true
    })
    res.json(body)
}

const getAllPosts = async (req, res) => {
    const data = await Posts.find({}, "-__v").sort("title").populate("user")
    res.json(data)
}

const getPost = async (req, res) => {
    const { id } = req.params
    const data = await Posts.findById(id, "-__v")
    res.json(data)
}

const updatePost = async (req, res) => {
    const { body, params: { id } } = req
    const data = await Posts.findByIdAndUpdate(id, {
        ...body
    })
    res.json(data)
}

const deletePost = async (req, res) => {
    const { params: { id } } = req
    const data = await Posts.findByIdAndDelete(id)
    res.json(data)
}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
}