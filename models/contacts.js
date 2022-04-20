const fs = require('fs/promises')
const path = require ("path");
const { v4 } = require ("uuid");

const contactsPath = path.join('./models/contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [result] = contacts.filter(contact => contact.id === contactId);

  return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId)
  if(idx === -1) {
    return null
  }
  const [removedContact] = contacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return removedContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {email: body.email, phone: body.phone, name: body.name, id: v4() }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const {name, phone, email} = body;
  let updatedContact;
  contacts.forEach(contact => {
    if (contact.id === contactId) {
      contact.phone = phone;
      contact.email = email;
      contact.name = name;
      updatedContact = contact;
    }
  })
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
