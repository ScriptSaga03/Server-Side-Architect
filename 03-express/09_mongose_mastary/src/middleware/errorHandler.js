


const errorHandler = (err, req, res, next) =>{
    const message = err.message || `❌ Internal Server Error!`;
    const statusCode = err.statusCode || err.status || 500;

    return res.status(statusCode).json({
        success:false,
        status : err.status || (err.statusCode >= 400 && err.statusCode < 500 ? "Fail" : "Error"),
        message,
        statusCode
    })
}

export default errorHandler;