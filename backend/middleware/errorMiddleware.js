const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); //set error message
  res.status(404); //set status to 404
  next(error); //pass error to next middleware
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; //if status code is 200, set it to 500, otherwise use the status code
  let message = err.message; //set message to the error message
  if (err.message === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "null" : err.stack,
  });
};

export { notFound, errorHandler };
