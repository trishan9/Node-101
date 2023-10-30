const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require('uuid')

const getAllContacts = () => {
    const data = fs.readFileSync(path.join(__dirname, "..", "data", "contacts.json"))
    const filteredData = JSON.parse(data).filter((d) => d.isRecentlyDeleted === false)
    return filteredData
}

const getRecentlyDeletedContacts = () => {
    const data = fs.readFileSync(path.join(__dirname, "..", "data", "contacts.json"))
    const filteredData = JSON.parse(data).filter((d) => d.isRecentlyDeleted === true)
    return filteredData
}

const getContactDetailsById = (id) => {
    const data = fs.readFileSync(path.join(__dirname, "..", "data", "contacts.json"))
    const details = JSON.parse(data).find((contact) => contact.id == id)
    const index = JSON.parse(data).findIndex((contact) => contact.id == id)
    return { details, index }
}

const addNewContact = (newRawData) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "contacts.json")))
    const newData = { ...newRawData, id: uuidv4().slice(0, 8), isRecentlyDeleted: false }
    data.push(newData)

    fs.writeFileSync(path.join(__dirname, "..", "data", "contacts.json"), JSON.stringify(data))
    return data
}

const updateContact = (newData, indexOfData) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "contacts.json")))
    data[indexOfData] = newData

    fs.writeFileSync(path.join(__dirname, "..", "data", "contacts.json"), JSON.stringify(data))
    return data
}

const deleteContact = (indexOfData) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "contacts.json")))
    data.splice(indexOfData, 1)

    fs.writeFileSync(path.join(__dirname, "..", "data", "contacts.json"), JSON.stringify(data))
    return data
}

module.exports = {
    getAllContacts,
    getRecentlyDeletedContacts,
    getContactDetailsById,
    addNewContact,
    updateContact,
    deleteContact
}