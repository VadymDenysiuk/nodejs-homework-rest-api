const express = require('express');

const { getCurrent } = require('../../controllers/users/getCurrent')
const { auth } = require('../../middlewares/auth')

const router = express.Router();

router.get('/current', auth, getCurrent)

module.exports = router

