"use client"
import { Col, message, Row } from "antd";
import React, { useEffect } from "react";

import { useRouter } from 'next/navigation';
import axios from "axios";
import ExamCard from "@/component/ui/exam/ExamCard";

function Home() {
  const router = useRouter();
  const [exams, setExams] = React.useState([]);

  const getExams = async () => {
    try {
     
      const response = await axios.post("/api/exam/get-all-exam");
     
      if (response.data.success) {
        setExams(response.data.data);
      } else {
       
        message.error(response.message);
      }
     
    } catch (error) {
     
      message.error(error.data.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    (
      <div className="flex h-screen" >

        <div className='flex flex-wrap justify-center'>
          {exams.map((exam, index) =>
          (
            <div key={index} className='m-4' >
              <ExamCard exam={exam} />
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Home;
