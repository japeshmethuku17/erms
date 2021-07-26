const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')

const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());



// Import all routes
const employees = require('./routes/employee');
const auth = require('./routes/auth');

app.use('/api/v1', employees)
app.use('/api/v1', auth)

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app