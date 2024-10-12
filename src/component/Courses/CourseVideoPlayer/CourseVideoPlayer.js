'use client'

import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import ReactPlayer from 'react-player';



export default function CourseVideoPlayer({ courseId }) {


    const [Videos, setVideos] = useState([]);
    // const [currentUrl, setCurrentUrl] = useState('');
    const [currentUrl, setCurrentUrl] = useState();
    const [currentvideodata, setCurrentvideodata] = useState();

    useEffect(() => {
        if (courseId) {
            const fetchVideos = async () => {

               

                const response = await axios.post("/api/course/coursevideo", { courseId: courseId });

                


                setVideos(response.data.videos);
                setCurrentUrl(response?.data?.videos?.[0]?.videourl);
                setCurrentvideodata(response?.data?.videos?.[0])

            };

            fetchVideos();
        }



    }, [])


    const currentvideo = (videoData) => {
        setCurrentUrl(videoData.videourl)
        setCurrentvideodata(videoData)
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Course: React Mastery</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="relative aspect-video">

                            <ReactPlayer url={currentUrl} controls width="100%" height="100%" />
                            <h2 className="text-xl font-bold mb-2">{currentvideodata?.title}</h2>
                            <p className="mb-4">{currentvideodata?.description}</p>
                    
                        </div>
                        <h3 className="text-xl font-semibold">{currentvideodata?.title}</h3>
                        <ScrollArea className="h-[300px] border rounded-md p-4">
                            <div className="space-y-4">
                                {Videos.map((videoData) => (
                                    <div
                                        key={videoData._id}
                                        className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer transition-colors ${videoData._id === currentvideodata?._id ? 'bg-secondary' : 'hover:bg-secondary/50'
                                            }`}
                                        onClick={() => { currentvideo(videoData) }}
                                    >
                                        <img
                                            src={videoData?.thambnail}
                                            alt={videoData?.title}
                                            className="w-32 h-18 object-cover rounded"
                                        />
                                        <div>
                                            <h4 className="font-medium">{videoData?.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}