import { deleteMediaToCloudinary } from "../../helpers/cloudinary.js";
import Course from "../../models/instructor-model/Course.js";

const addNewCourse = async (request, responce) => {
  try {
    const {
      instructorId,
      instructorName,
      title,
      category,
      level,
      primaryLanguage,
      subtitle,
      description,
      pricing,
      objectives,
      welcomeMessage,
      image,
      curriculum,
      isPublished,
      date,
    } = request.body;

    if (
      !instructorId.trim() ||
      !instructorName.trim() ||
      !title.trim() ||
      !category.trim() ||
      !level.trim() ||
      !primaryLanguage.trim() ||
      !subtitle.trim() ||
      !description.trim() ||
      !pricing ||
      !objectives.trim() ||
      !welcomeMessage.trim() ||
      !image.trim() ||
      !isPublished ||
      !date ||
      !curriculum.length > 0
    ) {
      throw new Error("All fields are required");
    }
    const newlyCreatedCourse = await Course.create({
      instructorId,
      instructorName,
      title,
      category,
      level,
      primaryLanguage,
      subtitle,
      description,
      pricing,
      objectives,
      welcomeMessage,
      image,
      students: [],
      curriculum,
      isPublished,
      date,
    });

    return responce.status(200).json({
      success: true,
      msg: "Course Added Successfully",
      data: newlyCreatedCourse,
    });
  } catch (error) {
    responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};
//==================================================
const getAllCourses = async (request, responce) => {
  try {
    const { userId } = request.params;
    const courseLists = await Course.find({ instructorId: userId });
    return responce.status(200).json({
      success: true,
      count: courseLists.length,
      data: courseLists,
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};
//==================================================

const getCourseById = async (request, responce) => {
  try {
    const { id } = request.params;
    const course = await Course.findById(id);

    if (course) {
      return responce.status(200).json({
        success: true,
        data: course,
      });
    } else {
      throw new Error("Course Not Found With This Id");
    }
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};
//==================================================

const updateCourseById = async (request, responce) => {
  try {
    const { id } = request.params;
    const courseToBeUpdated = await Course.findById(id);

    if (courseToBeUpdated) {
      await Course.findByIdAndUpdate(id, request.body, { new: true });

      return responce.status(200).json({
        success: true,
        msg: "Updated Successfully",
      });
    } else {
      throw new Error("Course Not Found With This Id");
    }
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};
//==================================================
const deleteCourseById = async (request, response) => {
  try {
    const { id } = request.params;
    const courseToBeDeleted = await Course.findById(id);

    if (!courseToBeDeleted) {
      throw new Error("Course Not Found With This Id");
    }

    await Promise.all(
      courseToBeDeleted.curriculum.map((curr) =>
        deleteMediaToCloudinary(curr.public_id)
      )
    );

    await Course.findByIdAndDelete(id);

    return response.status(200).json({
      success: true,
      msg: "Deleted successfully!",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

//==================================================

export {
  addNewCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
