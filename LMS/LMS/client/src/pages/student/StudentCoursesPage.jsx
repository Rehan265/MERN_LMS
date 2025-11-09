import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { filterOptions, sortOptions } from '@/config'
import React, { useContext, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { StudentState } from '@/context/student-context/StudentContext'
import {  useSearchParams } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthState } from '@/context/auth-context/Auth-Context'



const createSearchParamHelpers = (filterParams) => {
    const queryParam = [];


    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",");
            queryParam.push(`${key}=${encodeURIComponent(paramValue)}`);

        }
    }
    return queryParam.join("&")
}


function StudentCoursesPage() {
    const { isLoading, couresList, getAllStudentCourses, handleOnCourseNavigate } = useContext(StudentState)
    const { auth } = useContext(AuthState)
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('price-lowtohigh');
    const [serachParams, setSearchParams] = useSearchParams();

    // {
    //     category:["cyber security" , "Game"],
    //     level:["inter" , "advance"],
    //     language:[]
    // }
    const handleOnFilterChange = (getSectionId, getCurrentOption) => {
        let cpyFilter = { ...filters }

        // console.log(cpyFilter);
        // console.log(getSectionId);
        // console.log(getCurrentOption);
        const indexOfCurrentSectionId = Object.keys(cpyFilter).indexOf(getSectionId);
        if (indexOfCurrentSectionId === -1) {
            cpyFilter = {
                ...cpyFilter,
                [getSectionId]: [getCurrentOption]
            }
        } else {
            const indexOfCurrentOption = cpyFilter[getSectionId].indexOf(getCurrentOption)
            if (indexOfCurrentOption === -1) {
                cpyFilter[getSectionId].push(getCurrentOption)
            } else {
                cpyFilter[getSectionId].splice(indexOfCurrentOption, 1)
            }

        }

        sessionStorage.setItem("filters", JSON.stringify(cpyFilter))
        setFilters({ ...cpyFilter })
    }

    useEffect(() => {
        const searchValue = createSearchParamHelpers(filters)
        setSearchParams(new URLSearchParams(searchValue))
    }, [filters])

    useEffect(() => {
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
    }, [])

    useEffect(() => {
        getAllStudentCourses(filters, sort);
    }, [])

    useEffect(() => {
        if (filters != null && sort != null) {
            getAllStudentCourses(filters, sort);
        }
    }, [filters, sort])
    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-3'>All Courses</h1>
            <div className='flex flex-col md:flex-row gap-4'>

                <aside className='w-full md:w-64 space-y-4'>
                    <div>
                        {
                            Object.keys(filterOptions).map((filterOption) => {
                                return <div key={filterOption} className='p-4 border-b'>
                                    <h3 className='font-bold mb-3'>{filterOption.toUpperCase()}</h3>
                                    <div className='grid gap-2 mt-2'>
                                        {
                                            filterOptions[filterOption].map((option) => {
                                                return <Label key={option.id}>
                                                    <Checkbox
                                                        checked={filters && Object.keys(filters).length > 0 && filters[filterOption] && filters[filterOption].indexOf(option.id) > -1}
                                                        onCheckedChange={() => handleOnFilterChange(filterOption, option.id)} />
                                                    {option.label}
                                                </Label>
                                            })
                                        }
                                    </div>

                                </div>
                            })
                        }

                    </div>
                </aside>

                <main className='flex-1'>
                    <div className='flex justify-end items-center mb-4 gap-5'>
                        <DropdownMenu >
                            <DropdownMenuTrigger>
                                <Button className={"flex items-center gap-2 p-5"}>
                                    <ArrowUpDownIcon className='h-4 w-4' />
                                    <span className='text-[16px] font-medium'>Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className={"w-[180px]"}>

                                <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>

                                    {
                                        sortOptions.map((item) => {
                                            return <DropdownMenuRadioItem key={item.id} value={item.id}>{item.label}</DropdownMenuRadioItem>
                                        })
                                    }
                                </DropdownMenuRadioGroup>


                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className='text-sm text-black font-bold'>
                            {couresList.length} Results
                        </span>
                    </div>
                    <div>
                        {
                            isLoading ? <div>
                                {
                                    [0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                                        return <Card key={index} className="cursor-pointer">
                                            <CardContent className="flex gap-4 p-4">
                                                {/* Image Placeholder */}
                                                <div className="w-48 h-32 flex-shrink-0">
                                                    <Skeleton className="w-full h-full rounded-md" />
                                                </div>

                                                {/* Text Content Placeholder */}
                                                <div className="flex-1 space-y-3">
                                                    <Skeleton className="h-6 w-3/4" /> {/* Title */}
                                                    <Skeleton className="h-4 w-1/2" /> {/* Instructor */}
                                                    <Skeleton className="h-4 w-1/3" /> {/* Lecture Count */}
                                                    <Skeleton className="h-5 w-24" /> {/* Price */}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    })
                                }
                            </div> : <div className='space-y-4'>
                                {
                                    couresList && couresList.length ? <div>
                                        {
                                            couresList.map((course) => {
                                                return <Card onClick={() => handleOnCourseNavigate(course._id, auth.user._id)} key={course._id} className={'cursor-pointer'}>
                                                    <CardContent className={"flex gap-4 p-4"}>
                                                        <div className='w-48 h-32 flex-shrink-0'>
                                                            <img src={course.image} className='w-full h-full object-cover' />
                                                        </div>
                                                        <div className='flex-1'>
                                                            <CardTitle className={"text-xl mb-2"}>
                                                                {course.title}
                                                            </CardTitle>
                                                            <p className='text-sm text-gray-600 mb-1'>
                                                                {course.instructorName}
                                                                Created By Muhammad Umer
                                                            </p>
                                                            <p className='text-[16px] text-gray-600 mb-1'>
                                                                {course.curriculum.length}{" "}{course.curriculum.length > 1 ? "Lectures" : "Lecture"}

                                                            </p>
                                                            <p className='text-lg font-bold'>
                                                                $ {course.pricing}
                                                            </p>

                                                        </div>
                                                    </CardContent>

                                                </Card>
                                            })
                                        }
                                    </div> : <h2 className='font-extrabold text-4xl'>No Courses Found</h2>
                                }
                            </div>
                        }
                    </div>
                </main>

            </div>

        </div>
    )
}

export default StudentCoursesPage