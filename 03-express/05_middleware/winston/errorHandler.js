import logger from "../helper/logger.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "❌ Internal server error!";
    const status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";

    logger.error(`❌ Error ${statusCode} - ${message}`, {
        method :req.method,
        url :req.originalUrl,
        stack: err.stack
    })

    return res.status(statusCode).json({
        success: false,
        status : status || "Error",
        statusCode,
        message
    });
};

export default errorHandler;



// jb winston ka use kiya hoga jb hi 
