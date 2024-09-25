const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Week 3 API',
      description: 'API for user contact and temple information',
      version: '1.0.0',
      contact: {
        name: 'Developer',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header', 
          name: 'apiKey', 
          description: 'API key needed to access the endpoints',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [], 
      },
    ],
  },
  apis: ['./controllers/userController', './controller/templeController'], 
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
