const express = require("express")
const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/user")

const userRouter = express.Router()

userRouter.post("/", createUser)
userRouter.get("/", getAllUsers)
userRouter.get("/:id", getUser)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

module.exports = userRouter