const express = require("express")
const { getAllContacts, getContact, postContact, updateContact, deleteContact } = require("../controllers/contacts.controller")
const contactsRouter = express.Router()

contactsRouter.get("/", getAllContacts)
contactsRouter.get("/:id", getContact)
contactsRouter.use(express.json())
contactsRouter.post("/", postContact)
contactsRouter.patch("/:id", updateContact)
contactsRouter.delete("/contacts/:id", deleteContact)

module.exports = contactsRouter