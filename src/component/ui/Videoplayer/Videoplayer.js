'use client';

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, title, description }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="video-player w-full md:w-full z-30 bg-brown-50 top-0 md:static">
      <ReactPlayer url={url} controls width="100%" height="100%" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
    </div>
  );
};

export default VideoPlayer;
