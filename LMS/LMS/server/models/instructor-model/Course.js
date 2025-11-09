import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  paidAmount: String,
});
const curriculumSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  freePreview: Boolean,
  public_id: String,
});

const courseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  pricing: Number,
  objectives: String,
  welcomeMessage: String,
  image: String,
  students: [studentSchema],
  curriculum: [curriculumSchema],
  isPublished: Boolean,
  date: Date,
});

export default mongoose.model("Course", courseSchema);
