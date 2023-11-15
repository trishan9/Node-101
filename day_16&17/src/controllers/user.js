const User = require("../models/User")
const getPagination = require("../utils/getPagination")

const createUser = async (req, res) => {
    const { body } = req
    await User.findOneAndUpdate({
        name: body.name
    }, body, {
        upsert: true
    })
    res.json(body)
}

const getAllUsers = async (req, res) => {
    const { page, perPage } = req.query
    const { skip, limit } = getPagination(page, perPage)
    const data = await User.find({}, "-__v").sort({ name: 1 }).skip(skip).limit(limit)
    const fullData = {
        currentPage: page,
        data: [...data]
    }
    res.json(fullData)
}

const getUser = async (req, res) => {
    const { id } = req.params
    const data = await User.findById(id, "-__v")
    res.json(data)
}

const updateUser = async (req, res) => {
    const { body, params: { id } } = req
    const data = await User.findByIdAndUpdate(id, {
        ...body
    })
    res.json(data)
}

const deleteUser = async (req, res) => {
    const { params: { id } } = req
    const data = await User.findByIdAndDelete(id)
    res.json(data)
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}