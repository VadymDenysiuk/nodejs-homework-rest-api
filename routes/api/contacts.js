const express = require('express');
const { getAll } = require('../../controllers/contacts/getAll')
const { getById } = require('../../controllers/contacts/getById')
const { add } = require('../../controllers/contacts/add')
const { remove } = require('../../controllers/contacts/remove')
const { update } = require('../../controllers/contacts/update');
const { updateFavorite } = require('../../controllers/contacts/updateFavorite');
const { auth } = require('../../middlewares/auth');

const router = express.Router();

router.get('/', auth, getAll);

router.get('/:contactId', getById)

router.post('/', auth, add)

router.delete('/:contactId', remove)

router.put('/:contactId', update)

router.patch('/:contactId/favorite', updateFavorite)

module.exports = router

