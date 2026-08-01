

// imports modules
import express from 'express';
import helmet from 'helmet'
import morgan from 'morgan';

// created files in app
import errorHandler from './src/middlewares/errorMiddleware.js';
import { LOG_FOLDER } from './src/utils/pathUtils.js';
import { reqLogger } from './src/utils/helper/logger.js';
import { perfLogger } from './src/utils/helper/performanceLogger.js';



// Create an express app
const app  = express();


// Global level Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));



// Application level Middlewares
app.use(reqLogger);
app.use(perfLogger)

// Route Mounting
app.get('/', (req, res) =>{
    return res.send(`<h1>✔ Server is working well.</h1>`)
})

// If Route not match 
app.use((req, res, next) =>{
    const err = new Error(`❌ Can't find ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    next(err)
})

// Centralized Error Handler Middleware
app.use(errorHandler)


// Port
const PORT = process.env.PORT || 3000;

// Start Server Listening
app.listen(PORT , () =>{
    console.log(`🚀 Express server is running on PORT : http://localhost:${PORT}`);
})
