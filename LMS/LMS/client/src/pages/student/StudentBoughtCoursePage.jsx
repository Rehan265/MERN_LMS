import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthState } from '@/context/auth-context/Auth-Context'
import { StudentState } from '@/context/student-context/StudentContext'
import { Watch } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function StudentBoughtCoursePage() {

    const navigate = useNavigate();


    const { fetchStudentBoughtCourses, studentBoughtCoursesList, isLoading } = useContext(StudentState);
    const { auth } = useContext(AuthState);

    useEffect(() => {
        fetchStudentBoughtCourses(auth.user._id);
    }, [])

    return (
        <div className='p-4'>
            <h1 className='text-3xl font-bold mb-8'>My Courses</h1>
            {
                isLoading ? <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                    {
                        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                            return <Card className="flex flex-col">
                                <CardContent className="p-4 flex-grow">
                                    {/* Image placeholder */}
                                    <Skeleton className="h-52 w-full rounded-md mb-4" />

                                    {/* Title placeholder */}
                                    <Skeleton className="h-5 w-3/4 mb-2" />

                                    {/* Instructor placeholder */}
                                    <Skeleton className="h-4 w-1/2" />
                                </CardContent>

                                <CardFooter>
                                    {/* Button placeholder */}
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </CardFooter>
                            </Card>
                        })

                    }

                </div> : <div>
                    {
                        studentBoughtCoursesList && studentBoughtCoursesList.length ? <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {
                                studentBoughtCoursesList.map((course) => {
                                    return <Card className={"flex flex-col"} key={course._id}>
                                        <CardContent className={"p-4 flex-grow"}>
                                            <img className='h-52 w-full object-cover rounded-md mb-4' src={course.image} alt={course.title} />
                                            <h3 className='font-bold text-gray-700 mb-2'>{course.title}</h3>
                                            <p className='text-sm text-gray-700 mb-2'>
                                                {course.instructorName}
                                            </p>
                                        </CardContent>
                                        <CardFooter className={"flex-1"}>
                                            <Button onClick={() => navigate(`/student/student-course-progress/${course?._id}`)}>
                                                <Watch className='mr-2 h-4 w-4' />
                                                Start Watching
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                })
                            }
                        </div> : <div>
                            <h1>No Courses Bought</h1>
                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default StudentBoughtCoursePage