
// imports
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './src/middleware/errorHandler.js';
import router from './src/router/userRoute.js';




// create an express app
const app = express();

// Global middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));



// application level middlewares


// route mounting
app.use('/', router)

app.get('/', (req, res) =>{
    res.json({
        message: "✔ DATA LOADED SUCCESSFULLY"
    })
});


// if route not match 
app.use((req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl}  on this server`);
    err.statusCode =  404;
    next(err)
});

// Centralized error handler
app.use(errorHandler)



// create PORT 
const PORT = process.env.PORT || 3000;

// start server listening
app.listen(PORT ,() =>{
    console.log(`🚀 Express server is running on PORT : http://localhost:${PORT}`);
});



