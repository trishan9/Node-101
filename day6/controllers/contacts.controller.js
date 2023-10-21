const contacts = require("../models/contacts.model")

const getAllContacts = (req, res) => {
    res.send(contacts)
}

const getContact = (req, res) => {
    const id = req.params.id
    const data = contacts.find((contact) => contact.id == id)
    data ? res.json(data) : res.status(404).json({
        "error": `Data not found for User ID: ${id}`
    })
}

const postContact = (req, res) => {
    const body = req.body
    const index = contacts.findIndex((contact) => contact.name == body.name)
    if (index == -1) {
        const newContact = {
            ...body,
            id: contacts.length + 1,
        }
        contacts.push(newContact)
        res.json(newContact)
    } else {
        res.status(400).json({
            "error": `Contact Details of ${body.name} already exists!`
        })
    }
}

const updateContact = (req, res) => {
    const id = req.params.id
    const body = req.body
    const index = contacts.findIndex((contact) => contact.id == id)
    const nameIndex = contacts.findIndex((contact) => contact.name == body.name)

    if (nameIndex != -1 && index != -1) {
        res.status(400).json({
            "error": `Contact Details of ${body.name} already exists, Try updating user with other names!`
        })
    } else if (index != -1) {
        contacts[index] = {
            ...contacts[index],
            ...body
        }
        res.json(contacts[index])
    } else {
        res.status(400).json({
            "error": `Contact Details of user with User ID: ${id} not found!`
        })
    }
}

const deleteContact = (req, res) => {
    const id = req.params.id
    const index = contacts.findIndex((contact) => contact.id == id)

    if (index == -1) {
        res.status(400).json({
            "error": `Contact Details of user with User ID: ${id} not found!`
        })
    } else {
        contacts.splice(index, 1)
        res.json(contacts)
    }
}

module.exports = {
    getAllContacts,
    getContact,
    postContact,
    updateContact,
    deleteContact
}