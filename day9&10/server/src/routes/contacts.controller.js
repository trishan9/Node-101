const { getAllContacts, addNewContact, getContactDetailsById, updateContact, deleteContact, getRecentlyDeletedContacts } = require("../models/contacts.model")

const httpGetAllContacts = (req, res) => {
    const contacts = getAllContacts()
    res.json(contacts)
}

const httpGetRecentlyDeletedContacts = (req, res) => {
    const contacts = getRecentlyDeletedContacts()
    res.json(contacts)
}

const httpGetContact = (req, res) => {
    const id = req.params.id
    const { details: data } = getContactDetailsById(id)
    if (data) {
        res.json(data)
    } else {
        res.status(404).json({
            "error": `No Data Found for Id: ${id}`
        })
    }
}

const httpCreateNewContact = (req, res) => {
    const body = req.body
    addNewContact(body)

    res.json(body)
}

const httpUpdateContact = (req, res) => {
    const id = req.params.id
    const body = req.body

    const { details: data, index } = getContactDetailsById(id)

    if (data) {
        const newData = { ...data, ...body }
        updateContact(newData, index)
        res.json(newData)
    } else {
        res.status(404).json({
            "error": `No Data Found for Id: ${id}`
        })
    }
}

const httpDeleteContact = (req, res) => {
    const id = req.params.id
    const { details: data, index } = getContactDetailsById(id)

    if (data) {
        deleteContact(index)
        res.json(data)
    } else {
        res.status(404).json({
            "error": `No Data Found for Id: ${id}`
        })
    }
}

module.exports = {
    httpGetAllContacts,
    httpGetRecentlyDeletedContacts,
    httpGetContact,
    httpCreateNewContact,
    httpUpdateContact,
    httpDeleteContact
}