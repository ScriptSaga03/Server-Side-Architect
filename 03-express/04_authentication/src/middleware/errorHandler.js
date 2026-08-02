

const errorHandler = (err, req, res, next) => {
    const message = err.message || "Internal Server Error.";
    const statusCode = err.statusCode || err.status || 500;
    return res.status(statusCode).json({
        success: false,
        status: 'error',
        statusCode,
        message,
    })
}

export default errorHandler;