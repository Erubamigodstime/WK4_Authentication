const dotenv = require('dotenv');
dotenv.config({ path: './gitignore/config.env' });
const express = require('express');
const app = express();
cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { globalErrorHandler, logger } = require('./helper/error');
const db = require('./model/index');


// Handling Uncaught exception
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception!', err);
  process.exit(1);
});
// Handling unhandling rejection
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection!', err);
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
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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


