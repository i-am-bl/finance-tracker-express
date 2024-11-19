import { StatusCodes } from "http-status-codes";
/*
 * Middleware for catching errors, returning in the specified format.
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something unexpected has happened.";

  res.status(statusCode).json({
    message: message,
    details: err.details, //Optional, only return for schema validation errors.
  });
}
