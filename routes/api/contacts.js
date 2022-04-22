const express = require('express');
const {Contact, joiSchema, favoriteJoiSchema} = require('../../models');

const router = express.Router();

// get all

router.get('/', async (req, res, next) => {
  const contacts = await Contact.find({})
  res.json({contacts, status: 200})
});

// get one by id

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contact = await Contact.findById(contactId);

  if(!contact) {
    res.json({message: 'Not found', status: 404 })
    return;
  }

  res.json({contact, status: 200 })
})

// add one

router.post('/', async (req, res, next) => {
  const validationResult = joiSchema.validate(req.body)

  if(validationResult.error) {
    res.json({ message: validationResult.error.message, status: 400})
    return;
  }

  const addedContact = await Contact.create(req.body)
  res.json({addedContact, status: 201 })
})

// delete one by id

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;

  const removedContact = await Contact.findByIdAndDelete(contactId)

  if(!removedContact) {
    res.json({ message: "Not found", status: 404 });
    return;
  }

  res.json({ message: "contact deleted", status: 200 })
})

// change one by id

router.put('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;

  const validationResult = joiSchema.validate(req.body)

  if(validationResult.error) {
    res.json({ message: validationResult.error.message, status: 400 })
    return;
  }

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
  if(!updatedContact) {
    res.json({ message: 'Not found', status: 404 });
    return;
  }
  res.json({ updatedContact, status: 200 })
})

// change raw favorite

router.patch('/:contactId/favorite', async (req, res, next) => {
  const {contactId} = req.params;
  const {favorite} = req.body;

  const validationResult = favoriteJoiSchema.validate({favorite})
  if(validationResult.error) {
    res.json({ message: validationResult.error.message, status: 400 })
    return;
  }

  const updatedFavorite = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true})

  if(!updatedFavorite) {
    res.json({ message: 'Not found', status: 404 });
    return;
  }
  res.json({ updatedFavorite, status: 200 })
})

module.exports = router

