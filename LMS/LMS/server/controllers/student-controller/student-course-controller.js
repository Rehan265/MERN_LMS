import Course from "../../models/instructor-model/Course.js";

const getAllStudentCourses = async (request, responce) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = request.query;

    console.log(request.query);

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;
        break;
      case "price-hightolow":
        sortParam.pricing = -1;
        break;
      case "title-atoz":
        sortParam.title = 1;
        break;
      case "title-ztoa":
        sortParam.title = -1;
        break;
      default:
        sortParam.pricing = 1;
        break;
    }

    const allCourses = await Course.find(filters).sort(sortParam);

    return responce.status(200).json({
      success: true,
      count: allCourses.length,
      data: allCourses,
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

const getStudentCourseDetails = async (request, responce) => {
  try {
    const { courseId, studentId } = request.params;
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("No Course Found");
    }

    const indexOfCurrentStudent = course.students.findIndex(
      (student) => student.studentId == studentId
    );
    

    if (indexOfCurrentStudent != -1) {
      throw new Error("Course Already Bought Go To Progress Page");
    }

    return responce.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

const getStudentsBoughtCourses = async (request, responce) => {
  try {
    const { id } = request.params;

    const allCourses = await Course.find();

    const boughtCourses = allCourses.filter((course) => {
      return course.students.find((student) => student.studentId == id);
    });

    return responce.status(200).json({
      success: true,
      data: boughtCourses,
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

const checkCoursePurchaseInfo = async (request, responce) => {
  try {
    const { studentId, courseId } = request.params;

    const course = await Course.findOne({ _id: courseId });

    const indexOfStudent = course.students.findIndex(
      (student) => student.studentId == studentId
    );
    if (indexOfStudent != -1) {
      return responce.status(200).json({
        success: true,
        msg: "Student has bought the course",
      });
    } else {
      return responce.status(200).json({
        success: false,
        msg: "Student has not bought the course",
      });
    }
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

export {
  getAllStudentCourses,
  getStudentCourseDetails,
  getStudentsBoughtCourses,
  checkCoursePurchaseInfo,
};
