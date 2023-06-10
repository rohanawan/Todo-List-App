const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('./config/config');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const { authLimiter } = require('./middlewares/rateLimiter');
const ApiError = require('./utils/ApiError');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use(xss());
app.use(mongoSanitize());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/auth', authLimiter);
}
// v1 api routes
app.use('/', routes);

// checking the server's health
app.use('/health', (req, res) => res.send('Server is healthy!!'));

// handling /favicon.ico 404 error by returning no content
app.use('/favicon.ico', (req, res) => res.status(204));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
