import errLogger from "../utils/helper/errLogger.js";

const errorHandler = async (err, req, res, next) => {
    const message = err.message || `❌ Internal Server Error!`;
    const statusCode = err.statusCode || err.status || 500;


    await errLogger(err, req, res);

    return res.status(statusCode).json({
        success: false,
        status: 'error',
        statusCode,
        message
    });
};

export default errorHandler;