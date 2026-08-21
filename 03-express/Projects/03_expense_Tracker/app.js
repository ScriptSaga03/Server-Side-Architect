

// IMPORTS 
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv'


// import files 
import connectDB from './src/config/db.js';
import notFound from './src/utils/notfoundHandler.js';
import errorHandler from './src/middleware/errorHandler.js';
import router from './src/router/expenseRouter.js';
import authRouter from "./src/router/authRoutes.js"
import morganMiddleware from './src/middleware/morganLogger.js';


// IMPLEMENT ENV
dotenv.config()

// CREATE AN EXPRESS APP
const app = express();

// GLOBAL LEVEL MIDDLEWARES
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// APPLICATION LEVEL MIDDLEWARE
app.use(morganMiddleware)



// ROUTER MOUNTING
app.use("/api/v1/expenses" , router)
app.use("/api/v1/expenses" , authRouter)



// UNMATCHED ROUTES HANDLER
app.use(notFound)


// CENTRALIZED ERROR HANDLER
app.use(errorHandler)
// CREATE PORT 
const PORT = process.env.PORT || 3000;

// START SERVER LISTENING
const server = async() => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`🚀 Express server is running on PORT : http://localhost:${PORT}`);
    })

}

server();