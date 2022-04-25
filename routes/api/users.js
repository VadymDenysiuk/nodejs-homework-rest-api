const express = require('express');

const { getCurrent } = require('../../controllers/users/getCurrent')
const { auth } = require('../../middlewares/auth')
const { updateAvatar } = require('../../controllers/users/updateAvatar')
const { upload } = require('../../middlewares/upload')
const { verifyEmail } = require('../../controllers/auth/verifyEmail')
const { resendConfirmMail } = require('../../controllers/auth/resendConfirmMail')

const router = express.Router();

router.get('/current', auth, getCurrent)

router.patch('/avatars', auth, upload.single('avatar'), updateAvatar)

router.get('/verify/:verificationToken', verifyEmail)

router.post('/verify', resendConfirmMail)

module.exports = router;