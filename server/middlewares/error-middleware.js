// errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {

  const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
  const extraData = err.extraData || {}; // Default to an empty object if no extra data is provided
  

  res.status(statusCode).json({
    extraData,
    message: err.message ||  'BACKEND ERROR',
    success: false,
  });
};

module.exports = errorMiddleware;
