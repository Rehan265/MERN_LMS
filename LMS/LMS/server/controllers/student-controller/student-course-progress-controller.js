import Course from "../../models/instructor-model/Course.js";
import StudentCourseProgress from "../../models/student-model/student-course-progress.js";

const markCurrentLectureAsViewed = async (request, responce) => {
  try {
    const { courseId, userId, lectureId } = request.params;

    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course Not Found");
    }

    const progress = await StudentCourseProgress.findOne({ userId, courseId });

    if (!progress) {
      await StudentCourseProgress.create({
        courseId: courseId,
        userId: userId,
        lectureProgress: [
          {
            lectureId: lectureId,
            viewed: true,
            viewedDate: new Date(),
          },
        ],
      });
    } else {
      const lectureProgress = progress.lectureProgress.find((item) => {
        return item.lectureId == lectureId;
      });

      if (lectureProgress) {
        lectureProgress.viewed = true;
        lectureProgress.viewedDate = new Date();
      } else {
        progress.lectureProgress.push({
          lectureId: lectureId,
          viewed: true,
          viewedDate: new Date(),
        });
      }

      await progress.save();
    }

    const newProgress = await StudentCourseProgress.findOne({
      userId,
      courseId,
    });

    const allLectureViewed =
      newProgress.lectureProgress.length === course.curriculum.length &&
      newProgress.lectureProgress.every((item) => item.viewed == true);

    if (allLectureViewed) {
      newProgress.completed = true;
      newProgress.completionDate = new Date();
      await newProgress.save();
    }

    return responce.status(200).json({
      success: true,
      msg: "Lecture Marked As Viewed",
      data: newProgress,
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

const getCurrentCourseProgress = async (request, responce) => {
  try {
    const { courseId, userId } = request.params;

    const currentCourse = await Course.findById(courseId).lean();

    if (!currentCourse) {
      throw new Error("Course Not Found");
    }

    const indexOfBoughtCourse = currentCourse.students.findIndex((student) => {
      return student.studentId == userId;
    });

    if (indexOfBoughtCourse == -1) {
      throw new Error("Course Not Bought");
    }

    const currentProgress = await StudentCourseProgress.findOne({
      courseId,
      userId,
    }).lean();

    let progressdetails;
    if (!currentProgress) {
      progressdetails = currentCourse.curriculum.map((lecture) => {
        return {
          ...lecture,
          completed: false,
        };
      });
    } else {
      progressdetails = currentCourse.curriculum.map((lecture) => {
        const isCompleted = currentProgress.lectureProgress.some((lp) => {
          return lp.lectureId === lecture.public_id && lp.viewed;
        });

        return {
          ...lecture,
          completed: isCompleted,
        };
      });
    }

    return responce.status(200).json({
      success: true,
      isCourseBought: true,
      data: {
        currentCourse,
        progressdetails,
        isCourseCompleted: currentProgress?.completed || false,
        completionDate: currentProgress?.completionDate || null,
      },
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

const resetCurrentCourseProgress = async (request, responce) => {
  try {
    const { courseId, userId } = request.params;

    const progress = await StudentCourseProgress.findOne({ userId, courseId });

    if (!progress) {
      throw new Error("Progress Not Found!");
    }
    progress.completed = false;
    progress.completionDate = null;
    progress.lectureProgress = [];

    await progress.save();
    return responce.status(200).json({
      success: true,
      msg: "Course Progress Has Been reset",
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

export {
  markCurrentLectureAsViewed,
  getCurrentCourseProgress,
  resetCurrentCourseProgress,
};
