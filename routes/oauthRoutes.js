const express = require('express')
const router = express.Router()

const {googleLogin, callBack} = require('../controllers/authController')
const{googleLogout} = require('../controllers/templeController')

router.get('/google',googleLogin);
router.get('/google/callback', callBack)
router.get('/logout', googleLogout )

module.exports = router