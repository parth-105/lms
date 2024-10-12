"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {  FileTextIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useLocalStorage from '@/helpers/useLocalStorage.js'
import {
  Drawer,
  DrawerClose,
  DrawerContent,

  DrawerFooter,
  DrawerHeader,
 
  DrawerTrigger,
} from "@/components/ui/drawer"
import Coursewiseassignmentlist from './Coursewiseassignmentlist'
import { useToast } from "@/hooks/use-toast"





export default function AssignmentList() {

  const { toast } = useToast()
  const [purchasecourseassignment, setpurchasecourseassignment] = useState([]);
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [loading, setloading] = useState(false)


  useEffect(() => {
    const fetchCourses = async () => {
      setloading(true)
      try {
        const res = await axios.post('/api/assignment/listofassignment', { userId: data._id });
       
        setpurchasecourseassignment(res.data.purchases);
        setloading(false)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          
        })
        setloading(false)
      }finally{
        setloading(false)
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
    // Fetch assignments for the student from the backend
   const res =  await axios.post('/api/assignment/studentnotifyforstatusupdate',{studentId:data._id})
  
  };

  fetchCourses();
   // setpurchasecourseassignment(res.data.assignments);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Assignments</h1>
      <div className="  grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {purchasecourseassignment.filter((_, index) => index % 2 === 0).map((assignment) => (
          <Card key={assignment?._id} className="flex flex-col">
            <Drawer>
              <CardHeader>
                <CardTitle>{assignment?.courseId?.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                {/* <Link href={`/assignments/${assignment._id}`} passHref> */}
                <Button variant="outline">
                  <DrawerTrigger> <FileTextIcon className="mr-2 h-4 w-4" /></DrawerTrigger>
                </Button>
                {/* </Link> */}
                <DrawerContent>
                  <DrawerHeader className="h-96 overflow-y-auto" >
                   {/* <ScrollArea className="h-[90%] w-full rounded-md border p-4"> */}
                      <Coursewiseassignmentlist Course={assignment?.courseId} />
                      {/* component */}
                    {/* </ScrollArea> */}
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </CardFooter>
            </Drawer>
          </Card>
        ))}






      </div>
    </div>


  )
}