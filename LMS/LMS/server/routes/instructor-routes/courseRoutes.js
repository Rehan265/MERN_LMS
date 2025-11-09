import express from "express";
import {
  addNewCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../../controllers/instructor-controller/course-controller.js";

const courseRouter = express.Router();

courseRouter.route("/:userId").get(getAllCourses);

courseRouter.route("/").post(addNewCourse);
courseRouter
  .route("/:id")
  .get(getCourseById)
  .put(updateCourseById)
  .delete(deleteCourseById);

export default courseRouter;
