import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Delete, Edit } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { InstructorState } from '@/context/instructor-context/InstructorContext'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config'
import { Label } from '../ui/label'



function InstructorCourses() {

    const navigate = useNavigate();

    const { couresList, setCourceCurriculumFormData, setLandingFormData, handleCourseDelete ,handleOnOpenUpdateForm} = useContext(InstructorState)

    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false)
    const [currentDeleteId, setCurrentDeleteId] = useState(null)


    const handleOnOpenDeleteDialog = (courseId) => {
        setShowDeleteConfirmationDialog(true)
        setCurrentDeleteId(courseId)

    }
    const handleCourseDeleteCancel = () => {
        setShowDeleteConfirmationDialog(false)
        setCurrentDeleteId(null)
    }

    const handleOnCourseDelete = async () => {
        await handleCourseDelete(currentDeleteId)
        handleCourseDeleteCancel()
    }

    return (
        <>
            <Card>
                <CardHeader className={"flex justify-between flex-row items-center"}>
                    <CardTitle>All Courses</CardTitle>
                    <Button onClick={() => {
                        setCourceCurriculumFormData([courseCurriculumInitialFormData])
                        setLandingFormData(courseLandingInitialFormData)
                        navigate("/instructor/create-new-course")
                    }}>
                        Create New Courses
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Revenue</TableHead>
                                    <TableHead className={"text-right"}>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    couresList && couresList.length && couresList.map((item) => {
                                        return <TableRow key={item._id}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.students.length}</TableCell>
                                            <TableCell>{item.students.length * item.pricing}</TableCell>
                                            <TableCell className={"text-right"}>
                                                <Button onClick={() => handleOnOpenUpdateForm(item)} variant={"ghost"} size={"sm"}><Edit className='h-6 w-6' /></Button>
                                                <Button onClick={() => handleOnOpenDeleteDialog(item._id)} variant={"ghost"} size={"sm"}><Delete className='h-6 w-6' /></Button>
                                            </TableCell>
                                        </TableRow>
                                    })
                                }


                            </TableBody>
                        </Table>
                    </div>
                </CardContent>

            </Card>


            <Dialog open={showDeleteConfirmationDialog}>
                <DialogContent showOverlay={false} className={"sm:w-[425px]"}>
                    <DialogHeader>
                        <DialogTitle>Are You Sure?</DialogTitle>
                        <DialogDescription>
                            <div className='flex flex-col gap-3 '>
                                <Label>You want to delete this course</Label>
                                <div className='flex flex-row gap-3 '>
                                    <Button className={"cursor-pointer"} onClick={handleCourseDeleteCancel}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleOnCourseDelete} className={"cursor-pointer"} variant={"destructive"}>
                                        Delete
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

export default InstructorCourses