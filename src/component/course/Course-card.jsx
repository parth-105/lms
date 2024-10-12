'use client'
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import useLocalStorage from '@/helpers/useLocalStorage.js';
import {
  
  ListItem,
  ListItemPrefix,
  Avatar,

  Typography,
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import ConfirmationModal from '@/component/ui/delete/ConfirmationModal';
import CourseEditorModalTabs from '../ui/editcourse/CourseEditorModal';
import { useToast } from "@/hooks/use-toast"




const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CourseCard = ({ title, thumbnail, price, courseId, instructor, userId, insdetail, onDelete ,course}) => {

  const route = useRouter();
  const { toast } = useToast()
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isedting, setIsediting] = useState(false);


  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.post('/api/course/deletecourse', { id: courseId });
     
      if (response.data.Success) {
      
        onDelete(courseId);
        // Optionally, refresh the page or update the state to remove the deleted video from the UI
      } else {
        alert('Failed to delete the video');
      }
    } catch (error) {
      alert('An error occurred while deleting the video');
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };





  const handleCourseClick = async (courseId) => {

    //route.push(`/course/videos/${courseId}`);courseId, userId

    if (data._id === instructor || userId || data.isAdmin) {
      route.push(`/course/videos/${courseId}`);
    }
    else {
      const res = await axios.post("/api/course/checkpurchase", { userId: data._id, courseId: courseId });


    

      if (res.data.purchased === false) {
     

        const check = async () => {
          const stripe = await stripePromise;
        
          const response = await fetch("/api/checkout", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price, courseId }),
          });

          const session = await response.json();
          const sessionId = session.sessionId.id; // Access the id here

          const result = await stripe.redirectToCheckout({
            sessionId: session.sessionId,
          });

          

          if (result.error) {
           
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
             
            })
            
          } else {
            const update = await axios.post('/api/update', { user: data._id, course: courseId, purchased: true })
           
          }
        };
        check()
      } else {
        route.push(`/course/videos/${courseId}`);
      }
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm">
      <img
        className="w-full h-48 object-cover"
        src={thumbnail}
        alt={title}
      />
      <div className="p-4">

        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src={insdetail?.photoURL} />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              {insdetail?.name}
            </Typography>
          </div>
        </ListItem>

        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">${price}</p>
        <div className=' flex justify-between'>
          <button onClick={() => handleCourseClick(courseId)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"  >
            {data._id === instructor || userId || data.isAdmin ? "Watch" : "Enroll Now"}
          </button>
          {data._id === instructor || data.isAdmin ? <div onClick={() => setIsModalOpen(true)} disabled={isDeleting} className='hover:bg-red-400 hover:cursor-pointer flex justify-center items-center rounded-full w-10' >
            {isDeleting ? 'Deleting...' : <MdDelete />}
          </div> : null}

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDelete}

          />

          {data._id === instructor || data.isAdmin ? <button   className='hover:bg-red-400 hover:cursor-pointer flex justify-center items-center rounded-full w-10' >
           <CourseEditorModalTabs course={course} />
          </button> : null}

        </div>

      </div>
    </div>
  );
};

export default CourseCard;
