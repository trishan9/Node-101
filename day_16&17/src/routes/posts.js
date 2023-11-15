const express = require("express")
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require("../controllers/posts")

const postsRouter = express.Router()

postsRouter.post("/", createPost)
postsRouter.get("/", getAllPosts)
postsRouter.get("/:id", getPost)
postsRouter.patch("/:id", updatePost)
postsRouter.delete("/:id", deletePost)

module.exports = postsRouter