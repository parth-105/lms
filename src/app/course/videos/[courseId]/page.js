"use client"
import React, { useEffect, useState } from 'react'

import axios from 'axios';

export const dynamic = 'force-dynamic';

import ReactPlayer from 'react-player';
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

function Videos({ params }) {

  //const [Videos, setVideos] = useState([]);

   const [videoList, setVideoList] = useState([]);
  
  const [currentUrl, setCurrentUrl] = useState();
  const [currentvideodata, setCurrentvideodata] = useState();
  const courseId = params.courseId;
  useEffect(() => {
    if (courseId) {
      const fetchVideos = async () => {

      

        const response = await axios.post("/api/course/coursevideo", { courseId: courseId });

       

        setVideoList(response.data.videos);
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
        <div className="space-y-4">
          {videoList.length > 0 ? (
            <div className="relative aspect-video ">
              <ReactPlayer url={currentUrl} controls width="100%" height="100%" />
              <h2 className="text-xl font-bold mb-2">{currentvideodata?.title}</h2>
              <p className="mb-4">{currentvideodata?.description}</p>
            </div>
          ) : null}



          <ScrollArea className="h-[300px] border rounded-md p-4">
            {videoList.length > 0 ? (

              videoList.map((videoData) => (
                <div className="space-y-4" key={videoData._id} >
                  <div
                    key={videoData._id}
                    className={`flex bottom-8 items-center space-x-4 p-2 rounded-md cursor-pointer transition-colors ${videoData?.videourl === currentUrl ? 'bg-[#f1f5f9]' : 'hover:bg-[#f3f4f6]'
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
                </div>
              ))
            ) : (
              <p>No video available.</p>
            )}
          </ScrollArea>
        </div>
      </Card>
    </div>


  )
}

export default Videos
