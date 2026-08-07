

// imports
import express from 'express';
import helmet from 'helmet';
import morgan  from 'morgan';
import dotenv from 'dotenv'
import errorHandler from './src/middleware/errorHandler.js';
import customErrorHandler from './src/utils/customErrorHandler.js';
import router from './src/router/authRoute.js';


// config call
dotenv.config()

// Create an Express App
const app = express();


// Global Level Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


// Application Level Middleware





// Route Mounting
app.use('/notex', router)


// If Route Not Found
app.use((req, res, next) => {
    // const err = new Error(`❌ Can't find ${req.originalUrl} on this server!`);
    // err.statusCode = 404;
    next(customErrorHandler(404, `❌ Can't find ${req.originalUrl} on this server!`));
});



// Centralized Error Handler
app.use(errorHandler)


const PORT = process.env.PORT || 3000;

// Start Server listening
app.listen(PORT, ()=>{
    console.log(`🚀 Express server is running on PORT :http://localhost:${PORT}`);
})