"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X } from "lucide-react"
import useLocalStorage from "@/helpers/useLocalStorage.js"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const subjects = [
    "Mathematics",
    "Science",
    "History",
    "Literature",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
    "Foreign Languages",
    "Other"
]

export default function CreateCourseForm() {
    const [courseName, setCourseName] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    const [courseImage, setCourseImage] = useState(null)
    const [coursePrice, setCoursePrice] = useState("")
    const [courseSubject, setCourseSubject] = useState("")
    const [videos, setVideos] = useState([])

    const [vloading, setvloading] = useState(false)
    const [loading, setloading] = useState(false)
    const [isFree, setIsFree] = useState(false);
    const [data, setData] = useLocalStorage('e-learning-user', '');

    const handleAddVideo = () => {
        setVideos([...videos, { title: "", description: "", thumbnail: null, videoFile: null }])
    }

    const handleRemoveVideo = (index) => {
        const newVideos = [...videos]
        newVideos.splice(index, 1)
        setVideos(newVideos)
    }

    const handleVideoChange = (index, field, value) => {
        const newVideos = [...videos]
        if (field === "thumbnail" || field === "videoFile") {
            newVideos[index][field] = value
        } else {
            newVideos[index][field] = value
        }
        setVideos(newVideos)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
            <div>
                <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="courseName">Course Name</Label>
                        <Input
                            id="courseName"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="courseDescription">Course Description</Label>
                        <Textarea
                            id="courseDescription"
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="courseImage">Course Image</Label>
                        <Input
                            id="courseImage"
                            type="file"
                            onChange={(e) => setCourseImage(e.target.files?.[0] || null)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="coursePrice">Course Price</Label>
                        <Input
                            id="coursePrice"
                            type="number"
                            value={coursePrice}
                            onChange={(e) => setCoursePrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="courseSubject">Course Subject</Label>
                        <Select onValueChange={setCourseSubject} required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                        {subject}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Course Videos</h2>
                {videos.map((video, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">Video {index + 1}</h3>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveVideo(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <Label htmlFor={`videoTitle-${index}`}>Title</Label>
                                <Input
                                    id={`videoTitle-${index}`}
                                    value={video.title}
                                    onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor={`videoDescription-${index}`}>Description</Label>
                                <Textarea
                                    id={`videoDescription-${index}`}
                                    value={video.description}
                                    onChange={(e) => handleVideoChange(index, "description", e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor={`videoThumbnail-${index}`}>Thumbnail</Label>
                                <Input
                                    id={`videoThumbnail-${index}`}
                                    type="file"
                                    onChange={(e) => handleVideoChange(index, "thumbnail", e.target.files?.[0] || null)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor={`videoFile-${index}`}>Video File</Label>
                                <Input
                                    id={`videoFile-${index}`}
                                    type="file"
                                    onChange={(e) => handleVideoChange(index, "videoFile", e.target.files?.[0] || null)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <Button type="button" onClick={handleAddVideo} variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Video
                </Button>
            </div>

            <Button type="submit" className="w-full">Create Course</Button>
        </form>
    )
}
