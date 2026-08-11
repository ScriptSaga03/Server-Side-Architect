

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv'


// import files
import connectDB  from './src/config/db.js';
import errorHandler from './src/middleware/errorHandler.js';
import customError from './src/utils/customError.js';
import router from './src/router/database_router.js';




// IMPLEMENT ENV
dotenv.config()


// CREATE AN EXPRESS APP 
const app  =  express();



// GLOBAL / APPLICATION LEVEL MIDDLEWARE
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));



// ROUTE SPECIFIC LEVEL MIDDLEWARE


// ROUTE MOUNTING
app.use("/mongodb", router)


// IF ROUTE NOT FOUND
app.use((req, res, next) => {
    next(customError(404,`Can't find ${req.originalUrl} on this server!`))
});


// CENTRALIZED ERROR HANDLER
app.use(errorHandler)

// PORT
const PORT = process.env.PORT || 3000;






// SERVER START LISTENING
const startServer = async() => {
    await connectDB();

    app.listen(PORT, () => {
    console.log(`Express server is running on PORT : http://localhost:${PORT}`)
});
}


startServer()


