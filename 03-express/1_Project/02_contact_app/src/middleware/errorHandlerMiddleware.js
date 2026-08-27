
import logger from "../helper/logger.js";

// const centralizedErrorHandler = (err, req, res, next) => {

//     const statusCode = err.statusCode || err.status || 500;
//     const message = err.message || `❌ Internal server error!`;
//     const status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";


//     // Metadata Object pass karna best practice hai for structured JSON logging
//     logger.error(`❌ Error ${statusCode} - ${message}`, {
//         method: req.method,
//         url: req.originalUrl,
//         stack: err.stack
//     });

//     return res.status(statusCode).json({
//         success: false,
//         status,
//         statusCode,
//         message
//     })
// };

// export default centralizedErrorHandler; 


const centralizedErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // ⚡ Industry Standard: Only log stack traces & errors for 5xx Server Failures
    if (statusCode >= 500) {
        logger.error(`💥 [500 Exception]: ${err.stack || err.message}`);
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
        message
    });
};



export default centralizedErrorHandler