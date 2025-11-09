import React, { useContext, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Switch } from "@/components/ui/switch"
import { Label } from '../ui/label'
import { InstructorState } from '@/context/instructor-context/InstructorContext'
import VideoPlayer from './VideoPlayer'
import { Progress } from "@/components/ui/progress"


function CourseCurriculum() {
  const { courceCurriculumFormData, addNewLecture, isMediaUploading, handleOnCourseTitleChange, handleOnCourseFreePreviewChange, handleOnVideoUpload, isCourseCurriculumFormDataValid, handleOnReplaceVideo, handleOnBulkVideoUpload, isVideoUploading, isVideoUploadingPercentage, handleOnDeleteLecture } = useContext(InstructorState);

  const inputRef = useRef(null);

  return (
    <Card>
      <CardHeader className={"flex flex-row justify-between"}>
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input onChange={(event) => handleOnBulkVideoUpload(event)} ref={inputRef} type={"file"} accept="video/*" multiple className={"hidden"} />
          <Button onClick={() => inputRef.current?.click()}>Bulk Upload</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button disabled={!isCourseCurriculumFormDataValid()} onClick={addNewLecture}>Add Lecture</Button>
        {
          isVideoUploading && <div>
            <Progress value={isVideoUploadingPercentage} className={"w-full bg-gray-200 rounded-full h-3 relative my-5 overflow-hidden"} />
          </div>
        }
        <div className='mt-4 space-y-4'>
          {
            courceCurriculumFormData.map((item, index) => {
              return <div className='border p-5 rounded-md'>
                <div className='flex gap-5 items-center'>
                  <h3 className='font-semibold'>Lecture {index + 1}</h3>
                  <Input placeholder="Enter Lecture Title" className={"max-w-96"} value={item.title} onChange={(event) => handleOnCourseTitleChange(event, index)} />
                  <div className='flex items-center space-x-2'>
                    <Switch checked={item.freePreview} value={item.freePreview} onCheckedChange={(value) => handleOnCourseFreePreviewChange(value, index)} />
                    <Label>Free Preview</Label>

                  </div>
                </div>
                <div className='mt-6'>
                  {
                    item?.videoUrl ? <div className='flex gap-3'>

                      <VideoPlayer url={item?.videoUrl} />
                      <Button onClick={() => handleOnReplaceVideo(item.public_id, index)}>Replace Video</Button>
                      <Button onClick={() => handleOnDeleteLecture(index)} className={"bg-red-900"}>Delete Lecture</Button>
                    </div> : <Input onChange={(event) => handleOnVideoUpload(event, index)} type={"file"} accept="video/*" className={"mb-4"} />

                  }
                </div>
              </div>
            })
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCurriculum