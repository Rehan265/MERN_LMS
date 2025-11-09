import React, { useContext } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { InstructorState } from '@/context/instructor-context/InstructorContext'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { courseCategories, courseLevelOptions, languageOptions } from '@/config'


function CourseLanding() {

    const { landingFormData, setLandingFormData, isLoading } = useContext(InstructorState)

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLandingFormData({ ...landingFormData, [name]: value })
    }



    return (<Card>
        <CardHeader>
            <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
            <form className='flex flex-col gap-4 w-full' >
                <div>
                    <Label className={"mb-2"}>Course Title</Label>
                    <Input value={landingFormData.title} onChange={(e) => handleOnChange(e)} name="title" placeholder="Enter Course Title" />
                </div>
                <div>
                    <Label className={"mb-2"}>Course Category</Label>
                    <Select className="w-full" value={landingFormData.category} onValueChange={(e) => setLandingFormData({ ...landingFormData, category: e })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Course Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                courseCategories.map((category) => {
                                    return <SelectItem value={category.id}>{category.label}</SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>

                </div>
                <div>
                    <Label className={"mb-2"}>Course Level</Label>
                    <Select className="w-full" value={landingFormData.level} onValueChange={(e) => setLandingFormData({ ...landingFormData, level: e })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Course Level" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                courseLevelOptions.map((level) => {
                                    return <SelectItem value={level.id}>{level.label}</SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>

                </div>
                <div>
                    <Label className={"mb-2"}>Course Language</Label>
                    <Select className="w-full" value={landingFormData.primaryLanguage} onValueChange={(e) => setLandingFormData({ ...landingFormData, primaryLanguage: e })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Course Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                languageOptions.map((language) => {
                                    return <SelectItem value={language.id}>{language.label}</SelectItem>
                                })
                            }
                        </SelectContent>
                    </Select>

                </div>
                <div>
                    <Label className={"mb-2"}>Course SubTitle</Label>
                    <Input value={landingFormData.subtitle} onChange={(e) => handleOnChange(e)} name="subtitle" placeholder="Enter Course SubTitle" />
                </div>
                <div>
                    <Label className={"mb-2"}>Course Description</Label>
                    <Input value={landingFormData.description} onChange={(e) => handleOnChange(e)} name="description" placeholder="Enter Course Description" />
                </div>
                <div>
                    <Label className={"mb-2"}>Course price</Label>
                    <Input value={landingFormData.pricing} onChange={(e) => handleOnChange(e)} name="pricing" placeholder="Enter Course Price" />
                </div>
                <div>
                    <Label className={"mb-2"}>Course Objectives</Label>
                    <Input value={landingFormData.objectives} onChange={(e) => handleOnChange(e)} name="objectives" placeholder="Enter Course Objectives" />
                </div>
                <div>
                    <Label className={"mb-2"}>Course Welcome Message</Label>
                    <Input value={landingFormData.welcomeMessage} onChange={(e) => handleOnChange(e)} name="welcomeMessage" placeholder="Enter Course Welcome Message" />
                </div>
            </form>
        </CardContent>
    </Card>

    )
}

export default CourseLanding