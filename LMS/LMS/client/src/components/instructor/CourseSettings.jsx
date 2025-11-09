import { Label } from '@radix-ui/react-label'
import React, { useContext } from 'react'
import { Input } from '../ui/input'
import { InstructorState } from '@/context/instructor-context/InstructorContext'

function CourseSettings() {
  const { landingFormData, handleOnImageUpload } = useContext(InstructorState)
  return (

    <div>
      {
        landingFormData.image ? <img src={landingFormData.image} /> : <div className='flex flex-col gap-3'><Label className={"mb-2"}>Course Image</Label>
          <Input type={"file"} onChange={(event) => handleOnImageUpload(event)} placeholder="Enter Course Password" />
        </div>
      }
    </div>
  )

}

export default CourseSettings