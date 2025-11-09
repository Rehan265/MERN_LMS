import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { BarChart, Book, LogOut } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InstructorDashboard from '@/components/instructor/InstructorDashboard';
import InstructorCourses from '@/components/instructor/InstructorCourses';
import InstructorLogout from '@/components/instructor/InstructorLogout';
import { InstructorState } from '@/context/instructor-context/InstructorContext';


function InstructorDashboardPage() {

    const { getAllCourses } = useContext(InstructorState)

    const [activeTab, setActiveTab] = useState("dashboard");

    const menuItems = [
        {
            icon: BarChart,
            label: "Dashboard",
            value: "dashboard",
            component: <InstructorDashboard />
        },
        {
            icon: Book,
            label: "Courses",
            value: "courses",
            component: <InstructorCourses />
        },
        {
            icon: LogOut,
            label: "Logout",
            value: "logout",
            component: <InstructorLogout />
        },
    ];

    useEffect(() => {
        const isNavigatingFromCreateCourse = JSON.parse(sessionStorage.getItem("isNavigatingFromCreateCourse")) || false

        if (isNavigatingFromCreateCourse) {
            setActiveTab("courses")
            sessionStorage.removeItem("isNavigatingFromCreateCourse")
        }
    }, [])


    return (
        <div className='flex h-full min-h-screen bg-gray-100'>
            <aside className='w-64 bg-white shadow-md hidden md:block'>
                <div className='p-4'>
                    <h2 className='text-2xl font-bold mb-4'>Instructor View</h2>
                    <nav>
                        {
                            menuItems.map((item) => {
                                return <Button key={item.value} onClick={() => setActiveTab(item.value)} className={"w-full justify-start mb-2"}>
                                    <item.icon className='mr-2 h-4 w-4' />
                                    {item.label}
                                </Button>
                            })
                        }
                    </nav>
                </div>

            </aside>
            <main className='flex-1 p-8 overflow-y-auto'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-3xl font-bold mb-8'>Dashboard</h1>
                    <Tabs value={activeTab} defaultValue={activeTab} onValueChange={setActiveTab} className="">
                        {
                            menuItems.map((item) => {
                                return <TabsContent value={item.value}>
                                    {item.component}
                                </TabsContent>
                            })
                        }
                    </Tabs>
                </div>

            </main>
        </div>
    )
}

export default InstructorDashboardPage