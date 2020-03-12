import { NextFunction, Request } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "./statusCodes";

import logger from "./logger";

export interface CustomError extends Error {
  statusCode?: number;
}

// The logging for this is handled by morgan.
const notFound = (req: Request, next: NextFunction) => {
  const { method, originalUrl } = req;
  const err = Error(`${method} ${originalUrl} does not exist.`) as CustomError;
  err.statusCode = NOT_FOUND;
  return next(err);
};

const invalidParams = (message: string, next: NextFunction) => {
  const err = Error(message) as CustomError;
  err.statusCode = BAD_REQUEST;
  return next(err);
};

const customError = (message: string, next: NextFunction, error?: Error) => {
  let _message = "";

  if (error) {
    _message = error.message;
  } else {
    _message = message;
  }

  const err = Error(_message) as CustomError;
  err.statusCode = INTERNAL_SERVER_ERROR;
  logger.error(`Sending custom error message: ${err.message}`);
  return next(err);
};

const internalError = (next: NextFunction) => {
  const err = Error() as CustomError;
  err.statusCode = INTERNAL_SERVER_ERROR;
  next(err);
};

const errors = {
  invalidParams,
  notFound,
  customError,
  internalError,
};

export default errors;
