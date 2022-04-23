const express = require('express');

const { register } = require('../../controllers/auth/register.js')
const { login } = require('../../controllers/auth/login.js')
const { logout } = require('../../controllers/auth/logout.js')
const { auth } = require('../../middlewares/auth');

const router = express.Router();

router.post('/signup', register)

router.post('/signin', login)

router.get('/logout', auth, logout)


module.exports = router

