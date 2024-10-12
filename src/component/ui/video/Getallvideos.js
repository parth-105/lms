"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import CourseSkeleton from '../CourseSkeleton/CourseSkeleton';
import VideoCardlms from '@/component/ui/video-card/VideoCardlms'
import { useToast } from "@/hooks/use-toast"


const VideoList = () => {
  const { toast } = useToast()
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = React.useState(false);



  var filtervideo = videos.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())

  );

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const filteredCourses = selectedSubject
    ? videos.filter((course) => course.subject === selectedSubject) : videos.filter((course) => course.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/videos/getvideos'); // Make a GET request
      
        setVideos(response.data.videos);
          setLoading(false)// Update state with fetched videos
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          
        })
        setLoading(false)
      }finally{
        setLoading(false)
      }
    };

    fetchVideos();

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup (e.g., close connections, unsubscribe, etc.)
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className='container mx-auto p-4' >
      <div >
        <div >
          <input
            type="text"
            placeholder="Search..."
            className="border  rounded-l px-4 py-2  text-black border-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className="mb-8 text-center">
          <label htmlFor="subject" className="mr-2">Filter by Subject:</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="border border-gray-300 p-2 rounded"
          >
           <option value="">All subject</option>
                      <option value="Javascript">Javascript</option>
                      <option value="React">React</option>
                      <option value="Node">Node</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="GK">GK</option>
                      <option value="ML">Machine Learning</option>
                      <option value="ebusiness">E-business</option>
            {/* Add more subjects as needed */}
          </select>
        </div>
      </div>


      {loading ? <div className='w-full h-full cursor-pointer' > <CourseSkeleton/> </div> : filteredCourses.length > 0 ? (
        <div className='flex flex-wrap justify-center'>
          {filteredCourses.map((video) => (
            <div key={video._id} className=' m-4  ' >
              {/* <Videocard video={video} /> */}
              <VideoCardlms video={video}/>
            </div>
          ))
          }
        </div>) : (
        <p>{search ? "Video Not Found" : "No Video On The Platform"}</p>
      )
      }
    </div>
  );
};

export default VideoList;