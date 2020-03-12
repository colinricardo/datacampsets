import express from "express";
import dataController from "../controllers/data";

const router = express.Router();

router.get("/courses", dataController.getCourses);

router.get("/:courseUrl", dataController.getDataForCourseUrl);

export default router;
