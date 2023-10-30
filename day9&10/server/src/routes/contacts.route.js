const express = require("express")
const { httpGetAllContacts, httpCreateNewContact, httpGetContact, httpUpdateContact, httpDeleteContact, httpGetRecentlyDeletedContacts } = require("./contacts.controller")

const contactsRouter = express.Router()

contactsRouter.get("/", httpGetAllContacts)
contactsRouter.get("/deleted", httpGetRecentlyDeletedContacts)
contactsRouter.get("/:id", httpGetContact)

contactsRouter.post("/", httpCreateNewContact)

contactsRouter.patch("/:id", httpUpdateContact)
contactsRouter.delete("/:id", httpDeleteContact)

module.exports = contactsRouter