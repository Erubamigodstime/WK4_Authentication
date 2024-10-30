const express = require('express');
const routes = express.Router();
const user = require('./user');
const swagger = require('./swagger');
const temple = require('./temple');
const  home  = require('./homePage');
const {ensureAuth} = require('../helper/authHelper')
const auth = require('./authRoutes')


routes.use('/auth', auth)
routes.use('/', swagger);
routes.use('/user', user);
routes.use('/temple', temple);
routes.use('/', home )



module.exports = routes;
