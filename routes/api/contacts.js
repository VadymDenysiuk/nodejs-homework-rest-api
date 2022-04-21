const express = require('express')
const Joi = require('joi')

const { listContacts, addContact, getContactById, removeContact, updateContact } = require('../../models/contacts.js')


const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.json({contacts, status: 200})
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)
  if(!contact) {
    res.json({message: 'Not found', status: 404 })
    return;
  }
  res.json({contact, status: 200 })
})

router.post('/', async (req, res, next) => {

  const schema = Joi.object().keys({ 
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.number().required(), 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  }); 

  const validationResult = schema.validate(req.body)
  if(validationResult.error) {
    res.json({ message: validationResult.error.message, status: 400})
    return;
  }

  const addedContact = await addContact(req.body)
  res.json({addedContact, status: 201 })
})

router.delete('/:contactId', async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId)
  if(!removedContact) {
    res.json({ message: "Not found", status: 404 });
    return;
  }
  res.json({ message: "contact deleted", status: 200 })
})

router.put('/:contactId', async (req, res, next) => {

  const schema = Joi.object().keys({ 
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.number().required(), 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  }); 

  const validationResult = schema.validate(req.body)
  if(validationResult.error) {
    res.json({ message: validationResult.error.message, status: 400 })
    return;
  }

  const updatedContact = await updateContact(req.params.contactId, req.body)

  if(!updatedContact) {
    res.json({ message: 'Not found', status: 404 });
    return;
  }
  res.json({ updatedContact, status: 200 })
})

module.exports = router

