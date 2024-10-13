"use client"

import axios from 'axios';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useToast } from "@/hooks/use-toast"
import { unstable_noStore as noStore } from 'next/cache';

const Page = ({params}) => {
  
  noStore();
  const { toast } = useToast()
  const [currentUrl, setCurrentUrl] = useState();
  const [videos, setVideos] = useState({});
//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await axios.post('/api/videos/getvideosbyid',{id:params.videoid}); // Make a GET request
       
//         setVideos(response.data.videos); 
//         setCurrentUrl(response.data.videos.videourl)// Update state with fetched videos
//       } catch (error) {
//         toast({
//           title: "Validation Error",
//           description: "Please fill in all required fields.",
//         });
     
//       }
//     };

//     fetchVideos();

//     // Cleanup function (optional)
//     return () => {
//       // Perform any cleanup (e.g., close connections, unsubscribe, etc.)
//     };
//   }, []); 

  return (
    <div>
      <h1>{params.videoid}</h1>
      {/* <div className="video-player w-full md:w-full  z-30 bg-brown-50  top-0 md:static ">
          <ReactPlayer url={currentUrl} controls width="100%" height="100%" />
          <h2 className="text-xl font-bold mb-2">{videos?.title}</h2>
        <p className="mb-4">{videos?.description}</p>
        </div> */}
    </div>
  )
}

export default Page
