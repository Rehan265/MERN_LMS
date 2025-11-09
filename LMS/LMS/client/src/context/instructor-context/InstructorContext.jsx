import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config';
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"

export const InstructorState = createContext(null);
function InstructorContext({ children }) {

  const [landingFormData, setLandingFormData] = useState(courseLandingInitialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState("create")
  const [courseUpdateData, setCourseUpdateData] = useState(null)
  const [isVideoUploading, setIsVideoUploading] = useState(false)
  const [isVideoUploadingPercentage, setIsVideoUploadingPercentage] = useState(0)
  const [courceCurriculumFormData, setCourceCurriculumFormData] = useState([courseCurriculumInitialFormData])

  const navigate = useNavigate();


  useEffect(() => {
    console.log(isVideoUploadingPercentage)
  }, [isVideoUploadingPercentage])


  const addNewLecture = () => {
    setCourceCurriculumFormData([...courceCurriculumFormData, courseCurriculumInitialFormData])
  }
  const [couresList, setCouresList] = useState([])

  const [isMediaUploading, setIsMediaUploading] = useState({ isLoading: false, index: -1 })


  const handleOnCourseTitleChange = (event, currentIndex) => {
    let cpyCourceCurriculumFormData = [...courceCurriculumFormData];
    let currentData = cpyCourceCurriculumFormData[currentIndex]
    cpyCourceCurriculumFormData[currentIndex] = { ...currentData, title: event.target.value }
    setCourceCurriculumFormData([...cpyCourceCurriculumFormData]);
  }

  const handleOnCourseFreePreviewChange = (currentValue, currentIndex) => {
    let cpyCourceCurriculumFormData = [...courceCurriculumFormData];
    let currentData = cpyCourceCurriculumFormData[currentIndex]
    cpyCourceCurriculumFormData[currentIndex] = { ...currentData, freePreview: currentValue }
    setCourceCurriculumFormData([...cpyCourceCurriculumFormData]);
  }

  const handleOnVideoUpload = async (event, currentIndex) => {

    try {
      setIsVideoUploading(true)
      setIsVideoUploadingPercentage(0)
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const videoFormData = new FormData();
        videoFormData.append("file", selectedFile)


        const responce = await axios.post("http://localhost:5000/api/v1/media/upload", videoFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload Progress: ${percentCompleted}%`);
            setIsVideoUploadingPercentage(percentCompleted)
          },
        });

        if (responce.data.success) {
          let cpyCourceCurriculumFormData = [...courceCurriculumFormData];
          let currentData = cpyCourceCurriculumFormData[currentIndex]
          cpyCourceCurriculumFormData[currentIndex] = { ...currentData, videoUrl: responce.data.result.url, public_id: responce.data.result.public_id }
          setCourceCurriculumFormData([...cpyCourceCurriculumFormData]);
          setIsMediaUploading({ isLoading: false, index: -1 })
        }

      }
    } catch (error) {
      console.log(error);

    } finally {
      setIsVideoUploading(false)
    }
  }


  const isCourseCurriculumFormDataValid = () => {
    return courceCurriculumFormData.every((item) => {
      return (
        item && typeof item == "object" && item.title.trim() !== "" && item.videoUrl.trim() !== ""
      )
    })
  }

  const handleOnReplaceVideo = async (publicId, currentIndex) => {
    const responce = await axios.delete(`http://localhost:5000/api/v1/media/delete/${publicId}`);

    if (responce.data.success) {
      let cpyCourceCurriculumFormData = [...courceCurriculumFormData];
      let currentData = cpyCourceCurriculumFormData[currentIndex]
      cpyCourceCurriculumFormData[currentIndex] = { ...currentData, videoUrl: "", public_id: "" }
      setCourceCurriculumFormData([...cpyCourceCurriculumFormData]);
      toast("Video Removed Successfully");
    }
  }

  const handleOnImageUpload = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", selectedFile)
        const responce = await axios.post("http://localhost:5000/api/v1/media/upload", imageFormData);

        if (responce.data.success) {
          setLandingFormData({ ...landingFormData, image: responce.data.result.url })
        }

      }
    } catch (error) {
      console.log(error);

    }
  }

  const handleOnAddCourse = async (instructorId, instructorName) => {
    try {

      const formData = {
        instructorId,
        instructorName,
        ...landingFormData,
        students: [],
        curriculum: courceCurriculumFormData,
        isPublished: true,
        date: new Date(),
      }
      const responce = await axios.post("http://localhost:5000/api/v1/instructor/course/", formData)
      console.log(responce.data);
      if (responce.data.success) {
        setCourceCurriculumFormData([courseCurriculumInitialFormData]);
        setLandingFormData(courseLandingInitialFormData)
        toast(responce.data.msg);
        navigate(-1)
        sessionStorage.setItem("isNavigatingFromCreateCourse", JSON.stringify(true))
      }
    } catch (error) {

    }
  }


  const getAllCourses = async (userId) => {
    try {
      setIsLoading(true)
      const responce = await axios.get(`http://localhost:5000/api/v1/instructor/course/${userId}`);
      if (responce.data.success) {
        setCouresList(responce.data.data)
      }
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(true)

    }
  }

  const getCourseById = async (id) => {
    try {
      setIsLoading(true)
      const responce = await axios.get(`http://localhost:5000/api/v1/instructor/course/${id}`);
      if (responce.data.success) {
        console.log(responce.data.data);
        const res = responce.data.data;
        const landingData = {
          title: res.title,
          category: res.category,
          level: res.level,
          primaryLanguage: res.primaryLanguage,
          subtitle: res.subtitle,
          description: res.description,
          pricing: res.pricing,
          objectives: res.objectives,
          welcomeMessage: res.welcomeMessage,
          image: res.image,
        }
        const curriculumData = res.curriculum;
        console.log(landingData);
        console.log(curriculumData);

        setLandingFormData(
          {
            ...landingData
          }
        )
        setCourceCurriculumFormData(curriculumData)
      }
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(true)

    }
  }


  const handleCourseDelete = async (id) => {
    const responce = await axios.delete(`http://localhost:5000/api/v1/instructor/course/${id}`)
    if (responce.data.success) {
      getAllCourses();
      toast(responce.data.msg);
    }
  }


  const handleOnBulkVideoUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files)
    const videoFormData = new FormData();

    selectedFiles.forEach((item) => {
      videoFormData.append("files", item)
    })

    try {
      setIsVideoUploading(true)
      setIsVideoUploadingPercentage(0)
      const responce = await axios.post("http://localhost:5000/api/v1/media/bulk-upload", videoFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
          setIsVideoUploadingPercentage(percentCompleted)
        },
      });
      if (responce.data.success) {
        let cpyCourceCurriculumFormData = courceCurriculumFormData[0].title != "" ? [...courceCurriculumFormData] : null

        let newLectures = responce.data.result.map((item, index) => {
          return {
            title: `Lecture # ${index + 1}`,
            videoUrl: item?.url,
            freePreview: false,
            public_id: item.public_id,
          }
        })

        if (cpyCourceCurriculumFormData) {
          setCourceCurriculumFormData([...cpyCourceCurriculumFormData, ...newLectures])
        } else {
          setCourceCurriculumFormData([...newLectures])
        }
        toast("Bulk Lectures Uploaded Successfully")
      }
    } catch (error) {

    } finally {
      setIsVideoUploading(false)
    }


  }


  const handleOnDeleteLecture = async (index) => {

    let currentLecture = courceCurriculumFormData[index];
    try {
      const responce = await axios.delete(`http://localhost:5000/api/v1/media/delete/${currentLecture.public_id}`);
      if (responce.data.success) {
        let cpyCourceCurriculumFormData = courceCurriculumFormData.filter((_, ind) => ind != index)
        setCourceCurriculumFormData([...cpyCourceCurriculumFormData])
        toast("Lecture Deleted Successfully");
      }
    } catch (error) {

    }

  }


  const handleOnOpenUpdateForm = (item) => {
    setCourseUpdateData(item)
    setMode("update")
    console.log(item);
    setCourceCurriculumFormData(
      item.curriculum
    )

    setLandingFormData(
      {
        title: item.title,
        category: item.category,
        level: item.level,
        primaryLanguage: item.primaryLanguage,
        subtitle: item.subtitle,
        description: item.description,
        pricing: item.pricing,
        objectives: item.objectives,
        welcomeMessage: item.welcomeMessage,
        image: item.image,
      }
    )
    navigate("/instructor/create-new-course")
  }


  const handleOnUpdateCourse = async (instructorId, instructorName) => {
    try {

      const formData = {
        instructorId,
        instructorName,
        ...landingFormData,
        students: courseUpdateData.students,
        curriculum: courceCurriculumFormData,
        isPublished: courseUpdateData.isPublished,
        date: courseUpdateData.date,
      }
      const responce = await axios.put(`http://localhost:5000/api/v1/instructor/course/${courseUpdateData._id}`, formData)
      console.log(responce.data);
      if (responce.data.success) {
        setCourceCurriculumFormData([courseCurriculumInitialFormData]);
        setLandingFormData(courseLandingInitialFormData)
        toast(responce.data.msg);
        navigate(-1)
        sessionStorage.setItem("isNavigatingFromCreateCourse", JSON.stringify(true))
        setCourseUpdateData(null)
        setMode("create");
      }
    } catch (error) {

    }
  }

  const handleOnSubmit = () => {
    if (mode === "create") {
      handleOnAddCourse()
    } else if (mode === "update") {
      handleOnUpdateCourse()
    }
  }
  return (
    <InstructorState.Provider value={{ landingFormData, setLandingFormData, courceCurriculumFormData, setCourceCurriculumFormData, addNewLecture, isMediaUploading, handleOnCourseTitleChange, handleOnCourseFreePreviewChange, handleOnVideoUpload, isCourseCurriculumFormDataValid, handleOnReplaceVideo, handleOnImageUpload, handleOnSubmit, getAllCourses, couresList, getCourseById, handleCourseDelete, handleOnBulkVideoUpload, isVideoUploading, isVideoUploadingPercentage, handleOnDeleteLecture, handleOnOpenUpdateForm, mode }}>
      {children}
    </InstructorState.Provider>
  )
}

export default InstructorContext