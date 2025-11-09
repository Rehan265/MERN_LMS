import { GraduationCap, TvMinimalPlay } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '../ui/label'
import { AuthState } from '@/context/auth-context/Auth-Context'

function StudentHeader() {
    const navigate = useNavigate();
    const [showSignoutConfirmationDialog, setShowSignoutConfirmationDialog] = useState(false);

    const { handleOnLogout } = useContext(AuthState);

    return (
        <>

            <header className='flex items-center justify-between p-4 border-b relative'>
                <div className='flex items-center space-x-4'>
                    <Link to={"/student"} className='flex items-center hover:text-black'>
                        <GraduationCap className='h-8 w-8 mr-4' />
                        <span className='font-extrabold md:text-xl text-[14px]'>LMS WIN</span>
                    </Link>

                    <div className='flex items-center space-x-1'>
                        <Button onClick={() => navigate("/student/courses")}>
                            Explore Courses
                        </Button>
                    </div>

                </div>

                <div className='flex items-center space-x-4'>
                    <div className='flex gap-4 items-center'>
                        <div className='flex items-center cursor-pointer gap-3' onClick={() => navigate("/student/student-course")}>
                            <span className='font-bold md:text-xl text-[14px]'>My Courses</span>
                            <TvMinimalPlay />
                        </div>
                        <Button onClick={() => setShowSignoutConfirmationDialog(true)}>Sign out</Button>

                    </div>
                </div>
            </header>

            <Dialog open={showSignoutConfirmationDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            <div className='flex flex-col gap-3'>
                                <Label>This action will signout you from the LMS.</Label>
                                <div className='flex gap-3'>
                                    <Button onClick={() => setShowSignoutConfirmationDialog(false)}>Cancel</Button>
                                    <Button onClick={handleOnLogout}>Signout</Button>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default StudentHeader