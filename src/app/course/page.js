"use client"
import { useState, useEffect } from 'react';

import CourseSkeleton from '@/component/ui/CourseSkeleton/CourseSkeleton';
import CourseComponent from '@/component/ui/course-card/CourseComponent';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(''); // New state for selected subject
  const [search,setSearch] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/course/courses');
        const data = await res.json();
       
        setCourses(data);
       setLoading(false)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };


  const handleCourseDelete = (deletedCourseId) => {
    setCourses(courses.filter(course => course._id !== deletedCourseId));
  };

  // Filter courses based on selected subject

  var filtervideo = courses.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  const filteredCourses = selectedSubject
    ? courses.filter((course) => course.subject === selectedSubject) : courses.filter((course) => course.title.trim().toLowerCase().includes(search.trim().toLowerCase()))
 

  return (
    <div className="container mx-auto p-4">
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
            <option value="">All Subjects</option>
           
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

      {loading ? <div className='w-full h-full cursor-pointer' > <CourseSkeleton/> </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  ">
    
    {  filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseComponent
              key={course._id}
              title={course.title}
              thumbnail={course.thambnail}
              price={course.price}
              courseId={course._id}
            //  instructor={course.instructor._id}
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
