// DOTENV  CONFIG
import dotenv from "dotenv";
dotenv.config();
// IMPORT
import express from "express";
import helmet from "helmet";
import morgan from "morgan";


// IMPORT CREATED FILES
import centralizedErrorHandler from "./src/middleware/errorHandler.js";
import pageNotFound from "./src/middleware/notFound.js";
import { connectDB } from "./src/config/db.js";
import router from "./src/routes/task.route.js";

// CREATE EXPRESS APP
const app = express();

// GLOBAL LEVEL MIDDLEWARE
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// APPLICATION LEVEL MIDDLEWARE

// HEALTH CHECK ROUTE
app.get("/", (req, res) => {
  return res.status(200).send("<h1>🚀Express server is working.</h1>");
});
// ROUTE MOUNTING
// AUTH ROUTE
// PROJECT ROUTES
app.use("/api/task", router)

// PAGE NOT FOUND ROUTE --> UNMATCHED ROUTE HANDLER
app.use(pageNotFound);

// CENTRALIZED ERROR HANDLER
app.use(centralizedErrorHandler);

// DEFINE PORT
const PORT = process.env.PORT || 3000;

// CREATE SERVER
const server = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(
        `🚀 Express server is running on PORT: http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(`❌ Failed to start server ${error.message}`);
    process.exit(1);
  }
};

// START SERVER

server();
