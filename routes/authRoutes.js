const express = require('express')
const router = express.Router()

const {googleLogin, callBack, googleLogout} = require('../controllers/authController')

router.get('/google', googleLogin);
router.get('/google/callback', callBack)
router.get('/google/logout', googleLogout )

module.exports = router