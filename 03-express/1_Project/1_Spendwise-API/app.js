import dotenv from 'dotenv';
// IMPLEMENT ENV
dotenv.config()

// IMPORTS 
import express, { json } from 'express';
import helmet from 'helmet';




// import files 
import connectDB from './src/config/db.js';
import notFound from './src/utils/notfoundHandler.js';
import errorHandler from './src/middleware/errorHandler.js';
import router from './src/router/expenseRouter.js';
import authRouter from "./src/router/authRoutes.js"
import morganMiddleware from './src/middleware/morganLogger.js';




// 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// CREATE AN EXPRESS APP
const app = express();

// GLOBAL LEVEL MIDDLEWARES
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// APPLICATION LEVEL MIDDLEWARE
app.use(morganMiddleware)





// ROUTER MOUNTING

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", 'views', 'index.html'));
});


app.use("/api/v1/auth" , authRouter)
app.use("/api/v1/expenses" , router)




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