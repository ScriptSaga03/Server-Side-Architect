// DOTENV 
import dotenv from 'dotenv';
// IMPLEMENT ENV
dotenv.config()

// IMPORT
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';



// IMPORT FILES
import connectDB from './src/config/db.js';
import centralizedErrorHandler from './src/middleware/errorHandlerMiddleware.js';
import routeNotFound from './src/utils/notFound.js';
import authRouter from './src/routes/authRoutes.js';
import router from './src/routes/contactsRoutes.js';
import morganMiddleware from './src/middleware/morganLogger.js';


// CREATE AN EXPRESS APP
const app = express();

// GLOBAL MIDDLEWARE
app.use(helmet());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// APPLICATION LEVEL MIDDLEWARE
app.use(morganMiddleware);

// ROUTE MOUNTING
app.get("/", (req, res) => {
    return res.send(`<h1>Contact App Backend API is Running 🚀</h1>`)});

// AUTHENTICATION ROUTES 
app.use("/auth", authRouter);

// CONTACT ROUTES
app.use("/" , router);

// UNMATCHED ROUTES HANDLER
app.use(routeNotFound)

// CENTRALIZED ERRRO HANDLER MIDDLEWARE
app.use(centralizedErrorHandler)


// DEFINE PORT
const PORT = process.env.PORT || 3000;


// CREATE SERVER AND START LISTENING
const server = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`🚀 Express server is running on PORT: http://localhost:${PORT}`)
    })
}


// START SERVER
server()



