import morgan from "morgan";
import logger from "../helper/logger.js";

// Custom Morgan middleware with Performance Warning threshold
const morganMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const message = `method :${req.method} - url: ${req.originalUrl} - statusCode : ${res.statusCode} - durationTimeMs: ${duration}ms`;

        // Agar Request 500ms se zyada slow hai toh WARNING log hoga
        if (duration > 500) {
            logger.warn(`🐢 SLOW REQUEST DETECTED: ${message}`);
        } else {
            logger.info(`⚡ FAST REQUEST : ${message}`);
        }
    });

    next();
};

export default morganMiddleware;