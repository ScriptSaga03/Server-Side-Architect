const centralizedErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";
  const message = err.message || ` ❌ Internal Server Error!`;

  return res.status(statusCode).json({
    success: false,
    status,
    statusCode,
    message,
  });
};

export default centralizedErrorHandler;
