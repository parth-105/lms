// MyComponent.js
"use client"
import React, { useState } from 'react';
import { uploadFileAndGetUrl } from '@/helpers/firebaseUtils'; // Adjust the path

const MyComponent = () => {
  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const url = await uploadFileAndGetUrl(selectedFile);
    
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default MyComponent;
