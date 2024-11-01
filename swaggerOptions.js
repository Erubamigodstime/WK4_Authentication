const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'week 4 Authentication  API',
      description: ' API for user contact Information and Temple Information',
      version: '1.0.0',
      contact: {
        name: 'Developer',
      },
    },
    servers: [
      {
        url: 'https://wk4-authentication.onrender.com',
      },
    ],
  },
  apis: ['./controllers/userController.js', './controllers/templeController.js', './controllers/authController.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;


