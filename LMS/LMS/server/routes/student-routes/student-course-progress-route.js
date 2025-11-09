import express from "express";
import {
  getCurrentCourseProgress,
  markCurrentLectureAsViewed,
  resetCurrentCourseProgress,
} from "../../controllers/student-controller/student-course-progress-controller.js";

const studentCourseProgressRouter = express.Router();

studentCourseProgressRouter
  .route("/mark-lecture-viewed/:courseId/:userId/:lectureId")
  .post(markCurrentLectureAsViewed);
studentCourseProgressRouter
  .route("/get/:courseId/:userId")
  .get(getCurrentCourseProgress);
studentCourseProgressRouter
  .route("/reset-progress/:courseId/:userId")
  .post(resetCurrentCourseProgress);

export default studentCourseProgressRouter;
