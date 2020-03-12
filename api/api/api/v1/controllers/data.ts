
import { NextFunction, Request, Response } from "express";
import courseData from "../../../../resources/courseData.json";
import courses from "../../../../resources/courses.json";
import errors from "../../../../utils/errors";
import logger from "../../../../utils/logger";

const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return res.send({ courses });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

const getDataForCourseUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { courseUrl } = req.query;
  const data = courseData[courseUrl];

  try {
    return res.send({ status: "ok", data });
  } catch (err) {
    logger.error("Error: ", err);
    return errors.internalError(next);
  }
};

export default {
  getCourses,
  getDataForCourseUrl,
};
