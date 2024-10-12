'use client'
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import useLocalStorage from '@/helpers/useLocalStorage.js';
import CourseSkeleton from '@/component/ui/CourseSkeleton/CourseSkeleton';
import CourseComponent from '@/component/ui/course-card/CourseComponent';
import { useToast } from "@/hooks/use-toast"





const Courses = () => {
  const { toast } = useToast()
  const [courses, setCourses] = useState([]);
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [loading, setLoading] = useState(false);

  const handleCourseDelete = useCallback((deletedCourseId) => {
    setCourses(prevCourses => prevCourses.filter(course => course._id !== deletedCourseId));
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.post('/api/course/get-course-by-id', { id: data._id });
       
        setCourses(res.data.courses);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
         
        })
        setLoading(false)
      
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [data._id]);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">my Courses</h1>
      {loading ? <div className='w-full h-full cursor-pointer' > <CourseSkeleton /> </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseComponent
              key={course._id}
              title={course.title}
              thumbnail={course.thambnail}
              price={course.price}
              courseId={course._id}
              instructor={course.instructor._id}
              insdetail={course.instructor}
              course={course}
              onDelete={handleCourseDelete}
            />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>}
    </div>
  );
};

export default Courses;
