const swaggerAutogen = require('swagger-autogen')();


const doc = {
  swagger: '2.0',
  info: {
    title: 'My API',
    description: 'User API'
  },
  host: 'localhost:5000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index'];



swaggerAutogen(outputFile, routes, doc);

// routes.all("*", (req, res, next) => {
//   const err = new Error(`This path ${req.originalUrl} isn't on this server!`);
//   err.status = 'fail';
//   err.statusCode = 404;
//   next(err)
//   });
