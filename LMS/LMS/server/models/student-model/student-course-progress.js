import mongoose from "mongoose";

const LectureProgressSchema = {
  lectureId: String,
  viewed: Boolean,
  viewedDate: Date,
};

const StudentCourseProgressSchema = mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionDate: Date,
  lectureProgress: [LectureProgressSchema],
});

const StudentCourseProgress = mongoose.model(
  "StduentCourseProgress",
  StudentCourseProgressSchema
);

export default StudentCourseProgress;
