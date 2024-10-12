'use client'
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import useLocalStorage from '@/helpers/useLocalStorage.js';

import { MdDelete } from "react-icons/md";
import { useState } from 'react';
// import ConfirmationModal from '@/component/ui/delete/ConfirmationModal';
// import CourseEditorModalTabs from '../ui/editcourse/CourseEditorModal';


import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, Trash2 } from "lucide-react"
import ConfirmationModal from '../delete/ConfirmationModal';
import CourseEditorModalTabs from '../editcourse/CourseEditorModal';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Studentcoursecard({
    title, thumbnail, price, courseId, instructor, userId, insdetail, onDelete, course , sinsdetail
}) {


    const route = useRouter();
    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isedting, setIsediting] = useState(false);


    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.post('/api/course/deletecourse', { id: courseId });
            console.log('ok', response.data.Success);
            if (response.data.Success) {
                // alert('Video deleted successfully');
                onDelete(courseId);
                // Optionally, refresh the page or update the state to remove the deleted video from the UI
            } else {
                alert('Failed to delete the video');
            }
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('An error occurred while deleting the video');
        } finally {
            setIsDeleting(false);
            setIsModalOpen(false);
        }
    };

    // when user id store
    // const userId = Cookies.get('userId');
    // console.log("+++++++++++++++",userId);



    const handleCourseClick = async (courseId) => {

        //route.push(`/course/Videos/${courseId}`);courseId, userId

        if (data._id === instructor || userId || data.isAdmin) {
            route.push(`/course/videos/${courseId}`);
        }
        else {
            const res = await axios.post("/api/course/checkpurchase", { userId: data._id, courseId: courseId });


            console.log(res.data.purchased);

            if (res.data.purchased === false) {
                console.log("this is stripe1");

                const check = async () => {
                    const stripe = await stripePromise;
                    console.log("this is stripe2");

                    console.log(price);

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

                    //update database 
                    // if(session){
                    //   console.log('update',session)
                    //   const update = await axios.post('/api/update',{user:"66bf6d68f1cc39527b8403f4",course:courseId,purchased:true})
                    // }

                    if (result.error) {
                        console.error(result.error.message);
                    } else {
                        const update = await axios.post('/api/update', { user: data._id, course: courseId, purchased: true })
                        console.log('payment')
                    }
                };
                check()
            } else {
                route.push(`/course/videos/${courseId}`);
            }
        }
    };


    return (
        <Card className="w-full max-w-sm overflow-hidden">
            <div className="relative aspect-video">
                <img
                    src={thumbnail}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className=" w-full h-full transition-transform hover:scale-105"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
                <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={sinsdetail?.photoURL} />
                        <AvatarFallback>{sinsdetail?.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{sinsdetail?.name}</p>
                        <p className="text-xs text-muted-foreground">Instructor</p>
                    </div>
                </div>
                <p className="text-xl font-bold">₹{price?.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">

                <Button onClick={() => handleCourseClick(courseId)} className="w-full mr-2">
                    {data._id === instructor || userId || data.isAdmin ? "Watch" : "Enroll Now"}
                </Button>





                <div className="flex gap-2">
                    {data._id === instructor || data.isAdmin ? <div  >
                        <CourseEditorModalTabs course={course} />
                    </div> : null}





                    {data._id === instructor || data.isAdmin ? <Button variant="outline" onClick={() => setIsModalOpen(true)} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : <Trash2 className="h-4 w-4" />}
                        <span className="sr-only">Delete course</span>
                    </Button> : null}

                    <ConfirmationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleDelete}

                    />

                </div>
            </CardFooter>
        </Card>
    )
}
