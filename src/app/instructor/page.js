

import AIAssistantBot from '@/component/ui/chatbot/AIAssistantBot'

import VideoList from '@/component/ui/video/Getallvideos'
import React from 'react'
 
 const page = () => {
   return (
    <div className="flex h-screen">
   
      <VideoList />
      
      <AIAssistantBot/>
      
     
  </div>
   )
 }
 
 export default page
 