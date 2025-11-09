import Course from "../../models/instructor-model/Course.js";
import Order from "../../models/student-model/Order.js";

const createOrder = async (resquest, responce) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      userStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = resquest.body;

    if (
      !userId ||
      !userName ||
      !userEmail ||
      !userStatus ||
      !paymentMethod ||
      !paymentStatus ||
      !orderDate ||
      !paymentId ||
      !payerId ||
      !instructorId ||
      !instructorName ||
      !courseImage ||
      !courseTitle ||
      !courseId ||
      !coursePricing
    ) {
      throw new Error("All fields are required");
    }

    const studentCourse = await Course.findOne({
      _id: courseId,
    });

    if (!studentCourse) {
      throw new Error("Course Not Found");
    }

    const indexOfStudentIfAlreadyExists = studentCourse.students.findIndex(
      (stu) => stu.studentId == userId
    );

    console.log(indexOfStudentIfAlreadyExists);

    if (indexOfStudentIfAlreadyExists != -1) {
      throw new Error("Course Already Bought");
    }

    const res = await Order.create({
      userId,
      userName,
      userEmail,
      userStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    });

    studentCourse.students.push({
      studentId: userId,
      studentName: userName,
      studentEmail: userEmail,
      paidAmount: coursePricing,
    });

    await studentCourse.save();

    return responce.status(200).json({
      success: true,
      msg: "Course Bought Successfully",
    });
  } catch (error) {
    return responce.status(200).json({
      success: false,
      msg: error.message,
    });
  }
};

export { createOrder };
