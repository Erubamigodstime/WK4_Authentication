const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const app = express();
const session = require('express-session');
const passport = require('passport')
const passportSetup =require('./oauth/passport-setup')
const { globalErrorHandler, logger } = require('./helper/error'); 
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerOptions');
const db = require('./model/index');
const port = process.env.PORT || 9001



const corsOptions = {
  origin: 'https://wk4-authentication.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'apiKey'],
};

app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions)); 

app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



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





app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));


app.use(passport.initialize());
app.use(passport.session());





// Database connection
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
      console.log("Connected to the database");   
      app.use(passport.initialize());
      app.use(passport.session());
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
      app.use('/', require('./routes/index'));
      app.use(globalErrorHandler);     
      app.listen(port, () => {
        console.log(`Web Server is listening at port ${port}`);
      });
    }
  )
  .catch((err) => {
    console.log(err)
    process.exit();
  });


