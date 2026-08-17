const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "❌ Internal server error!";
    const status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";

    return res.status(statusCode).json({
        success: false,
        status,
        statusCode,
        message
    });
};

export default errorHandler;