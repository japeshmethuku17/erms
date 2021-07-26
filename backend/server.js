const app = require('./app.js');
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

const dotenv = require('dotenv');

// Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down due to Uncaught Exceptions`);
    process.exit(1)
})

// Setting up config file
dotenv.config({path: './backend/config/config.env'})

//var port = process.env.port;

// Connecting to database
connectDatabase();

//Setup cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle UnhandledPromiseRejection

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1)
    })
})