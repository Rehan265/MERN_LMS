import { Button } from '@/components/ui/button'
import React, { useContext, useEffect } from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseCurriculum from '@/components/instructor/CourseCurriculum'
import CourseLanding from '@/components/instructor/CourseLanding'
import CourseSettings from '@/components/instructor/CourseSettings'
import { InstructorState } from '@/context/instructor-context/InstructorContext'
import { AuthState } from '@/context/auth-context/Auth-Context'
import { useParams } from 'react-router-dom'

function UpdateNewCourse() {

    const { auth } = useContext(AuthState)
    const { handleOnAddCourse, getCourseById } = useContext(InstructorState)

    const { id } = useParams()

    useEffect(() => {
        getCourseById(id)
    }, [id])

    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-extrabold mb-5'>Update course</h1>
                <Button onClick={() => handleOnAddCourse(auth.user._id, auth.user.userName)}>SUBMIT</Button>
            </div>
            <Card>
                <CardContent>
                    <div className='container mx-auto p-4'>
                        <Tabs defaultValue="curriculum" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                                <TabsTrigger value="courseLandingPage">Course Landing Page</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="curriculum">
                                <CourseCurriculum />
                            </TabsContent>
                            <TabsContent value="courseLandingPage">
                                <CourseLanding />
                            </TabsContent>
                            <TabsContent value="settings">
                                <CourseSettings />
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>

            </Card>

        </div>
    )
}

export default UpdateNewCourse