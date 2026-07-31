
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';


// mine imports
import notesRouter  from './src/routes/notesRoute.js'
import {logInfo}  from './src/helper/fileCreation.js'
import errorHandler from './src/middleware/errorHandler.js';
import { createError } from './src/helper/createError.js';


// create an express app
const app = express();


// Global Middleware 
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));








// Application level middleware
// 1 Logger
app.use(logInfo);



// route mounting 
app.use('/api/notes', notesRouter)

// create PORT 
const PORT = process.env.PORT || 3000;



app.get('/', (req, res) =>{
    res.json({
        message: "✔ DATA LOADED SUCCESSFULLY"
    })
});



app.use((req, res, next) => {
    const err = createError(`Cannot find route ${req.originalUrl} on this server!`, 404);
    next(err); 
});


// centralized error handler
app.use(errorHandler)

// start server listening
app.listen(PORT, () => {
    console.log(`🚀 Express server is running on PORT : http://localhost:${PORT}`)
})