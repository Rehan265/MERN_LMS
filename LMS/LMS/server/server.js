import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5001;
import cors from "cors";
import connectToDb from "./database/connect-to-db.js";
import authRouter from "./routes/auth-routes/auth-route.js";
import mediaRouter from "./routes/instructor-routes/mediaRoutes.js";
import courseRouter from "./routes/instructor-routes/courseRoutes.js";
import studentCourseRouter from "./routes/student-routes/student-course-routes.js";
import studentOrderRouter from "./routes/student-routes/student-order-routes.js";
import studentCourseProgressRouter from "./routes/student-routes/student-course-progress-route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

connectToDb();

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/media/", mediaRouter);
app.use("/api/v1/instructor/course/", courseRouter);
app.use("/api/v1/student/course/", studentCourseRouter);
app.use("/api/v1/student/order/", studentOrderRouter);
app.use("/api/v1/student-course-progress/", studentCourseProgressRouter);

app.listen(port, () => {
  console.log(`Server running On Port ${port}`);
});
