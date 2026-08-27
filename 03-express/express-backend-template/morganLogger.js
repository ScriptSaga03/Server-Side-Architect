import logger from "../helper/logger.js";
const morganMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const message = `method :${req.method} - url: ${req.originalUrl} - statusCode : ${res.statusCode} - durationTimeMs: ${duration}ms`;

        if (res.statusCode >= 500) {
            logger.error(`💥 SERVER ERROR: ${message}`);
        } else if (res.statusCode >= 400) {
            logger.warn(`⚠️ CLIENT ERROR: ${message}`); // 👈 Only WARN level
        } else if (duration > 500) {
            logger.warn(`🐢 SLOW REQUEST DETECTED: ${message}`);
        } else {
            logger.info(`⚡ FAST REQUEST : ${message}`);
        }
    });

    next();
};
export default morganMiddleware;