import VideoPlayer from '@/components/instructor/VideoPlayer'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { useNavigate, useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { StudentState } from '@/context/student-context/StudentContext'
import { AuthState } from '@/context/auth-context/Auth-Context'

function StudentCourseProgress() {

    const { handleOnGetCourseProgress, couresProgressDetail, handleOnResetCourseProgress, handleOnLectureViewed } = useContext(StudentState);
    const { auth } = useContext(AuthState);
    const param = useParams();

    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const [showCourseCompleteDialog, setShowCourseCompleteDialog] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    const [currentLecture, setCurrentLecture] = useState({});

    const navigate = useNavigate();

    const handleOnRewatchCourse = () => {
        handleOnResetCourseProgress(param.id, auth.user._id);
        handleOnGetCourseProgress(param.id, auth.user._id)
    }


    useEffect(() => {
        handleOnGetCourseProgress(param.id, auth.user._id)
    }, [])

    useEffect(() => {
        setShowCourseCompleteDialog(couresProgressDetail?.isCourseCompleted)
        setShowConfetti(couresProgressDetail?.isCourseCompleted)

        if (couresProgressDetail) {
            const firstLecture = couresProgressDetail?.progressdetails.find((lec) => {
                return !lec.completed;
            })

            if (firstLecture) {
                setCurrentLecture(firstLecture)
            }
        }
    }, [couresProgressDetail])

    const handleOnWatchVideo = (lecture) => {
        if (!lecture.completed) {
            setCurrentLecture(lecture)
        }
    }


    const handleOnVideoEnded = async () => {
        const data = await handleOnLectureViewed(param.id, auth.user._id, currentLecture.public_id);
        if (data.success) {
            handleOnGetCourseProgress(param.id, auth.user._id)
        }
    }


    return (
        <>
            {
                showConfetti && <Confetti />
            }
            <div className='flex flex-col h-screen bg-[#1c1d1f] text-white'>
                {/* Header */}
                <div className='flex items-center justify-between p-4 border-b border-gray-700'>
                    <div className='flex items-center space-x-4'>
                        <Button onClick={() => navigate("/student/student-course")} variant="ghost" size="sm" className='text-white hover:text-gray-300 cursor-pointer'>
                            <ChevronLeft className='h-4 w-4 mr-2' />
                            Back to my courses
                        </Button>
                        <h1 className='text-lg font-bold hidden md:block'>{couresProgressDetail?.currentCourse?.title}</h1>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                        {isSideBarOpen ? <ChevronRight className='text-white' /> : <ChevronLeft className='text-white' />}
                    </Button>
                </div>

                {/* Main Area */}
                <div className='flex flex-1 overflow-hidden'>
                    {/* Video Area */}
                    <div className={`flex-1 transition-all duration-300 ${isSideBarOpen ? 'mr-[400px]' : ''}`}>
                        <VideoPlayer onEnded={handleOnVideoEnded} url={currentLecture?.videoUrl} />
                        <div className='p-6'>
                            <h2 className='text-2xl font-bold mb-2'>{currentLecture?.title}</h2>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-transform duration-300 ${isSideBarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <Tabs className='h-full flex flex-col' defaultValue={"content"}>
                            <TabsList className='grid grid-cols-2 h-12 bg-[#2a2b2e]'>
                                <TabsTrigger value="content" className='text-white rounded-none h-full hover:bg-[#3a3b3e]'>Course Content</TabsTrigger>
                                <TabsTrigger value="overview" className='text-white rounded-none h-full hover:bg-[#3a3b3e]'>Overview</TabsTrigger>
                            </TabsList>

                            {/* Course Content Tab */}
                            <TabsContent value="content" className='flex-1'>
                                <ScrollArea className='h-full'>
                                    <div className='p-4 space-y-4'>

                                        {
                                            couresProgressDetail?.progressdetails && couresProgressDetail?.progressdetails?.length && couresProgressDetail?.progressdetails?.map((lecture) => {
                                                return <div onClick={() => handleOnWatchVideo(lecture)} className={`flex items-center space-x-2 font-medium ${lecture.completed ? "cursor-not-allowed" : "cursor-pointer"} hover:text-green-400`}>
                                                    {
                                                        lecture?.completed ? <Check className='h-4 w-4 text-green-500' /> : <Play className='h-4 w-4 text-green-500' />
                                                    }
                                                    <span>{lecture?.title}</span>
                                                </div>
                                            })
                                        }

                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            {/* Overview Tab */}
                            <TabsContent value="overview" className='flex-1'>
                                <ScrollArea className='h-full'>
                                    <div className='p-4'>
                                        <h2 className='text-xl font-bold mb-4'>About This Course</h2>
                                        <p className='text-gray-400 leading-relaxed'>
                                            {couresProgressDetail?.currentCourse?.description}
                                        </p>
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div >
            <Dialog open={showCourseCompleteDialog}>
                <DialogContent showOverlay={false} className={"sm:w-[425px]"}>
                    <DialogHeader>
                        <DialogTitle>Congratulation!</DialogTitle>
                        <DialogDescription>
                            <div className='flex flex-col gap-3 '>
                                <Label>You have completed this course</Label>
                                <div className='flex flex-row gap-3 '>
                                    <Button onClick={() => navigate("/student/student-course")}>
                                        My Course Page
                                    </Button>
                                    <Button onClick={handleOnRewatchCourse}>
                                        Rewatch course
                                    </Button>

                                </div>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default StudentCourseProgress
