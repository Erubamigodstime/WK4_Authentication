const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController')


router.get('/', controller.getHomePage);

module.exports = router