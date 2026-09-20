import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Middlewares
import connectDB from "./src/config/db.js";
import centralizedErrorHandler from "./src/middleware/errorHandler.js";
import routeNotFound from "./src/middleware/notFound.js";
import authRoutes from './src/routes/auth.routes.js'

// CREATE EXPRESS APP
const app = express();

// GLOBAL MIDDLEWARE
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

// Application-level middleware

// HEALTH CHECK ROUTE
app.get("/", (req, res) => {
  return res.send("<h1>🚀 Express server is working!</h1>");
});

// ROUTE MOUTING
// AUTH ROUTES
app.use("/api/v1/auth", authRoutes);
// CONTACT ROUTES

// UNMATCHED ROUTE HANDLER
app.use(routeNotFound);

// CENTRALIZED ERROR HANDLER
app.use(centralizedErrorHandler);

// DEFINE PORT
const PORT = process.env.PORT || 3000;

// CREATE SERVER AND START LISTENING

const server = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log( `🚀 Express server is running on PORT : http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`)
    process.exit(1);
  }
};

// START SERVER

server();
