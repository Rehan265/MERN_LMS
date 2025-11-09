import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"

export const StudentState = createContext(null);

function StudentContext({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [couresList, setCouresList] = useState([])
  const [couresDetail, setCouresDetail] = useState(null)
  const [couresProgressDetail, setCouresProgressDetail] = useState(null)
  const [studentBoughtCoursesList, setStudentBoughtCoursesList] = useState([])
  const navigate = useNavigate();

  const getAllStudentCourses = async (filter, sort) => {
    setIsLoading(true)
    const query = new URLSearchParams({
      ...filter,
      sortBy: sort
    })

    try {
      const responce = await axios.get(`http://localhost:5000/api/v1/student/course?${query}`);
      if (responce.data.success) {
        setCouresList(responce.data.data)
      }
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false)
    }
  }

  const getStudentCouresDetails = async (courseId, studentId) => {
    try {
      setCouresDetail(null)
      const responce = await axios.get(`http://localhost:5000/api/v1/student/course/${courseId}/${studentId}`);
      if (responce.data.success) {
        setCouresDetail(responce.data.data);
        console.log(responce.data.data);
      } else {
        navigate(`student/student-course-progress/${courseId}`);
      }

    } catch (error) {
      console.log(error);
    }

  }


  const createOrder = async (userId, userName, userEmail, instructorId, instructorName, courseImage, courseTitle, courseId, coursePricing) => {

    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/student/order/create-order/", {
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        userStatus: "Done",
        paymentMethod: "Paypal",
        paymentStatus: "Paid",
        orderDate: new Date().getDate(),
        paymentId: "pay_789456123",
        payerId: "payer_654321987",
        instructorId: instructorId,
        instructorName: instructorName,
        courseImage: courseImage,
        courseTitle: courseTitle,
        courseId: courseId,
        coursePricing: coursePricing
      });
      toast(data.msg)
      if (data.success) {

      }
    } catch (error) {
      console.log(error);

    }
  }


  const fetchStudentBoughtCourses = async (studentId) => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`http://localhost:5000/api/v1/student/course/bought-courses/${studentId}`);
      if (data.success) {
        setStudentBoughtCoursesList(data.data)
      } else {
        setStudentBoughtCoursesList([])
        toast(data.msg)
      }
    } catch (error) {
      console.log(error);
      toast(error)

    } finally {
      setIsLoading(false)

    }
  }

  const handleOnCourseNavigate = async (courseId, studentId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/student/course/check-course-bought-info/${courseId}/${studentId}`)

      if (data.success) {
        navigate(`/student/student-course-progress/${courseId}`)
      } else {
        navigate(`/student/student-course-details/${courseId}`)
      }

    } catch (error) {
      console.log(error.message)
    }

  }


  const handleOnGetCourseProgress = async (courseId, studentId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/student-course-progress/get/${courseId}/${studentId}`)

      if (data.success) {
        setCouresProgressDetail(data.data)
      } else {
        navigate(`/student-course-details/${courseId}`)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleOnResetCourseProgress = async (courseId, studentId) => {
    try {

      const { data } = await axios.post(`http://localhost:5000/api/v1/student-course-progress/reset-progress/${courseId}/${studentId}`)

      if (data.success) {
        toast(data.msg)
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleOnLectureViewed = async (courseId, studentId, lectureId) => {
    try {

      const { data } = await axios.post(`http://localhost:5000/api/v1/student-course-progress/mark-lecture-viewed/${courseId}/${studentId}/${lectureId}`)
      if (data.success) {
        toast(data.msg)
        return new Promise((res, rej) => {
          res(data)
        });
      }
    } catch (error) {
      console.log(error);

    }

  }


  return (
    <StudentState.Provider value={{ isLoading, couresList, getAllStudentCourses, getStudentCouresDetails, couresDetail, createOrder, fetchStudentBoughtCourses, studentBoughtCoursesList, handleOnCourseNavigate, handleOnGetCourseProgress, couresProgressDetail, handleOnResetCourseProgress, handleOnLectureViewed }}>
      {children}
    </StudentState.Provider>
  )
}

export default StudentContext