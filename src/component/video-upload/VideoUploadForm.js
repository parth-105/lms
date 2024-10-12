"use client"
// components/VideoUploadForm.js
import React, { useState } from 'react';
import useLocalStorage from '@/helpers/useLocalStorage.js'
import { uploadFileAndGetUrl } from '@/helpers/firebaseUtils';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const VideoUploadForm = () => {
  const { toast } = useToast()
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [videoTopic, setVideoTopic] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [loading, setloading] = useState(false)
  const [data, setData] = useLocalStorage('e-learning-user', '');

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);

  };

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      if (!subject || !videoTopic || !videoDescription) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        //  alert('ff')
        setloading(false)
        return;
      }
      const thumbnailurl = await uploadFileAndGetUrl(thumbnail);
      const videoFileurl = await uploadFileAndGetUrl(videoFile);
      const response = await axios.post("/api/videos/uploadvideo", { title: videoTopic, description: videoDescription, instructor: data._id, thambnail: thumbnailurl, videourl: videoFileurl, subject: subject });
      

      if (!thumbnailurl || !videoFileurl) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        setloading(false)
        return;
      }

      if (response) {
        setloading(false)
        setThumbnail(null)
        setSubject('')
        setVideoFile(null)
        setVideoTopic('')
        setVideoDescription('')
        router.push("/course")
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      setloading(false)
    }finally{
      setloading(false)
    }




    // Reset form fields if needed
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Teaching Video</h2>
      <form onSubmit={handleSubmit}>
        {/* Thumbnail */}
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
            Video Thumbnail
          </label>
          <Input
            type="file"
            id="thumbnail"
            name="thumbnail"
             accept="image/*"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleThumbnailChange}
          />
        </div>

        {/* Video File */}
        <div className="mb-4">
          <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">
            Video File
          </label>
          <Input
            type="file"
            id="videoFile"
            name="videoFile"
            accept="video/*"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            onChange={handleVideoFileChange}
          />
        </div>

        {/* Subject Dropdown */}
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Javascript">Javascript</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
            <option value="MongoDB">MongoDB</option>
            <option value="GK">GK</option>
            <option value="ML">Machine Learning</option>
            <option value="ebusiness">E-business</option>
            {/* Add more subject options */}
          </select>
        </div>

        {/* Video Topic */}
        <div className="mb-4">
          <label htmlFor="videoTopic" className="block text-sm font-medium text-gray-700">
            Video Topic
          </label>
          <input
            type="text"
            id="videoTopic"
            name="videoTopic"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={videoTopic}
            onChange={(e) => setVideoTopic(e.target.value)}
          />
        </div>

        {/* Video Description */}
        <div className="mb-4">
          <label htmlFor="videoDescription" className="block text-sm font-medium text-gray-700">
            Video Description
          </label>
          <textarea
            id="videoDescription"
            name="videoDescription"
            rows="3"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
           {loading ? "loding" :"upload video"}
        </button> */}
        <Button
          type="submit"

          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {loading ? (<Button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled>
            <Loader2 className=" text-white mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>) : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
