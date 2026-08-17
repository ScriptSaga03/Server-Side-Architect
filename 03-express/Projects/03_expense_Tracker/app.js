

// IMPORTS 
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv'


// import files 
import connectDB from './src/config/db.js';
import notFound from './src/utils/notfoundHandler.js';
import errorHandler from './src/middleware/errorHandler.js';

// IMPLEMENT ENV
dotenv.config()

// CREATE AN EXPRESS APP
const app = express();

// GLOBAL LEVEL MIDDLEWARES
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// APPLICATION LEVEL MIDDLEWARE



// ROUTER MOUNTING
app.get("/api/v1/expenses", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Smart Expense Tracker API is running smoothly!"
    });
});



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