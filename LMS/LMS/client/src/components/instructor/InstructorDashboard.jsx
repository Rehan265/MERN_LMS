import React, { useContext, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Book, DollarSign, Users } from 'lucide-react'
import { InstructorState } from '@/context/instructor-context/InstructorContext'
import { AuthState } from '@/context/auth-context/Auth-Context'


function InstructorDashboard() {
    const { couresList, getAllCourses } = useContext(InstructorState)
    const { auth } = useContext(AuthState)

    useEffect(() => {
        getAllCourses(auth.user._id)
    }, [])


    const calculateTotalStudentsAndProfit = () => {
        const { totalStudents, totalProfit, studentList } = couresList.reduce(
            (acc, course) => {

                const studentCount = course.students.length;
                acc.totalStudents += studentCount
                acc.totalProfit += course.pricing * studentCount

                course.students.forEach((student) => {
                    acc.studentList.push(
                        {
                            courseTitle: course.title,
                            studentName: student.studentName,
                            studentEmail: student.studentEmail,
                        }
                    )
                })
                return acc;
            },
            {
                totalStudents: 0,
                totalProfit: 0,
                studentList: []
            }
        )

        return {
            totalStudents, totalProfit, studentList
        }

    }

    const config = [
        {
            icon: Users,
            label: "Total Students",
            value: calculateTotalStudentsAndProfit().totalStudents
        },
        {
            icon: DollarSign,
            label: "Total Revenue",
            value: calculateTotalStudentsAndProfit().totalProfit
        },
    ]

    useEffect(() => {
        console.log(calculateTotalStudentsAndProfit());
    }, [couresList])



    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {
                    config.map((item, index) => {
                        return <Card key={index}>
                            <CardHeader className={"flex flex-row items-center justify-between space-y-0 pb-2"}>
                                <CardTitle className={"text-sm font-medium"}>{item.label}</CardTitle>
                                <item.icon className='h-4 w-4 text-muted-foreground' />
                            </CardHeader>
                            <CardContent>
                                <p className='text-2xl font-bold'>{item.value}</p>
                            </CardContent>
                        </Card>
                    })
                }



            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Students List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='overflow-x-auto'>
                        <Table className={"w-full"}>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Name</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Student Email</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    calculateTotalStudentsAndProfit().studentList.map((student, index) => {
                                        return <TableRow key={index}>
                                            <TableCell>{student.courseTitle}</TableCell>
                                            <TableCell>{student.studentName}</TableCell>
                                            <TableCell>{student.studentEmail}</TableCell>
                                        </TableRow>
                                    })
                                }

                            </TableBody>
                        </Table>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default InstructorDashboard