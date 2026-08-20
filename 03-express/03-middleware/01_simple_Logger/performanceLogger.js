
import logger from "../helper/logger.js";


export const performanceLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        const logData = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTimeMs: duration
        };

        // Agar response 500ms se slow ho toh Warn/Performance Log karo
        if (duration > 500) {
            logger.warn(`🐢 SLOW REQUEST: ${req.method} ${req.originalUrl} - ${duration}ms`, logData);
        } else {
            logger.info(`⚡ REQUEST: ${req.method} ${req.originalUrl} - ${duration}ms`, logData);
        }
    });

    next();
};