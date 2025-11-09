import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
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

function CreateNewCourse() {

    const { auth } = useContext(AuthState)
    const { handleOnSubmit, mode } = useContext(InstructorState)

    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-extrabold mb-5'>{mode == "create" ? "Create a new course" : "Update Course"}</h1>
                <Button onClick={() => handleOnSubmit(auth.user._id, auth.user.userName)}>{mode == "create" ? "Create" : "Update"}</Button>
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

export default CreateNewCourse