'use client'
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
 
  Typography,

} from "@material-tailwind/react";

const VideoCard = ({ title, description, thumbnail, videoUrl }) => {
 
  return (

  
    <Card className="video-card p-2 mb-4 border rounded-lg shadow-md cursor-pointer">
      <CardHeader floated={false} className="h-[100%]">
        <img className="h-full" src={thumbnail} alt={title}/>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {title}
        </Typography>
      </CardBody>
    </Card>
    
  );
};

export default VideoCard;
