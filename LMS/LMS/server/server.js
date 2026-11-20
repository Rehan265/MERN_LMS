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
// Allowed frontend origins: comma-separated list in CLIENT_URL
// (e.g. "https://my-lms.vercel.app"). Defaults to the local Vite dev server.
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", (request, response) => {
  response.json({ success: true, msg: "LMS API is running" });
});

// Make sure the database is connected before any API route runs.
// The connection is cached, so on Vercel it is reused between requests.
app.use(async (request, response, next) => {
  try {
    await connectToDb();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    response
      .status(500)
      .json({ success: false, msg: "Database connection failed" });
  }
});

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/media/", mediaRouter);
app.use("/api/v1/instructor/course/", courseRouter);
app.use("/api/v1/student/course/", studentCourseRouter);
app.use("/api/v1/student/order/", studentOrderRouter);
app.use("/api/v1/student-course-progress/", studentCourseProgressRouter);

// On Vercel the app is run as a serverless function (see api/index.js),
// so only start a listening server when running locally.
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running On Port ${port}`);
  });
}

export default app;
