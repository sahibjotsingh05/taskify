const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  const newErr = new AppError(message, 400);
  return newErr;
};
const handleDuplicateErrorDB = (err) => {
  const message = `Duplicate Key Value: ${err.keyValue.name}`;
  return new AppError(message, 400);
};
const handleValidationError = (err) => {
  const message = Object.values(err.errors).map((el) => el.message);
  return new AppError(message, 400);
};
const handleJWTError = (err) => {
  return new AppError("Invalid token. Please log in again!", 401);
};
const handleJWTExpiredError = (err) => {
  return new AppError("Your Token Has Expired. Please Login Again", 401);
};
const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational errors are trusted
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 1) LOG ERROR
    //console.error('ERROR', err);

    // 2) SEND GENERIC RESPONSE
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};
module.exports = (err, req, res, next) => {
  //console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    if (err.name === "ValidationError") error = handleValidationError(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError(error);
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError(error);
    sendErrorProd(error, res);
  }
};
