import StudentHeader from '@/components/student/StudentHeader'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function StudentLayout() {

    const location = useLocation();

    return (
        <div>
            {
                !location.pathname.includes("student-course-progress") && <StudentHeader />
            }
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default StudentLayout