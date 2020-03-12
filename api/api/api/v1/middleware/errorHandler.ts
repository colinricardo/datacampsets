import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../../utils/errors";

import {
  BAD_REQUEST,
  GENERIC_ERROR,
  NOT_FOUND,
} from "../../../../utils/statusCodes";

export const errorHandler = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ error: err.message });
  } else if (err.statusCode === BAD_REQUEST) {
    return res.status(BAD_REQUEST).send({ error: err.message });
  }

  if (err) {
    if (err.message) {
      return res.status(GENERIC_ERROR).send({ message: err.message });
    } else {
      return res
        .status(GENERIC_ERROR)
        .send({ error: "Something unexpected happened." });
    }
  }

  next();
};
