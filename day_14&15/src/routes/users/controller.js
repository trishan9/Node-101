const User = require("../../models/User.model")

const addUser = async (req, res, next) => {
    const { body } = req
    // const data = await User.create(body)
    // Upsert
    const data = await User.findOneAndUpdate({
        name: body.name
    }, {
        ...body
    }, {
        upsert: true
    })
    res.send(data)
}

const getAllUsers = async (req, res, next) => {
    const { sort } = req.query
    if (sort == "ASC") {
        const data = await User.find().sort("name")
        return res.send(data)
    }
    if (sort == "DESC") {
        const data = await User.find().sort("-name")
        return res.send(data)
    }
    const data = await User.find()
    return res.send(data)
}

const getUser = async (req, res, next) => {
    const { id } = req.params
    const data = await User.findOne({ _id: id })
    // const data = await User.findOne({ id: id }, "name email -_id")
    res.send(data)
}

const updateUser = async (req, res, next) => {
    const { body, params: { id } } = req
    const data = await User.findOneAndUpdate({
        _id: id
    }, {
        ...body
    })
    res.send(data)
}

const deleteUser = async (req, res, next) => {
    const { params: { id } } = req
    const data = await User.findOneAndDelete({
        _id: id
    })
    res.send(data)
}

module.exports = { addUser, getAllUsers, getUser, updateUser, deleteUser }