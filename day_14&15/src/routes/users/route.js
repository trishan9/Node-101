const express = require("express")
const { getAllUsers, addUser, getUser, updateUser, deleteUser } = require("./controller")

const userRouter = express.Router()

userRouter.post("/users", addUser)
userRouter.get("/users", getAllUsers)
userRouter.get("/user/:id", getUser)
userRouter.patch("/user/:id", updateUser)
userRouter.delete("/user/:id", deleteUser)

module.exports = userRouter