const winston = require('winston');


class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }

// For logging the error to a file 
const logger = winston.createLogger({
  level: 'error',

  format: winston.format.combine(
    winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message} \nStack: ${stack}\n \n`;
      
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'errorFile.txt', level: 'error' }),
  ],
});
//Global Error Handler
const globalErrorHandler = (error, req, res, next) => {
    logger.error({
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack,
    });
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  module.exports = { AppError, globalErrorHandler, asyncHandler };