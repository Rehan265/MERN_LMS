import VideoPlayer from '@/components/instructor/VideoPlayer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthState } from '@/context/auth-context/Auth-Context'
import { StudentState } from '@/context/student-context/StudentContext'
import { CheckCircle, Globe, Lock, PlayCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function StudentCourseDetailsPage() {

    const { getStudentCouresDetails, couresDetail, createOrder, handleOnCourseNavigate } = useContext(StudentState);
    const { auth } = useContext(AuthState);
    const param = useParams();

    const [freePreviewVideoUrl, setFreePreviewVideoUrl] = useState("");


    // instructorId, instructorName, courseImage, courseTitle, courseId, coursePricing


    const handleOnCourseCreate = (instructorId, instructorName, courseImage, courseTitle, courseId, coursePricing) => {

        const { _id, userName, userEmail } = auth.user;
        createOrder(_id, userName, userEmail, instructorId, instructorName, courseImage, courseTitle, courseId, coursePricing);
    }

    useEffect(() => {
        if (couresDetail) {
            let cpyFreePreviewVideoUrl = couresDetail?.curriculum.find((curr) => curr.freePreview)
            setFreePreviewVideoUrl(cpyFreePreviewVideoUrl?.videoUrl)
        }


    }, [couresDetail])


    useEffect(() => {
        getStudentCouresDetails(param.id, auth.user._id)
    }, [param])
    return (
        <div className='mx-auto p-4'>
            <div className='bg-gray-900 text-white p-8 rounded-t-lg'>
                <h1 className='text-3xl font-bold mb-4'>{couresDetail?.title}</h1>
                <p className='text-3xl mb-4'>{couresDetail?.subtitle}</p>
                <div className='flex items-center space-x-4 mt-2 text-sm'>
                    <span>Created By {couresDetail?.instructorName}</span>
                    <span>Created On {couresDetail?.date?.substring(0, 10)}</span>
                    <span className='flex items-center'>
                        <Globe className='h-4 w-4 mr-1' />
                        {couresDetail?.primaryLanguage}
                    </span>
                    <span>
                        {couresDetail?.students?.length} Students
                    </span>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-8 mt-8'>
                <main className='flex-grow'>
                    <Card className={"mb-8"}>
                        <CardHeader>
                            <CardTitle>What You'll learn</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                {
                                    couresDetail?.objectives?.split(",")?.map((obj, index) => {
                                        return <li className='flex items-start' key={index}>
                                            <CheckCircle className='mr-2 h-5 w-5 text-green-500 flex-shrink-0' />
                                            <span>{obj}</span>
                                        </li>
                                    })
                                }

                            </ul>
                        </CardContent>
                    </Card>
                    <Card className={"mb-8"}>
                        <CardHeader>
                            <CardTitle>Course Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {couresDetail?.description}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Curriculum</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                {
                                    couresDetail?.curriculum?.map((curr, index) => {
                                        return <li key={index} className='flex items-center mb-4'>
                                            {
                                                curr.freePreview ? <PlayCircle className='mr-2 h-4 w-4' /> : <Lock className='mr-2 h-4 w-4' />
                                            }
                                            <span>{curr.title}</span>
                                        </li>

                                    })
                                }
                            </ul>
                        </CardContent>
                    </Card>

                </main>

                <aside className='w-full md:w-[500px]'>
                    <Card className={"sticky top-4"}>
                        <CardContent className={"p-6"}>
                            <div className='aspect-video mb-4 rounded-lg flex items-center justify-between'>
                                <VideoPlayer url={freePreviewVideoUrl} />
                            </div>
                            <div className='mb-4'>
                                <span className='text-3xl font-bold'>
                                    $ {couresDetail?.pricing}
                                </span>
                            </div>
                            <Button onClick={() => handleOnCourseCreate(couresDetail?.instructorId, couresDetail?.instructorName, couresDetail?.image, couresDetail?.title, couresDetail?._id, couresDetail?.pricing)} className={"w-full"}>Buy Now</Button>
                        </CardContent>

                    </Card>
                </aside>

            </div>
        </div>
    )
}

export default StudentCourseDetailsPage