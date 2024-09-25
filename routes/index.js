const express = require('express');
const routes = express.Router();
const user = require('./user');
const swagger = require('./swagger');
const temple = require('./temple')

routes.use('/', swagger);
routes.use('/user', user);
routes.use('/temple', temple);



module.exports = routes;
