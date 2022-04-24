const express = require('express');

const { getCurrent } = require('../../controllers/users/getCurrent')
const { auth } = require('../../middlewares/auth')
const { updateAvatar } = require('../../controllers/users/updateAvatar')
const { upload } = require('../../middlewares/upload')

const router = express.Router();

router.get('/current', auth, getCurrent)

router.patch('/avatars', auth, upload.single('avatar'), updateAvatar)

module.exports = router

