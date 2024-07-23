const express = require('express');
const routes = express.Router();
const user = require('./user');
const swagger = require('./swagger');

routes.use('/', swagger);
routes.use('/user', user);



module.exports = routes;
