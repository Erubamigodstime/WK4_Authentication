const dotenv = require('dotenv');
dotenv.config({ path: './gitignore/config.env' });
const express = require('express');
const app = express();
const { globalErrorHandler, logger } = require('./helper/error'); 
cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerOptions');

const db = require('./model/index');


process.on('uncaughtException', (err) => {
    if (logger) {
        logger.error('Uncaught Exception!', err);
    } else {
        console.error('Uncaught Exception without logger!', err);
    }
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    if (logger) {
        logger.error('Unhandled Rejection!', err);
    } else {
        console.error('Unhandled Rejection without logger!', err);
    }
    process.exit(1);
});

const port = process.env.PORT || 5000

// Database connection
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
     console.log("Connected to the database");
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
      app.use(cors());
      app.use(bodyParser.json());
      app.use(express.urlencoded({ extended: true }));
      app.use('/', require('./routes/index'));
      app.use(globalErrorHandler);     
      app.listen(port, () => {
        console.log(`Web Server is listening at port ${port}`);
      });
    }
  )
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });


