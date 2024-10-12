// pages/add-course.js
'use client'

import { useState } from "react";
import { useToast } from "@/hooks/use-toast"

import { uploadFileAndGetUrl } from '@/helpers/firebaseUtils';
import axios from 'axios';
import { useRouter } from "next/navigation";
import useLocalStorage from "@/helpers/useLocalStorage.js";

import { Input } from "@/components/ui/input";



import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


export default function AddCourse() {
  const { toast } = useToast()
  const router = useRouter();
  const [coursetitle, setcourseTitle] = useState("");
  const [Cprice, setCPrice] = useState("");
  const [Cthumbnail, setCThumbnail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [Loading, setLoading] = useState(false);

  //for video


  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [subject, setSubject] = useState('');
  const [videoTopic, setVideoTopic] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [vloading, setvloading] = useState(false)
  const [loading, setloading] = useState(false)
  const [isFree, setIsFree] = useState(false);
  const [data, setData] = useLocalStorage('e-learning-user', '');

  const handleThumbnailChange = (e) => {

    setThumbnail(e.target.files[0]);

  };

  const handleAddVideo = () => {
    setVideos(prev => [...prev, { thumbnail: null, videoFile: null, topic: '', description: '' }])
  }

  const handleVideoFileChange = (e) => {

    setVideoFile(e.target.files[0]);

  }
  const videoUpload = async (e) => {
    e.preventDefault();
    if (!videoTopic || !videoDescription) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }
    try {
      setvloading(true)
      if (!thumbnail || !videoFile) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        setvloading(false)
        return;
      }
      const thumbnailurl = await uploadFileAndGetUrl(thumbnail);
      const videoFileurl = await uploadFileAndGetUrl(videoFile);

      const response = await axios.post("/api/videos/uploadvideo", { title: videoTopic, description: videoDescription, instructor: data._id, thambnail: thumbnailurl, videourl: videoFileurl, isFree: false });


      setVideos((e) => [...e, response.data.video._id])
      if (response) {
        setvloading(false)
        setVideoTopic('')
        setVideoDescription('')
        setVideoFile(null)
        setThumbnail(null)
        //router.push("/instructor/course")
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",

      })
    }
    finally {
      setvloading(false)
    }
  }

  // Save course data to MongoDB
  const handleSubmit = async (e) => {
    setloading(true)
    e.preventDefault();
    try {
      if (!Cthumbnail) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        setLoading(false)
        return;
      }
      setLoading(true)
      const thumbnailurl = await uploadFileAndGetUrl(Cthumbnail);

      const response = await axios.post("/api/course/addcourse", { title: coursetitle, price: Cprice, instructor: data._id, subject: subject, thambnail: thumbnailurl, videos: videos });

      if (response) {
        setloading(false)

        router.push("/course")
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",

      })
    }

  };


  return (

    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" name="title" value={coursetitle} onChange={(e) => setcourseTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" value={Cprice} onChange={(e) => setCPrice(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <select id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required >
              <option value="">Select Subject</option>
              <option value="Javascript">Javascript</option>
              <option value="React">React</option>
              <option value="Node">Node</option>
              <option value="MongoDB">MongoDB</option>
              <option value="GK">GK</option>
              <option value="ML">Machine Learning</option>
              <option value="ebusiness">E-business</option>
              {/* Add more subject options as needed */}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Course Thumbnail</Label>
            <Input id="thumbnail" name="thumbnail" type="file" onChange={(e) => setCThumbnail(e.target.files[0])} accept="image/*" required />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Videos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Video </CardTitle>
              {/* <Button variant="ghost" size="sm" onClick={() => handleRemoveVideo(index)}><X className="h-4 w-4" /></Button> */}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`video-thumbnail-`}>Video Thumbnail</Label>
                  <Input
                    id={`video-thumbnail-`}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`video-file-`}>Video File</Label>
                  <Input
                    id={`video-file-`}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`video-topic-`}>Video Topic</Label>
                <Input
                  id={`video-topic-`}
                  value={videoTopic}
                  onChange={(e) => setVideoTopic(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`video-description`}>Video Description</Label>
                <Textarea
                  id={`video-description-`}
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Button type="button" variant="outline" onClick={videoUpload} className="w-full">
            {vloading ? "LOADING...." : "Add video"}
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" onClick={handleSubmit}>
        <Upload className="mr-2 h-4 w-4" /> Publish Course
      </Button>
    </form>

  );
};


