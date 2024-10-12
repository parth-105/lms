"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Pencil, Trash2, Upload } from "lucide-react"
import axios from "axios"
import { uploadFileAndGetUrl } from "@/helpers/firebaseUtils"
import useLocalStorage from "@/helpers/useLocalStorage.js"
import { useToast } from "@/hooks/use-toast"



export default function CourseEditorModalTabs({ course }) {

  const { toast } = useToast()

  const [initialVideos, setinitialVideos] = useState([])

  const [isOpen, setIsOpen] = useState(false)
  const [courseDetails, setCourseDetails] = useState({
    title: course?.title,
    price: course?.price,
    subject: course?.subject,
    thambnail: course?.thambnail,
  })

  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoDetails, setVideoDetails] = useState({
    id: selectedVideo?._id,
    title: selectedVideo?.title,
    description: selectedVideo?.description,
    thambnail: selectedVideo?.thambnail,
    videourl: selectedVideo?.videourl,
  })
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, videoId: null })

  const [videoFile, setVideoFile] = useState(selectedVideo?.videourl);
  const [thumbnail, setThumbnail] = useState(selectedVideo?.thambnail);
  const [cthumbnail, setcThumbnail] = useState(null);

  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false)
  const [newVideo, setNewVideo] = useState({ title: '', description: '', thumbnailUrl: '', videoUrl: '' })



  const [nvideoFile, setnVideoFile] = useState(null);
  const [nthumbnail, setnThumbnail] = useState(null);
  const [videoTopic, setVideoTopic] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [vloading, setvloading] = useState(false)
  const [turl, setturl] = useState();
  const [vurl, setvurl] = useState();
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [loading, setloading] = useState(false)


  const handleCourseChange = async (e) => {
    const { name, value, files } = e.target

    if (files) {
     

      const cthumbnailFileurl = await uploadFileAndGetUrl(e.target.files[0]);
      
      setCourseDetails({ ...courseDetails, thambnail: cthumbnailFileurl });
    }

  }

  const handlecThumbnailChange = async (e) => {
    if (e.target.files[0]) {
 
      setcThumbnail(e.target.files[0]);
      const cthumbnailFileurl = await uploadFileAndGetUrl(e.target.files[0]);
     
      setVideoDetails({ ...courseDetails, thambnail: cthumbnailFileurl });
    }
  };

  const handlecvThumbnailChange = async (e) => {
    if (e.target.files[0]) {
    
      const cvthumbnailFileurl = await uploadFileAndGetUrl(e.target.files[0]);
     
      setVideoDetails({ ...courseDetails, videourl: cvthumbnailFileurl });
    }
  };






  const handleEditVideo = (video) => {

    setSelectedVideo(video)
    setVideoDetails({
      id: video._id,
      title: video.title,
      description: video.description,
      thambnail: video.thambnail,
      videourl: video.videourl,
    })
  }

  const handleDeleteClick = (videoId) => {
    setDeleteConfirmation({ isOpen: true, videoId })
  }

  const handleDeleteConfirm = async () => {
  
    const cres = await axios.post("/api/course/deletecoursevideo", { id: deleteConfirmation.videoId });
    setVideos(videos.filter(v => v._id !== deleteConfirmation.videoId))
    setDeleteConfirmation({ isOpen: false, videoId: null })
  }

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, videoId: null })
    // No need to do anything else, as we're already on the video list
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setloading(true)
      const thumbnailurl = await uploadFileAndGetUrl(thumbnail);
      const videoFileurl = await uploadFileAndGetUrl(videoFile);
      //  const cthumbnailFileurl = await uploadFileAndGetUrl(cthumbnail);

      
      const cres = await axios.post("/api/course/editcousrse", { id: course._id, courseDetails });

 
      const vres = await axios.post("/api/course/editcoursevideo", { id: selectedVideo?._id, videoDetails });

     
      if (selectedVideo) {
      
      
        setVideos(videos.map(v => v._id === selectedVideo._id ? { ...v, ...videoDetails } : v))
        setSelectedVideo(null)
      }
      setIsOpen(false) // Close the modal after submission
    }
    catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
       
      })
      setloading(false)
    } finally {
      setloading(false)
    }
  }


  const handleThumbnailChange = (e) => {
    setnThumbnail(e.target.files[0]);

  };

  const handleVideoFileChange = (e) => {
    setnVideoFile(e.target.files[0]);

  }


  const videoUpload = async (e) => {
    e.preventDefault();
    if (!videoTopic || !videoDescription) {
      toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
      });
      alert('Validation Error:Please fill in all required fields.')
      return;
  }
    try {
    
      setvloading(true)
      const thumbnailurl = await uploadFileAndGetUrl(nthumbnail);
      const videoFileurl = await uploadFileAndGetUrl(nvideoFile);
      if (!thumbnailurl || !videoFileurl) {
        toast({
            title: "Validation Error",
            description: "Please fill in all required fields.",
        });
        alert('Validation Error:Please fill in all required fields.')
        return;
    }
      setturl(thumbnailurl);
      setvurl(videoFileurl);
      const response = await axios.post("/api/course/addvideoexistingcourse", { title: videoTopic, description: videoDescription, instructor: data._id, thambnail: thumbnailurl, videourl: videoFileurl, isFree: false, courseid: course._id });
   

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
  }



  useEffect(() => {

    const fetchVideos = async () => {

      const response = await axios.post("/api/course/coursevideo", { courseId: course?._id });

    
      setinitialVideos(response.data.videos);
      setVideos(response.data.videos)
    };
    fetchVideos();
  }, [])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full" ><Pencil className="h-4 w-4" /></Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="course" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="course">Course Details</TabsTrigger>
              <TabsTrigger value="video">Video Details</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit} className="space-y-8 mt-4">
              <TabsContent value="course">
                <Card>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input
                        id="courseName"
                        name="title"
                        value={courseDetails.title}
                        onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coursePrice">Price</Label>
                      <Input
                        id="coursePrice"
                        name="price"
                        type="number"
                        value={courseDetails.price}
                        onChange={(e) => setCourseDetails({ ...courseDetails, price: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="courseSubject">Subject</Label>
                      <Select name="subject" onValueChange={(value) => handleCourseChange({ target: { name: "subject", value } })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="literature">Literature</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="courseThumbnail">Course Thumbnail</Label>
                      <Input
                        id="courseThumbnail"
                        name="thambnail"
                        type="file"
                        accept="image/*"
                        onChange={handleCourseChange}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="video">
                {!selectedVideo ? (
                  <Card>
                    <CardContent className="pt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>

                            {/* <TableHead>Add</TableHead>  */}

                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {videos.map((video) => (
                            <TableRow key={video._id}>
                              <TableCell>{video.title}</TableCell>
                              <TableCell>{video.description}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleEditVideo(video)}>
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(video._id)}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="videoTitle">Video Title</Label>
                        <Input
                          id="videoTitle"
                          name="title"
                          value={videoDetails.title}
                          onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoDescription">Video Description</Label>
                        <Textarea
                          id="videoDescription"
                          name="description"
                          value={videoDetails.description}
                          onChange={(e) => setVideoDetails({ ...videoDetails, description: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoThumbnail">Video Thumbnail</Label>
                        <Input
                          id="videoThumbnail"
                          name="thambnail"
                          type="file"
                          accept="image/*"
                          onChange={handlecThumbnailChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoFile">Video File</Label>
                        <Input
                          id="videoFile"
                          name="videourl"
                          type="file"
                          accept="video/*"
                          onChange={handlecvThumbnailChange}
                        />
                      </div>
                      <Button type="button" onClick={() => setSelectedVideo(null)}>Back to Video List</Button>
                    </CardContent>

                  </Card>
                )}
                <Dialog open={isAddVideoOpen} onOpenChange={setIsAddVideoOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-4">Add Video</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Video</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="videoTopic" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="videoTopic"
                          name="videoTopic"
                          value={videoTopic}
                          onChange={(e) => setVideoTopic(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="videoDescription" className="text-right">
                          Description
                        </Label>
                        <Textarea
                          id="videoDescription"
                          name="videoDescription"
                          value={videoDescription}
                          onChange={(e) => setVideoDescription(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="thumbnail" className="text-right">
                          Thumbnail
                        </Label>
                        <div className="col-span-3">
                          <Input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                          />
                          {/* {turl && (
                            <img src={turl} alt="Thumbnail preview" className="mt-2 max-w-full h-auto" />
                          )} */}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="videoFile" className="text-right">
                          Video File
                        </Label>
                        <div className="col-span-3">
                          <Input
                            id="videoFile"
                            name="videoFile"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoFileChange}
                          />
                          {/* {vurl && (
                            <video src={vurl} controls className="mt-2 max-w-full h-auto">
                              Your browser does not support the video tag.
                            </video>
                          )} */}
                        </div>
                      </div>
                    </div>
                    {/* <Button onClick={videoUpload} className="w-full">
                      <Upload className="mr-2 h-4 w-4" />{vloading ? "loading" : "Add Video"}
                    </Button> */}

                    <Button type="submit" onClick={videoUpload} className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                      {vloading ? (<Button disabled>
                        <Loader2 className=" text-white mr-2 w-full animate-spin" />
                        Please wait
                      </Button>) : "Add Video"}
                    </Button>

                  </DialogContent>
                </Dialog>

              </TabsContent>
              {/* <Button type="submit" className="w-full">Save Changes</Button> */}
              <Button type="submit" className="w-full">
                {loading ? (<Button disabled>
                  <Loader2 className=" text-white mr-2 w-full animate-spin" />
                  Please wait
                </Button>) : "Save Changes"}
              </Button>
            </form>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmation.isOpen} onOpenChange={handleDeleteCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this video? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}